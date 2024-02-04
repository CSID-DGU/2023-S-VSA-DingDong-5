import { useParams } from 'react-router-dom';
import { QuestionForm, AnswerForm } from '../../components';
import { Root } from './styled';

export const Detail = () => {
  let { _id } = useParams<{ _id?: string }>();

  return (
    <Root>
      <QuestionForm _id={_id} />
      <AnswerForm _id={_id} />
    </Root>
  );
};
