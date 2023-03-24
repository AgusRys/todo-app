import React from 'react'
import styles from '../assets/TodoCounter.module.css'

const TodoCounter = (props)=> {
    let tasksContainerCounter = <h6>You have complete <span className={styles['counter-complete']}> {props.taskComplete} </span> to <span className={styles['counter-incomplete']}> {props.totalTasks} </span></h6>

    if (props.onTasksCompleted) {
      tasksContainerCounter = <h6>Congratulations! <br/>
      You have completed all the tasks :)</h6>
    }


    return (
      <div className={styles['container-counter']}>
        <h3>Your Tasks</h3>
        {tasksContainerCounter}
      </div>
    )
}

export default TodoCounter;