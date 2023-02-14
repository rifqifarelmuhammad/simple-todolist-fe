import axios from 'axios';

export default function Card({ title, isFinished, id }: { title: string, isFinished: boolean, id: number }) {
    const color = isFinished ? "bg-amber-300" : "bg-teal-600";
    
    const handleDelete = (todoId: number) => {
        axios.delete(`api/todolist/delete-data/${todoId}`)
    }

    const handleUpdate = (todoId: number) => {
        axios.put(`api/todolist/update-data/${todoId}`, {
            'isFinished': !isFinished
        }).then(function (response) {
            
        }).catch(function (err) {
            console.log(err);
        });
    }

    return (
        <div className="w-full transform transition duration-500 hover:scale-105" id="task-${data.pk}">
            <div className={"rounded-3xl p-4 " + color}>
                <div className="flex justify-between">
                    <span className="font-bold text-lg">{title}</span>
                </div>
                <div className="flex justify-center mt-6">
                    <button className='cursor-pointer bg-indigo-300 rounded-lg w-fit px-2' onClick={() => handleUpdate(id)}>Update</button>
                    <button className='ml-3 bg-red-600 rounded-lg w-fit px-2' onClick={() => handleDelete(id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}