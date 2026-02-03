import React from 'react'
import axios from 'axios'
const BASE = 'http://localhost:4000'

export default function TaskList({ tasks, token, onChange }){
  const toggle = async (task) => {
    await axios.put(BASE + '/api/tasks/' + task._id, { status: task.status === 'pending' ? 'done' : 'pending' }, { headers: { Authorization: 'Bearer ' + token } })
    onChange()
  }
  const remove = async (task) => {
    if (!confirm('Delete task?')) return
    await axios.delete(BASE + '/api/tasks/' + task._id, { headers: { Authorization: 'Bearer ' + token } })
    onChange()
  }

  return (
    <ul>
      {tasks.map(t=> (
        <li key={t._id} style={{display:'flex',justifyContent:'space-between',padding:6,borderBottom:'1px solid #ddd'}}>
          <div>
            <strong>{t.title}</strong>
            <div>{t.description}</div>
            <div style={{fontSize:12,color:'#666'}}>{t.status}</div>
          </div>
          <div>
            <button onClick={()=>toggle(t)}>{t.status==='pending' ? 'Done' : 'Undo'}</button>
            <button onClick={()=>remove(t)} style={{marginLeft:8}}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  )
}
