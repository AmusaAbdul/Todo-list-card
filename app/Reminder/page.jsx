"use client"
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "next/navigation"


const page = () => {
  const image = "data:image/jpeg;base64,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"


  const router = useRouter()
  const {darkMode, setDarkMode, tasks,  filter, setFilter, setCategory, category} = useTheme()
  const today = new Date().toISOString().split("T")[0];
  const futureTasks = tasks.filter(
    (t) => t.date > today && !t.completed 
  );
  const filteredFutureTasks = filter === "All" ?  futureTasks : futureTasks.filter(upComing => upComing.category === filter)
  const filterCategory = {
    Personal: "P",
    Work: "W",
    Wishlist: "WL"
  }

  function getTimeRemaining(targetDate) {
    const now = new Date()
    const future = new Date(targetDate)
    const diff = future - now 

    if (diff <= 0) return "Time's up"
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    if (days < 2) return " Tomorrow"

    return  `${days}d ${hours}h ${minutes}m`

  }



  return (
    <div>
      <div className="flex items-center justify-between p-3 gap-1">
        <button onClick={() => router.push("/")} className="text-xl font-bold">REMINDER</button>
        <button onClick={() => setDarkMode(!darkMode)}> {darkMode ? "☀️" : "🌙"}</button>
      </div>

      <div className="mt-5 mb-8 flex flex-col gap-5">
        <button onClick={() => router.push("/")} className=" bg-amber-50 dark:bg-blue-950 text-sm rounded-full h-7 p-2 w-full outline-none" type="button"></button>
        <div className="flex gap-5 flex-wrap ">
          <button onClick={() => setFilter("All")} value="All" className={`${filter === "All" ? "bg-blue-950 dark:bg-amber-50  text-white dark:text-blue-950" : "bg-amber-50 dark:bg-blue-950"} p-3 rounded-full text-[0.8rem]`}>All</button>
          <button onClick={() => (setFilter("Work"), setCategory("Work"))} value="Work" className={`${filter === "Work" ? "bg-blue-950 dark:bg-amber-50  text-white dark:text-blue-950" : "bg-amber-50 dark:bg-blue-950"} p-3 rounded-full text-[0.8rem]`}>Work</button>
          <button onClick={() => (setFilter("Personal"), setCategory("Personal"))} value="Personal" className={`${filter === "Personal" ? "bg-blue-950 dark:bg-amber-50  text-white dark:text-blue-950" : "bg-amber-50 dark:bg-blue-950"} p-3 rounded-full text-[0.8rem]`}>Personal</button>
          <button onClick={() => (setFilter("Wishlist"), setCategory("Wishlist"))} value="Wishlist" className={`${filter === "Wishlist" ? "bg-blue-950 dark:bg-amber-50  text-white dark:text-blue-950" : "bg-amber-50 dark:bg-blue-950"} p-3 rounded-full text-[0.8rem]`}>Wishlist</button>
        </div>
      </div>

      {tasks.length === 0 ? 
        <div className="flex min-h-screen items-center justify-center flex-col">
        <img src={image} className="rounded-full h-35 w-35" alt="No todo" />
        <h1 className="flex justify-center items-center text-xl">No todo</h1>
        <p className="text-sm">Navigate to the todo page and create one</p>
      </div> :
      <div className="flex flex-wrap gap-3">
        {filteredFutureTasks.map((t) => {
          const diff = new Date(t.date) - new Date()
          const days = Math.floor(diff / (1000 * 60 * 60 * 24))
          return(
            <div key={t.id} id="reminderBox" className={`${days < 2 ? "bg-red-500" : days < 5 ? "bg-yellow-500" : "bg-green-500"} p-3 text-xs rounded-2xl`}>
              <p >{t.text} ({filterCategory[t.category]})</p>
              <p className="flex justify-end mt-5">Due {days < 2 ? "" : "in"} {getTimeRemaining(t.date)}</p>
            </div> 
          )
        })}
      </div> 
      } 
    </div>
  )
}




export default page
