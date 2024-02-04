import { Advertisement, Root } from './styled';
import adImg from '../../assets/image/advertisement.png';
import { Link } from 'react-router-dom';

export const RightWrapper = () => {
  return (
    <Root>
      <Link to="https://board.yanolja.com/event/4/index.html" target="_blank">
        <Advertisement src={adImg} alt="광고" />
      </Link>
    </Root>
  );
};
