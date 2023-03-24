import React from 'react'
import ReactDOM from 'react-dom';
import styles from './Modal.module.css'



const Backdrop = (props) => {
    return (
        <div className={styles.backdrop} onClick={props.onDecline}>
    </div>
)}

const ModalOverlay = (props) => {
    return (
        <div className={styles['modal-overlay']}> 
            <header>{props.titleContent}</header>
            <main>
                {props.children}
            </main>
            <footer>
                <button className={styles['decline-button']} onClick={props.onDecline}>Decline</button>
                <button className={styles['accept-button']}  onClick={props.onConfirm}>Accept</button>
            </footer>
            
        </div>

    )
}

const Modal = (props) => {
    return(
        <>
            {ReactDOM.createPortal(<Backdrop onDecline={props.onDecline} />, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(
                <ModalOverlay 
                    titleContent={props.titleContent} 
                    onDecline={props.onDecline} 
                    onConfirm={props.onConfirm}>
                        {props.children}
                </ModalOverlay>, document.getElementById('overlay-root'))}
        </>
    )
}

export default Modal