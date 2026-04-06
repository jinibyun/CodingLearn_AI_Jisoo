import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";

export async function POST(request) {
	try {
		const body = await request.json();
		const email = body?.email?.trim();
		const password = body?.password;

		if (!email || !password) {
			return NextResponse.json(
				{ error: "Email and password are required." },
				{ status: 400 }
			);
		}

		const supabase = await getServerSupabase();
		const {
			data: { user, session },
			error,
		} = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 401 });
		}

		return NextResponse.json(
			{
				message: "로그인 성공!",
				user,
				session,
			},
			{ status: 200 }
		);
	} catch {
		return NextResponse.json(
			{ error: "로그인 처리 중 오류가 발생했습니다." },
			{ status: 500 }
		);
	}
}
