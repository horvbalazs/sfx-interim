import { ReactNode, useEffect, useRef, useState, memo } from 'react';
import { CheckTree, CheckTreePicker, Divider, Input, Loader } from 'rsuite';
import Player from '../common/Player';
import { TreeNode } from '../../types';
import { createSoundTree, getUncheckableNodes } from '../../helpers';
import SoundItem from './SoundItem';
import Card from '../common/Card';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 30px;
`;

const SelectContainer = styled.div`
  margin: 10px 0;
  padding: 0 15px;
`;

interface SoundSelectProps {
  setSelectedSounds: (selectedSounds: string[]) => void;
}

const SoundSelect = (props: SoundSelectProps) => {
  const [soundTree, setSoundTree] = useState<TreeNode[] | undefined>();
  const [selected, setSelected] = useState<string[]>([]);
  const [uncheckable, setUncheckable] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const playerRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    createSoundTree()
      .then((result) => {
        setSoundTree(result);
        setUncheckable(getUncheckableNodes(result));
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handlePlaySample = (url: string) => {
    if (playerRef.current) {
      playerRef.current.src = url;
      playerRef.current.play();
    }
  };

  const handleSelectedChanged = (value: unknown) => {
    setSelected(value as string[]);
    props.setSelectedSounds(value as string[]);
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
    <Card>
      <Divider>
        <h3>Select sounds</h3>
      </Divider>
      {soundTree && !isLoading && (
        <SelectContainer>
          <CheckTreePicker
            value={selected}
            uncheckableItemValues={uncheckable}
            data={soundTree}
            renderTreeNode={handleRenderTreeNode}
            onChange={handleSelectedChanged}
            open
            block
          />
        </SelectContainer>
      )}
      {isLoading && (
        <LoaderContainer>
          <Loader size="lg" speed="slow" />
        </LoaderContainer>
      )}
      <Player ref={playerRef}></Player>
    </Card>
  );
};

export default memo(SoundSelect);
