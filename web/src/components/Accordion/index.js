import React, { useEffect, useState } from 'react'
import * as styles from './style.module.css'
import Panel from './Panel'
import PanelHeader from './PanelHeader'
import PanelContent from './PanelContent'

export { PanelContent, PanelHeader, Panel }

export const Accordion = ({ children, dark }) => {

	const [activeTab, setActiveTab] = useState(null)
  const [childrenWithProps, setChildrenWithProps] = useState([])

  const activateTab = (index) => {
		setActiveTab(prev => (
      prev === index ? -1 : index
    ));
	}

  useEffect(() => {
    alert(activeTab)
  }, [activeTab])


  useEffect(() => {
    let indexCounter = -1
    const mappedChildren = React.Children.map(children, (child) => {

      if (React.isValidElement(child)) {
        indexCounter++
        return React.cloneElement(child, { 
          activateTab: setActiveTab,
          activeTab: activeTab,
          tabIndex: indexCounter
        });
      }
    
      return child;
    });
    setChildrenWithProps(mappedChildren)
  }, []) 



  return (
    <ul className={styles.root} role='tablist'>
      {childrenWithProps}
    </ul>
  )
}

{/* <Panel
          activeTab={ activeTab }
          tabIndex={ index }
          activateTab={ activateTab }
        >
          {child}
        </Panel> */}

// const Accordion = (props) => {
		

//   return (
//     <div className='accordion' role='tablist'>
//       {panels.map((panel, index) =>
//         <Panel
//           key={ index }
//           activeTab={ activeTab }
//           index={ index }
//           { ...panel } 
//           activateTab={ this.activateTab.bind(null, index) }
//         />
//       )}
//     </div>
//   );
// }


