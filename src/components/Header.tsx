import styled from 'styled-components';
import Card from './common/Card';

const HeaderContainer = styled.div`
  margin: 10px;
  text-align: center;
`;

interface HeaderProps {
  selectedCount: number;
}

const Header = ({ selectedCount }: HeaderProps) => {
  return (
    <Card>
      <HeaderContainer>
        <h1>SFX Interim</h1>
        <span>
          {selectedCount > 0
            ? `${selectedCount} sound${
                selectedCount === 1 ? '' : 's'
              } selected.`
            : 'You have not selected any sounds.'}
        </span>
      </HeaderContainer>
    </Card>
  );
};

export default Header;
