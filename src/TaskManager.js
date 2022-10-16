import './taskManager.css'
import Task from './Task'
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore"
import { db, logout } from './firebase'
import AddTask from './AddTask'

function TaskManager({ user }) {

  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])


  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const taskColRef = query(collection(db, 'posts'), orderBy('created', 'desc'))
    onSnapshot(taskColRef, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])


  const name = user && user.email
  return (
    <div className='taskManager'>
      <header>Welcome to Academic Lease {user?.displayName}    <button
        className='btn'
        onClick={logout}>
        logout
      </button>
      </header>

      <div className='taskManager__container'>
        <button
          onClick={() => setOpenAddModal(true)}>
          Post+
        </button>
        <div className='taskManager__tasks'>

          {tasks.map((task) => (
            <Task
              id={task.id}
              email={task.email}
              key={task.id}
              completed={task.data.completed}
              title={task.data.title}
              description={task.data.description}
            />
          ))}

        </div>

      </div>
      {openAddModal &&

        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} email={user?.email} />
      }

    </div>
  )
}

export default TaskManager
