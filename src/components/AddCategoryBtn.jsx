import { useContext, useState } from 'react';
import { Todocontext } from '../contexts/TodoContext';
import PromptWindowAddCat from './PromptWindowAddCat';

const AddCategoryBtn = () => {
  const { handleAddCategory } = useContext(Todocontext);

  const [userInput, setUserInput] = useState(null);

  // Add Category Handler

  const AddCategory = () => {
    if (userInput === null) {
      return;
    }

    handleAddCategory(userInput);
    setUserInput(null);
  };

  return (
    <div className="container">
      <div className="row px-5">
        <div className="col d-flex justify-content-center">
          <PromptWindowAddCat
            setUserInput={setUserInput}
            userInput={userInput}
            AddCategory={AddCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCategoryBtn;
