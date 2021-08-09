import { createContext, useReducer } from "react";
import { IS_DARK } from "./actionTypes";

const initialState = {
  isDark: 0,
};

const Context = createContext({});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_DARK:
      return {
        ...state,
        idDark: [
          ...state.isDark, action.payload
        ],
      };
    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};


export { Context, Provider };