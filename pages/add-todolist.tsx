import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios';
import { useAuth } from '../contexts/authContext'

export default function Add() {
    const router = useRouter()
    const [data, setData] = useState('')
    const {user } = useAuth()

    const handleinput = (obj: any) => {
        setData(obj.target.value);
    }

    const handleSubmit = () => {
        if (data != ""){
            axios.post(`api/todolist/add-data`, {
                'title': data,
                'isFinished': false,
                'uId': user.uid
            }).then(function (response) {
                router.push('/')
            }).catch(function (err){
                console.log(err)
            })
        }
    }

    return(
        <section className="min-h-screen flex flex-col items-center justify-center sm:min-h-screen">
        <div className="bg-purple-500 rounded-2xl shadow-lg max-w-3xl p-5">
            <h1 className='font-bold mb-7'>ADD NEW TODO</h1>
                <div className="">
                    <h2 className='mb-1'>Title:</h2>
                    <div className="flex flex-col justify-between">
                    <input className='form-control text-sm rounded-lg p-2 w-full' type="text" value={data} onChange={(obj) => handleinput(obj)}></input>
                    <div className='flex justify-between'>
                        <button onClick={ () => handleSubmit() } className="cursor-pointer mt-4 mr-2 p-2 bg-red-100 rounded-lg w-full text-[#3F0071] font-bold">Add</button>
                        <button onClick={() => router.push('/')} className="cursor-pointer mt-4 p-2 bg-red-100 rounded-lg w-full text-[#3F0071] font-bold">Back</button>
                    </div>
                </div>
            </div>
        </div>
        </section>
    )
}