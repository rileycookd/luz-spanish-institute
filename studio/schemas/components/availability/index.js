import React from 'react'
import DayAvailability from './DayAvailability'
import { TextInput } from '@sanity/ui'
import FormField from 'part:@sanity/components/formfields/default'
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'

// 4. Create a Sanity PatchEvent based on a change in time value
const createPatchFrom = value => PatchEvent.from(value === '' ? unset() : set(value))

const Availability = React.forwardRef((props, ref) => {

  const {
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

  const handleChange = ({prevValue, newValue, onChange}) => {
    if (checkEqual(newValue, prevValue)) {
      onChange(PatchEvent.from(unset()))
    } else {
      onChange(PatchEvent.from(set(newValue)))
    }
  }

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const renderDays = () => days.map(d => (<DayAvailability day={d} onchange />))

  return (

    <FormField 
      description={type.description}
      title={type.title}              // Creates label from schema title
      // __unstable_markers={markers}    // Handles all markers including validation
      // __unstable_presence={presence}  // Handles presence avatars
      // compareValue={compareValue}     // Handles "edited" status
      // inputId={inputId}
    >
      <ul ref={ref}>
      
        {renderDays()}

      </ul>
      
    </FormField>
  )
})

export default Availability