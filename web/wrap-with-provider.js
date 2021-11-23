
import React from "react"
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from "react-redux"
import userReducer from './src/features/user'
import addRegistrationReducer from './src/features/addRegistration'
import { sanityApi } from './src/services/sanityApi'

export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts

  const store = configureStore({
    reducer: {
      user: userReducer,
      addRegistration: addRegistrationReducer,
      [sanityApi.reducerPath]: sanityApi.reducer,
    },
    middleware: (gDM) => gDM().concat(sanityApi.middleware)
  })

  return <Provider store={store}>{element}</Provider>
}

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)