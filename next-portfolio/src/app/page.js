import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-black p-8">
      <div className="relative w-[70vw] h-[70vh]">
        <Image
          src="/musicScore.jpg"
          alt="Music Score"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
      
      <div className="flex flex-col gap-6 mt-8">
        {/* 기본 HTML 버튼 */}
        <div className="flex gap-3 flex-wrap">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">HTML Button</button>
        </div>

        {/* 모든 Variant */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-sm font-semibold">All Variants</h3>
          <div className="flex gap-3 flex-wrap">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        {/* 모든 Sizes */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-sm font-semibold">All Sizes</h3>
          <div className="flex gap-3 flex-wrap items-center">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        {/* Icon Buttons */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-sm font-semibold">Icon Buttons</h3>
          <div className="flex gap-3 flex-wrap items-center">
            <Button size="icon-xs">🔥</Button>
            <Button size="icon-sm">🔥</Button>
            <Button size="icon">🔥</Button>
            <Button size="icon-lg">🔥</Button>
          </div>
        </div>

        {/* Combination Examples */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-sm font-semibold">Combinations</h3>
          <div className="flex gap-3 flex-wrap">
            <Button variant="destructive" size="lg">큰 경고</Button>
            <Button variant="outline" size="sm">작은 아웃라인</Button>
            <Button variant="ghost" size="xs">아주 작은 고스트</Button>
            <Button variant="secondary" size="lg">큰 보조</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
