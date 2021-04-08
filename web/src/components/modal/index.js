import React, { createContext, useRef, useContext, useState, useEffect } from 'react'
import ReactDOM from'react-dom'
import { cn } from '../../lib/helpers'
import styles from './modal.module.css'

const Context = createContext();

export function ModalProvider({ children }) {
  
  const modalRef = useRef();
  const [context, setContext] = useState();

  // make sure re-render is triggered after initial
  // render so that modalRef exists
  useEffect(() => {
    setContext(modalRef.current);
  }, []);

  return (
    <div className={styles.container}>
      <Context.Provider value={context}>{children}</Context.Provider>
      <div ref={modalRef} />
    </div>
  );
}

export function Modal ({children, ...props}) {

  const modalNode = useContext(Context);

  return modalNode
    ? ReactDOM.createPortal(
        <div className={cn(styles.overlay, styles.active)}>
          <div className={styles.dialog} {...props}>
            {children}
          </div>
        </div>,
        modalNode
      )
    : null;
}