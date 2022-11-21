import { Divider, Toggle } from 'rsuite';
import styled from 'styled-components';
import { Settings } from '../../types';
import Card from '../common/Card';
import OptionItem from './OptionItem';

const WarningLabel = styled.div`
  width: 100%;
  text-align: center;
  color: var(--red);
  height: 20px;
`;

const ToggleWrapper = styled.div`
  margin-top: 20px;
  padding-left: 30px;
`;

interface OptionsProps {
  onSetOptions: (options: Settings) => void;
  value: Settings;
}

const Options = ({ onSetOptions, value }: OptionsProps) => {
  const handleSettingChanged = (settingLabel: string, newValue: number) => {
    if (Object.hasOwn(value, settingLabel)) {
      onSetOptions({ ...value, [settingLabel]: newValue });
    }
  };

  const handleMultipleChecked = (checked: boolean) => {
    onSetOptions({ ...value, multiple: checked });
  };

  return (
    <Card>
      <Divider>
        <h3>Options</h3>
      </Divider>
      <WarningLabel>
        You may have to restart the repeater to apply these changes.
      </WarningLabel>
      <OptionItem
        label="Chance (%)"
        value={value.chance}
        onChange={handleSettingChanged.bind(this, 'chance')}
      />
      <OptionItem
        label="Delay (s)"
        value={value.delay}
        onChange={handleSettingChanged.bind(this, 'delay')}
        max={60}
        step={1}
      />
      <ToggleWrapper>
        <Toggle
          checked={value.multiple}
          onChange={handleMultipleChecked}
          checkedChildren="Multi"
          unCheckedChildren="Single"
          disabled
        />
      </ToggleWrapper>
    </Card>
  );
};

export default Options;
