import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';

export default function Register() {
  const [inputs, setInputs] = useState({
    username:"",
    password:"",
    rePassword:"",
  })
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (inputs.password != inputs.rePassword) {
      setError("Password doesn't match! Please enter again")
      setSuccess(null);
      return
    }

    if (inputs.password == inputs.rePassword) {
      try {
        const response = await axios.post("https://split-the-bills-server.vercel.app/api/users/register", {
          username: inputs.username,
          password: inputs.password
        })
        setError(null)
        setSuccess(response?.data)
      } catch (err) {
        if (typeof err.response?.data === 'string') setError(err.response?.data)
        setSuccess(null)
        console.error(err)
      }
    }
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-5">
      <div className='w-2/6 p-10 border-[1px] border-black flex flex-col items-center justify-center gap-5'>
        <div className='flex gap-3 justify-center items-center mb-5'>
          <img className="h-10 w-10"src="/logo.png" alt="" />
          <h1 className='text-3xl'>Split The Bills</h1>
        </div>
        <form className='w-64 flex flex-col gap-2' onSubmit={(e) => handleSubmit(e)}>
          <input className="bg-slate-100 border-solid border-[1px] rounded-sm border-black p-2" type="text" name='username' placeholder='username' onChange={handleChange} required/> 
          <input className="bg-slate-100 border-solid border-[1px] rounded-sm border-black p-2" type="password" name='password' placeholder='password' onChange={handleChange} required/>
          <input className="bg-slate-100 border-solid border-[1px] rounded-sm border-black p-2" type="password" name='rePassword' placeholder='Re-enter password' onChange={handleChange} required/>
          {error && <p className='text-center text-red-600'>{error}</p>}
          {success && <p className='text-center text-green-600'>{success}</p>}
          <button className='bg-gradient-to-tr from-green-200 to-green-500 rounded-lg mt-3 py-2 hover:from-cyan-500 hover:to-blue-500 hover:scale-110 transition ease-in-out duration-300'>Sign up</button>
        </form>
      </div>
      <div className='w-2/6 p-10 border-[1px] border-black flex flex-col items-center justify-center gap-5'>
        <span>Have an account? <Link className="text-blue-500 underline hover:text-blue-800" to="/login">Login</Link></span>
      </div>
    </div>
  )
}
