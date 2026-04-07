import { render, screen } from "@testing-library/react";
import AvatarUpload from "@/components/AvatarUpload";

jest.mock("@/lib/supabase", () => ({
	supabase: {
		auth: {
			getUser: jest.fn().mockResolvedValue({
				data: { user: { id: "test-user-id" } },
				error: null,
			}),
		},
		storage: {
			from: jest.fn(() => ({
				upload: jest.fn().mockResolvedValue({ error: null }),
				getPublicUrl: jest.fn(() => ({
					data: { publicUrl: "https://example.com/mock-avatar.jpg" },
				})),
			})),
		},
	},
}));

describe("AvatarUpload 컴포넌트 렌더링 테스트", () => {
	it("url prop이 없으면 기본 플레이스홀더 이미지가 렌더링된다", () => {
		render(<AvatarUpload />);

		const avatarImage = screen.getByRole("img", { name: "프로필 아바타" });
		expect(avatarImage).toBeInTheDocument();
		expect(avatarImage).toHaveAttribute("src", "/default-avatar.svg");
	});

	it("url prop이 있으면 해당 이미지가 렌더링된다", () => {
		const testUrl = "https://example.com/test.jpg";
		render(<AvatarUpload url={testUrl} />);

		const avatarImage = screen.getByRole("img", { name: "프로필 아바타" });
		expect(avatarImage).toBeInTheDocument();
		expect(avatarImage).toHaveAttribute("src", testUrl);
	});
});
