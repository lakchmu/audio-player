import fetch from 'isomorphic-unfetch';
import '../styles/styles.sass';
import Player from './player';

const Home = ({ currentUser, song }) => {
  const { firstName } = currentUser;

  return (
    <div className="page">
      <h1 className="title">Hello, {firstName}!</h1>
      <Player song={song} />
    </div>
  );
};

Home.getInitialProps = async () => {
  let response = await fetch('http://localhost:3000/api/users');

  const currentUser = await response.json();

  response = await fetch('http://localhost:3000/api/songs');

  const song = await response.json();

  return { currentUser, song };
};

export default Home;
