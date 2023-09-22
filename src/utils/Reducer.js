import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  userInfo: null,
  nav: false,
  playlists: [],
  selectedPlaylistId: "3lWQJUnRvyai8zJWwrIA8W",
  selectedPlaylist: null,
  currentPlaying: null,
  playerState: false,
  navScrolled: false,
  headerBlack: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    case reducerCases.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };

    case reducerCases.SET_NAV:
      return {
        ...state,
        nav: action.nav,
      };

    case reducerCases.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };

    case reducerCases.SET_PLAYLIST_ID:
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };

    case reducerCases.SET_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case reducerCases.SET_PLAYING:
      return {
        ...state,
        currentPlaying: action.currentPlaying,
      };
    case reducerCases.SET_PLAYER_STATE:
      return {
        ...state,
        playerState: action.playerState,
      };

    case reducerCases.NAV_SCROLL:
      return {
        ...state,
        navScrolled: action.navScrolled,
      };

    case reducerCases.SET_HEADER:
      return {
        ...state,
        headerBlack: action.headerBlack,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
