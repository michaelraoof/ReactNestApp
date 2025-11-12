import { type ReactNode } from "react";

interface FormLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function FormLayout({
  title,
  subtitle,
  children,
  footer,
}: FormLayoutProps) {
  return (
    <div className="w-full  max-w-md">
      <div className="bg-white/80  backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 space-y-2">
        <div className="text-center space-y-2 ">
          <img
            src="/logo.png"
            alt="Easygenerator Logo"
            className="h-16 mx-auto"
          />
          <h1 className="text-3xl  font-bold text-slate-900">{title}</h1>
          <p className="text-slate-600 ">{subtitle}</p>
        </div>
        {children}
        {footer && <div className="pt-4">{footer}</div>}
      </div>
    </div>
  );
}
