export default function Song(data) {};

Song.serialize = ({ Item: item }) => {
  return {
    pk: item.PK.S,
    sk: item.SK.S,
    title: item.title.S,
    author: item.author.S,
    duration: item.duration.S,
    genre: item.genre.S,
    path: item.songPath.S,
  };
};
