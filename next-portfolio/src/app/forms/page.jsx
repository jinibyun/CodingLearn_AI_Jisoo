"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
	username: z.string().min(2, {
		message: "닉네임은 최소 2글자 이상이어야 합니다.",
	}),
});

export default function FormsPage() {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
		},
	});

	function onSubmit(values) {
		toast.success("프로필 업데이트 완료!", {
			description: `닉네임: ${values.username}`,
		});
	}

	return (
		<div className="mx-auto max-w-md p-6">
			<h1 className="mb-6 text-2xl font-bold">사용자 프로필 수정</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

					<Button type="submit">저장</Button>
				</form>
			</Form>
		</div>
	);
}
