// WriteAnswerForm.tsx
import ReactQuill from 'react-quill';
import { ButtonContainer, Root, Title } from './styled';
import React, { forwardRef, useRef, useState } from 'react';
import modules from '../../../utils/quillModules';
import { Button } from '../../Button';

interface WriteAnswerFormProps {
  contents: string;
  onContentsChange: (value: string) => void;
  postAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
  editingAnswerId?: string | null;
  onClickEditingCancel?: () => void;
}

const WriteAnswerForm: React.ForwardRefRenderFunction<HTMLFormElement, WriteAnswerFormProps> = (
  { contents, onContentsChange, postAnswer, editingAnswerId, onClickEditingCancel },
  ref,
) => {
  const QuillRef = useRef<ReactQuill>(null);

  return (
    <Root ref={ref}>
      <Title>답변 작성하기</Title>
      <ReactQuill
        ref={QuillRef}
        value={contents}
        onChange={onContentsChange}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
        style={{ height: '300px' }}
      />
      <ButtonContainer>
        <Button height="44px" onClick={postAnswer}>
          {editingAnswerId ? '답변수정' : '답변작성'}
        </Button>
        {editingAnswerId && (
          <Button onClick={onClickEditingCancel} left="3px" width="70px">
            취소
          </Button>
        )}
      </ButtonContainer>
    </Root>
  );
};

export default forwardRef(WriteAnswerForm);
