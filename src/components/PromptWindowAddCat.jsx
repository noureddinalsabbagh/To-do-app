import { Button, Modal } from 'react-bootstrap';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';

export default function PromptWindowAddCat({
  userInput,
  setUserInput,
  AddCategory,
}) {
  // Show modal state
  const [show, setShow] = useState(false);

  const inpRef = useRef();

  //Handle close modal

  const handleClose = () => {
    setShow(false);
  };

  //Handle show Modal
  const handleShow = () => {
    setShow(true);
    setTimeout(() => {
      inpRef.current.focus();
    }, 0);
  };

  return (
    <>
      <Button
        className="w-50 btn btn-warning w-40 mt-3"
        variant="primary"
        onClick={handleShow}
      >
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (userInput) {
              AddCategory();
              handleClose();
            } else {
              toast.error('Please enter a category name');
            }
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>New category Name:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              ref={inpRef}
              className="modalInput"
              onChange={(e) => setUserInput(e.target.value)}
              type="text"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
