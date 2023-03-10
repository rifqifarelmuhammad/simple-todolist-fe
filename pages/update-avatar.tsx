import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuth } from '../contexts/authContext'
import Image from "next/image";

export default function Add() {
    const router = useRouter()
    const [ avatar, setAvatar ] = useState<string>()
    const {user } = useAuth()
    const [ file, setFile ] = useState<File>()
    const [ image, setImage ] = useState<string>()

    useEffect(() => {
        axios.get('api/avatar').then(function (response) {
            for (let i = 0; i < response.data.length; i++){
                if (response.data.at(i).uId == user.uid){
                    setAvatar(response.data.at(i).file.slice(7))
                    break;
                }
            }
        }).catch(function (err){
            console.log(err)
        })
    })
    
    const handleDelete = async (uId: string) => {
        await axios.delete(`api/avatar/delete-avatar/${uId}`).then(function (response){
            router.push('/')
        }).catch(function (err){
            console.log(err)
        })
    }

    const onFileChange = (fileChangeEvent: any) => {
        setFile(fileChangeEvent.target.files[0])
        if (fileChangeEvent.target.files[0] != undefined){
            setImage(URL.createObjectURL(fileChangeEvent.target.files[0]))
        }else{
            setImage(undefined)
        }
    }

    const submitForm = async () =>{
        if (file == undefined){
            alert('Please select a file!')
        }else{
            let formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', 'my-uploads');
            try {
                let publicId = ""
                let url = ""
                await axios.post("https://api.cloudinary.com/v1_1/decwxgqs5/image/upload", formData).then(function (response){
                    publicId = response.data['public_id']
                    url = response.data['secure_url']
                }).catch(function (response){
                    console.log(response)
                })
                
                await axios.post(`api/avatar/post-avatar`, {
                    "uId": user.uid,
                    "public_id": publicId,
                    "url": url
                }).then(function (response){
                    router.push('/')
                }).catch(function (response){
                    console.log(response)
                })
            }catch (err){
                console.log(err)
            }
        }
    }

    const updateForm = async (uId: string) =>{
        if (file == undefined){
            alert('Please select a file!')
        }else{
            let formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', 'my-uploads');
            try {
                let publicId = ""
                let url = ""
                await axios.post("https://api.cloudinary.com/v1_1/decwxgqs5/image/upload", formData).then(function (response){
                    publicId = response.data['public_id']
                    url = response.data['secure_url']
                }).catch(function (response){
                    console.log(response)
                })
                
                await axios.patch(`api/avatar/update-avatar/${uId}`, {
                    "public_id": publicId,
                    "url": url
                }).then(function (response){
                    router.push('/')
                }).catch(function (response){
                    console.log(response)
                })
            }catch (err){
                console.log(err)
            }
        }
    }

    const imageLoader = ({src}: {src: any}) => {
        return src
    }

    return(
        <div className="min-h-screen flex flex-col items-center justify-center sm:min-h-screen">
            <div className="bg-gray-900 rounded-2xl shadow-lg max-w-3xl p-5">

            <div className="items-center justify-center flex flex-col mb-3">
                <Image loader={imageLoader} src={image || "https://res.cloudinary.com/decwxgqs5/image/upload/v1675212347/my-uploads/ajgxzxl6mx8osx5zuioe.png"} width={50} height={50} alt="avatar" />
            </div>

            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" onChange={ev => onFileChange(ev)}></input>
            <div className='flex justify-between'>
            {(avatar != undefined)? 
            <button onClick={ () => updateForm(user.uid) } className="cursor-pointer mt-4 mr-2 p-2 bg-red-100 rounded-lg w-full text-gray-900 font-bold">Update</button>
            :<button onClick={ () => submitForm() } className="cursor-pointer mt-4 mr-2 p-2 bg-red-100 rounded-lg w-full text-gray-900 font-bold">Add</button>
            }
            <button onClick={() => router.push('/')} className="cursor-pointer mt-4 p-2 bg-red-100 rounded-lg w-full text-[#3F0071] font-bold">Back</button>
            </div>
            {(avatar != undefined)? 
            <button onClick={ () => handleDelete(user.uid) } className="mt-4 cursor-pointer mt-4 p-2 bg-red-700 rounded-lg w-full text-gray-900 font-bold">Delete Avatar</button>
            :<div></div>
            }
            </div>
        </div>
    )
}