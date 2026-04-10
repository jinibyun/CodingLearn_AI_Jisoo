const mockNextResponseJson = jest.fn((body, init = {}) => ({
	status: init.status ?? 200,
	body,
	json: async () => body,
}));

jest.mock("next/server", () => ({
	NextRequest: class MockNextRequest {
		constructor({ url = "http://localhost/api/profiles", headers = {}, body } = {}) {
			this.nextUrl = new URL(url);
			this._body = body;
			this.headers = {
				get: (key) => {
					const lowerKey = key.toLowerCase();
					return headers[lowerKey] ?? headers[key] ?? null;
				},
			};
		}

		async json() {
			return this._body ?? {};
		}
	},
	NextResponse: {
		json: (...args) => mockNextResponseJson(...args),
	},
}));

const mockGetServerSupabase = jest.fn();

jest.mock("@/lib/supabase-server", () => ({
	getServerSupabase: () => mockGetServerSupabase(),
}));

import { NextRequest } from "next/server";
import { GET, POST } from "@/app/api/profiles/route";

function createMockSupabase() {
	const selectChain = {
		eq: jest.fn(),
		maybeSingle: jest.fn(),
	};

	selectChain.eq.mockReturnValue(selectChain);

	const upsertSelect = jest.fn();
	const updateChain = {
		eq: jest.fn(),
	};

	const deleteChain = {
		eq: jest.fn(),
	};

	const tableApi = {
		select: jest.fn(() => selectChain),
		upsert: jest.fn(() => ({ select: upsertSelect })),
		update: jest.fn(() => updateChain),
		delete: jest.fn(() => deleteChain),
	};

	const supabase = {
		auth: {
			getUser: jest.fn(),
		},
		from: jest.fn(() => tableApi),
	};

	return {
		supabase,
		selectChain,
		upsertSelect,
		updateChain,
		deleteChain,
		tableApi,
	};
}

describe("profiles API route", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("미인증 사용자가 GET 접근 시 401을 반환한다", async () => {
		const { supabase } = createMockSupabase();

		supabase.auth.getUser.mockResolvedValue({
			data: { user: null },
			error: new Error("No session"),
		});

		mockGetServerSupabase.mockResolvedValue(supabase);

		const request = new NextRequest({
			url: "http://localhost/api/profiles?id=test-uuid",
		});

		const response = await GET(request);

		expect(response.status).toBe(401);
		expect(mockNextResponseJson).toHaveBeenCalledWith(
			{ error: "Unauthorized" },
			{ status: 401 }
		);
	});

	it("인증된 사용자가 GET 접근 시 200을 반환하고 profiles2를 조회한다", async () => {
		const { supabase, selectChain } = createMockSupabase();

		supabase.auth.getUser.mockResolvedValue({
			data: { user: { id: "test-uuid", email: "test@test.com" } },
			error: null,
		});

		selectChain.maybeSingle.mockResolvedValue({
			data: {
				id: "test-uuid",
				username: "tester",
				email: "test@test.com",
				bio: "hello",
				role: "user",
				marketing_emails: false,
				theme: "system",
				avatar_url: "",
			},
			error: null,
		});

		mockGetServerSupabase.mockResolvedValue(supabase);

		const request = new NextRequest({
			url: "http://localhost/api/profiles?id=test-uuid",
			headers: {
				authorization: "Bearer mock-token",
			},
		});

		const response = await GET(request);

		expect(response.status).toBe(200);
		expect(supabase.from).toHaveBeenCalledWith("profiles2");
		expect(selectChain.eq).toHaveBeenCalledWith("id", "test-uuid");
		expect(selectChain.maybeSingle).toHaveBeenCalledTimes(1);
	});

	it("미인증 사용자가 POST 접근 시 401을 반환한다", async () => {
		const { supabase } = createMockSupabase();

		supabase.auth.getUser.mockResolvedValue({
			data: { user: null },
			error: new Error("No session"),
		});

		mockGetServerSupabase.mockResolvedValue(supabase);

		const request = new NextRequest({
			url: "http://localhost/api/profiles",
			body: {
				id: "test-uuid",
				email: "test@test.com",
			},
		});

		const response = await POST(request);

		expect(response.status).toBe(401);
		expect(mockNextResponseJson).toHaveBeenCalledWith(
			{ error: "Unauthorized" },
			{ status: 401 }
		);
	});

	it("인증된 사용자가 POST 접근 시 200을 반환하고 profiles2 upsert를 실행한다", async () => {
		const { supabase, tableApi, upsertSelect } = createMockSupabase();

		supabase.auth.getUser.mockResolvedValue({
			data: { user: { id: "test-uuid", email: "test@test.com" } },
			error: null,
		});

		upsertSelect.mockResolvedValue({
			data: [
				{
					id: "test-uuid",
					username: "tester",
					email: "test@test.com",
				},
			],
			error: null,
		});

		mockGetServerSupabase.mockResolvedValue(supabase);

		const request = new NextRequest({
			url: "http://localhost/api/profiles",
			headers: {
				authorization: "Bearer mock-token",
			},
			body: {
				id: "test-uuid",
				username: "tester",
				email: "test@test.com",
				bio: "hello",
				role: "user",
				marketing_emails: true,
				theme: "dark",
				avatar_url: "https://example.com/avatar.png",
			},
		});

		const response = await POST(request);

		expect(response.status).toBe(200);
		expect(supabase.from).toHaveBeenCalledWith("profiles2");
		expect(tableApi.upsert).toHaveBeenCalledTimes(1);
		expect(upsertSelect).toHaveBeenCalledTimes(1);
	});
});