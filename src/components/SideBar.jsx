import { AiFillHome } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"
import PlayLists from "./PlayLists";
const SideBar = () => {


    return (
        <div className="fixed  h-screen  left-0 hidden sm:block py-4 px-8 bg-[#121212] w-[200px]">
            <div className="h-screen w-full ">
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
                <PlayLists />
            </div>

        </div>
    );
};

export default SideBar;
