import styles from './Notification.module.css'

const Notification = (props) => {
    return (
        <div className={styles['notification-container']}>
            {props.message + ' Successfully'}
        </div>

    )
}

export default Notification;