import React, { useReducer } from 'react';

const initialState = {
  sidebarOpen: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };
      case 'CLOSE_SIDEBAR':
        return {
          ...state,
          sidebarOpen: false,
        };     
      case 'OPEN_SIDEBAR':
        return {
          ...state,
          sidebarOpen: true,
        };           
    default:
      return state;
  }
};

export const SidebarContext = React.createContext();

const SidebarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SidebarContext.Provider value={{ state, dispatch }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
