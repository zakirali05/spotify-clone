import { BiSearch, BiSolidUserCircle } from "react-icons/bi"
import { GiHamburgerMenu } from "react-icons/gi"
import { useStateProvider } from "../utils/StateProvider";

import MobileSideBar from "./MobileSideBar";
import { reducerCases } from "../utils/Constants";
const Navbar = () => {

    const [{ userInfo, navScrolled }, dispatch] = useStateProvider();
    const open = () => {
        dispatch({ type: reducerCases.SET_NAV, nav: true })
    }

    return (
        <div className={`sticky top-0 p-3 pt-5 ${navScrolled ? "blurNav " : ""}`}>
            <div className="flex items-center justify-between ">
                <button onClick={open} className="sm:hidden p-2 text-white text-xl"><GiHamburgerMenu /></button>
                <form className=" hidden sm:flex items-center justify-center gap-2  bg-white rounded-lg px-2">
                    <input type="text" placeholder="Artists, Songs or Podcasts" className="w-full h-full p-2 focus:outline-0" />
                    <button type="submit" className="px-1 text-lg"><BiSearch /></button>
                </form>

                <a href={userInfo?.userUrl} target="blank"> <div className="flex items-center justify-between gap-3 p-2 rounded-lg   bg-[#121212] text-white font-bold"><BiSolidUserCircle className="h-6" />{userInfo?.name}</div></a>
            </div>
            <MobileSideBar />
        </div>
    )
};

export default Navbar;
