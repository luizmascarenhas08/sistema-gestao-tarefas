import React, { useState } from 'react'
import axios from 'axios'
const BASE = 'https://sistema-gestao-tarefas.onrender.com'

export default function TaskForm({ token, onCreated }){
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')

  const submit = async e =>{
    e.preventDefault()
    await axios.post(BASE + '/api/tasks', { title, description }, { headers: { Authorization: 'Bearer ' + token } })
    setTitle(''); setDescription('')
    onCreated()
  }

  return (
    <form onSubmit={submit} style={{marginBottom:20}}>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
      <input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <button type="submit">Add Task</button>
    </form>
  )
}
