import { useAuth } from "./Modules/Auth/Context/AuthContext";
import AuthLayout from "./Modules/Layouts/AuthLayout";
import GuestLayout from "./Modules/Layouts/GuestLayout";
import AuthRouter from "./Router/AuthRouter";
import GuestRouter from "./Router/GuestRouter";


function Playground() {
  const{token} = useAuth()

  return (
    <>
    {token ? (
      <AuthLayout>
        <AuthRouter />
      </AuthLayout>
    ) : (
      <GuestLayout>
        <GuestRouter />
      </GuestLayout>
    )}
  </>
  )
}

export default Playground;
