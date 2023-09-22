import React from 'react'
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';

const Volume = () => {
    const [{ token }] = useStateProvider();
    const setVolume = async (e) => {
        await axios.put(
            "https://api.spotify.com/v1/me/player/volume",
            {},
            {
                params: {
                    volume_percent: parseInt(e.target.value),
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
    };
    return (
        <div className='flex items-center justify-end'>
            <input className='w-[15rem] h-[0.5rem] border-[2rem]' type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} />
        </div>
    )
}

export default Volume