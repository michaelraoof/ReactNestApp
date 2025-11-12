import { CheckCircle2 } from "lucide-react";

export type PasswordStrength = {
  length: boolean;
  letter: boolean;
  number: boolean;
  special: boolean;
};

function PasswordCheck({
  label,
  checked,
}: {
  label: string;
  checked: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs">
      <CheckCircle2
        className={`w-3.5  h-3.5  transition-colors ${
          checked ? "text-green-500 " : "text-slate-300 "
        }`}
      />
      <span className={checked ? "text-green-600" : "text-slate-500"}>
        {label}
      </span>
    </div>
  );
}

interface PasswordIndecatorProps {
  password: string;
  strength: PasswordStrength;
}

export function PasswordIndecator({
  password,
  strength,
}: PasswordIndecatorProps) {
  if (!password) return null;

  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      <PasswordCheck label="8+ characters" checked={strength.length} />
      <PasswordCheck label="One letter" checked={strength.letter} />
      <PasswordCheck label="One number" checked={strength.number} />
      <PasswordCheck label="Special char" checked={strength.special} />
    </div>
  );
}
