import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

const BASE = 'http://localhost:4000'

export default function Dashboard({ token, setToken }) {
  const [tasks, setTasks] = useState([])

  const fetchTasks = async () => {
    const res = await axios.get(BASE + '/api/tasks', { headers: { Authorization: 'Bearer ' + token } })
    setTasks(res.data)
  }

  useEffect(()=>{ fetchTasks() }, [])

  const logout = () => setToken(null)

  return (
    <div style={{maxWidth:800, margin:'20px auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Your Tasks</h2>
        <button onClick={logout}>Logout</button>
      </div>
      <TaskForm token={token} onCreated={fetchTasks} />
      <TaskList tasks={tasks} token={token} onChange={fetchTasks} />
    </div>
  )
}
