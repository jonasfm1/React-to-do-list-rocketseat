import { Trash } from 'phosphor-react'
import { ChangeEvent } from 'react';
import style from './Tasks.module.css'

interface Task{
    taskId: string;
    describ: string;
    status: boolean;
    onDeleteTask: (taskId: string) => void;
    updateTaskStatus: (taskId: string, currentStatus: boolean) => void;
}



export function Tasks({ taskId, describ, status, onDeleteTask, updateTaskStatus }: Task){
    
    function handleDeleteTask(){
        onDeleteTask(taskId)
    }

    function completedTask(event: ChangeEvent<HTMLInputElement>){
        const currentStatus = event.target.checked
        updateTaskStatus(taskId,currentStatus)
    }

    return(
        
        <li data-identify={taskId} className={style.description}>

            <input type="checkbox" onChange={completedTask} checked={status}/>

            {describ}
            
            <div className={style.trash}>
                <button onClick={handleDeleteTask}>
                    <Trash size={24} color="#808080" />
                </button>
            </div>
        </li>
    )
}
