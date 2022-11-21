import styled from 'styled-components';
import Card from './common/Card';
import logo from '../assets/images/logo.png';

const HeaderContainer = styled.div`
  margin: 10px;
  text-align: center;
`;

const Logo = styled.img`
  width: 50%;
  margin: 10px 0;
`;

interface HeaderProps {
  selectedCount: number;
}

const Header = ({ selectedCount }: HeaderProps) => {
  return (
    <Card>
      <HeaderContainer>
        <Logo src={logo} alt="Logo" />
        <div>
          {selectedCount > 0
            ? `${selectedCount} sound${
                selectedCount === 1 ? '' : 's'
              } selected.`
            : 'You have not selected any sounds.'}
        </div>
      </HeaderContainer>
    </Card>
  );
};

export default Header;
