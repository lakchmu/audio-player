export type SerializedSongType = {
  pk: string;
  sk: string;
  title: string;
  author: string;
  duration: string;
  genre: string;
  path: string;
};

export type SongType = {
  Item: {
    PK: { S: string };
    SK: { S: string };
    title: { S: string };
    author: { S: string };
    duration: { N: string };
    genre: { S: string };
    path: { S: string };
  };
};

interface SerializeInterface {
  ({ Item }: SongType): SerializedSongType;
}

const serialize: SerializeInterface = ({ Item }) => {
  const song: SerializedSongType = {
    pk: Item.PK.S,
    sk: Item.SK.S,
    title: Item.title.S,
    author: Item.author.S,
    duration: Item.duration.N,
    genre: Item.genre.S,
    path: Item.path.S,
  };

  return song;
};


function Song(data: SerializedSongType): void {
  this.PK.S = data.pk;
  this.SK.S = data.sk;
  this.title.S = data.title;
  this.author.S = data.author;
  this.duration.N = data.duration;
  this.genre.S = data.genre;
  this.path.S = data.path;
}

Song.serialize = serialize;

export default Song;
