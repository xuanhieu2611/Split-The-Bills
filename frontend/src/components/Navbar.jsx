import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

export default function Navbar() {

  const {logout} = useAuthContext()

  return (
    <div className="flex justify-center w-full fixed top-3"> 
      <div className="bg-[rgba(0,0,0,0.1)] h-10 w-5/6 flex items-center justify-around rounded-full shadow-md backdrop-blur-sm">
        <div className="flex gap-2 items-center">
          <img className="w-8 h-8" src="/logo.png" alt="" />
          <span className="font-bold text-xl bg-green-500 bg-clip-text text-transparent tracking-wider">Split The Bills</span>
        </div>
        <Link className="bg-gradient-to-tr from-green-200 to-green-500 rounded-md px-5 hover:from-cyan-500 hover:to-blue-500 hover:translate-y-[-2px] hover:scale-105 transition ease-in-out duration-300" to="/login" onClick={logout}>
          Logout
        </Link>
      </div>
    </div>
  )
}
