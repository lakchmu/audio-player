import fetch from 'isomorphic-unfetch';
import { inject, observer } from 'mobx-react';
import { NextPage } from 'next';

import '../styles/styles.sass';
import Player from './player';
import { SerializedUserType as UserType } from '../models/user';
import { SerializedSongType as SongType } from '../models/song';

interface HomeProps { currentUser: UserType; song: SongType; store?: any }

const Home: NextPage<HomeProps> = inject('store')(observer(({ currentUser, song, store }) => {
  store.setCurrentUser(currentUser);
  const { firstName } = currentUser;

  return (
    <div className="page">
      <h1 className="title">Hello, {firstName}!</h1>
      <Player song={song} />
    </div>
  );
}));

type GetInitialPropsType = { currentUser: UserType ; song: any };

Home.getInitialProps = async (): Promise<GetInitialPropsType> => {
  const userData = await fetch('http://localhost:3000/api/users');

  const currentUser = await userData.json();

  const songData = await fetch('http://localhost:3000/api/songs');

  const song = await songData.json();

  return { currentUser, song };
};

export default Home;
