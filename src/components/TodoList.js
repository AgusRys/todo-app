import React from 'react'
import TodoItem from './TodoItem';
import styles from '../assets/TodoList.module.css'

const TodoList = (props) => {
    return (
        <ul className={styles['scrolleable-container']}>
            {props.todos.map((todo) => 
                    <TodoItem 
                        todo={todo} 
                        key={todo.id} 
                        onComplete={props.onComplete} 
                        onDelete={props.onDelete} 
                        onEdit={props.onEdit} 
                        displayCompletedTasks={props.displayCompletedTasks}
                    />
            ).reverse()}
        </ul>
    )
}

export default TodoList;
