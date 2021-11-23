import React, { createContext, useState, UserContext, useContext } from 'react'

const FormContext = createContext()

export const FormDataProvider = ({children}) => {
  const [data, setData] = useState({})

  const setValues = (values) => {
    setData(prevData => ({
      ...prevData,
      ...values
    }))
  }

  return <FormContext.Provider value={{ data, setValues }}>{children}</FormContext.Provider>
}

export const useData = () => useContext(FormContext)