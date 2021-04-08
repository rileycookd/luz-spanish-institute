import React, { useLayoutEffect, useRef, useEffect, useState } from 'react'
// import { ModalProvider } from './modal'
// import useModal from '../hooks/useModal'
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/700.css"
import "@fontsource/raleway/400.css"
import "@fontsource/raleway/700.css"
import '../styles/layout.css'
import * as styles from './layout.module.css'
import Navbar from './navbar'

function Layout (props) {
  const {
    children,
    onHideNav,
    onShowNav,
    showNav,
    siteTitle,
    navMenuItems,
    navMenuCtas
  } = props;

  // const { isModalOpen } = useModal()

  // const [sidebarWidth, setSidebarWidth] = useState(0)
  // const ref = useRef(null)

  // useLayoutEffect(()=>{
  //   if (ref.current) {
  //       setSidebarWidth(ref.current.clientWidth)
  //   }
  // }, [ref.current, ref.current ? ref.current.clientWidth:0])
  
  // useEffect(() => {
  //   function handleResize() {
  //     setSidebarWidth(ref.current.clientWidth);
  //   }
  //   window.addEventListener('resize', handleResize)
  // })

  return (
    // <ModalProvider>
      <div className={styles.root}>
        {(navMenuItems || navMenuCtas) && (
          <Navbar navMenuItems={navMenuItems ? navMenuItems : []} navMenuCtas={navMenuCtas ? navMenuCtas : []} />
        )}
        {children}
      </div> 
    // </ModalProvider>
  )
}

export default Layout
