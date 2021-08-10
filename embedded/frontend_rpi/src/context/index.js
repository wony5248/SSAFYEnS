import React, { createContext, useState, useContext } from 'react'

const Context = createContext()

export function UserContextProvider({ children }) {
  var mode = window.localStorage.getItem('isdark');
  mode = JSON.parse(mode)
  const [isdarked, setIsdarked] = useState(mode)
  return (
    <Context.Provider
      value={{
        isdarked,
        setIsdarked,
      }}
    >
      {children}
    </Context.Provider>
  )
}

//이걸 이용해서 value에 있는 값에 접근 할 수 있다.
//예를들어 const {user} = useUserContext(); 를 하면 user상태값을 빼올 수 있음
export function useUserContext() {
  return useContext(Context)
}