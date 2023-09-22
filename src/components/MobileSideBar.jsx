import { AiFillHome } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"
import { RxCross2 } from "react-icons/rx"
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import PlayLists from "./PlayLists";
const MobileSideBar = () => {

    const [{ nav }, dispatch] = useStateProvider();
    const close = () => {
        dispatch({ type: reducerCases.SET_NAV, nav: false })
    }
    return (
        <div className={` sm:hidden  ${nav ? "navigation-animation" : "navigation-shift"}   fixed  h-screen  left-0 top-0   py-4 px-8 bg-[#121212] w-[220px]`} >
            <div className="h-screen w-full relative">
                <div className="logo">
                    <img
                        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
                        alt="Spotify"
                        className="h-10"
                    />
                </div>
                <div className="flex flex-col items-center justify-center mt-6 w-full gap-2">
                    <div className="flex w-full items-center justify-start cursor-pointer px-3 py-1 rounded-lg gap-5 hover:bg-black text-[#b3b3b3]"><AiFillHome />Home</div>
                    <div className="flex w-full items-center justify-start cursor-pointer px-3 py-1 rounded-lg  gap-5 hover:bg-black text-[#b3b3b3]"><BiSearch />Search</div>
                </div>
                <button onClick={close} className="absolute top-[8px] right-[-9px] text-white z-[100] text-xl sm:hidden"><RxCross2 /></button>
                <PlayLists />
            </div>

        </div>
    );
}

export default MobileSideBar