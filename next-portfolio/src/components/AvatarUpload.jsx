/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AvatarUpload({ url, size = 150, onUpload }) {
	const [uploading, setUploading] = useState(false);
	const fileInputRef = useRef(null);

	const dimension = typeof size === "number" ? `${size}px` : size;

	const handleOpenFilePicker = () => {
		if (uploading) {
			return;
		}

		fileInputRef.current?.click();
	};

	const uploadAvatar = async (event) => {
		const file = event.target.files?.[0];

		if (!file) {
			return;
		}

		try {
			setUploading(true);

			const {
				data: { user },
				error: authError,
			} = await supabase.auth.getUser();

			if (authError || !user) {
				throw new Error("로그인한 사용자 정보를 확인할 수 없습니다.");
			}

			const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
			const randomSuffix = Math.random().toString(36).slice(2, 10);
			const fileName = `${user.id}-${randomSuffix}.${fileExt}`;

			const { error: uploadError } = await supabase.storage
				.from("avatars")
				.upload(fileName, file);

			if (uploadError) {
				throw uploadError;
			}

			const {
				data: { publicUrl },
			} = supabase.storage.from("avatars").getPublicUrl(fileName);

			onUpload?.(publicUrl);
		} catch (error) {
			alert(error.message || "아바타 업로드 중 오류가 발생했습니다.");
		} finally {
			setUploading(false);
			event.target.value = "";
		}
	};

	return (
		<div className="flex flex-col items-center gap-3">
			<button
				type="button"
				onClick={handleOpenFilePicker}
				disabled={uploading}
				className="relative overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed"
				style={{ width: dimension, height: dimension }}
				aria-label="아바타 이미지 업로드"
			>
				{url ? (
					<img
						src={url}
						alt="프로필 아바타"
						className={`h-full w-full rounded-full object-cover transition-opacity ${uploading ? "opacity-50" : "opacity-100"}`}
					/>
				) : (
					<div
						className={`flex h-full w-full items-center justify-center rounded-full bg-gray-300 text-sm font-medium text-gray-600 transition-opacity ${uploading ? "opacity-50" : "opacity-100"}`}
					>
						No Image
					</div>
				)}

				{uploading ? (
					<div className="absolute inset-0 flex items-center justify-center bg-black/30 text-sm font-medium text-white">
						업로드 중...
					</div>
				) : null}
			</button>

			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				onChange={uploadAvatar}
				className="hidden"
			/>

			<p className="text-sm text-muted-foreground">이미지를 클릭해 아바타를 업로드하세요.</p>
		</div>
	);
}
