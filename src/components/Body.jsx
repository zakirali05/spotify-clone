import { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider"
import axios from "axios";
import { reducerCases } from "../utils/Constants"
import { AiFillClockCircle } from "react-icons/ai"

const Body = () => {


  const [{ token, selectedPlaylist, selectedPlaylistId, headerBlack }, dispatch] = useStateProvider();


  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };
    getInitialPlaylist();

  }, [token, dispatch, selectedPlaylistId]);



  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {

    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }

  };
  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const changeNavToBlur = () => {

    if (window.scrollY >= 200) {

      dispatch({ type: reducerCases.SET_HEADER, headerBlack: true })
    }
    else if (window.scrollY >= 80) {
      dispatch({ type: reducerCases.NAV_SCROLL, navScrolled: true })
    }
    else {
      dispatch({ type: reducerCases.NAV_SCROLL, navScrolled: false })
      dispatch({ type: reducerCases.SET_HEADER, headerBlack: false })
    }
  }

  window.addEventListener("scroll", changeNavToBlur)
  return (
    <div className="p-3 px-10">
      {selectedPlaylist && (
        <>
          <div className="playlist mx-[2rem] flex items-center gap-4 flex-col md:flex-row">
            <div className="image  ">
              <img className="h-[15rem] shadow-md object-cover" src={selectedPlaylist.image} alt="selected playlist" />
            </div>
            <div className="details flex flex-col gap-1 text-[#e0dede]">
              <span className="sm:block hidden">PLAYLIST</span>
              <h1 className="text-[white] text-[2rem]  sm:text-[2.5rem] md:text-[4rem] font-bold">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list  ">
            <div className={`header-row  font-bold ${headerBlack ? "bg-slate-900 p-3 rounded-lg" : ""}`}>
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks md:mx-[2rem] flex flex-col mb-[5rem] gap-2">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row cursor-pointer"
                      key={id}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div className="col flex items-center text-[#dddcdc]">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail flex gap-[1rem]">
                        <div className="image">
                          <img src={image} alt="track" className=" w-[40px] h-[40px]" />
                        </div>
                        <div className="info flex flex-col">
                          <span className="name  font-semibold text-white">{name}</span>
                          <span className="text-[#b3b3b3] text-md">{artists[0]} {artists[1]}</span>
                        </div>
                      </div>
                      <div className="col album">
                        <span className="text-white">{album}</span>
                      </div>
                      <div className="col time">
                        <span className="text-white">{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Body;
