import { Link } from "react-router-dom"
import Dropdown from "../Dashboard/components/Dropdown"

const DmsNavbar = () => {
  return (
    <div className="flex flex-row justify-between shadow-xl">
    <div className="pt-6 pb-6">
    <Link to="/" className="p-6 hover:bg-slate-300 transition-all">
        Home
      </Link>
      <Link to="/files" className="p-6 hover:bg-slate-300 transition-all">
        Documents
      </Link>
    </div>
      <div>
        <Dropdown/>
      </div>
      
    </div>
  )
}

export default DmsNavbar