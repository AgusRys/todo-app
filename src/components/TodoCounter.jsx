import React, {useContext} from 'react'
import styles from '../assets/TodoCounter.module.css'
import TodoContext from '../context/todos-context'


const TodoCounter = ()=> {
    const todosCtx = useContext(TodoContext)
    let tasksContainerCounter = todosCtx.allTaskComplete ?
      <h6>Congratulations! <br /> You have completed all the tasks :)</h6> :
      <h6>You have complete <span className={styles['counter-complete']}> {todosCtx.counterComplete} </span> to <span className={styles['counter-incomplete']}> {todosCtx.counterTotalTasks} </span></h6>

    return (
        <div className={styles['container-counter']}>
          <h3>Your Tasks</h3>
          {tasksContainerCounter}
       </div>
    )
}

export default TodoCounter;