import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useAuthContext from '../hooks/useAuthContext'

export default function Login() {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })

  const [error, setError] = useState(null);

  const {login} = useAuthContext()

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs((prev) => ({...prev, [name] : value}))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      await login(inputs)
      setError(null)
      navigate("/home")
    } catch (err) {
      if (typeof err.response?.data === 'string') setError(err.response?.data)
      console.error(err)
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
          <input className="bg-slate-100 border-solid border-[1px] rounded-sm border-black p-2" type="text" placeholder='username' name="username" value={inputs.username} onChange={e => handleChange(e)} required/>
          <input className="bg-slate-100 border-solid border-[1px] rounded-sm border-black p-2" type="password" placeholder='password' name="password" value={inputs.password} onChange={e => handleChange(e)} required/>
          {error && <p className="text-red-600 [text-wrap: balance]">{error}</p>}
          <button className='bg-gradient-to-tr from-green-200 to-green-500 rounded-lg mt-3 py-2 hover:from-cyan-500 hover:to-blue-500 hover:scale-110 transition ease-in-out duration-300'>Log in</button>
        </form>
      </div>
      <div className='w-2/6 p-10 border-[1px] border-black flex flex-col items-center justify-center gap-5'>
        <span>Don't have account? <Link className="text-blue-500 underline hover:text-blue-800" to="/register">Sign Up</Link></span>
      </div>
    </div>
  )
}
