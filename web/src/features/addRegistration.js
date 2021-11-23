import { createSlice } from "@reduxjs/toolkit"

const initialStateValue = {
  size: "",
  days: [],
  chosenLanguage: {},
  chosenClassType: {},
  chosenPackage: {}
}

export const addRegistrationSlice = createSlice({
  name: "addRegistration",
  initialState: initialStateValue,
  reducers: {
    changeLanguage: (state, action) => {
      if(state.chosenLanguage._id !== action.payload._id) {
        state.chosenClassType = {};
        state.size = "";
        state.chosenPackage = {};
      }
      state.chosenLanguage = action.payload;
    },
    changeQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    changeClassType: (state, action) => {
      if(state.chosenClassType._id !== action.payload._id) state.size = "";
      state.classType = action.payload.title;
      state.chosenClassType = action.payload;
    },
    changeSize: (state, action) => {
      state.size = action.payload;
    },
    changeDays: (state, action) => {
      let newState = []
      if(state.days.length) {
        const filteredState = state.days
          .map(d => ({...d}))
          .filter(d => (
            action.payload.includes(d.day) === true
          ))
        const filteredStateDays = filteredState
          .map(d => (
            d.day
          ))
        const newArray = action.payload
          .map(d => {
            if(filteredStateDays.includes(d)) {
              return filteredState[filteredStateDays.indexOf(d)]
            } else {
              return {day: d, time: '', duration: ''}
            }
          })
          newState = newArray
      } else {
        newState = action.payload
          .map(d => {
            return {day: d, time: '', duration: ''}
          })
      }  
      state.days = [...newState]
    },
    changeTimes: (state, action) => {
      state.days = state.days
        .map((d, i) => {
          return {day: d.day, ...action.payload[i] }
        });
    },
    changePackage: (state, action) => {
      state.chosenPackage = action.payload;
    }
  }
});

export const { 
  changeQuantity, 
  changeClassType, 
  changeSize, 
  changeDays, 
  changeTimes,
  changeLanguage,
  changePackage,
} = addRegistrationSlice.actions; 

export default addRegistrationSlice.reducer; 