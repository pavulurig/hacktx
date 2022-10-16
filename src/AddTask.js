import Modal from "./Modal"
import { useState } from 'react'
import './addTask.css'
import { db } from './firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

function AddTask({ onClose, open, email }) {
  const [fullname, setfullName] = useState(email)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'posts'), {
        email: fullname,
        title: title,
        description: description,
        completed: false,
        created: Timestamp.now()
      })
      onClose()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Modal modalLable='Create Post' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addTask' name='addTask'>
        <input
          type='text'
          name='name'
          onChange={(e) => setfullName(e.target.value.toUpperCase())}
          value={email}
          placeholder='Enter Username' />
        <input
          type='text'
          name='title'
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
          placeholder='Enter title of Post' />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter decription'
          value={description}></textarea>
        <button type='submit'>Done</button>
      </form>
    </Modal>
  )
}

export default AddTask
