import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVolumeLow,
  faFolder,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { IconButton } from 'rsuite';
import { MouseEvent } from 'react';

interface SoundItemProps {
  type: 'file' | 'folder';
  label: string;
  onPlaySample: () => void;
}

const SoundItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const SoundItem = (props: SoundItemProps) => {
  const handlePlayClicked = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    props.onPlaySample();
  };

  return (
    <SoundItemWrapper>
      {props.type === 'file' ? (
        <>
          <IconButton
            icon={<FontAwesomeIcon icon={faPlay} color="green" />}
            size="sm"
            appearance="link"
            onClick={handlePlayClicked}
          />
          <FontAwesomeIcon icon={faVolumeLow} />
        </>
      ) : (
        <FontAwesomeIcon icon={faFolder} />
      )}
      <span>{props.label}</span>
    </SoundItemWrapper>
  );
};

export default SoundItem;
