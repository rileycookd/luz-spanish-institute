import React, { useState } from 'react'
import { Link } from 'gatsby'
import { cn } from '../lib/helpers'
import * as styles from './tab-component.module.css'

export function Tabs ({ children }) {

  const [currentTab, setCurrentTab] = useState(0)
  let tabPanelIndexRenderCounter = -1;

  const childrenWithProps = React.Children.map(children, (child, i) => {

    if (React.isValidElement(child) && child.type.name === "TabList") {

      return React.cloneElement(child, { 
        currentTab: currentTab,
        handleSelect: setCurrentTab
      });

    } else if (React.isValidElement(child) && child.type.name === "TabPanel") {

      tabPanelIndexRenderCounter++
      return React.cloneElement(child, { 
        currentTab: currentTab,
        tabPanelIndex: tabPanelIndexRenderCounter
      });
    }

    return child;
  });


  return (
    <div className={styles.root}>
      {childrenWithProps}
    </div>
  )
}

export function TabList ({ children, sharedPath, theme, handleSelect, currentTab }) {
  let validChildrenCounter = -1;

  // Map props to children
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      validChildrenCounter++;
      return React.cloneElement(child, { 
        index: validChildrenCounter, 
        sharedPath: sharedPath, 
        theme: theme, 
        currentTab: currentTab,
        handleSelect: handleSelect
      });
    }
    return child;
  });

  let themeStyle = styles.tabList;
  if(theme === 'dark') themeStyle = cn(styles.tabList, styles.dark)
  if(theme === 'pricing') themeStyle = styles.tabListPricing
  
  return (
    <ul className={themeStyle}>
      {childrenWithProps}
    </ul>
  )
}

export function Tab ({ children, sharedPath, link, theme, currentTab, index, handleSelect }) {
  let renderTab = null;
  if(link) {
    renderTab = (
      <li>
        <Link
          className={theme === 'dark' ? cn(styles.link, styles.dark) : styles.link}
          activeClassName={styles.active}
          to={`${sharedPath ? sharedPath : ''}${link}`}
        >
          {children}
        </Link>
      </li>
    )
  } else {
    let themeStyle = [styles.link]
    if(theme === 'dark') themeStyle = [styles.link, styles.dark]
    if(theme === 'pricing') themeStyle = [styles.tabPricing]
    if(index === currentTab) themeStyle.push(styles.active)

    renderTab = (
      <li onClick={() => handleSelect(index)} className={cn(...themeStyle)}>
        {children}
      </li>
    )
  }

  return (
    <>{renderTab}</>
  )
}

export function TabPanel ({children, tabPanelIndex, currentTab}) {
  return (
    <>
      {tabPanelIndex === currentTab && (
        children
      )}
    </>
  )
}
