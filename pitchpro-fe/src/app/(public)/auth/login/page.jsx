"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Button from "../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { loginUser, clearError } from "@/redux/features/auth/authSlice";
import PageTransitionWrapper from "@/app/animation/PageTransition";
import Textfield from "../../../components/Textfield";
import { setNavigationDirection } from "@/app/utils/NavigationDirection";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignupClick = () => {
    setNavigationDirection("forward");
    router.push("/auth/signup");
  };

  const handleLoginSubmit = async () => {
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      router.push("/story");
    } else {
      console.error("Login failed:", resultAction.payload);
    }
  };
  return (
    <>
      <PageTransitionWrapper>
        {/* Login Form */}
        <div className={`w-full min-h-screen bg-neutral-50 px-7 flex-col justify-between items-center pb-12 pt-14  flex`}>
          <div className="flex flex-col w-full gap-10">
            <button
              onClick={() => {
                router.back();
                setNavigationDirection("backward");
              }}
              className="flex flex-row gap-2 items-center p-2 pl-0 text-body text-neutral-300 font-semibold text"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-[29px] h-[29px]" />
              Back
            </button>
            <div className="form w-full flex flex-col items-center gap-6">
              <Textfield label="Email" placeholder="pitchpro26@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Textfield label="Password" placeholder="******" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {error && <p className="text-red-500">{error.message || "Login failed"}</p>}
              <p className="text-label text-neutral-900 font-[500] w-full text-center">
                Does not have an account?{" "}
                <button onClick={handleSignupClick} className="text-[#5CAAFF]">
                  Create here
                </button>
              </p>
            </div>
          </div>
          <Button onClick={handleLoginSubmit} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </PageTransitionWrapper>
    </>
  );
}
