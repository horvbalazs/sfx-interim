import './App.css';
import { useState } from 'react';
import SoundSelect from './components/sound-select/SoundSelect';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState<Error | undefined>();

  const handleSetSelectedSounds = (selectedSounds: string[]) => {
    console.log(selectedSounds);
  };

  return (
    <div className="App">
      {isLoading && <p>Loading...</p>}
      {hasError && <p>{hasError.message}</p>}
      {!isLoading && !hasError && (
        <SoundSelect setSelectedSounds={handleSetSelectedSounds} />
      )}
    </div>
  );
}

export default App;
