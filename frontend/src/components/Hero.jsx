import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <div id="Home" className='flex flex-col md:flex-row lg:gap-10 items-center justify-center h-screen w-screen mt-20 md:mt-0'>
      <div className="w-3/6">
        <h1 className="text-7xl [text-wrap:balance] tracking-wide"> Simplify Your Shared Expenses</h1>
        <p className="mt-5 text-xl">Easily split bills with friends or colleagues.</p>
        <Link to="/register">
          <button className="bg-gradient-to-tr from-green-200 to-green-500 px-6 py-2 rounded-full mt-5 hover:shadow-[0px_0px_16px_rgb(6,182,212)] hover:translate-y-[-4px] hover:scale-105 transition ease-in-out duration-300">Sign Up</button>
        </Link>
      </div>
      <img className="h-3/6 mb-5 md:mb-0"src="/charthero.png" alt="" />
    </div>
  )
}
