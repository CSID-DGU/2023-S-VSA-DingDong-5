import { NavBar, Table, Tr, Td, HashTag, Button, Img } from './styled';
import { useRecoilState } from 'recoil';
import { QuestionListState } from '../../stores/page-store';
import { PageState } from '../../stores/link-store';
import { hashtagState, clickState } from '../../stores/page-store';
import type { QuestionDataType } from '../../stores/page-store';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import unfold from '../../assets/icon/unfold.svg';
import fold from '../../assets/icon/fold.svg';
import instance from 'api/axios';
import { useNavigate, useLocation } from 'react-router-dom';

export const HashTagNav = () => {
  const [page, setPage] = useState(1);
  const [selectedNav, setSelectedNav] = useRecoilState(PageState);
  const [expanded, setExpanded] = useState(false);
  const [clicked, setClicked] = useRecoilState(clickState);
  const [questionData, setQuestionData] = useRecoilState<QuestionDataType[]>(QuestionListState);
  const [clickedHashtags, setClickedHashtags] = useState<boolean[]>([true, ...Array(0).fill(false)]);
  // const [hashtag, setHashtag] = useRecoilState(hashtagState);
  const [onlyHashtag, setOnlyHashtag] = useRecoilState(hashtagState);
  // const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const homeTag = queryParams.get('hashtag');

  const fetchData = async () => {
    try {
      const questionResponse = await instance.get(`/api/articles?page=${page}`);
      const hashtagsResponse = await instance.get(`/api/articles/allhashtags`);
      setQuestionData(questionResponse.data.updatedQuestions);
      setOnlyHashtag(['ALL', ...hashtagsResponse.data.hashtags]);
    } catch (error) {
      console.error('게시판 정보 가져오기 실패 : ' + error);
      setQuestionData([]);
      setOnlyHashtag(['ALL']);
      // alert('게시판 정보 가져오기 실패!');
    }
  };

  useEffect(() => {
    fetchData();
  }, [setQuestionData, selectedNav]);

  const handleClick = useCallback(
    (index: number) => {
      const newClickedHashtags = [...clickedHashtags];
      setClicked(true);
      newClickedHashtags.fill(false);
      newClickedHashtags[index] = true;
      setClickedHashtags(newClickedHashtags);
    },
    [clickedHashtags, navigate],
  );

  useEffect(() => {
    const target: boolean = true;
    let targetIndex: number = clickedHashtags.indexOf(target);

    // 'ALL'이 아닌 다른 hashtag를 누른 경우
    if (clicked && onlyHashtag[targetIndex] != 'ALL') {
      navigate(`/search/hashtag?hashtag=${encodeURIComponent(onlyHashtag[targetIndex])}`);
      setSelectedNav(`/search`);
      setClicked(false);
    }
  }, [clickedHashtags]);

  useEffect(() => {
    if (selectedNav.includes('replies')) {
      setClickedHashtags([true, ...Array(0).fill(false)]);
      setSelectedNav(`/replies`);
    } else if (selectedNav.includes(`articles`)) {
      setClickedHashtags([true, ...Array(0).fill(false)]);
      setSelectedNav(`/articles`);
    } else if (homeTag) {
      const changeTarget = onlyHashtag.indexOf(homeTag);
      const newClickedHashtags = [...clickedHashtags];
      newClickedHashtags.fill(false);
      newClickedHashtags[changeTarget] = true;
      setClickedHashtags(newClickedHashtags);
      setSelectedNav(`/search`);
      setClicked(false);
    }
    // console.log(clicked);
    // console.log(selectedNav);
  }, [selectedNav]);

  const toggleExpanded = useCallback(() => {
    setExpanded(prevExpanded => !prevExpanded);
  }, []);

  const displayedHashtags = useMemo(() => {
    if (expanded) {
      return onlyHashtag;
    }
    return onlyHashtag.slice(0, 10);
  }, [expanded, onlyHashtag]);

  return (
    <NavBar>
      <Table $expanded={expanded}>
        {displayedHashtags.map(
          (item, index) =>
            index % 2 === 0 && (
              <Tr key={index}>
                <Td>
                  <HashTag $click={clickedHashtags[index]} onClick={() => handleClick(index)}>
                    {item}
                  </HashTag>
                  {index + 1 < onlyHashtag.length && (
                    <HashTag $click={clickedHashtags[index + 1]} onClick={() => handleClick(index + 1)}>
                      {onlyHashtag[index + 1]}
                    </HashTag>
                  )}
                </Td>
              </Tr>
            ),
        )}
      </Table>
      <Button onClick={toggleExpanded}>
        {expanded ? '접기' : '펼치기'}
        <Img src={expanded ? fold : unfold} />
      </Button>
    </NavBar>
  );
};
