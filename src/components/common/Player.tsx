import React from 'react';

const Player = React.forwardRef<HTMLAudioElement>((_props, ref) => {
  return (
    <audio ref={ref}>
      <source></source>
    </audio>
  );
});

export default Player;
