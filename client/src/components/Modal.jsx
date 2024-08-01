import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import {updateTask} from "../features/task/taskThunks.js";
import {useRef,useState} from 'react';
import './Modal.css';
import { addDays } from 'date-fns';


function Modal({task, onClose}) {
  const taskname = useRef(); 
  const describe = useRef();
  const preference = useRef();
  const deadline = useRef();
  const modalRef = useRef();
  const formRef = useRef();
  const notifyYes = useRef();
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(true); 

  const closeModal = (e) => {
    if (modalRef.current === e.target){
      onClose();
    }
  }

  const triggerFormSubmit = () => {
    formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const title = taskname.current.value;
    const description = describe.current.value;
    const priority = preference.current.value;
    const dueDate = deadline.current.value;
    console.log(deadline.current.value)
    let reminder = "";
    if (notifyYes.current.checked === true){
      reminder = true
  }
  else{
      reminder = false
  };
    taskname.current.value = "";
    describe.current.value = "";
    preference.current.value = "";
    deadline.current.value = "";
    notifyYes.current.value = "";
    const newTask = {
      title,
      description,
      priority,
      dueDate,
      reminder
  }
  
    handleUpdateTask(task._id,newTask);

    setShowEditModal(false); 
    setTimeout(() => {
      setShowSuccessModal(true); 
    }, 300);
    
    setShowSuccessModal(true);
 
}
const handleUpdateTask = async(id,editTask) => {
    await dispatch(updateTask({
        taskId: id,
        taskData: {editTask}
      }));
}

const formatDateToInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


  return (
        <>
              <div ref={modalRef} onClick={closeModal} className='modal' size="large">
                {showEditModal && ( <div data-test-modal="" role="dialog" tabIndex="-1" className="layer">
                    <span className='text'>dialog content start</span>
                    <button onClick={onClose} className="close-btn">
                      <IoCloseSharp />
                    </button>
                    <div className='edit-header'>
                        <h2 className='header'>Edit task</h2>
                    </div>
                    <div className='edit-content'>
                      <form ref={formRef} className="form" onSubmit={handleUpdate}> 
                        <div>
                          <label htmlFor="title" className="block text-gray-700 font-bold">Title:</label>
                          <input
                              id="title"
                              type="text"
                              defaultValue={task.title}
                              ref={taskname}
                              className="addtask"
                              required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-bold">Description</label>
                          <input
                            type="text"
                            defaultValue={task.description}
                            ref={describe}
                            className='addtask'
                          />
                        </div>
                        <div>
                          <label htmlFor="priority" className="block text-gray-700 font-bold">Priority:</label>
                          <select
                              id="priority"
                              defaultValue={task.priority}
                              ref={preference}
                              className="addtask"
                          >
                              <option value="minor">Minor</option>
                              <option value="moderate">Moderate</option>
                              <option value="critical">Critical</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="dueDate" className="block text-gray-700 font-bold">Due Date:</label>
                          <input
                              id="dueDate"
                              defaultValue={formatDateToInput(addDays(task.dueDate,1))}
                              type="date"
                              ref={deadline}
                              className="addtask"
                              min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div>
                          <label htmlFor="Reminder" className="block text-gray-700 font-bold radio" >Reminder: &nbsp;
                              <label className='radio-space'>
                                  <input className="radio-button" type="radio" name="reminder" value="no" defaultChecked={task.reminder === false}/> No
                              </label>
                              <label className='radio-space'>
                                  <input className="radio-button" type="radio" name="reminder" value="yes" ref={notifyYes} defaultChecked={task.reminder === true}/> Yes
                              </label>
                          </label>
                        </div>
                      </form>
                    </div>
                    <div className='edit-footer' onClick={() => {triggerFormSubmit();}}>
                        <button type="submit" className='save-btn'>Save</button>
                    </div>
                </div>
                 )}
              
             
                {showSuccessModal && (
                    <div className='update-done'>
                      <button onClick={() => {onClose();}} className="close-btn">
                        <IoCloseSharp />
                      </button>
                      <img src='/save.png' x="0" y="0" width="128" height="128"/>
                      <p className='header'>Your task is saved</p>
                    </div>
                )}
              </div>
        </>
         
         
  )
}

export default Modal


