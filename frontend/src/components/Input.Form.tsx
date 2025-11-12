import { type LucideIcon } from "lucide-react";
interface FormInputType {
  id: string;
  title: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  errMsg?: string;
  Icon: LucideIcon;
}
//reusable (input field + title)  +  their error messages
export function Inputform({
  id,
  title,
  type,
  placeholder,
  value,
  onChange,
  errMsg,
  Icon,
}: FormInputType) {
  const isErr = !!errMsg;

  return (
    <div>
      <p className="block text-sm font-medium text-slate-700  mb-1.5">
        {title}
      </p>
      <div className="relative group">
        <Icon
          className={` absolute left-3 top-1/2  -translate-y-1/2 w-5 h-5 transition-colors  
            ${
              isErr
                ? "text-red-500"
                : "text-slate-400 group-focus-within:text-orange-500"
            }`}
        />

        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full pl-10 pr-4   py-2.5 border rounded-lg   focus:outline-none focus:ring-2 transition-all
            ${
              isErr
                ? "border-red-300 focus:ring-red-500 focus:border-red-300"
                : "border-slate-300 focus:ring-orange-500 focus:border-orange-300"
            }`}
          placeholder={placeholder}
        />
      </div>
      {isErr && <p className="mt-1.5   text-sm text-red-600">{errMsg}</p>}
    </div>
  );
}
