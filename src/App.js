import './App.css';
import { useState, useEffect } from 'react';
import TodoCounter from "./components/TodoCounter"
import TodoCreate  from "./components/TodoCreate"
import TodoList    from "./components/TodoList"
import OpenEye from './assets/images/OpenEye';
import SlahedEye from './assets/images/SlahedEye';
import styles      from "./assets/App.module.css"
import Notification from './UI/Notification';

// TODO: el input para editar un todo no puede estar vacío y le tengo que mostrar el mismo error que el input de create.
function App() {
    const localStorageTodos = localStorage.getItem('TODOS');
    let parsedTodos;
    // it's the first time that the user has access to the local storage? 
    if (!localStorageTodos) { 
        // set the items and parsedTodos should be an empty array
        localStorage.setItem('TODOS', JSON.stringify([]))
        parsedTodos = [];
    } else { 
        // else, parsedTodos it's the localStorage item parsed
        parsedTodos = JSON.parse(localStorageTodos);
    }

    const [todos, setTodos] = useState(parsedTodos)
    const [counterComplete, setCounterComplete] = useState(0);
    const [counterTotalTasks, setCounterTotalTasks] = useState(0);
    const [allTaskComplete, setAllTaskComplete] = useState(false);
    const [displayCompletedTasks, setdisplayCompletedTasks] = useState(true);


    const [displayNotification, setDisplayNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        const completedTasks = todos.filter(task => task.complete === true).length;
        const totalTasks = todos.length;
        const allComplete = totalTasks > 0 && completedTasks === totalTasks;
        allComplete ? setAllTaskComplete(true) : setAllTaskComplete(false);

        setCounterComplete(completedTasks);
        setCounterTotalTasks(totalTasks)

        localStorage.setItem('TODOS', JSON.stringify(todos))
    }, [todos]);


    const completeTask = (todoCheckedId, todoIsChecked)=> {
        const todoModifiedIndex  = todos.findIndex(task => task.id === todoCheckedId);
        const newTodos = [...todos];
        newTodos[todoModifiedIndex].complete = todoIsChecked;

        setTodos(newTodos);
    }

    const showCompletedTasks = ()=>{
        setdisplayCompletedTasks(!displayCompletedTasks);
    }

    const createNewTask = (newTask) => {
        // * si es el primer todo que se agrega, el id máximo debe ser 0. Si no es el primer todo, busco el máximo con el reduce y le sumo uno para crear el nuevo todo y que sea consecutivo al último.
        let highestId = todos.length === 0 ? 0 : todos.reduce((acc, curr) => curr.id > acc ? curr.id : acc, 0);

        const newObjectTask = {
            id: highestId + 1,
            title: newTask,
            complete: false,
        }

        setTodos([
            ...todos,
            newObjectTask
        ]);
    }

    const deleteTask = (taskId) => {
        const todosModified = todos.filter((todo) => todo.id !== taskId);
        setTodos(todosModified);
        setDisplayNotification(true)
        setNotificationMessage('Deleted')
        setTimeout(() => {
            setDisplayNotification(false)
        }, 3000);
    }

    const editTask = (taskId, content) => {
        const todoEditedIndex = todos.findIndex(task => task.id === taskId);
        const newTodos = [...todos];
        newTodos[todoEditedIndex].title = content;

        setTodos(newTodos);
        setDisplayNotification(true)
        setNotificationMessage('Edited')


        setTimeout(() => {
            setDisplayNotification(false)
        }, 3000);
    }


    let tasksContainerItems = <div className={styles['container-empty-tasks']}>Add your pending tasks!</div>
    if(todos.length > 0) {
        tasksContainerItems = 
            <TodoList 
                todos={todos} 
                onComplete={completeTask} 
                onDelete={deleteTask} 
                onEdit={editTask} 
                displayCompletedTasks={displayCompletedTasks} />
    }

    return (
        
        <div className={styles['main-container']}>
            {displayNotification && <Notification message={notificationMessage} />}
            <TodoCreate onCreateNewTask={createNewTask} />
            {/* TODO: this should be a separate complete as <TodoCreate/>  */}
            <div className={styles['tasks-container']}>
                <button onClick={showCompletedTasks}> {displayCompletedTasks ? <OpenEye /> : <SlahedEye/>}</button>
                <TodoCounter 
                    taskComplete={counterComplete}
                    totalTasks={counterTotalTasks}
                    onTasksCompleted={allTaskComplete} />
                    {tasksContainerItems}
            </div>
        </div>
    );
}

export default App;
