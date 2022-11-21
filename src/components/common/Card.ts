import styled from 'styled-components';

const Card = styled.div`
  position: relative;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 0 black;
  background-color: var(--card-background);
  color: var(--font);
  overflow: auto;

  h3 {
    text-align: center;
  }
`;

export default Card;
