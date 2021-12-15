import { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

import { Todocontext } from '../contexts/TodoContext';

const Header = ({ setShowWarning }) => {
  const { state, handleAddTask, handleSetCategory } = useContext(Todocontext);

  //State to save value of the input
  const [inputVal, setInputVal] = useState('');

  //Submit Handler to add task

  const SubmitHandler = (e) => {
    e.preventDefault();

    //"If" case to show warning if input value is empty
    if (inputVal === '') {
      setShowWarning(true);
      return;
    }
    if (state.selectedCat === '') {
      toast.error('Please choose a category');
      return;
    }

    //Handling changes on the state from the context
    handleAddTask(state.selectedCat, inputVal);
    handleSetCategory(state.selectedCat);

    setInputVal('');

    //Setting the select category value to the next option value if first was deleted

    //Resetting the form
    e.target.reset();
  };

  return (
    <div className="container mb-5">
      <div className="row pt-5 px-5">
        <div className="col">
          <form autoComplete="off" className="d-flex" onSubmit={SubmitHandler}>
            <input
              onFocus={() => setShowWarning(false)}
              onChange={(e) => setInputVal(e.target.value)}
              id="add-task-space"
              className="form-control w-75 px-2"
              type="text"
              placeholder="add a task ..."
              aria-label="default input example"
            />
            <label htmlFor="category" className="mx-2 lh-lg">
              under
            </label>
            <select
              name="category"
              id="category"
              className="px-2"
              value={state.selectedCat}
              onChange={(e) => {
                handleSetCategory(e.target.value);
              }}
            >
              <option value="" defaultValue={state.selectedCat === ''}>
                Choose Category
              </option>
              {state.todos.length > 0 &&
                state.todos.map((item) => {
                  return (
                    <option
                      defaultValue={
                        state.selectedCat.toLowerCase() ===
                        item.title.toLowerCase()
                      }
                      key={item.id}
                      value={item.title.toLowerCase()}
                    >
                      {item.title.toLowerCase()}
                    </option>
                  );
                })}
            </select>
            <input type="submit" className="btn btn-secondary ms-2 px-4" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
