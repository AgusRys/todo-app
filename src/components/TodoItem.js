// import React, {useState} from 'react';
// import Modal from '../UI/Modal'
// import styles from '../assets/TodoItem.module.css';
// import Edit from '../assets/images/Edit';
// // import './input.css';
// // import styles from './input.module.css';

// const TodoItem = (props) => {
//     const [displayModal, setDisplayModal] = useState(null)
//     const [mainContentModal, setMainContentModal] = useState()

//     const checkStatus = (task, event) => {
//         const currentTaskId = task.id;
//         const taskIsChecked = event.target.checked;

//         props.onComplete(currentTaskId, taskIsChecked);
//     }
//     const hideModal = () => {
//         setDisplayModal(null);
//     }

//     const deleteTask = (task, ev) => {
//         console.log('aasdasdasdadsasdads' + Object.keys(ev))
//         setDisplayModal(true);
//         setMainContentModal(task.title)
//     }
//     const editTask = (task, ev) => {
//         console.log('aasdasdasdadsasdads' + ev)
//         setDisplayModal(true);

//         setMainContentModal(
//             <input type={'text'}></input>
//         )
//     }

//     const confirmDeleteTask = (task) => {
//         // TODO: esto va cuando el usuario acepta eliminar el todo->
//         props.onDelete(task.id)
//     }


//     return (
//         <li className={`${props.todo.complete && !props.displayCompletedTasks ? styles['display-none'] : styles['display-list']}  ${styles.slideInLeft}` }>
//            <div className={` ${styles["checkbox-wrapper"]} `}>
//                 <input id={styles["checkbox-input"]} type="checkbox"  onChange={checkStatus.bind(this, props.todo)} />
//                 <label htmlFor="checkbox-input">{props.todo.title}</label>
//             </div>
//             <div>
//                 <div className={styles.edit}  onClick={editTask.bind(this, props.todo)}><Edit/></div>
//                 <div className={styles.cross} onClick={deleteTask.bind(this, props.todo)}>x</div>
//             </div>
//             {displayModal && 
//                 <Modal 
//                     mainContent={mainContentModal} 
//                     onDecline={hideModal}
//                     onConfirm={confirmDeleteTask.bind(this, props.todo)}> {/* onConfirm={ algo ? confirmDeleteTask.bind(this, props.todo)} : confirmEditTask.bind(this, props.todo) > */}
//                         <h1>holaaa</h1> 
//                         {/* MAIN CONTENT */}
//                 </Modal>}
//         </li>
//     )
// }

// export default TodoItem;


import React, { useState, useReducer, useRef } from 'react';
import Modal from '../UI/Modal'
import styles from '../assets/TodoItem.module.css';
import Edit from '../assets/images/Edit';
// import './input.css';
// import styles from './input.module.css';

const TodoItem = (props) => {
    const [displayModal, setDisplayModal] = useState(null)
    
    const editedContent = useRef('')

    const confirmDeleteTask = (taskId) => {
        props.onDelete(taskId)
        hideModal()
    }

    const confirmEditTask = (taskId) => {
        props.onEdit(taskId, editedContent.current.value.toUpperCase())
        hideModal()
    }

    const hideModal = () => {
        setDisplayModal(null);
    }

    const editInputTask = 
        <input 
            className={styles['input-edit']}
            type="text" 
            ref={editedContent}
            placeholder={'Edit content...'}
        />

    const reducer = (state, action) => {
        switch(action.type) {
            case 'delete': 
                return state = {
                    title: 'ARE YOU SURE YOU WANT TO DELETE THE TASK?',
                    content: action.taskTitle,
                    confirmFunction: confirmDeleteTask.bind(this, action.taskId),
                    declineFunction: hideModal
                }

            case 'edit':
                return state = {
                    title: 'EDIT YOUR TASK',
                    content: editInputTask,
                    confirmFunction: confirmEditTask.bind(this, action.taskId),
                    declineFunction: hideModal
                }
            default:
                console.log('Report Pendy')
        }
    }

    const [state, dispatch] = useReducer(reducer, {})

    const checkStatus = (task, event) => {
        const currentTaskId = task.id;
        const taskIsChecked = event.target.checked;

        props.onComplete(currentTaskId, taskIsChecked);
    }


    const deleteTaskFunctionHandler = (task) => {
        setDisplayModal(true);
        dispatch({
            type:'delete',
            taskId: task.id,
            taskTitle: task.title
        })
    }
    const editTaskFunctionHandler = (task) => {
        setDisplayModal(true);
        dispatch({
            type:'edit',
            taskId: task.id,
            taskTitle: task.title
        })
    }

    return (
        
        <li className={`${props.todo.complete && !props.displayCompletedTasks ? styles['display-none'] : styles['display-list']}  ${styles.slideInLeft}`}>
            <div className={` ${styles["checkbox-wrapper"]} `}>
                <input id={styles["checkbox-input"]} type="checkbox" onChange={checkStatus.bind(this, props.todo)} checked={props.todo.complete} />
                <label htmlFor="checkbox-input">{props.todo.title}</label>
            </div>
            <div>
                <div className={styles.edit}  onClick={editTaskFunctionHandler.bind(this, props.todo)}><Edit /></div>
                <div className={styles.cross} onClick={deleteTaskFunctionHandler.bind(this, props.todo)}>x</div>
            </div>
            {displayModal &&
                <Modal
                    titleContent = {state.title}
                    onDecline    = {state.declineFunction}
                    onConfirm    = {state.confirmFunction}>
                        {state.content}
                </Modal>}
      
        </li>
    )


    
}



export default TodoItem;

