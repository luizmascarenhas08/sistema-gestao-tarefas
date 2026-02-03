import React, { useState } from 'react'
import axios from 'axios'
import './Login.css'

export default function Login({ setToken }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    try {
      const url = isRegister ? '/api/auth/register' : '/api/auth/login'
      const base = 'https://sgt-backend-v2.onrender.com'
      const res = await axios.post(base + url, isRegister ? { name, email, password } : { email, password })
      setToken(res.data.token)
    } catch (err) {
      alert(err.response?.data?.message || 'Error')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isRegister ? 'Criar Conta' : 'Acessar SGT'}</h2>
        <form onSubmit={submit}>
          {isRegister && (
            <div className="input-group">
              <label>Nome</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Seu nome" required/>
            </div>
          )}
          <div className="input-group">
            <label>E-mail</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="email@exemplo.com" required/>
          </div>
          <div className="input-group">
            <label>Senha</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="******" required/>
          </div>
          <button className="btn-primary" type="submit">
            {isRegister ? 'Registrar' : 'Entrar'}
          </button>
        </form>
        <button className="btn-secondary" onClick={()=>setIsRegister(v=>!v)}>
          {isRegister ? 'Já tem uma conta? Faça Login' : 'Não tem conta? Cadastre-se'}
        </button>
      </div>
    </div>
  )
}

