import { useEffect, useState, useRef } from 'react';
import { SearchBar } from './SearchBar';
import { LogoImg, LogoSection, LogoTypo, Root, SearchInput, Wrapper } from './styled';
import { useNavigate } from 'react-router-dom';
import { LoginLogoutButton } from 'components';
import type { QuestionDataType } from 'stores/page-store';
import { MdClose } from 'react-icons/md';
import instance from 'api/axios';
import { useLocation } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const [allArticle, setAllArticle] = useState<QuestionDataType[]>([]);
  const [filteredData, setFilteredData] = useState<QuestionDataType[]>([]);
  const [wordEntered, setWordEntered] = useState<string>('');
  const location = useLocation();

  const ishome = location.pathname === '/';

  const inputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  window.addEventListener('load', () => inputRef.current?.focus());

  const handleFilter = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = target.value.toLowerCase();
    setWordEntered(searchWord);

    const newFilter: QuestionDataType[] = allArticle.filter(
      ({ title, content }: QuestionDataType): boolean =>
        title.toLowerCase().includes(searchWord) || content.toLowerCase().includes(searchWord),
    );
    if (!searchWord) return setFilteredData([]);
    setFilteredData(newFilter);
  };

  const clearInput = (): void => {
    setFilteredData([]);
    setWordEntered('');
    inputRef.current?.focus();
    navigate(`/articles`);
  };

  const getAllArticles = async () => {
    const response = await instance.get(`/api/articles/all`);
    const articleData = response.data;
    setAllArticle(articleData);
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (wordEntered.trim() === '') {
        alert('검색어가 입력되지 않았습니다.');
      }
      navigateSearchPage();
    }
  };

  const navigateSearchPage = () => {
    if (filteredData) {
      navigate(`/search?keyword=${encodeURIComponent(wordEntered.trim())}`);
      // console.log(wordEntered.trim());
    } else {
      navigate(`/articles`);
      alert('관련된 키워드가 담긴 게시글이 없습니다!');
    }
  };

  return (
    <Root>
      <LogoSection onClick={() => navigate('/')}>
        <LogoImg />
        <LogoTypo>DINGDONG</LogoTypo>
      </LogoSection>
      {/* <SearchBar data={allArticle}/> */}
      <Wrapper $ishome={ishome}>
        <input
          className="SearchInput"
          type="text"
          value={wordEntered}
          onChange={handleFilter}
          ref={inputRef}
          onKeyPress={handleKeyPress}
        />
        <div className="Div">{wordEntered.length !== 0 && <MdClose id="clearBtn" onClick={clearInput} />}</div>
      </Wrapper>
      <LoginLogoutButton />
    </Root>
  );
};
