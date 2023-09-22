import Body from "./Body";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { useEffect } from "react"
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios"
import { reducerCases } from "../utils/Constants";
import Footer from "./Footer";
const Spotify = () => {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();

  }, [dispatch, token]);


  return (
    <div className="w-screen min-h-[100vh] flex custom-bg">
      <SideBar />
      <div className=" sm:pl-[200px] w-full">
        <Navbar />
        <Body />
      </div>
      <Footer />
    </div>
  );
};

export default Spotify;
