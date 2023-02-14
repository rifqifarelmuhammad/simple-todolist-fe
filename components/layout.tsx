import axios from 'axios';
import Card from './card';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext'
import { Todolist } from '../models/todolist'

export default function Layout(props: { children: any }){
    const [todo, setTodo] = useState<Todolist[]>();
    const {user} = useAuth()
    
    useEffect(() => {
        axios.get('api/todolist').then((response) => {
            if (response.data.length > 0){
                let todolist: Todolist[] = []
                for (let i = 0; i < response.data.length; i++){
                    if (response.data.at(i).uId == user.uid){
                        todolist.push(response.data.at(i))
                    }
                }
                setTodo(todolist)
            }else{
                setTodo(response.data)
            }
        })
    }, [todo]);
    
    return (
        <div>
            <div className="grid gap-4 grid-cols-1 sm:grid-flow-cols-1 md:grid-cols-3 lg:grid-cols-4 m-4" id="todo">
                {todo?.map((t, idx: number) => (
                    <Card title={t.title} isFinished={t.isFinished} id={t.id} key={idx}/>
                ))}
            </div>
        </div>
    )

}