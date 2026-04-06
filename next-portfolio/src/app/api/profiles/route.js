import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";

async function getAuthUser(request, supabase) {
	const authorization = request.headers.get("authorization");
	const bearerToken = authorization?.startsWith("Bearer ")
		? authorization.slice(7).trim()
		: "";

	if (bearerToken) {
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser(bearerToken);

		return { user, authError: error };
	}

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	return { user, authError: error };
}

export async function GET(request) {
	const supabase = await getServerSupabase();
	const { user, authError } = await getAuthUser(request, supabase);

	if (!user || authError) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const id = request.nextUrl.searchParams.get("id");

	if (!id) {
		return NextResponse.json({ data: null }, { status: 200 });
	}

	const { data, error } = await supabase
		.from("profiles2")
		.select("id,username,email,bio,role,marketing_emails,theme,avatar_url")
		.eq("id", id)
		.maybeSingle();

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ data });
}

export async function POST(request) {
	const supabase = await getServerSupabase();
	const { user, authError } = await getAuthUser(request, supabase);

	if (!user || authError) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await request.json();
	const payload = {
		id: body?.id,
		username: body?.username,
		email: body?.email,
		bio: body?.bio ?? "",
		role: body?.role ?? "",
		marketing_emails: Boolean(body?.marketing_emails),
		theme: body?.theme ?? "system",
		avatar_url: body?.avatar_url ?? "",
	};

	if (payload.email !== user.email) {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const { data, error } = await supabase.from("profiles2").upsert(payload).select();

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ data }, { status: 200 });
}

export async function DELETE(request) {
	const supabase = await getServerSupabase();
	const { user, authError } = await getAuthUser(request, supabase);

	if (!user || authError) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await request.json().catch(() => ({}));
	const targetId = body?.id || user.id;

	if (targetId !== user.id) {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const { error } = await supabase.from("profiles2").delete().eq("id", targetId);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ success: true }, { status: 200 });
}
