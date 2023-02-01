import { useAuth } from "../contexts/authContext";
import Link from "next/link";
import axios from "axios";;
import Image from "next/image";
import { useState, useEffect } from 'react';
import cloudinary, { v2 } from 'cloudinary'

// cloudinary.v2.config

export default function Header() {
    const { user, logout } = useAuth()
    const [ avatar, setAvatar ] = useState<string>()

    const handleLogout = async () => {
        try {
            await logout()
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        axios.get('api/avatar').then(function (response) {
            for (let i = 0; i < response.data.length; i++){
                if (response.data.at(i).uId == user.uid){
                    setAvatar(response.data.at(i).url);
                    break;
                }
            }
            console.log(avatar)
        }).catch(function (err){
            console.log(err)
        })
    })

    const imageLoader = ({src}) => {
        return src
    }

    const uEmail = 'Hello ' + user.email + "!";

    return (
        <>
        <div>
            <nav className="flex justify-between mb-10 mt-1 ml-1 mr-1">
                <div className="flex gap-2 font-semibold">
                    <Image loader={imageLoader} src={avatar || "https://res.cloudinary.com/decwxgqs5/image/upload/v1675212347/my-uploads/ajgxzxl6mx8osx5zuioe.png"} width={50} height={50} alt="avatar" />
                    {/* {(avatar == undefined)?<Image loader={imageLoaderDefault} src={avatar || "avatar-default.png"} width={50} height={50} alt="avatar" />
                    :<div></div>} */}
                    <div dangerouslySetInnerHTML={{__html:uEmail}} className="text-4xl font-bold text-black h-50" />
                </div>
                <div className="flex gap-2 font-semibold">
                    {user ? (
                        <div className="flex justify-between items-center">
                            <div
                                className="p-2 mr-3 bg-green-600 rounded-lg w-fit text-white text-sm px-8 md:py-3 lg:py-3 py-9">
                               <button><Link href={"/update-avatar"}>Update Avatar</Link></button>
                            </div>
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
        
        <div id="defaultModal" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
            <div className="relative w-full h-full max-w-2xl md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Terms of Service
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                        </p>
                    </div>
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                        <button data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}