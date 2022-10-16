import './taskManager.css'
import Task from './Task'
import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db,logout} from './firebase'
import AddTask from './AddTask'
import { useNavigate } from "react-router-dom";

function TaskManager(props) {
  const navigate = useNavigate();

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
  },[])

  
  const user={props}
  console.log({user})
  return (
    <div className='taskManager'>
      
      <header>Welcome to Academic Lease {props.user?.displayName}</header>
      <button 
          onClick={logout}>
          logout
        </button>
      <div className='taskManager__container'>
        <button 
          onClick={() => setOpenAddModal(true)}>
          Post+
        </button>
        <div className='taskManager__tasks'>

          {tasks.map((task) => (
            <Task
              id={task.id}
              key={task.id}
              completed={task.data.completed}
              title={task.data.title} 
              description={task.data.description}
            />
          ))}

        </div>
        
      </div>
      {openAddModal &&
      
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal}/>
      }

    </div>
  )
}

export default TaskManager
