"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../../components/Button";
import Image from "next/image";
export default function FinishPage() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push("/story");
  };
  return (
    <>
      <div className={`w-full min-h-screen bg-neutral-50 px-7 flex-col justify-between items-center pb-12 pt-14 flex`}>
        <div className="flex flex-col w-full gap-2">
          <p className="text-neutral-900 font-semibold text-title text-center">Finish</p>
          <p className="text-neutral-900 font-normal text-title text-center">Let’s get start our journey!</p>
        </div>
        <Image src="/assets/illustrations/i_login.svg" height={288} width={288} alt="Welcome Illustration" />
        <Button onClick={handleStartClick}>Start</Button>
      </div>
    </>
  );
}
