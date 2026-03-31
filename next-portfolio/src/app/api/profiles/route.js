import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

async function getServerSupabase() {
	const cookieStore = await cookies();

	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					try {
						cookiesToSet.forEach(({ name, value, options }) =>
							cookieStore.set(name, value, options)
						);
					} catch {
						// Ignore setAll errors in contexts where cookies are read-only.
					}
				},
			},
		}
	);
}

export async function GET(request) {
	const supabase = await getServerSupabase();

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

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

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

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
