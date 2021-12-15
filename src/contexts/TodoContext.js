// React Imports
import { createContext, useReducer, useEffect } from 'react';
// Reducer Function
import Reducer from './Reducder';

//React Toast
import toast from 'react-hot-toast';

//Creating Context
export const Todocontext = createContext();

export const TodoProvider = (props) => {
  // Creating main State

  const [state, dispatch] = useReducer(Reducer, {
    todos: [],
    selectedCat: '',
  });

  //Use Effect to fetch data from local storage

  useEffect(() => {
    const data = localStorage.getItem('state');
    if (data) {
      dispatch({ type: 'INITIALDATA', payload: JSON.parse(data) });
    }
  }, []);

  // Add task Handler
  const handleAddTask = (selectedCat, data) => {
    if (selectedCat === '') {
      toast.error('Please choose a category');
    }
    dispatch({
      type: 'ADDTODO',
      payload: { selectedCat, data },
    });
  };

  // Delete Category Handler

  const handleDelCategory = (data) => {
    dispatch({
      type: 'DELETECATEGORY',
      payload: data,
    });
  };

  //Add Category Handler

  const handleAddCategory = (newCategory) => {
    const repeated = state.todos.find(
      (item) => newCategory.toLowerCase() === item.title.toLowerCase()
    );

    if (repeated) {
      toast.error('Category already exists');
    } else {
      dispatch({ type: 'ADDCATEGORY', payload: newCategory });
    }
  };

  //Edit Category Handler

  const handleEditCategory = (data, newCategory) => {
    dispatch({
      type: 'EDITCATEGORY',
      payload: { data, newCategory },
    });
  };

  // Delete Task Handler

  const handleDeleteTask = (data) => {
    dispatch({ type: 'DELETETASK', payload: data });
  };

  //Edit Task Handler

  const handleEditTask = (data, newTask) => {
    dispatch({ type: 'EDITTASK', payload: { data, newTask } });
  };

  //Check Task Handler

  const handleCheckTask = (data) => {
    dispatch({ type: 'CHECKTASK', payload: data });
  };

  //Set Category

  const handleSetCategory = (value) => {
    dispatch({ type: 'SETCATEGORY', payload: value });
  };

  return (
    <Todocontext.Provider
      value={{
        state,

        handleDelCategory,
        handleEditCategory,
        handleAddTask,
        handleAddCategory,
        handleDeleteTask,
        handleEditTask,
        handleCheckTask,
        handleSetCategory,
      }}
    >
      {props.children}
    </Todocontext.Provider>
  );
};
