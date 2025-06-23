import {Link} from "react-router-dom";

const Navbar01 = () => {
  return (
    <div className="pt-5 pb-5 shadow-xl">
        <Link to="/login" className="p-5 hover:bg-slate-300 transition-all">Login</Link>
        <Link className="p-5 hover:bg-slate-300 transition-all">About Us</Link>
        <Link className="p-5 hover:bg-slate-300 transition-all">FAQs</Link>

    </div>
  )
}

export default Navbar01