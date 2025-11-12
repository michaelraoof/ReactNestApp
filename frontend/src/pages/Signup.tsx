import { type FormEvent, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, User, Lock } from "lucide-react";
import { useSignup } from "../hooks/useSignup";
import { useUserStore } from "../stores/store";

import { FormLayout } from "../components/Layout.Form";
import { Inputform } from "../components/Input.Form";

import { PasswordIndecator } from "../components/Password-Indecator";
import { SubmitBtn } from "../components/Submit-Btn";

export default function SignUp() {
  const navigate = useNavigate();
  const token = useUserStore((s) => s.token);
  const {
    formState,
    setFields,
    fieldErrsState,
    loading,
    onSubmit,
    hasAttemptedSubmit,
    passwordStrength,
  } = useSignup();

  useEffect(() => {
    //check if there is a token we will route to main page
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
          title="Create your account"
          subtitle="Start creating amazing e-learning content"
          footer={
            <div className="text-center text-sm text-slate-600">
              already have an account?{" "}
              <Link
                to="/signin"
                className=" text-orange-500  hover:text-orange-700 font-medium  transition-colors"
              >
                Sign In
              </Link>
            </div>
          }
        >
          <form onSubmit={handleSubmit} className=" space-y-4">
            <Inputform
              id="name"
              title="Full Name"
              type="text"
              placeholder="Michael Raoof"
              value={formState.name}
              onChange={(value) => setFields("name", value)}
              errMsg={hasAttemptedSubmit ? fieldErrsState.name : undefined}
              Icon={User}
            />

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

            <div className="space-y-2">
              <Inputform
                id="password"
                title="Password"
                type="password"
                placeholder="Create a password"
                value={formState.password}
                onChange={(value) => setFields("password", value)}
                errMsg={
                  hasAttemptedSubmit ? fieldErrsState.password : undefined
                }
                Icon={Lock}
              />
              <PasswordIndecator
                password={formState.password}
                strength={passwordStrength}
              />
            </div>

            <Inputform
              id="confirmPassword"
              title="Confirm your Password"
              type="password"
              placeholder="Confirm your password"
              value={formState.confirmPassword}
              onChange={(value) => setFields("confirmPassword", value)}
              errMsg={
                hasAttemptedSubmit ? fieldErrsState.confirmPassword : undefined
              }
              Icon={Lock}
            />

            <SubmitBtn
              submitState={loading}
              title={"Create Account"}
              loadingTitle="we are working on creating your accunt"
            />
          </form>
        </FormLayout>
      </div>
    </div>
  );
}
