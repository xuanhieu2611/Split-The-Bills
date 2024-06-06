import axios from 'axios';
import React, { useRef, useState } from 'react'
import useAuthContext from '../hooks/useAuthContext';

export default function AddMenu({onClose}) {
  const modalRef = useRef()
  const [inputs, setInputs] = useState({
    date: "",
    person: "",
    amount: 0,
    desc: "",
  })
  const {dispatch} = useAuthContext()

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"))
      const body = {
      ...inputs,
      uid: user.id,
      }
      await axios.post("https://split-the-bills-server.vercel.app/api/transactions/add", body)
      dispatch({
        type:"ADD_TRANSACTION",
        payload: inputs
      })
      onClose()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className='flex flex-col gap-3'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 place-self-end hover:bg-black hover:cursor-pointer hover:text-white" onClick={onClose}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg> 
        <form className='bg-gradient-to-r from-green-300 to-green-500 rounded-xl px-20 py-10 text-black flex flex-col gap-5' onSubmit={handleSubmit}>
          <div className='flex gap-5 justify-between items-center'>
            <p className='text-md font-bold underline-offset-2 underline'>Date</p>
            <input type="date" placeholder='2024-06-01' name='date' value={inputs.date} required className='p-2 rounded-sm' onChange={handleChange}/>
          </div>
          <div className='flex gap-5 justify-between items-center'>
            <p className='text-md font-bold underline-offset-2 underline'>Person</p>
            <input type="text" placeholder='Steven' name='person' value={inputs.person} required className='p-2 rounded-sm' onChange={handleChange}/>
          </div>
          <div className='flex gap-5 justify-between items-center'>
            <p className='text-md font-bold underline-offset-2 underline'>Amount</p>
            <input type="number" name='amount' value={inputs.amount} required className='p-2 rounded-sm' onChange={handleChange}/>
          </div>
          <div className='flex gap-5 justify-between items-center'>
            <p className='text-md font-bold underline-offset-2 underline'>Description</p>
            <input type="text" placeholder='Pizza, Milk, Pops' name='desc' value={inputs.desc} className='p-2 rounded-sm' onChange={handleChange}/>
          </div>
          <button className='w-3/6 bg-white font-bold text-lg p-3 rounded-xl place-self-center mt-5 hover:bg-green-500 hover:translate-y-[-2px] hover:shadow-md hover:shadow-black'>Add</button>
        </form>
      </div>
    </div>
  )
}
