import { createSlice } from "@reduxjs/toolkit"

const initialStateValue = {
  name: "",
  email: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState: { value: { name: "", email: ""} },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
  }
});

export const { login, logout } = userSlice.actions; 

export default userSlice.reducer;