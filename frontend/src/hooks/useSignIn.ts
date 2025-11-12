import { useState } from "react";
import {
  signInSchema,
  type SignInFormData,
} from "../interfaces/user.interface";

import { useUserStore } from "../stores/store";
export default function useSignIn() {
  const { signIn, loading, clearError } = useUserStore((state) => state);

  const [formState, setFormState] = useState<SignInFormData>({
    email: "",
    password: "",
  });

  const [fieldErrsState, setFieldErrsState] = useState<Record<string, string>>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);
  //set fields state by using input id for each field and its state
  const setFields = (field: keyof SignInFormData, value: string) => {
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
    const result = signInSchema.safeParse(formState);
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
      await signIn({ email: formState.email, password: formState.password });
      setFormState({ email: "", password: "" });
      setFieldErrsState({});
      setSubmitted(false);
      return true;
    } catch {
      return false;
    }
  };

  return {
    formState,
    setFields,
    fieldErrsState,
    loading,
    onSubmit,
    hasAttemptedSubmit: submitted,
  };
}
