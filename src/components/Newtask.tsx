import { v4 as uuidv4} from 'uuid'

import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, useState } from 'react'

import style from './Newtask.module.css'
import { TaskTable } from './TaskTable'


interface Task {
    id: string;
    task: string ;
    status: boolean ;
}

interface TaskList {
    taskList:Task;
    id:string;
}


export function Newtask(){

    const [task, setTask] = useState({})

    const [taskList, setTaskList] = useState<TaskList[]>([])


    function addNewTask(event: ChangeEvent <HTMLInputElement> ){

        let newTask = {
            id: uuidv4(),
            task: event.target.value,
            status: false,
        }
        setTask(newTask)
    }

    function submitNewTask(event: FormEvent){
        event.preventDefault();
        setTaskList([...taskList, task])

        setTask({task:''})
    }

    function removeTaskOfList(taskId: string){
        const removeFromTheList = taskList.filter(task => {
            return task.id !== taskId
        })

        setTaskList(removeFromTheList)   
    }

    function updateTaskIsComplete(taskId: string, currentStatus: boolean){
        const updateTaskStatus = taskList.map( task => {
            if(task.id === taskId){
                return {...task, status:currentStatus}
            }
            return task
        })
        setTaskList(updateTaskStatus);
        
    }

    return(
        <section>

            <form onSubmit={submitNewTask} >

                <div className={style.search}>

                    <input
                        onChange={addNewTask}
                        className={style.input}
                        type="text"
                        value={task.task || ''}
                        placeholder='Adicione uma nova tarefa'
                        required
                    />
                    
                    <button>
                        Criar
                        <PlusCircle size={16} />
                    </button>
                    
                </div>

            </form>

            <TaskTable
                allTask={taskList}
                toRemoveTask={removeTaskOfList}
                updateTask={updateTaskIsComplete}
            />

        </section>
    )
}