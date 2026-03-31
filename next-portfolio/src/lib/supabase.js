import { createBrowserClient } from "@supabase/ssr";

// createBrowserClient: 세션을 localStorage 대신 쿠키에 저장
// → 서버 미들웨어가 동일한 세션 쿠키를 읽을 수 있게 됨
export const supabase = createBrowserClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
