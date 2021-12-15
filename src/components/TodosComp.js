import { Todocontext } from '../contexts/TodoContext';
import { useContext, useState } from 'react';
import PromptWindowEdits from './PromptWindowEdits';

const CatagoriesComp = () => {
  //Bringing state from context
  const {
    state,

    handleDelCategory,
    handleEditCategory,
    handleDeleteTask,
    handleEditTask,
    handleCheckTask,
  } = useContext(Todocontext);

  const [userEditCat, setUserEditCat] = useState(null);
  const [userEditTask, setUserEditTask] = useState(null);

  //Delete Category Handler

  const deleteCategory = (id) => {
    handleDelCategory(id);
  };

  //Edit Category Handler

  const editCategory = (id) => {
    if (userEditCat === null) {
      return;
    }
    handleEditCategory(id, userEditCat);
  };

  //Delete Task Handler

  const deleteTask = (id) => {
    handleDeleteTask(id);
  };

  //Edit Task Handler

  const editTask = (id) => {
    // const userInput = prompt('New task name:');

    if (userEditTask === null) {
      return;
    }

    handleEditTask(id, userEditTask);
  };

  // Task checked Handler

  const checkTask = (id) => {
    handleCheckTask(id);
  };

  return (
    <div className="container mt-5">
      <div className="row px-5">
        <div className="col">
          {state.todos.length > 0 &&
            state.todos.map((item) => (
              <details
                key={item.id}
                className="position-relative p-3 border-start border-end border-danger "
              >
                <PromptWindowEdits
                  mainFunction={editCategory}
                  buttonClasses="far fa-edit position-absolute
                  top-0 start-2 mt-5 ms-1 fs-5"
                  theState={userEditCat}
                  setTheState={setUserEditCat}
                  data={item.id}
                  title="Enter a new category name:"
                  toastMsg="Please enter a category name "
                />
                <button
                  onClick={() => deleteCategory(item.id)}
                  className="
                  btn btn-danger
                  px-1
                  py-0
                  position-absolute
                  end-0
                  top-0
                  mt-5
                  me-3
                  "
                >
                  X
                </button>
                <summary
                  key={item.id}
                  id="catHeading"
                  className="ps-2 py-2 mt-2 text-center border-bottom border-danger "
                >
                  <h4>{item.title}</h4>
                </summary>
                {item.tasks.map((item, index) => {
                  return (
                    <ul key={index}>
                      <li
                        title={
                          item.checked
                            ? 'Double click to mark as unchecked'
                            : 'Double click to mark as checked'
                        }
                        onDoubleClick={() => checkTask(item.id)}
                        className=" position-relative w-100 border-0 border-bottom border-dark my-3 fs-5"
                        style={{
                          textDecoration: item.checked && 'line-through',
                        }}
                      >
                        <i
                          onClick={() => {
                            deleteTask(item.id);
                          }}
                          className="far fa-trash-alt position-absolute end-0 mt-2"
                        ></i>

                        <PromptWindowEdits
                          buttonClasses="fas fa-edit position-absolute end-0 mt-2 me-4"
                          theState={userEditTask}
                          setTheState={setUserEditTask}
                          mainFunction={editTask}
                          data={item.id}
                          title="Enter a new task name:"
                          toastMsg="Please enter a task name "
                        />
                        {item.name}
                      </li>
                    </ul>
                  );
                })}
              </details>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CatagoriesComp;
