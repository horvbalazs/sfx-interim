import { useCallback, useState } from 'react';
import SoundSelect from './components/sound-select/SoundSelect';
import styled from 'styled-components';
import Options from './components/Options/Options';
import Header from './components/Header';
import Repeater from './components/Repeater';
import { Settings } from './types';

const AppWrapper = styled.div`
  background-color: var(--background);
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AppRow = styled.div<{ flex: number }>`
  padding: 10px;
  display: flex;
  gap: 10px;
  flex: ${(props) => props.flex};

  * {
    flex: 1;
  }
`;

const defaultOptions: Settings = {
  chance: 1,
  delay: 1,
};

function App() {
  const [selectedSounds, setSelectedSounds] = useState<string[]>([]);
  const [options, setOptions] = useState<Settings>(defaultOptions);

  const handleSelectedSoundsChanged = useCallback((result: string[]) => {
    setSelectedSounds(result);
  }, []);

  const handleOptionsChanged = useCallback((settings: Settings) => {
    setOptions(settings);
  }, []);

  return (
    <AppWrapper className="App">
      <AppRow flex={1}>
        <Header selectedCount={selectedSounds.length} />
      </AppRow>
      <AppRow flex={4}>
        <Options onSetOptions={handleOptionsChanged} value={options} />
        <SoundSelect setSelectedSounds={handleSelectedSoundsChanged} />
      </AppRow>
      <AppRow flex={1}>
        <Repeater selectedSounds={selectedSounds} options={options} />
      </AppRow>
    </AppWrapper>
  );
}

export default App;
