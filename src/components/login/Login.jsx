import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css'; // if using the included styles
import styles from './login.module.css';

import React from 'react';
import { useAuth } from './Auth';

const spotifyClientKey = process.env.REACT_APP_SPOTIFY_CLIENT_KEY;
if (!spotifyClientKey) throw new Error(`spotify client key missing`);

const Login = () => {
  let retVal;

  const { token, setToken } = useAuth();

  const loginHandler = (token) => {
    setToken(token);
    // SpotifyAuth looks at the token in the url fragment, so we must remove it because the logout method will not work until we remove this.
    window.location = '/';
  };

  const logoutHandler = () => {
    setToken(null);
    window.location = '/';
  };

  if (token) {
    retVal = (
      <button onClick={logoutHandler} className={styles.button}>
        Sign Out
      </button>
    );
  } else {
    retVal = (
      <div className={styles.container}>
        <SpotifyAuth
          noCookie={true}
          redirectUri="http://localhost:3000/callback"
          clientID={spotifyClientKey}
          scopes={[Scopes.playlistModifyPrivate, Scopes.playlistModifyPublic, Scopes.playlistReadPrivate, Scopes.playlistReadCollaborative]}
          onAccessToken={loginHandler}
        />
      </div>
    );
  }

  return retVal;
};

export default Login;
