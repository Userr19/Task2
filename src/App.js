import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './App.css';
import { gapi } from "gapi-script";
import React, { useState, useEffect, useContext } from 'react';
import { usePosts } from './hooks/usePosts';
import { Post } from "./Post/Post";
import { PostContext } from "./context/postContext"

function App() {
  const [profile, setProfile] = useState([]);
  const clientId = '942744829880-fu2bqtm9ojqoffrdv2prk23u4u33t71j.apps.googleusercontent.com';
  const [Posts] = usePosts();
  const PostProvider = PostContext.Provider;
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res) => {
    setProfile(res.profileObj);
  };

  const onFailure = (err) => {
    console.log('failed', err);
  };

  const logOut = () => {
    setProfile(null);
  };
  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img alt="img" src={profile.imageUrl} />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      )}
      <ul>
        {
          Posts.map((post) => (<div key={post.id}><PostProvider value={{ title: post.title, body: post.body, id: post.id }}><Post title={post.title} /></PostProvider></div>))
        }
      </ul>
    </div>
  );
}

export default App;
