"use client"
import Link from "next/link";


const List = () => {

     const links = [
        {id: 1, name: "Create Task",  path: "/Task", paragraph: "Input tasks, wishlist and repetitive tasks" },
        {id: 2, name: "Task Reminder", path: "/Reminder", paragraph: "Set reminders and never miss important things " },
        {id: 3, name: "Personalized Widget", path: "/Widget", paragraph: "Create widget and view your task more easily" },
        {id: 4, name: "Custom Themes", path: "/Themes", paragraph: "Pick a theme, begin wonderfully" },
    ];

  return (
    <div className="flex flex-col gap-5 mt-10">
        {links.map((nav) => (
            <Link   className="bg-amber-50 dark:bg-blue-950 p-2 rounded-full flex justify-between items-center " key={nav.id} href={nav.path}>
                <div className="flex gap-2  items-center">
                    <div className={`w-10 h-10 rounded-full ${nav.id === 2 ? "bg-red-500" :
                        nav.id === 1 ? "bg-green-500" :
                            nav.id === 3 ? "bg-purple-500" :
                                "bg-blue-400"} `}>
                    </div>
                    <div>
                        <h1 className="text-[0.9rem]">{nav.name}</h1>
                        <p className="text-[0.7rem]">{nav.paragraph}</p>
                    </div>
                </div>
                <button className="hidden sm:flex">&#9655;</button>
            </Link>
        ))}
    </div>
  )
}

export default List
