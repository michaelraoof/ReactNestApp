import { LogOut } from "lucide-react";
import { useEffect } from "react";
import { useUserStore } from "../stores/store";

import Confetti from "react-confetti";

export default function Home() {
  const { user, signOut, loadProfile, loading } = useUserStore(
    (state) => state
  );

  useEffect(() => {
    loadProfile();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen   bg-gradient-to-br  from-orange-50 via-white to-slate-50  flex items-center justify-center">
        <div className="text-center  ">
          <div className="  animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-slate-600 ">loading</p>
        </div>
      </div>
    );
  }
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-slate-50">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={50}
        gravity={0.1}
      />
      <header className="bg-white shadow-sm animate-slide-up ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={"/logo.png"} alt="easygenerator logo" className=" h-10" />
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 hover:bg-orange-50 hover:text-orange-600
             hover:border-orange-200 transition-colors p-4 rounded-xl  cursor-pointer"
          >
            <LogOut className="h-4  w-4 " />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl  mx-auto px-4 sm:px-6  lg:px-8 py-12">
        <div className="mb-12   animate-fade-in-up  animation-delay-100">
          <h1 className="text-slate-900  mb-2">Welcome back {user.name}</h1>
        </div>
      </main>
    </div>
  );
}
