import { ArrowRight } from "lucide-react";
interface SubmitBtnProps {
  submitState: boolean;
  loadingTitle?: string;
  title: string;
  
}
export function SubmitBtn({
  submitState,
  loadingTitle="loading",
  title="Submit",
}: SubmitBtnProps) {
  return (
    <div className="pt-2 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200">
      <button
        type="submit"
        disabled={submitState }
        className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all group"
      >
        <span className="flex items-center justify-center gap-2">
          {submitState ? loadingTitle  : <>{title} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
          }
       
        </span>
      </button>
    </div>
  );
}