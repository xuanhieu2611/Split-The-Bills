import { Link } from "react-router-dom";

export default function LandingNav() {
  return (
    <div className="flex justify-center w-full fixed top-3"> 
      <div className="bg-[rgba(0,0,0,0.1)] h-10 w-5/6 flex items-center justify-around rounded-full shadow-md backdrop-blur-md">
        <div className="flex gap-2 items-center">
          <img className="w-8 h-8" src="/logo.png" alt="" />
          <span className="font-bold text-xl bg-green-500 bg-clip-text text-transparent tracking-wider">Split The Bills</span>
        </div>
        <ul className="flex gap-20">
          <li className="hover:scale-110 hover:bg-green-300 px-2 rounded-md transition ease-in-out duration-300"><a href="#Home">Home</a></li>
          <li className="hover:scale-110 hover:bg-green-300 px-2 rounded-md transition ease-in-out duration-300"><a href="#Features">Features</a></li>
          <li className="hover:scale-110 hover:bg-green-300 px-2 rounded-md transition ease-in-out duration-300"><a href="#Benefits">Benefits</a></li>
        </ul>
        
        <div className="flex gap-5 justify-center items-center">
          <Link className="bg-gradient-to-tr from-green-200 to-green-500 rounded-md px-5 hover:from-cyan-500 hover:to-blue-500 hover:translate-y-[-2px] hover:scale-105 transition ease-in-out duration-300" to="/login">
            <button>Login</button>
          </Link>
          <Link className="border-black border-2 rounded-md px-2 hover:shadow-[0px_0px_10px_rgb(34,197,94)] hover:translate-y-[-2px] hover:scale-105 transition ease-in-out duration-300" to="/register">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
