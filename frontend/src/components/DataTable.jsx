import axios from "axios"
import { useEffect, useState } from "react"
import AddMenu from "./AddMenu"
import useAuthContext from "../hooks/useAuthContext"

export default function Table() {
  const [showAdd, setShowAdd] = useState(false)
  const {currentUser, state, dispatch} = useAuthContext()
  const {transactions} = state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/transactions/${currentUser.id}`)
        dispatch({
          type: "SET_TRANSACTIONS",
          payload: response.data
        })
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/transactions/delete/${id}`)
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: {id: id}
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="w-3/6 flex flex-col items-center justify-center gap-5">
      <table className="table-auto w-5/6">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="p-3 text-md font-semibold tracking-wide text-left">Date</th>
            <th className="p-3 text-md font-semibold tracking-wide text-left">Name</th>
            <th className="p-3 text-md font-semibold tracking-wide text-left">Amout</th>
            <th className="p-3 text-md font-semibold tracking-wide text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.map(item => (
            <tr className="bg-gray-50 hover:font-bold group" key={item.id}>
              <td className="p-3 text-sm text-gray-700">{item.date.slice(0,10)}</td>
              <td className="p-3 text-sm text-gray-700">{item.person}</td>
              <td className="p-3 text-sm text-gray-700">{item.amount}</td>
              <td className="p-3 text-sm text-gray-700 flex justify-between">
                {item.desc}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 invisible group-hover:visible hover:cursor-pointer hover:fill-red-500 hover:scale-110" onClick={() => handleDelete(item.id)}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* SHOW ADD MENU */}
      <button className="bg-gradient-to-r from-green-300 to-green-500 py-2 px-3 rounded-2xl hover:shadow-[1px_5px_10px_rgba(0,0,0,0.3)] hover:translate-y-[-2px]" onClick={() => setShowAdd(true)}>
        Add Transactions
      </button>
      {showAdd && <AddMenu onClose={() => setShowAdd(false)}/>}
    </div>
  )
}
