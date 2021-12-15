import React from 'react';

const Warning = () => {
  return (
    <div className="container">
      <div
        id="warning"
        className="row py-1 text-center fs-5 text-danger lh-lg "
      >
        <div className="col">
          <p className="mb-0">Please enter a task</p>
        </div>
      </div>
    </div>
  );
};

export default Warning;
