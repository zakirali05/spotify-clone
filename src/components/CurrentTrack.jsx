import React, { useEffect } from 'react'
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';
import axios from 'axios';

const CurrentTrack = () => {
    const [{ token, currentPlaying }, dispatch] = useStateProvider();

    useEffect(() => {
        const getCurrentTrack = async () => {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/player/currently-playing",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
            if (response.data !== "") {
                const currentPlaying = {
                    id: response.data.item.id,
                    name: response.data.item.name,
                    artists: response.data.item.artists.map((artist) => artist.name),
                    image: response.data.item.album.images[2].url,
                };
                dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
            } else {
                dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
            }
        };
        getCurrentTrack();
    }, [token, dispatch]);
    return (
        <div>
            {currentPlaying && (
                <div className="track flex items-center gap-[1rem]">
                    <div className="track__image">
                        <img src={currentPlaying.image} alt="currentPlaying" />
                    </div>
                    <div className="track__info flex flex-col ">
                        <h4 className="track__info__track__name text-white font-semibold">{currentPlaying.name}</h4>
                        <h6 className="track__info__track__artists text-[#b3b3b3] text-sm">
                            {currentPlaying.artists[0]}, {currentPlaying.artists[1]}
                        </h6>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CurrentTrack