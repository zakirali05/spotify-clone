import { AiOutlineUser } from "react-icons/ai";

const Login = () => {
  const handleClick = async () => {
    const client_id = "9d7831b783f2426c9d02406da2635e38";
    const redirect_uri = "https://spotify-clone-dusky-theta.vercel.app/";
    const api_uri = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };
  return (
    <div className="w-screen h-screen bg-[#1DB954]">
      <div className="flex flex-col items-center justify-center gap-5 h-screen">
        <div>
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
            alt="Spotify"
            className="h-24 object-cover login-logo-img"
          />
        </div>
        <button
          onClick={handleClick}
          className="bg-black text-[#1DB954] px-4 py-2 hover:opacity-80 rounded-lg font-bold flex items-center justify-center gap-2"
        >
          <AiOutlineUser className=" text-lg" />
          Connect Spotify
        </button>
      </div>
    </div>
  );
};

export default Login;
