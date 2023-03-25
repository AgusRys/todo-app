import React from 'react'
import styles from '../assets/EmptyTodoItem.module.css'

const EmptyTodoItem = () => {
    return (
        <div className={styles['container-empty-tasks']}>Add your pending tasks!</div>
    )
}

export default EmptyTodoItem