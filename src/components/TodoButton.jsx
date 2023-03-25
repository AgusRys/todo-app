import React from 'react'
import styles from '../assets/TodoButton.module.css'


const TodoButton = () => {
    return (
        <button className={styles['create-task__button']}>Create Task</button>
    )
}

export default TodoButton;
