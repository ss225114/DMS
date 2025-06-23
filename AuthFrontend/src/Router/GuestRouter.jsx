import Recovery from "@/Modules/Auth/components/Recovery"
import SignIn from "@/Modules/Auth/components/SignIn"
import SignUp from "@/Modules/Auth/components/SignUp"
import LandingPage from "@/Modules/GuestModule/LandingPage"
import { Route, Routes } from "react-router-dom"


const GuestRouter = () => {
  return (
    <Routes>
        <Route index element={<LandingPage/>}/>
        <Route path="/login" element={<SignIn/>}/>
        <Route path="/registration" element={<SignUp/>}/>
        <Route path="/forgot-password" element={<Recovery/>}/>
    </Routes>
  )
}

export default GuestRouter