import './App.css';
// React Imports
import { useState } from 'react';
// Bootstrap Css
import 'bootstrap/dist/css/bootstrap.min.css';

//Toaster for errors
import { Toaster } from 'react-hot-toast';

//Components
import Header from './components/Header';
import Warning from './components/Warning';
import TodosComp from './components/TodosComp';
import AddCategoryBtn from './components/AddCategoryBtn.jsx';

function App() {
  //State for showing warning
  const [showWarning, setShowWarning] = useState(false);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header setShowWarning={setShowWarning} showWarning={showWarning} />
      {showWarning && <Warning />}
      <TodosComp />
      <AddCategoryBtn />
    </>
  );
}

export default App;
