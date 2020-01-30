import fetch from 'isomorphic-unfetch';
import { inject, observer } from 'mobx-react';
import { NextPage } from 'next';

import '../styles/styles.sass';
import Player from './player';
import { SerializedSongType as SongType } from '../models/song';
import { StoreInterface } from '../store';

interface HomeProps { song: SongType; store?: StoreInterface }

const Home: NextPage<HomeProps> = inject('store')(observer(({ song, store }) => {
  const { firstName } = store.state.currentUser;

  return (
    <div className="page">
      <h1 className="title">Hello, {firstName}!</h1>
      <Player song={song} />
    </div>
  );
}));

type GetInitialPropsType = { song: SongType };

Home.getInitialProps = async (): Promise<GetInitialPropsType> => {
  const songData = await fetch('http://localhost:3000/api/songs');

  const song = await songData.json();

  return { song };
};

export default Home;
