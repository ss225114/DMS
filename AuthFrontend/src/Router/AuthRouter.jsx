import ChangePassword from "@/Modules/Dashboard/components/ChangePassword"
import Dashboard from "@/Modules/Dashboard/Dashboard"
import DocumentWindow from "@/Modules/Dashboard/DMScomponents/DocumentWindow"
import { Route, Routes } from "react-router-dom"


const AuthRouter = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />}/>
      <Route path="/files" element={<DocumentWindow />}/>
      <Route path="/change-password" element={<ChangePassword />}/>
    </Routes>
  )
}

export default AuthRouter
{/* <Route path="/profile" element={<Profile/>}/>
      <Route path="/add-player" element={<AddPlayer/>}/>
      <Route path="/players" element={<Players/>}/>
      <Route path="/update-player-proflie" element={<UpdatePlayerProfile/>}/>
      <Route path="/edit/player/:id" element={<UpdatePage/>}/> */}