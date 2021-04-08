import React, { useState } from 'react'
import * as styles from './pricing.module.css'
import { cn } from '../lib/helpers'

import CTALink from './CTALink'
import { TabList, Tab, Tabs, TabPanel } from './tab-component'

import { IoAdd as AddIcon, IoRemove as SubtractIcon } from 'react-icons/io5'

function Pricing ({ classType, base, packages, min, max, maxDiscount, sizeDiscount }) {

  const [ numStudents, setNumStudents ] = useState(min || 1)
  const [ isChecked, setIsChecked ] = useState(false)

  let currentSizeDiscount = 0;
  if (sizeDiscount && numStudents > min) {
    currentSizeDiscount = sizeDiscount * (numStudents - min);
    if(currentSizeDiscount > maxDiscount) {
      currentSizeDiscount = maxDiscount / 100;
    } else {
      currentSizeDiscount = currentSizeDiscount / 100;
    }
  }

  const calculateBasePrice = (basePrice) => {
    let classPrice = basePrice;
    if(sizeDiscount && numStudents > min) {
      classPrice = classPrice - (classPrice * (currentSizeDiscount))
    }
    if(isChecked === true) {
      classPrice = classPrice * numStudents;
    }
    classPrice = (Math.round((classPrice + Number.EPSILON) * 100) / 100).toFixed(2);
    return classPrice;
  }

  const calculatePackagePrice = (basePrice, quantity, discount) => {
    let classPrice = basePrice * quantity;
    if(discount) {
      classPrice = classPrice - (classPrice * (discount / 100));
    }
    classPrice = (Math.round((classPrice + Number.EPSILON) * 100) / 100).toFixed(2);
    return classPrice
  }

  let basePrices = base.map(b => (
    {classType: classType, quantity: 1, price: calculateBasePrice(b.price), duration: b.duration, _key: b.key}
  ))

  let packagePrices = [basePrices]

  if(packages) {
    packagePrices = packages.map(p => (
      basePrices.map(b => (
        {
          classType: classType, 
          quantity: p.quantity, 
          price: calculatePackagePrice(b.price, p.quantity, p.discount),
          duration: b.duration,
          key: `${p.title}${b._key}`
        }
      ))
    ))
    packagePrices.unshift(basePrices)
  }

  return (
    <>
      {(!max || max > 1) && (
        <div className={styles.inputGroup}>
          <label className={styles.inputNumberLabel} for="class-size">Choose class size:</label>
          <div className={styles.inputNumberContainer}>
            <span 
              onClick={() => (numStudents === min || numStudents === 1) 
                ? null 
                : setNumStudents(numStudents - 1)} 
              className={(numStudents === min || numStudents === 1) 
                ? cn(styles.inputNumberButton, styles.disabled) 
                : styles.inputNumberButton}
            ><SubtractIcon/></span>
            <input 
              className={styles.inputNumber} 
              type="text" 
              value={numStudents} 
              min="0" 
              max="10"
              name="class-size"
              id="class-size"
              inputmode="numeric"
              pattern="[0-9]*"
            />
            <span 
              onClick={() => numStudents === max ? null : setNumStudents(numStudents + 1)} 
              className={numStudents === max 
                ? cn(styles.inputNumberButton, styles.disabled) 
                : styles.inputNumberButton}
            ><AddIcon/></span>
          </div>
        </div>
      )}
      {packagePrices.length > 1 && (
        <Tabs>
          <TabList theme="pricing">
            <Tab>
              <h6 className={styles.tabTitle}>Single</h6>
              <p className={styles.tabSubtitle}>1 class</p>
            </Tab>
            {packages.map(p => (
              <Tab>
                <h6 className={styles.tabTitle}>{p.title}</h6>
                <p className={styles.tabSubtitle}>{`${p.quantity} classes`}</p>
              </Tab>
            ))}
          </TabList>

          {packagePrices.map(pp => (
            <TabPanel>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.tableHeader}>Class</th>
                    <th className={styles.tableHeader}>Time</th>
                    <th className={styles.tableHeader}>Quantity</th>
                    <th className={styles.tableHeader}>Price</th>
                  </tr>
                </thead>  
                <tbody className={styles.tableBody}>
                  {pp.map(p => (
                    <tr className={styles.tableRow}>
                      <td className={styles.tableCell} data-column="Class">{classType}</td>
                      <td className={styles.tableCell} data-column="Time">{`${p.duration / 60} hour${p.duration / 60 > 1 ? 's' : ''}`}</td>
                      <td className={styles.tableCell} data-column="Quantity">{p.quantity}</td>
                      <td className={styles.tableCell} data-column="Price"><span className={styles.accent}>{`$${p.price}`}</span></td>
                      <td className={styles.tableCell}><CTALink kind="small button" route="/register" title="Enroll" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabPanel>
          ))}   
        </Tabs>
      )}
      {packagePrices.length === 1 && (
        <Tabs>
          {packagePrices.map(pp => (
            <TabPanel>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.tableHeader}>Class</th>
                    <th className={styles.tableHeader}>Time</th>
                    <th className={styles.tableHeader}>Quantity</th>
                    <th className={styles.tableHeader}>Price</th>
                  </tr>
                </thead>  
                <tbody className={styles.tableBody}>
                  {pp.map(p => (
                    <tr className={styles.tableRow}>
                      <td className={styles.tableCell} data-column="Class">{classType}</td>
                      <td className={styles.tableCell} data-column="Time">{`${p.duration / 60} hour${p.duration / 60 > 1 ? 's' : ''}`}</td>
                      <td className={styles.tableCell} data-column="Quantity">{p.quantity}</td>
                      <td className={styles.tableCell} data-column="Price"><span className={styles.accent}>{`$${p.price}`}</span></td>
                      <td className={styles.tableCell}><CTALink kind="small button" route="/register" title="Enroll" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabPanel>
          ))}   
        </Tabs>
      )}
      {(!max || max > 1) && (
        <label className={styles.toggleSwitchLabel} for="price-toggle">
          Price per student
          <input 
            type="checkbox" 
            className={styles.toggleSwitchInput} 
            id="price-toggle" 
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <span className={styles.toggleSwitchTrack}>
            <span className={styles.toggleSwitchIndicator}></span>
          </span>
          Total price
        </label>
      )}
    </>
  )
}

export default Pricing