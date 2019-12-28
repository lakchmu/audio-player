import fetch from 'isomorphic-unfetch';
import '../styles/styles.sass';
// import get from '../services/requester';

const Home = ({ currentUser }) => {
  const { firstName } = currentUser;

  return (
    <div className="page">
      <h1 className="title">Hello, {firstName}!</h1>
    </div>
  );
};

Home.getInitialProps = async () => {
  const response = await fetch('http://localhost:3000/api/users');

  const currentUser = await response.json();

  return { currentUser };
};

export default Home;
