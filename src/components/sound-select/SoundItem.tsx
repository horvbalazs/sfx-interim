import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faPlay } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { IconButton } from 'rsuite';
import { MouseEvent } from 'react';

interface SoundItemProps {
  type: 'file' | 'folder';
  label: string;
  onPlaySample: () => void;
}

const SoundItemWrapper = styled.div`
  align-items: center;
  & > svg {
    margin-right: 5px;
  }

  button {
    margin: -3px 5px 0 0;
    padding: 0 !important;
    width: 20px;
  }
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
            icon={
              <FontAwesomeIcon
                icon={faPlay}
                style={{ color: 'var(--green)' }}
              />
            }
            size="sm"
            appearance="link"
            onClick={handlePlayClicked}
            circle
          />
        </>
      ) : (
        <FontAwesomeIcon icon={faFolder} />
      )}
      <span>{props.label}</span>
    </SoundItemWrapper>
  );
};

export default SoundItem;
