"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	const handleSignUp = async () => {
		try {
			setLoading(true);
			setError("");
			setMessage("");

			const { error: signUpError } = await supabase.auth.signUp({
				email,
				password,
			});

			if (signUpError) {
				throw signUpError;
			}

			setMessage("가입 성공! 이메일을 확인해주세요.");
		} catch (err) {
			setError(err.message || "회원가입 중 오류가 발생했습니다.");
		} finally {
			setLoading(false);
		}
	};

	const handleSignIn = async () => {
		try {
			setLoading(true);
			setError("");
			setMessage("");

			const { error: signInError } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (signInError) {
				throw signInError;
			}

			setMessage("로그인 성공!");
			router.push("/forms");
		} catch (err) {
			setError(err.message || "로그인 중 오류가 발생했습니다.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>로그인 / 회원가입</CardTitle>
					<CardDescription>이메일과 비밀번호를 입력해 주세요.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={(e) => e.preventDefault()} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">이메일</Label>
							<Input
								id="email"
								type="email"
								placeholder="example@email.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">비밀번호</Label>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</form>
					{error && <p className="mt-3 text-sm text-red-600">{error}</p>}
					{message && <p className="mt-3 text-sm text-emerald-600">{message}</p>}
				</CardContent>
				<CardFooter className="flex flex-col gap-3 sm:flex-row">
					<Button className="w-full sm:flex-1" onClick={handleSignIn} disabled={loading}>
						{loading ? "처리 중..." : "로그인"}
					</Button>
					<Button
						variant="outline"
						className="w-full sm:flex-1"
						onClick={handleSignUp}
						disabled={loading}
					>
						{loading ? "처리 중..." : "회원가입"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}