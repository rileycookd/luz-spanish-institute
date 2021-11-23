import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { cn } from '../../../lib/helpers'
import * as styles from './style.module.css'
import { FiChevronRight as RightArrow, FiChevronDown as DownArrow } from 'react-icons/fi'
import { useMatch } from "@reach/router"
import { Panel, PanelContent, PanelHeader } from '../../Accordion'

const MenuTab = ({ basePath, icon, title, children, tabIndex, activeTab, setActiveTab }) => {

  const match = useMatch(`${basePath}/*`)


  return (
    <div
      className={styles.root}
    >
      <div
        className={cn(styles.tab, match && styles.active)}
        onClick={() => setActiveTab(tabIndex)}
      >
        <span className={styles.title}>
          {icon && icon}
          {title}
        </span>
        {tabIndex === activeTab ? <DownArrow /> : <RightArrow />}
      </div>
      {children && (
				<div>
					<ul className={styles.list} style={{display: `${tabIndex === activeTab ? 'grid' : 'none'}`}}>
						{children}
					</ul>
				</div>
      )}
    </div>
  )
}

export default MenuTab

// class Panel extends React.Component {
// 	constructor(props) {
// 		super(props);
		
// 		this.state = {
// 			height: 0
// 		};
// 	}

// 	componentDidMount() {
// 		window.setTimeout(() => {
// 			const el = ReactDOM.findDOMNode(this);
// 			const height = el.querySelector('.panel__inner').scrollHeight;
// 			this.setState({
// 				height
// 			});
// 		}, 333);
// 	}

// 	render () {
// 		const { label, content, activeTab, index, activateTab } = this.props;
// 		const { height } = this.state;
// 		const isActive = activeTab === index;
// 		const innerStyle = {
// 			height:  `${isActive ? height : 0}px`
// 		}

// 		return (
// 			<div className='panel'
// 				role='tabpanel'
// 				aria-expanded={ isActive }>
// 				<button className='panel__label'
// 					role='tab'
// 					onClick={ activateTab }>
// 					{ label }
// 				</button>
// 				<div className='panel__inner'
// 					style={ innerStyle }
// 					aria-hidden={ !isActive }>
// 					<p className='panel__content'>
// 						{ content }
// 					</p>
// 				</div>
// 			</div>
// 		);
// 	}
// }
