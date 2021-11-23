import React, { useContext, useState, useEffect, createContext } from "react";
import { useIdentityContext } from "react-netlify-identity-gotrue"

const UserDataContext = createContext();

function UserDataProvider({ children }) {
  // Initialize state
  const [user, setUser] = useState({})
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const identity = useIdentityContext()


  const userQuery = `
    *[netlifyId == $id]{
      ...,
      classes[]{
        ...,
        content[]{
          _type != 'resource' => @,
          _type == 'resource' => @->{
            ...
          }
        }    
      }
    }
  `
  useEffect(() => {
    setUser(identity.user)
  })

  useEffect(() => {
    if(user) {
      fetch(`https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=${userQuery}&$id="${user.id}"`)
      .then(response => response.json())
      .then(data => {
        setData(data.result[0])
        setIsLoading(false)
      })
      .catch((error) => console.log(error));
    }
  }, [user])

  return (
    <UserDataContext.Provider value={{ data, isLoading }}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserDataProvider;

// Create a hook to use the UserData, this is a Kent C. Dodds pattern
export function useUserContext() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}