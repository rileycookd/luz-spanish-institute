import React, { useEffect, useState } from 'react'
import FormField from 'part:@sanity/components/formfields/default'
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'
import { timeOptions } from './data'
import ReactSelect from 'react-select'
import { IoTrashOutline, IoAdd } from 'react-icons/io5'
import * as styles from './index.module.css'

const createPatchFrom = value => PatchEvent.from(value === '' ? unset() : set(value))

function findWithAttr(array, attr, value) {
  for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
          return i;
      }
  }
  return -1;
}

const incomingValues = (value, type) => {
  if (!value) {
    return type === "start" ? 32 : 68
  } else {
    let timeRange = value.split('-')
    return type === "start"
      ? findWithAttr(timeOptions, "label", timeRange[0])
      : findWithAttr(timeOptions, "label", timeRange[1])
    return windows;
  }
}

const DayAvailability = (props) => {

  const {
    day,
    compareValue,
    focusPath,
    markers,
    readOnly,
    placeholder,
    onBlur,
    onChange,
    onFocus,
    presence,
    type,
    value,
    level
  } = props

  const customStyles = {
    valueContainer: (provided, state) => ({
      ...provided,
    }),
    container: (provided, state) => ({
      ...provided,
      width: '94px'
    }),
  }
  
  const [startTime, setStartTime] = useState(incomingValues(value, 'start'))
  const [endTime, setEndTime] = useState(incomingValues(value))


  const handleTimeChange = (startTime, endTime) => {
    let valueString = `${timeOptions[startTime].label}-${timeOptions[endTime].label}`
    onChange(createPatchFrom(valueString))
  }

  const handleSelectStart = (value) => {
    setStartTime(findWithAttr(timeOptions, "label", value))
    
  }

  const handleSelectEnd = (value) => {
    setStartTime(findWithAttr(timeOptions, "label", value))
  }

  useEffect(() => {
    handleTimeChange(startTime, endTime)
  }, [startTime, endTime])

  return (
    <FormField 
      description={type.description}
      title={type.title}              // Creates label from schema title
//       // __unstable_markers={markers}    // Handles all markers including validation
//       // __unstable_presence={presence}  // Handles presence avatars
//       // compareValue={compareValue}     // Handles "edited" status
//       // inputId={inputId}
    >
        <div className={styles.inputs}>
        <ReactSelect
          styles={customStyles}
          defaultValue={startTime}
          name="startTime"
          options={timeOptions}
          onChange={(v) => handleSelectStart(v)}
        />
        <span>-</span>
        <ReactSelect
          styles={customStyles}
          defaultValue={endTime}
          name="endTime"
          options={timeOptions}
          onChange={(v) => handleSelectEnd(v)}
        />
      </div>
    </FormField>
  )
}

// const Availability = React.forwardRef((props, ref) => {

//   const {
//     compareValue,
//     focusPath,
//     markers,
//     readOnly,
//     placeholder,
//     onBlur,
//     onChange,
//     onFocus,
//     presence,
//     type,
//     value,
//     level
//   } = props

//   const handleChange = ({prevValue, newValue, onChange}) => {
//     if (checkEqual(newValue, prevValue)) {
//       onChange(PatchEvent.from(unset()))
//     } else {
//       onChange(PatchEvent.from(set(newValue)))
//     }
//   }

//   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
//   const renderDays = () => days.map(d => (<DayAvailability day={d} onchange />))

//   return (

//     <FormField 
//       description={type.description}
//       title={type.title}              // Creates label from schema title
//       // __unstable_markers={markers}    // Handles all markers including validation
//       // __unstable_presence={presence}  // Handles presence avatars
//       // compareValue={compareValue}     // Handles "edited" status
//       // inputId={inputId}
//     >
//       <ul ref={ref}>
      
//         {renderDays()}

//       </ul>
      
//     </FormField>
//   )
// })

export default DayAvailability