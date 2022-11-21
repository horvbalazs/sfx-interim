import React from 'react';
import ReactDOM from 'react-dom';

const Player = React.forwardRef<HTMLAudioElement>((_props, ref) => {
  return ReactDOM.createPortal(
    <audio ref={ref}>
      <source></source>
    </audio>,
    document.getElementById('player-root')!,
  );
});

export default Player;
