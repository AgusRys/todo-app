import React, { useState, useContext } from 'react'
import styles from '../assets/TodoCreate.module.css'
import TodoButton from './TodoButton'
import TodosContext from '../context/todos-context'

const TodoCreate = () => {
    const todosCtx = useContext(TodosContext)
    const [newTask, setNewTask] = useState('');
    const [displayError, setDisplayError] = useState(false);

    const inputTaskListener = (event) => {
        setNewTask(event.target.value);
        if (event.target.value) {
            setDisplayError(false);
        }
    }

    const createNewTask = (event) => {
        event.preventDefault();
        if(!newTask) {
            setDisplayError(true);
            return
        }
        setDisplayError(false);
        todosCtx.createNewTask(newTask.toUpperCase());
        setNewTask('');
    }

    return (
        <div className={styles.container} >
            <h3>Create New <span>Task</span></h3>
            <h6>Task Name</h6>
            <form onSubmit={createNewTask}>
                <input
                    className={styles['input-create-task']} 
                    type={'text'}
                    onChange={inputTaskListener}
                    placeholder={"ie: Drink watter..."}
                    value={newTask} />
                {displayError && <div className={styles['empty-input-error']}>INSERT SOME TASK!</div>}
                <TodoButton />
            </form>
        </div>
    )
}

export default TodoCreate;
