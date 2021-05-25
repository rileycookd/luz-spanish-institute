import React, { useEffect, useState } from 'react'
import { timeOptions } from './data'
import ReactSelect from 'react-select'
import { IoTrashOutline, IoAdd } from 'react-icons/io5'
import * as styles from './index.module.css'

const DayAvailability = ({ day, onChange }) => {

  const customStyles = {
    valueContainer: (provided, state) => ({
      ...provided,
    }),
    container: (provided, state) => ({
      ...provided,
      width: '94px'
    }),
  }
  

  const [availableToggle, setAvailableToggle] = useState(day !== "Sun" && day !== "Sat")
  const [timeSlots, setTimeSlots] = useState([{start: 32, end: 68}])

  const handleCheck = (value) => {
    setAvailableToggle(!availableToggle)
  }

  const handleSelectStart = (value, index) => {
    setTimeSlots(timeSlots.map((t, i) => {
      if(i === index) {
        t.start = timeOptions.indexOf(value)
      }
      return t
    }))
  }

  const handleSelectEnd = (value, index) => {
    setTimeSlots(timeSlots.map((t, i) => {
      if(i === index) {
        t.end = timeOptions.indexOf(value)
      }
      return t
    }))
  }

  const handleAddTimeRange = () => {
    if(timeSlots.length) {
      const prevEnd = timeSlots[timeSlots.length - 1].end
      const startIndex = prevEnd + 4 < 96 
        ? prevEnd + 4 
        : (prevEnd + 4) - 96
      const endIndex = prevEnd + 8 < 96
        ? prevEnd + 8
        : (prevEnd + 8) - 96
      setTimeSlots([...timeSlots, {start: startIndex, end: endIndex}])
    } else {
      setTimeSlots([...timeSlots, {start: 32, end: 68}])
    }
  }

  const handleRemoveTimeRange = (index) => {
    setTimeSlots(timeSlots.filter((t, i) => i !== index))
  }

  const renderRangeInputs = () => (
    timeSlots.map((t, i) => (
      <div key={`${t.start}-${t.end}-${i}`} className={styles.inputs} style={i === timeSlots.length - 1 ? {marginBottom: '0'} : {}}>
        <ReactSelect
          styles={customStyles}
          defaultValue={timeOptions[t.start]}
          name="startTime"
          options={timeOptions}
          onChange={(v) => handleSelectStart(v, i)}
        />
        <span>-</span>
        <ReactSelect
          styles={customStyles}
          defaultValue={timeOptions[t.end]}
          name="endTime"
          options={timeOptions}
          onChange={(v) => handleSelectEnd(v, i)}
        />
        <button onClick={() =>handleRemoveTimeRange(i)}><IoTrashOutline /></button>
      </div>
    ))
  )

  useEffect(() => {
    if(!timeSlots.length) setAvailableToggle(false) 
  }, [timeSlots])

  useEffect(() => {
    if(!timeSlots.length && availableToggle) setTimeSlots([{start: 32, end: 68}]) 
  }, [availableToggle])

  return (
    <div className={styles.root}>
      <div className={styles.daycheck}>
        <input 
          checked={availableToggle}
          type="checkbox" 
          id={`${day}-checkbox`} 
          defaultChecked={day !== "Sun" && day !== "Sat"} 
          onChange={(e) => handleCheck(e.target.checked)}
        />
        <label htmlFor={`${day}-checkbox`}>{day}</label>
      </div>
      <div>
      {availableToggle && timeSlots.length ? renderRangeInputs() : ''}
      </div>
      {(!availableToggle || !timeSlots.length) && (
        <p>Unavailable</p>
      )}
      <div className={styles.control}>
        <button onClick={handleAddTimeRange}><IoAdd /></button>
      </div>
    </div>
  )
}

export default DayAvailability