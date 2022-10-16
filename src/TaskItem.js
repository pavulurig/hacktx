import Modal from "./Modal"
import './taskItem.css'

function TaskItem({ onClose, open, title, description, email }) {

  return (
    <Modal modalLable='Task Item' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>{email}</h2>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </Modal>
  )
}

export default TaskItem
