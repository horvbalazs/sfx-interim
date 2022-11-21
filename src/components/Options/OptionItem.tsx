import { Slider } from 'rsuite';
import styled from 'styled-components';

const OptionItemWrapper = styled.div`
  padding: 0 30px;
  margin: 10px 0 20px;
`;

const OptionItemLabel = styled.div`
  margin-bottom: 3px;
`;

interface OptionItemProps {
  value: number;
  onChange: (result: number) => void;
  label: string;
  max?: number;
  step?: number;
}

const OptionItem = ({ value, onChange, label, max, step }: OptionItemProps) => {
  return (
    <OptionItemWrapper>
      <OptionItemLabel>{label}</OptionItemLabel>
      <Slider
        progress
        value={value}
        onChange={onChange}
        min={1}
        max={max ?? 100}
        step={step ?? 1}
      />
    </OptionItemWrapper>
  );
};

export default OptionItem;
