import axios from "axios"
import { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import { BiSolidMusic } from "react-icons/bi"
const PlayLists = () => {
    const [{ token, playlists }, dispatch] = useStateProvider();

    useEffect(() => {
        const getPlaylistData = async () => {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/playlists",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
            const { items } = response.data;
            const playlists = items.map(({ name, id }) => {
                return { name, id };
            });
            dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
        };
        getPlaylistData();
    }, [token, dispatch]);
    const changeCurrentPlaylist = (selectedPlaylistId) => {
        dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
    };
    return (
        <div className="pl-3 mt-16 overflow-y-scroll h-full ">
            <div className="text-[#b3b3b3] flex flex-col items-start justify-start gap-3">
                <h1 className="text-lg font-semibold text-white  mb-3 flex gap-2 items-center "> <BiSolidMusic />  Playlists</h1>
                {playlists.map(({ name, id }) => {
                    return (
                        <div className="hover:text-white hover:underline cursor-pointer" key={id} onClick={() => { changeCurrentPlaylist(id); dispatch({ type: reducerCases.SET_NAV, nav: false }) }}>
                            {name}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default PlayLists