import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request) {
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
		.from("profiles")
		.select("*")
		.eq("id", id)
		.maybeSingle();

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ data });
}

export async function POST(request) {
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
	};

	if (payload.email !== user.email) {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const { data, error } = await supabase.from("profiles").upsert(payload).select();

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ data }, { status: 200 });
}
