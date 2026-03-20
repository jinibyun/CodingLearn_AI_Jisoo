/*
Next.js 엔진은 화면(page.jsx)을 그리거나 백엔드(route.js)를 실행하기 전에, 
프로젝트 루트에 middleware.js 파일이 존재하는지 확인하고 가장 앞단에서 무조건 먼저
이 함수를 실행(호출)
*/
import { NextResponse } from "next/server";

export function middleware(request) {
	const isFormsPath = request.nextUrl.pathname.startsWith("/forms");
	const cookies = request.cookies.getAll();
	const hasSupabaseAuthCookie = cookies.some(
		(cookie) => cookie.name.includes("sb-") && cookie.name.includes("-auth-token")
	);

	if (isFormsPath && !hasSupabaseAuthCookie) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/forms/:path*"],
};
