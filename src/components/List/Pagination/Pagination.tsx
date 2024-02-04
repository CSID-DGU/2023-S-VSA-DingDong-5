import React, { Fragment } from 'react';
import { Pagination as MuiPagination, PaginationItem } from '@mui/material';
import type { QuestionDataType } from '../../../stores/page-store';
import { Div } from './styled';

interface PaginationProps {
  page: number;
  totalQuestions: number;
  QuestionData: QuestionDataType[];
  itemsPerPage: number;
  handlePaginationChange: (e: React.ChangeEvent<unknown>, value: number) => void;
}

export const Pagination = ({
  page,
  QuestionData,
  totalQuestions,
  itemsPerPage,
  handlePaginationChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalQuestions / itemsPerPage);
  return (
    <Div>
      <Fragment>
        <MuiPagination
          variant="outlined"
          shape="rounded"
          page={page}
          count={totalPages}
          onChange={handlePaginationChange}
          style={{ float: 'right', margin: '0 13px 16px 0' }}
          renderItem={item => <PaginationItem {...item} sx={{ borderRadius: '5px', border: '1px solid #E2E8F0' }} />}
        />
      </Fragment>
    </Div>
  );
};
