import Card from './common/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { IconButton } from 'rsuite';
import styled from 'styled-components';
import Player from './common/Player';
import randomizer from '../helpers/randomizer';
import { Settings } from '../types';

const RepeaterWrapper = styled.div`
  text-align: center;

  button {
    height: 100px;
    width: 100px;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
  }
`;

interface RepeaterProps {
  selectedSounds: string[];
  options: Settings;
}

const Repeater = ({ selectedSounds, options }: RepeaterProps) => {
  const [isPlaying, setIsPlaying] = useState<NodeJS.Timer | undefined>(
    undefined
  );
  const playerRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (selectedSounds.length === 0) {
      setIsPlaying(undefined);
    }
  }, [selectedSounds]);

  const setupRepeater = (): NodeJS.Timer => {
    return setInterval(() => {
      const randomSound = randomizer(selectedSounds, options.chance / 100);
      if (playerRef.current && randomSound) {
        playerRef.current.src = randomSound;
        playerRef.current.play();
      }
    }, options.delay * 1000);
  };

  const handlePlay = () => {
    const interval = setupRepeater();
    setIsPlaying(interval);
  };

  const handleStop = () => {
    clearInterval(isPlaying);
    setIsPlaying(undefined);
  };

  return (
    <Card>
      <RepeaterWrapper>
        {isPlaying ? (
          <IconButton
            icon={
              <FontAwesomeIcon
                icon={faPause}
                style={{ color: 'var(--red)', height: 80, width: 80 }}
              />
            }
            appearance="link"
            onClick={handleStop}
          />
        ) : (
          <IconButton
            icon={
              <FontAwesomeIcon
                icon={faPlay}
                style={{ color: 'var(--green)', height: 80, width: 80 }}
              />
            }
            appearance="link"
            onClick={handlePlay}
            disabled={selectedSounds.length === 0}
          />
        )}
        <Player ref={playerRef} />
      </RepeaterWrapper>
    </Card>
  );
};

export default Repeater;
