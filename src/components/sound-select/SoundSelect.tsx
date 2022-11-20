import { ReactNode, useEffect, useRef, useState } from 'react';
import { CheckTree } from 'rsuite';
import Player from '../common/Player';
import 'rsuite/dist/rsuite.min.css';
import styled from 'styled-components';
import { TreeNode } from '../../types';
import { createSoundTree, fetchTreeNode } from '../../helpers';
import SoundItem from './SoundItem';

interface SoundSelectProps {
  setSelectedSounds: (selectedSounds: string[]) => void;
}

const SelectContainer = styled.div`
  text-align: left;
`;

const SoundSelect = (props: SoundSelectProps) => {
  const [soundTree, setSoundTree] = useState<TreeNode[] | undefined>();
  const [selected, setSelected] = useState([]);
  const playerRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    createSoundTree()
      .then((result) => {
        setSoundTree(result);
      })
      .catch(console.error);
  }, []);

  const handlePlaySample = (url: string) => {
    if (playerRef.current) {
      playerRef.current.src = url;
      playerRef.current.play();
    }
  };

  const handleSelectedChanged = (value: any) => {
    setSelected(value);
    props.setSelectedSounds(value);
  };

  const handleRenderTreeNode = (node: unknown): ReactNode => {
    const { label, children, value } = node as TreeNode;

    return (
      <SoundItem
        label={label as string}
        type={children ? 'folder' : 'file'}
        onPlaySample={handlePlaySample.bind(this, value)}
      />
    );
  };

  return (
    <SelectContainer>
      {soundTree && (
        <CheckTree
          value={selected}
          onChange={handleSelectedChanged}
          data={soundTree}
          defaultExpandAll
          getChildren={fetchTreeNode}
          renderTreeNode={handleRenderTreeNode}
        />
      )}
      <Player ref={playerRef}></Player>
    </SelectContainer>
  );
};

export default SoundSelect;
