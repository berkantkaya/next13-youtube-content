import { getCurrentUser } from "@/app/actions/getCurrentUser"
import CardCount from "./CardCount"
import HamburgerMenu from "./HamburgerMenu"
import Logo from "./Logo"
import Search from "./Search"
import User from "./User"

const Navbar = async () => {
    const currentUser = await getCurrentUser();
  return (
    <div className="flex items-center justify-between gap-3 md:gap-10 px-3 md:px:10 h-16 bg-orange-600 text-slate-100">
        <Logo/>
        <Search/>
        <CardCount/>
        <User currentUser={currentUser}/>
        <HamburgerMenu/>
    </div>
  )
}

export default Navbar