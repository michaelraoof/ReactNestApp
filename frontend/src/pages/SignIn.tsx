import { type FormEvent, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import useSignIn from "../hooks/useSignIn";
import { useUserStore } from "../stores/store";

import { FormLayout } from "../components/Layout.Form";
import { Inputform } from "../components/Input.Form";
import { SubmitBtn } from "../components/Submit-Btn";

export default function SignIn() {
  const navigate = useNavigate();
  const { token, apiErr } = useUserStore((state) => state);
  const {
    formState,
    setFields,
    fieldErrsState,
    loading,
    onSubmit,
    hasAttemptedSubmit,
  } = useSignIn();

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);
  if (token) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await onSubmit();
    if (success) navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen  relative overflow-hidden bg-gradient-to-br  from-orange-50 via-white   to-slate-50">
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <FormLayout
          title="Welcome back"
          subtitle="Sign in to continue to your account"
          footer={
            <div className="text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-orange-500 hover:text-orange-700 font-medium transition-colors"
              >
                Sign up
              </Link>
            </div>
          }
        >
          <form onSubmit={handleSubmit} className=" space-y-4">
            <Inputform
              id="email"
              title="Email"
              type="email"
              placeholder="you@example.com"
              value={formState.email}
              onChange={(value) => setFields("email", value)}
              errMsg={hasAttemptedSubmit ? fieldErrsState.email : undefined}
              Icon={Mail}
            />

            <Inputform
              id="password"
              title="Password"
              type="password"
              placeholder="Enter your password"
              value={formState.password}
              onChange={(value) => setFields("password", value)}
              errMsg={hasAttemptedSubmit ? fieldErrsState.password : undefined}
              Icon={Lock}
            />
            {apiErr && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {apiErr}
              </div>
            )}
            <SubmitBtn
              submitState={loading}
              title={"Sign In"}
              loadingTitle="Signing you in..."
            />
          </form>
        </FormLayout>
      </div>
    </div>
  );
}
