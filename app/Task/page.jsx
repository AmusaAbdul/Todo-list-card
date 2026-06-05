"use client"
import { useTheme } from "../context/ThemeContext";
import {useRouter} from "next/navigation"

export default function page() {
    const router = useRouter()
    const { edit, notes, setNote, note, setNotes, setEdit, date, setDate, category, setCategory, darkMode, setDarkMode, filter, setFilter, filteredTask, task, setTask, tasks, setTasks } = useTheme();

    function handleTask(e) {
        e.preventDefault()
        if (!task.trim() || !date) {
            alert("Input fields are empty")
            return
        }  
        const newTodo =
            task
                .split("\n")
                .map(t => t.trim())
                .filter(t => t !== "")
                .map(t => ({
                    id: crypto.randomUUID(), date: date, noText: "No text",
                    text: t, category: category, completed: false
                }))
        setTasks((prev) => [...prev, ...newTodo])
        setTask("")
        setDate("")
    }

    function handleNote(e) {
        e.preventDefault()
        if (!note.trim()) return 
        const newNotes = {text: note, id: crypto.randomUUID()}
        setNotes(prev => [...prev, newNotes]);
        setNote("") 
    }

    const toggleComplete = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    
    function deleteItem(index) {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?" );
        if (confirmDelete) {
            setTasks((prev) => prev.filter((t) => t.id !== index));
        }
    }

    function deleteNote(index) {
        const confirmDeleteNote = window.confirm("Are you sure you want to delete this note")
        if (confirmDeleteNote) {
            setNotes(prev => prev.filter(n => n.id !== index))
        }
    }

    const handleSave = (id) => {
        if (!task.trim()) return;

        setTasks(prev =>
            prev.map(t =>
                t.id === id ? { ...t, text: task } : t
            )
        );

        setEdit(null);
        setTask("");
    };

    const handleSaveNote = (id) => {
        if (!note.trim()) return
        setNotes(prev => prev.map(n => n.id === id ? {...n, text: note} : n))
        setEdit(null)
        setNote("")
    }
    const getWordCount = note.length
    const getTodoCount = task.length

    const today = new Date().toISOString().split("T")[0];

    const todayTasks = tasks.filter(
        (t) => t.date === today && !t.completed
    );


    const futureTasks = tasks.filter(
        (t) => t.date > today && !t.completed
    );

    const completedTasks = tasks.filter((t) => t.completed);

    const overdueTasks = tasks.filter(
        (t) => t.date < today && !t.completed
    );

    const filterCategory = {
        Personal: "P",
        Work: "W",
        Wishlist: "WL"
    }

    

    return (
        <div>
            <div className="flex items-center justify-between p-3 gap-1">
                <button onClick={() => router.push("/")} className="text-xl font-bold">TASK</button>
                <button onClick={() => setDarkMode(!darkMode)}> {darkMode ? "☀️" : "🌙"}</button>
            </div>
            <div className="mt-5 flex flex-col gap-5">
                <button onClick={() => router.push("/")} className=" bg-white dark:bg-blue-950 text-sm rounded-full h-7 p-2 w-full outline-none" type="button"></button>
                <div className="flex gap-5 flex-wrap ">
                    <button onClick={() => setFilter("All")} value="All" className={`${filter === "All" ? "bg-blue-950 dark:bg-amber-50  text-white dark:text-blue-950" : "bg-amber-50 dark:bg-blue-950"} p-3 rounded-full text-[0.8rem]`}>All</button>
                    <button onClick={() => (setFilter("Work"), setCategory("Work"))} value="Work" className={`${filter === "Work" ? "bg-blue-950 dark:bg-amber-50  text-white dark:text-blue-950" : "bg-amber-50 dark:bg-blue-950"} p-3 rounded-full text-[0.8rem]`}>Work</button>
                    <button onClick={() => (setFilter("Personal"), setCategory("Personal"))} value="Personal" className={`${filter === "Personal" ? "bg-blue-950 dark:bg-amber-50  text-white dark:text-blue-950" : "bg-amber-50 dark:bg-blue-950"} p-3 rounded-full text-[0.8rem]`}>Personal</button>
                    <button onClick={() => (setFilter("Wishlist"), setCategory("Wishlist"))} value="Wishlist" className={`${filter === "Wishlist" ? "bg-blue-950 dark:bg-amber-50  text-white dark:text-blue-950" : "bg-amber-50 dark:bg-blue-950"} p-3 rounded-full text-[0.8rem]`}>Wishlist</button>
                    <button onClick={() => (setFilter("Note"), setCategory("Note"))} value="Note" className={`${filter === "Note" ? "bg-blue-950 dark:bg-amber-50  text-white dark:text-blue-950" : "bg-amber-50 dark:bg-blue-950"} p-3 rounded-full text-[0.8rem]`}>Note</button>
                </div>
            </div>

            <form disabled={!task.trim() || !date} onSubmit={handleTask} className={`${filter === "All" ? "hidden" : ""} ${filter === "Note" ? "hidden" : ""} bg-amber-50 dark:bg-blue-950 mt-10 p-3 flex flex-col gap-2 rounded-4xl`}>
                <div className={`flex flex-col relative gap-3 ${filter === "All" ? "hidden" : ""} ${filter === "Note" ? "hidden" : ""}`}>
                    <textarea value={task} onChange={(e) => setTask(e.target.value)} required placeholder="Enter todo" type="text" className={`border-2 text-[0.8rem] w-full  outline-none border-blue-950 dark:border-blue-900 p-3`} />
                    <button type="submit" className={`absolute text-[0.8rem] right-2 bottom-2 p-1 w-15 text-center ${!task.trim() || !date
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-950 text-amber-50 dark:bg-amber-50 dark:text-blue-950"
                        }`}>
                        Add
                    </button>
                    <div className="flex justify-between">
                        {(!task.trim() || !date) && (
                            <p className="text-xs text-red-400">
                                Please enter todo and date
                            </p>
                        )}
                        <p className="text-xs ">({getTodoCount} {getTodoCount === 0 ? "word" : "words"})</p>
                    </div>
                    <input
                        type="date"
                        value={date}
                        required
                        onChange={(e) => setDate(e.target.value)}
                        className="border-2 border-blue-950 text-[0.8rem] dark:border-blue-900 p-2 w-fit"
                    />
                </div>
                <ol className="list-decimal mt-5 flex flex-col gap-2 overflow-y-auto max-h-80">
                    {filteredTask.map((t, index) => (
                        <div key={index} className="">
                            <div className={`flex pl-10 flex-col gap-5 text-[0.8rem]  bg-white dark:bg-blue-950 shadow-sm border border-gray-200 dark:border-blue-900 rounded-2xl p-4 hover:shadow-md transition justify-between`}>
                                {edit === t.id ?
                                    <div className="flex flex-col gap-2">
                                        <textarea className={`border-2 text-[0.8rem] h-40 w-full flex-1 outline-none border-blue-950 dark:border-blue-900 p-3`}
                                            type="text" value={task} onChange={(e) => setTask(e.target.value)} />
                                        <button onClick={() => handleSave(t.id)} className="bg-green-500 text-white p-1 font-light hover:bg-green-700">Save</button>
                                    </div> :
                                    <li className={`${t.completed ? "line-through " : ""} `}> {t.text}</li>
                                }
                                <hr className="text-blue-900" />
                                <div className="flex gap-2">
                                    <button onClick={() => { setTask(t.text), setEdit(t.id) }} className="bg-green-500 text-white p-1 font-light hover:bg-green-700">Edit</button>
                                    <input checked={t.completed ?? false} onChange={() => toggleComplete(t.id)} type="checkbox" />
                                    <button onClick={() => deleteItem(t.id)} key={index} className="bg-red-500 text-amber-50 p-1 font-light hover:bg-red-700">Del</button>
                                </div>

                            </div>
                        </div>                        
                    ))}
                </ol>
            </form>
            <div className={`${filter === "Wishlist" || filter === "Personal" || filter === "Work"  || filter === "Note" ? "hidden" : ""}`} >
                <div className="bg-amber-50 text-[0.8rem] dark:bg-blue-950 mt-10 p-3 flex flex-col gap-2 rounded-4xl">
                    <h1>Today's Todo</h1>
                    {tasks.length === 0 ? 
                    (<p className="bg-white dark:bg-blue-950 shadow-sm border border-gray-200 dark:border-blue-900 rounded-2xl p-2 hover:shadow-md transition">
                        No todo, Navigate to the category of todo you want and input a todo
                    </p>) : ( todayTasks.map((t, index) => (
                        <p className="bg-white dark:bg-blue-950 shadow-sm border border-gray-200 dark:border-blue-900 rounded-2xl p-2 hover:shadow-md transition" key={index}>
                            {t.text}  ({filterCategory[t.category]})
                        </p>
                    )))}
                </div>
                <div className="bg-amber-50 text-[0.8rem] dark:bg-blue-950 mt-10 p-3 flex flex-col gap-2 rounded-4xl">
                    <h1>Future Todo</h1>
                    {tasks.length === 0 ? 
                    <p className = "bg-white dark:bg-blue-950 shadow-sm border border-gray-200 dark:border-blue-900 rounded-2xl p-2 hover:shadow-md transition">
                        No todo!
                    </p> : futureTasks.map((t, index) => (
                        <p className="bg-white dark:bg-blue-950 shadow-sm border border-gray-200 dark:border-blue-900 rounded-2xl p-2 hover:shadow-md transition" key={index}>
                            {t.text} ({filterCategory[t.category]})
                        </p>
                    ))}
                </div>
                <div className="bg-amber-50 text-[0.8rem] dark:bg-blue-950 mt-10 p-3 flex flex-col gap-2 rounded-4xl">
                    <h1>Completed Today</h1>
                    {tasks.length === 0 ? 
                    <p className="bg-white dark:bg-blue-950 shadow-sm border border-gray-200 dark:border-blue-900 rounded-2xl p-2 hover:shadow-md transition">
                        No  todo!
                    </p> : completedTasks.map((t, index) => (
                        <p className="bg-white dark:bg-blue-950 shadow-sm border border-gray-200 dark:border-blue-900 rounded-2xl p-2 hover:shadow-md transition" key={index}>
                            {t.text} ({filterCategory[t.category]})
                        </p>
                    ))}
                </div>
                <div className="bg-amber-50 text-[0.8rem] dark:bg-blue-950 mt-10 p-3 flex flex-col gap-2 rounded-4xl">
                    <h1>Overdue Todo</h1>
                    {tasks.length === 0 ? 
                        <p className="bg-white dark:bg-blue-950 shadow-sm border border-gray-200 dark:border-blue-900 rounded-2xl p-2 hover:shadow-md transition">
                        No  todo!
                    </p> : overdueTasks.map((t, index) => (
                        <p className="bg-white dark:bg-blue-950 shadow-sm border border-gray-200 dark:border-blue-900 rounded-2xl p-2 hover:shadow-md transition" key={index}>{t.text} ({filterCategory[t.category]})</p>
                    ))}
                </div>
            </div>
            <div className={` mt-10 ${filter === "All" || filter === "Personal" || filter === "Work" || filter === "Wishlist" ? "hidden" : ""}`}>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} className={`border-2 text-[0.8rem] w-full h-40 flex-1 outline-none border-blue-950 dark:border-blue-900 p-3`} name="note" id="note"/>
                <div className="flex justify-between mt-2">
                    {(!note) && (<p className="text-xs text-red-400 ">Textarea's empty</p>)}
                    <p className="text-xs ">({getWordCount} {getWordCount === 0 ? "word" : "words"})</p>
                </div>
                <div className="flex justify-end w-full mt-2">
                    <button type="button" onClick={handleNote} 
                        className={`${!note.trim() ?
                        "bg-gray-400 cursor-not-allowed" : 
                        "bg-blue-950 text-amber-50 dark:bg-amber-50 dark:text-blue-950"}  text-white p-1 text-sm font-light`}>
                            Save
                    </button>
                </div>
                <ul className="mt-5 flex flex-col gap-2  "> 
                    {notes.map((n) => (
                        <div key={n.id} className="flex flex-col gap-2">
                            <li  className={`text-[0.8rem]  bg-white dark:bg-blue-950 shadow-sm border border-gray-200 dark:border-blue-900 rounded-2xl p-4 hover:shadow-md transition justify-between`}>
                                {edit === n.id ? 
                                    <div className="flex flex-col gap-2">
                                        <textarea className={`border-2 text-[0.8rem] w-full flex-1 outline-none h-40 border-blue-950 dark:border-blue-900 p-3`}
                                        type="text" value={note} onChange={(e) => setNote(e.target.value)} />
                                        <button type="button" onClick={() => handleSaveNote(n.id)} className="bg-green-500 text-white p-1 font-light hover:bg-green-700">Save</button>
                                    </div> :
                                  <span>{n.text}</span>}
                                <div className="flex justify-end  mt-5 gap-3">
                                    <button onClick={() => (setNote(n.text), setEdit(n.id))} className="bg-green-500 text-amber-50 p-1 text-sm font-light hover:bg-green-700">Edit</button>
                                    <button onClick={() => deleteNote(n.id)} className="bg-red-500 text-sm text-amber-50 p-1 font-light hover:bg-red-700">Del</button>
                                </div>
                            </li>
                        </div>
                        
                    ))}
                </ul>
            </div>
        </div>
    )
}




