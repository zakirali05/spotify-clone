import CurrentTrack from "./CurrentTrack"
import PlayerControl from "./PlayerControl"
import Volume from "./Volume"

const Footer = () => {
    return (
        <div className="footer">
            <CurrentTrack />
            <PlayerControl />
            <Volume />
        </div>
    )
}

export default Footer