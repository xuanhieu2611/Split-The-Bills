import React from 'react'

const data = [
    {
        img: "conversation.jpg",
        desc: "Save time and avoid awkward conversations.",
    },
    {
        img: "keeptrack.jpg",
        desc: "Keep track of all your shared expenses in one place.",
    },
    {
        img: "split.jpg",
        desc: "Transparent and fair splitting for everyone.",
    },
]

export default function Benefits() {
  return (
    <div id="Benefits" className='mt-10 flex flex-col items-center justify-center'>
        {data.map((item,index) => (
            <div className="flex flex-col md:flex-row gap-2 lg:gap-20 items-center justify-center w-5/6 m-5" key={item.desc}>
                {index%2 == 0 && <img className=""src={item.img} alt="" />}
                <p className='text-center text-3xl'>{item.desc}</p>
                {index%2 == 1 && <img className=""src={item.img} alt="" />}
            </div>
        ))}
    </div>
  )
}
