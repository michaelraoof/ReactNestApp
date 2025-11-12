import { useState } from "react";
import {
  signUpSchema,
  type SignUpFormData,
} from "../interfaces/user.interface";
import { useUserStore } from "../stores/store";
import type { PasswordStrength } from "../components/Password-Indecator";

export function useSignup() {
  const {
    signUp,
    loading,

    clearError,
  } = useUserStore((state) => state);

  const [formState, setFormState] = useState<SignUpFormData>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrsState, setFieldErrsState] = useState<Record<string, string>>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);

  const setFields = (field: keyof SignUpFormData, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (submitted && fieldErrsState[field]) {
      const next = { ...fieldErrsState };
      delete next[field];
      setFieldErrsState(next);
    }
    clearError();
  };

  const onSubmit = async (): Promise<boolean> => {
    setSubmitted(true);
    clearError();

    const result = signUpSchema.safeParse(formState);
    if (!result.success) {
      const issues: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (field) issues[field] = issue.message;
      });
      setFieldErrsState(issues);
      return false;
    }

    setFieldErrsState({});

    try {
      await signUp({
        email: formState.email,
        name: formState.name,
        password: formState.password,
      });
      setFormState({ email: "", name: "", password: "", confirmPassword: "" });
      setFieldErrsState({});
      setSubmitted(false);
      return true;
    } catch {
      return false;
    }
  };

  const pwd = formState.password;
  const passwordStrength: PasswordStrength = {
    length: pwd.length >= 8,
    letter: /[A-Za-z]/.test(pwd),
    number: /\d/.test(pwd),
    special: /[^A-Za-z0-9]/.test(pwd),
  };

  return {
    formState,
    setFields,
    fieldErrsState,

    loading,
    onSubmit,
    hasAttemptedSubmit: submitted,
    passwordStrength,
  };
}
