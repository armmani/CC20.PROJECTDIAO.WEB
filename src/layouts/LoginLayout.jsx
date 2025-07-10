import { Outlet } from "react-router"
import Header from "../components/Header"
import Login from "../pages/Login"

function LoginLayout() {
  return (
    <div>
      <Header />
      <Login />
    </div>
  )
}
export default LoginLayout