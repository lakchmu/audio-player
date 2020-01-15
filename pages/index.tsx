import fetch from 'isomorphic-unfetch';
import { inject, observer } from 'mobx-react';
import { NextPage } from 'next';

import '../styles/styles.sass';
import Player from './player';

const Home: NextPage<any> = inject('store')(observer(({ currentUser, song, store }) => {
  store.setCurrentUser(currentUser);
  const { firstName } = currentUser;

  return (
    <div className="page">
      <h1 className="title">Hello, {firstName}!</h1>
      <Player song={song} />
    </div>
  );
}));

Home.getInitialProps = async () => {
  let response = await fetch('http://localhost:3000/api/users');

  const currentUser = await response.json();

  response = await fetch('http://localhost:3000/api/songs');

  const song = await response.json();

  return { currentUser, song };
};

export default Home;
