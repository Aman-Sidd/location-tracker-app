import React, { Context, useReducer } from "react";

export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);
    const boundedActions = {};
    for (let key in actions) {
      boundedActions[key] = actions[key](dispatch);
    }
    return (
      <Context.Provider value={{ state, ...boundedActions }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};
