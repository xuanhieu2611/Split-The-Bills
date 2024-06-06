import { useEffect, useState } from "react"


export default function Summary({person, amount}) {
  const [average, setAverage] = useState(0)

  useEffect(() => {
    let sum = 0
    const people = person.length 
    if (amount.length > 0) {
      amount.forEach( num => sum+=parseInt(num))
      setAverage(Math.round(sum / people))
    }
  }, [amount])

  return (
    <table className='table-auto w-5/6'>
      <thead className='bg-gray-50 border-b-2 border-gray-200'>
        <tr>
          <th></th> 
          {person && person.map(item => (
            <th key={item} className='p-3 text-md font-semibold tracking-wide text-left'>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody className='bg-gray-50'>
        <tr>
          <td className='p-3 text-sm text-gray-700'>Paid</td>
          {amount && amount.map(item => (
            <td key={item} className='p-3 text-sm text-gray-700'>{item}</td>
          ))}
        </tr>
        <tr>
          <td className='p-3 text-sm text-gray-700'>Need to pay</td>
          {amount && amount.map(item => (
            <td key={item} className='p-3 text-sm text-gray-700'>{average - parseInt(item)}</td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}
