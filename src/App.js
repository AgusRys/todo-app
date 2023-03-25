import './App.css';
import { useContext } from 'react';
import TodoCounter from "./components/TodoCounter"
import TodoCreate  from "./components/TodoCreate"
import TodoList    from "./components/TodoList"
import OpenEye from './assets/images/OpenEye';
import SlahedEye from './assets/images/SlahedEye';
import styles      from "./assets/App.module.css"
import Notification from './UI/Notification';
import TodoContext from './context/todos-context';

function App() {
    const todosCtx = useContext(TodoContext)

    let tasksContainerItems = todosCtx.todos.length > 0 ? <TodoList /> : <div className={styles['container-empty-tasks']}>Add your pending tasks!</div>

    return (
        <div className={styles['main-container']}>
            {todosCtx.displayNotification && <Notification message={todosCtx.notificationMessage} />}
            <TodoCreate />
            {/* TODO: this should be a separate complete as <TodoCreate/>  */}
            <div className={styles['tasks-container']}>
                <button onClick={todosCtx.showCompletedTasks}> {todosCtx.displayCompletedTasks ? <OpenEye /> : <SlahedEye/>}</button>
                <TodoCounter />
                {tasksContainerItems}
            </div>
        </div>
    );
}

export default App;
