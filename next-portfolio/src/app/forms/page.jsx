"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
	username: z
		.string()
		.min(2, { message: "닉네임은 2~20자 사이여야 합니다." })
		.max(20, { message: "닉네임은 2~20자 사이여야 합니다." }),
	email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
	password: z.string().min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." }),
	bio: z
		.string()
		.max(160, { message: "자기소개는 160자를 초과할 수 없습니다." })
		.optional(),
	role: z
		.string()
		.refine(
			(value) => ["developer", "designer", "manager"].includes(value),
			{ message: "직업을 선택해주세요." }
		),
	marketing_emails: z.boolean(),
	theme: z.enum(["light", "dark", "system"]),
});

export default function FormsPage() {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			bio: "",
			role: "",
			marketing_emails: false,
			theme: "system",
		},
	});

	async function onSubmit(values) {
		try {
			const { error } = await supabase.from('profiles').insert([values]);
			
			if (error) {
				throw error;
			}
			
			toast.success("프로필 저장 성공!", {
				description: `이메일: ${values.email}, 직업: ${values.role}`,
			});
		} catch (error) {
			toast.error("프로필 저장 실패", {
				description: error.message || "알 수 없는 오류가 발생했습니다.",
			});
		}
	}

	return (
		<div className="mx-auto max-w-2xl p-6">
			<h1 className="mb-6 text-2xl font-bold">종합 프로필 설정 폼</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>닉네임</FormLabel>
								<FormControl>
									<Input placeholder="닉네임을 입력하세요" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>이메일</FormLabel>
								<FormControl>
									<Input type="email" placeholder="you@example.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>비밀번호</FormLabel>
								<FormControl>
									<Input type="password" placeholder="비밀번호를 입력하세요" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="bio"
						render={({ field }) => (
							<FormItem>
								<FormLabel>자기소개</FormLabel>
								<FormControl>
									<Textarea
										placeholder="간단한 자기소개를 입력하세요 (선택)"
										maxLength={160}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="role"
						render={({ field }) => (
							<FormItem>
								<FormLabel>직업</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="직업을 선택하세요" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="developer">developer</SelectItem>
											<SelectItem value="designer">designer</SelectItem>
											<SelectItem value="manager">manager</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="marketing_emails"
						render={({ field }) => (
							<FormItem>
								<FormLabel>광고 수신</FormLabel>
								<FormControl>
									<div className="flex items-center gap-3">
										<Switch checked={field.value} onCheckedChange={field.onChange} />
										<Label>광고성 이메일 수신 동의</Label>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="theme"
						render={({ field }) => (
							<FormItem>
								<FormLabel>테마</FormLabel>
								<FormControl>
									<RadioGroup
										value={field.value}
										onValueChange={field.onChange}
										className="grid grid-cols-1 gap-3 sm:grid-cols-3"
									>
										<div className="flex items-center gap-2">
											<RadioGroupItem id="theme-light" value="light" />
											<Label htmlFor="theme-light">light</Label>
										</div>
										<div className="flex items-center gap-2">
											<RadioGroupItem id="theme-dark" value="dark" />
											<Label htmlFor="theme-dark">dark</Label>
										</div>
										<div className="flex items-center gap-2">
											<RadioGroupItem id="theme-system" value="system" />
											<Label htmlFor="theme-system">system</Label>
										</div>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">저장</Button>
				</form>
			</Form>
		</div>
	);
}
