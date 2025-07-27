import { Sprout } from "lucide-react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <div className="text-center">
        <div className="w-18 h-18 p-5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
          {/* <div className="w-8 h-8 bg-white rounded-lg"> */}
          <Image src="/logo.png" alt="Logo" width={50} height={50} className="w-full h-full rounded-lg" />
            {/* <Sprout className="h-10 w-10 text-white" /> */}
          {/* </div> */}
        </div>
        <p className="text-slate-600 animate-bounce">Loading...</p>
      </div>
    </div>
  )
}