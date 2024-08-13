import React from 'react'
import Modal from 'react-modal';

const ModalDelete = ({...props}) => {
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
        },
      };
      
  return (
    <Modal
        isOpen={props.isOpen}
        contentLabel="Example Modal"
        style={customStyles}
    >
    <h1 className='font-semibold mb-6'>{props.title}</h1>
    <div className='w-[150px] flex justify-between'>
        <button onClick={props.handleClose}>Cancel</button>
        <button onClick={props.handleDelete} className='font-semibold bg-red-600 text-white p-1.5 px-2 rounded-lg'>Delete</button>
    </div>
    </Modal>
  )
}

export default ModalDelete