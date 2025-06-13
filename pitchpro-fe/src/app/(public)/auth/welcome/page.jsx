"use client";
import { useRouter } from "next/navigation";
import Button from "../../../components/Button";
import Image from "next/image";
import { setNavigationDirection } from "@/app/utils/NavigationDirection";

export default function WelcomePage() {
  const router = useRouter();

  const handleSignupClick = () => {
    router.push("/auth/signup");
    setNavigationDirection("forward");
  };
  const handleLoginClick = () => {
    router.push("/auth/login");
    setNavigationDirection("forward");
  };
  return (
    <>
      <div className="w-full min-h-screen bg-neutral-50 px-5 flex flex-col justify-between items-center pb-11 pt-20">
        <div className="flex flex-col w-full items-start gap-2">
          <p className="text-heading-h1 font-semibold text-neutral-900">PitchPro</p>
          <p className="text-heading-h3  font-[600] flex flex-col items-left text-primary-700">
            Master Your Speech, <span>Own the Stage</span>
          </p>
        </div>
        <Image src="/assets/illustrations/welcome-illustration.svg" height={320} width={320} alt="Welcome Illustration" />
        {/* bottom */}
        <div className="w-full flex flex-col gap-6">
          <Button onClick={handleSignupClick}>Create Account</Button>
          <Button onClick={handleLoginClick} variant="info">
            Log In
          </Button>

          {/* <div className="w-full flex flex-row justify-between items-center">
            <p className="flex flex-col text-body items-start text-neutral-900 font-regular ">
              Or continue using <span className="font-semibold">Google or SSO</span>
            </p>
            <div className="flex flex-row gap-6">
              <div className="h-[48px] bg-[#D9D9D9]  rounded-[10px] w-[48px]"></div>
              <div className="h-[48px] bg-[#D9D9D9] rounded-[10px] w-[48px]"></div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
