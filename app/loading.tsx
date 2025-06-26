import { Sprout } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
          <div className="w-8 h-8 bg-white rounded-lg">
            <Sprout className="h-10 w-10 text-white" />
          </div>
        </div>
        <p className="text-slate-600">Loading...</p>
      </div>
    </div>
  )
}