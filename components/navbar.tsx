import { useAuth } from "../contexts/authContext";
import Link from "next/link";

export default function Header() {
    const { user, logout } = useAuth()

    const handleLogout = async () => {
        try {
            await logout()
        } catch (err) {
            console.log(err);
        }
    }

    const uEmail = 'Hello ' + user.email + "!";

    return (
        <div>
            <nav className="flex justify-between mb-10 mt-1 ml-1 mr-1">
                <div dangerouslySetInnerHTML={{__html:uEmail}} className="text-4xl font-bold text-black h-50" />
                <div className="flex gap-2 font-semibold">
                    {user ? (
                        <div className="flex justify-between items-center">

                            <div
                                className="p-2 mr-3 bg-fuchsia-800 rounded-lg w-fit text-white text-sm px-8 md:py-3 lg:py-3 py-9">
                                <button><Link href={"/add-todolist"}>Add Todo</Link></button>
                            </div>
                            <div
                                className="p-2 bg-rose-800 rounded-lg w-fit text-white text-sm px-8 md:py-3 lg:py-3 py-9">
                                <button onClick={handleLogout}><Link href={"/login"}>Logout</Link></button>
                            </div>
                        </div>
                    ) : (<div
                        className="p-2 bg-gradient-to-r from-red-500 to-[#3F0071] rounded-lg w-fit text-white text-sm px-7 md:py-3 lg:py-3 py-9">
                        <button><Link href={"/login"}>Login</Link></button>
                    </div>)}
                </div>
            </nav>
        </div>
    )
}