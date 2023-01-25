import { useAuth } from '../contexts/authContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export default function Signup() {
    const { user, signup } = useAuth()
    const [data, setData] = useState({
        email:'',
        password:''
    })
    const router = useRouter()


    const handleSignup = async (e:any) => {
        e.preventDefault()

        try{
            await signup(data.email, data.password)
            router.push('/login')
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
                    <h1 className="text-xl font-bold text-white text-center">Sign Up</h1>
                    <form method="POST" action="" className="mt-4" onSubmit={handleSignup}>
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
                                    <td><input className="mt-4 p-2 bg-red-100 rounded-lg w-full text-[#3F0071] font-bold" type="submit" value="Create Account"></input></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <div className="mt-4">
                        <span className="text-white">
                            Already have an account? <Link href={ '/login' } className="underline font-bold">Log in</Link>
                        </span>
                    </div>
                </div>
            </section>
        </div>
    )
}