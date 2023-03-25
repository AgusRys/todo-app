import React, {useState, useEffect} from 'react';
import TodoList from "../components/TodoList"
import EmptyTodoItem from '../components/EmptyTodoItem';

const TodoContext = React.createContext({
        todos: [],
        counterComplete: 0,
        counterTotalTasks: 0,
        allTaskComplete: false,
        displayNotification: false,
        notificationMessage: '',
        displayCompletedTasks: false,
        tasksContainerItems: '',
        completeTask: (todoCheckedId, todoIsChecked) => {},
        showCompletedTasks: () => {},
        createNewTask: (newTask) => {},
        deleteTask: (taskId) => {},
        editTask: (taskId, content) => {}
})

export const TodoContextProvider = (props) => {
    const localStorageTodos = localStorage.getItem('TODOS');
    let parsedTodos;

    if (!localStorageTodos) {
        localStorage.setItem('TODOS', JSON.stringify([]))
        parsedTodos = [];
    } else {
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


    const completeTask = (todoCheckedId, todoIsChecked) => {
        const todoModifiedIndex = todos.findIndex(task => task.id === todoCheckedId);
        const newTodos = [...todos];
        newTodos[todoModifiedIndex].complete = todoIsChecked;

        setTodos(newTodos);
    }

    const showCompletedTasks = () => {
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

    let tasksContainerItems = todos.length > 0 ? <TodoList /> : <EmptyTodoItem/>


    return <TodoContext.Provider value={{
        todos: todos,
        counterComplete: counterComplete,
        counterTotalTasks: counterTotalTasks,
        allTaskComplete: allTaskComplete,
        displayNotification: displayNotification,
        notificationMessage: notificationMessage,
        displayCompletedTasks: displayCompletedTasks,
        tasksContainerItems: tasksContainerItems,
        completeTask: completeTask,
        showCompletedTasks: showCompletedTasks,
        createNewTask: createNewTask,
        deleteTask: deleteTask,
        editTask: editTask
    }}>
        {props.children}
    </TodoContext.Provider>

}


export default TodoContext;