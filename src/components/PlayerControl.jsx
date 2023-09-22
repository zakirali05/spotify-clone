import React from 'react'
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';
import { BsShuffle } from "react-icons/bs"
import { CgPlayTrackPrev, CgPlayTrackNext } from "react-icons/cg"
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs"
import { FiRepeat } from "react-icons/fi"

const PlayerControl = () => {
    const [{ token, playerState }, dispatch] = useStateProvider();

    const changeState = async () => {
        const state = playerState ? "pause" : "play";
        await axios.put(
            `https://api.spotify.com/v1/me/player/${state}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
        dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: !playerState,
        });
    };


    const changeTrack = async (type) => {
        await axios.post(
            `https://api.spotify.com/v1/me/player/${type}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
        const response1 = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
        if (response1.data !== "") {
            const currentPlaying = {
                id: response1.data.item.id,
                name: response1.data.item.name,
                artists: response1.data.item.artists.map((artist) => artist.name),
                image: response1.data.item.album.images[2].url,
            };
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
        } else {
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
        }
    };
    return (
        <div className='flex items-center justify-center gap-[2rem]'>
            <div className="shuffle">
                <BsShuffle className="text-[#b3b3b3] hover:text-white cursor-pointer" />
            </div>
            <div className="previous text-[2rem]">
                <CgPlayTrackPrev className="text-[#b3b3b3] hover:text-white cursor-pointer" onClick={() => changeTrack("previous")} />
            </div>
            <div className="state text-[2rem]">
                {playerState ? (
                    <BsFillPauseCircleFill onClick={changeState} className="text-white cursor-pointer" />
                ) : (
                    <BsFillPlayCircleFill onClick={changeState} className="text-white cursor-pointer" />
                )}
            </div>
            <div className="next text-[2rem]">
                <CgPlayTrackNext className="text-[#b3b3b3] hover:text-white cursor-pointer" onClick={() => changeTrack("next")} />
            </div>
            <div className="repeat">
                <FiRepeat className="text-[#b3b3b3] hover:text-white cursor-pointer" />
            </div>
        </div>
    )
}

export default PlayerControl