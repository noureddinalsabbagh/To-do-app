import { v4 as uuid } from 'uuid';

const Reducer = (state, action) => {
  console.log('Action', action);
  console.log('State', state);

  switch (action.type) {
    // Add Task reducer case
    case 'ADDTODO':
      const updatedState1 = state.todos.map((item) => {
        return item.title.toLowerCase() === state.selectedCat.toLowerCase()
          ? {
              ...item,
              tasks: [
                ...item.tasks,
                {
                  name: action.payload.data,
                  id: uuid(),
                  checked: false,
                },
              ],
            }
          : item;
      });
      localStorage.setItem(
        'state',
        JSON.stringify({ ...state, todos: updatedState1 })
      );

      return { ...state, todos: updatedState1 };

    // Delete category reducer case

    case 'DELETECATEGORY':
      const updatedState2 = state.todos.filter((item) => {
        return item.id !== action.payload;
      });
      localStorage.setItem(
        'state',
        JSON.stringify({
          ...state,
          todos: updatedState2,
          selectedCat: '',
        })
      );
      return {
        ...state,
        todos: updatedState2,
        selectedCat: '',
      };

    // Add category reducer case

    case 'ADDCATEGORY':
      const updatedState3 = {
        ...state,
        selectedCat: action.payload.toLowerCase(),
        todos: [
          ...state.todos,
          {
            title: action.payload,
            id: uuid(),
            tasks: [],
          },
        ],
      };
      localStorage.setItem('state', JSON.stringify(updatedState3));
      return updatedState3;

    //  Edit category reducer case

    case 'EDITCATEGORY':
      const updatedState4 = state.todos.map((item) => {
        return item.id === action.payload.data
          ? { ...item, title: action.payload.newCategory }
          : item;
      });
      localStorage.setItem(
        'state',
        JSON.stringify({ ...state, todos: updatedState4 })
      );
      return { ...state, todos: updatedState4 };

    // Delete Task reducer Case

    case 'DELETETASK':
      const updatedState5 = state.todos.map((item) => {
        return {
          ...item,
          tasks: item.tasks.filter((i) => i.id !== action.payload),
        };
      });
      localStorage.setItem(
        'state',
        JSON.stringify({ ...state, todos: updatedState5 })
      );
      return { ...state, todos: updatedState5 };

    // Edit Task reducer Case

    case 'EDITTASK':
      const updatedState6 = state.todos.map((item) => {
        return {
          ...item,
          tasks: item.tasks.map((i) => {
            return i.id === action.payload.data
              ? { ...i, name: action.payload.newTask }
              : i;
          }),
        };
      });
      localStorage.setItem(
        'state',
        JSON.stringify({ ...state, todos: updatedState6 })
      );
      return { ...state, todos: updatedState6 };

    // Check Task reducer Case

    case 'CHECKTASK':
      const updatedState7 = state.todos.map((item) => {
        return {
          ...item,
          tasks: item.tasks.map((i) => {
            return i.id === action.payload ? { ...i, checked: !i.checked } : i;
          }),
        };
      });
      localStorage.setItem(
        'state',
        JSON.stringify({ ...state, todos: updatedState7 })
      );
      return { ...state, todos: updatedState7 };

    // for setting the category in the main state
    case 'SETCATEGORY':
      return { ...state, selectedCat: action.payload };

    // Set initial data received from local storage
    case 'INITIALDATA':
      return action.payload;

    default:
      return state;
  }
};

export default Reducer;
