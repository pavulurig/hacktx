import './taskManager.css'
import Task from './Task'
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db, logout } from './firebase'
import AddTask from './AddTask'
import { useNavigate } from 'react-router-dom'

function TaskManager({ user }) {

  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/");
  }
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

  const newtasks = tasks.filter((task) => task.data.email === user.email)
  return (
    <div className='taskManager'>
      <header>Welcome to Academic Lease {user?.displayName}    <button
        className='btn'
        onClick={handleClick}>
        logout
      </button>
      </header>

      <div className='taskManager__container'>
        <button
          onClick={() => setOpenAddModal(true)}>
          Post+
        </button>
        <div className='taskManager__tasks'>

          {newtasks.map((task) => (
            <Task
              id={task.id}
              email={task.data.email}
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
