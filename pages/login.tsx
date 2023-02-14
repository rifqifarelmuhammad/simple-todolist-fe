import { useAuth } from '../contexts/authContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export default function Login() {
    const router = useRouter()
    const {user, login} = useAuth()
    const [data, setData] = useState({
        email:'',
        password:''
    })
    
    const handleLogin =async (e:any) => {
        e.preventDefault()
        try{
            await login(data.email, data.password)
            router.push('/')
        } catch (err) {
            console.log(err)
        }
    }

    const handlePassword = (e:any) => {
        setData({
            ...data,
            password: e.target.value,
        })
    }
    const handleEmail = (e:any) => {
        setData({
            ...data,
            email: e.target.value,
        })
    }

    return (
        <div>
            <section className="min-h-screen flex flex-col items-center justify-center sm:min-h-screen">
                <div className="login bg-gradient-to-r from-violet-900 to-indigo-500 rounded-2xl shadow-lg max-w-3xl p-5">
                    <h1 className="text-xl font-bold text-white text-center">Login</h1>
                    <form method="POST" action="" className="mt-4" onSubmit={handleLogin}>
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="text-slate-50">Email</td>
                                </tr>
                                <tr>
                                    <td><input onChange={handleEmail} value={data.email} required type="text" name="email" placeholder="Email" className="form-control text-sm rounded-lg p-2 w-full"></input></td>
                                </tr>

                                <tr>
                                    <td className="text-slate-50 mt-2">Password</td>
                                </tr>
                                <tr>
                                    <td><input onChange={handlePassword} value={data.password} type="password" name="password" placeholder="Password" required className="form-control text-sm rounded-lg p-2 w-full"></input></td>
                                </tr>

                                <tr>
                                    <td><input className="mt-4 p-2 bg-red-100 rounded-lg w-full text-[#3F0071] font-bold" type="submit" value="Login"></input></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <p className="mt-1 text-slate-50">
                        Don&apos;t have an account yet? <Link href={ '/signup' } className="underline font-bold">Sign up</Link>
                    </p>
                </div>
            </section>
        </div>
    )
}