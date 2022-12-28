import style from './TaskTable.module.css'
import clipBoard from '../assets/clipboard.svg'

import { Tasks } from './Tasks'

interface AllTask {
    id: string;
    task: string;
    status: boolean;
}


interface TaskProps {
    allTask:AllTask[];
    
    toRemoveTask: (taskId: string) => void;
    updateTask: (taskId: string, currentStatus:boolean) => void;
}


export function TaskTable ({ allTask, toRemoveTask, updateTask }: TaskProps) {

    function deleteTask(taskId: string){
        toRemoveTask(taskId)
    }

    function handleUpdateTask(taskId: string, currentStatus:boolean){
        updateTask(taskId, currentStatus);
        
    }

    const taskCompleted = allTask.reduce( ( prev, current) =>{
        current.status === true ? prev += 1 : prev+=0
        return prev
    },0)    
    const amountCompletedTask = taskCompleted > 0
    ? `${taskCompleted} de ${allTask.length}`
    : taskCompleted

    return(

        <section>

            <div className={style.table}>

                <div className={style.taskHeader}>
                        
                    <div className={style.created}>

                        Tarefas Criadas
                        <span>{allTask.length}</span>

                    </div>

                    <div className={style.completed}>

                        Concluidas
                        <span>{amountCompletedTask}</span>

                    </div>

                </div>

                <div className={style.taskList}>
                {
                    allTask.length == 0
                    ?
                        <div>
                            <div className={style.emptyList}>
                                <img src={clipBoard} alt="clipboard-icon" />
                            </div>
                            <footer>
                                <p>Você ainda não tem tarefas cadastradas</p>
                                <p>Crie tarefas e organize seus itens a fazer</p>
                            </footer>
                        </div>
                        
                    :
                        allTask.map(task => {
                            return(
                                <Tasks 
                                    key={task.id}
                                    taskId={task.id}
                                    describ={task.task}
                                    status={task.status}
                                    onDeleteTask={deleteTask}
                                    updateTaskStatus={handleUpdateTask}

                                />
                            )}
                        )
                    }
                    
                </div>

            </div>

        </section>
    )
}