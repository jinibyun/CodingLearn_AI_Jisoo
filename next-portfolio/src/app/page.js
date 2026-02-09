import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-8">
      <div className="relative w-[70vw] h-[70vh]">
        <Image
          src="/musicScore.jpg"
          alt="Music Score"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </div>
  );
}
