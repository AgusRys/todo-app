import React, {useContext} from 'react'
import TodoItem from './TodoItem';
import styles from '../assets/TodoList.module.css'
import TodosContext from '../context/todos-context'

const TodoList = () => {
    const todosCtx = useContext(TodosContext)

    return (
        <ul className={styles['scrolleable-container']}>
            {todosCtx.todos.map((todo) =>
                    <TodoItem 
                        key={todo.id}
                        todo={todo}
                        onComplete={todosCtx.completeTask}
                        onDelete={todosCtx.deleteTask}
                        onEdit={todosCtx.editTask}
                        displayCompletedTasks={todosCtx.displayCompletedTasks}
                    />
            ).reverse()}
        </ul>
    )
}

export default TodoList;
