import { useState, createRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Slider from 'rc-slider';

import Play from '../public/images/play.svg';
import Pause from '../public/images/pause.svg';
import Next from '../public/images/fast-forward.svg';
import Prev from '../public/images/fast-backward.svg';
import VolumeUp from '../public/images/volume-up.svg';
import VolumeMute from '../public/images/volume-mute.svg';

import 'rc-slider/assets/index.css';
import '../styles/styles.sass';

const Player = ({ song }) => {
  const { title } = song;
  const [url, setUrl] = useState(null);
  const [progress, setProgress] = useState({ played: 0 });
  const [playing, setPlaying] = useState(false);
  const [mute, setMuted] = useState(false);
  const [seeking, setSeeking] = useState(false);

  const player = createRef<ReactPlayer>();

  const time = 122;

  useEffect(() => {
    setUrl(song.path);
  }, []);


  const onPlayPause = () => {
    setPlaying(!playing);
  };

  const onPlay = () => {
    // player.current.seekTo(progress.played);
  };

  const onToggleMuted = () => {
    setMuted(!mute);
  };

  const onProgress = (state) => {
    if (!seeking) {
      setProgress(state);
    }
  };

  const onSeekMouseDown = () => {
    setSeeking(true);
  };

  const onSeekChange = (value) => {
    setProgress({ played: parseFloat(value) });
  };

  const onSeekMouseUp = (value) => {
    setSeeking(false);
    player.current.seekTo(parseFloat(value));
  };

  return (
    <div className="player">
      <p className="title is-2">{title}</p>
      <ReactPlayer
        width="0"
        height="0"
        url={url}
        playing={playing}
        muted={mute}
        onProgress={onProgress}
        ref={player}
        onPlay={onPlay}
      />
      <div className="seek">
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={progress.played}
          onBeforeChange={onSeekMouseDown}
          onChange={onSeekChange}
          onAfterChange={onSeekMouseUp}
          railStyle={{ backgroundColor: '#f5f5f5', height: 20, borderRadius: 0 }}
          trackStyle={{ backgroundColor: '#ffdd57', height: 20, borderRadius: 0 }}
          handleStyle={{ display: 'none' }}
        />
      </div>
      <div className="plr-cntrs">
        <button className="plr-cntr"><Prev /></button>
        <button className="plr-cntr play" onClick={onPlayPause}>
          {(playing ? <Pause /> : <Play />)}
        </button>
        <button className="plr-cntr"><Next /></button>
        <button className="plr-cntr volume" onClick={onToggleMuted}>
          {(mute ? <VolumeMute /> : <VolumeUp />)}
        </button>
      </div>
    </div>
  );
};

export default Player;
