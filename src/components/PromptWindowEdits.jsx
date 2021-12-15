import { useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-hot-toast';

const PromptWindowEdits = ({
  mainFunction,
  data,
  title,
  theState,
  setTheState,
  buttonClasses,
  toastMsg,
}) => {
  // Show modal state
  const [show, setShow] = useState(false);

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
  //Reference to activate focus on modal input focus
  const inpRef = useRef();

  return (
    <>
      <i onClick={handleShow} className={buttonClasses}></i>

      <Modal show={show} onHide={handleClose}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (theState) {
              mainFunction(data);
              handleClose();
            } else {
              toast.error(`${toastMsg}`);
            }
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              ref={inpRef}
              className="modalInput"
              onChange={(e) => setTheState(e.target.value)}
              type="text"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default PromptWindowEdits;
