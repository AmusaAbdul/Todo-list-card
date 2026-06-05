"use client"
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "next/navigation"


const page = () => {

  const router = useRouter()
  const {darkMode, setDarkMode} = useTheme()
  return (
    <div>
      <div className="flex items-center justify-between p-3 gap-1">
        <button onClick={() => router.push("/")} className="text-xl font-bold">REMINDER</button>
        <button onClick={() => setDarkMode(!darkMode)}> {darkMode ? "☀️" : "🌙"}</button>
      </div>
    </div>
  )
}

export default page
