import { useState } from 'react'

// Custom hook to access state history for undo / redo
const useHistory = (initialState) => {

  // Initiate index at 0
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([initialState]);

  const setState = (action, overWrite = false) => {

    const newState = typeof action === "function" ? action(history[index]) : action;
    if(overWrite) {

      // Create a copy of the history
      const historyCopy = [...history];
      historyCopy[index] = newState;

      // Set history to the copy
      setHistory(historyCopy);

    } else {

      // History beyond current state is overwritten (e.g. new element is drawn)
      // Remove history elements beyond current index
      const updatedState = [...history].slice(0, index+1)

      // Add the new state into the history
      setHistory(prevState => [...updatedState, newState]);

      // Get the index of the previous state and add 1
      setIndex(prevState => prevState + 1);
    };
  };
  
  // Check if index is greater than 0; 
  // If index is greater than 0, go back 1 place in the history
  const undo = () => index > 0 && setIndex(prevState => prevState - 1);

  // Check if index is less than the history length - 1;
  // If it is, go forward 1 place in the history
  const redo = () => index < history.length - 1 && setIndex(prevState => prevState + 1);

  const deleteHistory = () => {
    setHistory([initialState]);
    setIndex(0);
  }

  return [history[index], setState, undo, redo, deleteHistory];
}

export default useHistory;