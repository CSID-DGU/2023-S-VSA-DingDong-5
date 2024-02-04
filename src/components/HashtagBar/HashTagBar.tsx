import React, { useState, useEffect } from "react";
import Articles from '../../db/articles.json';
import { Tr, HashTag, Div } from './styled';

export const HashTagBar = () => {
  // 많이 언급된 hashtag 순서대로 정렬한 api 호출

  const HashtagArr = Articles.map(item => item.hashtags);
  const oneHashtag = HashtagArr.flat();
  const onlyHashtag = Array.from(new Set(oneHashtag)).slice(0, 9);
  // const [visibleItems, setVisibleItems] = useCircularArray(onlyHashtag);
  const [visibleItems, setVisibleItems] = useState(onlyHashtag);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // setVisibleItems((prevItems) => [...prevItems.slice(1), prevItems[0]]);
      setVisibleItems((prevItems) => {
        const lastItem = prevItems[prevItems.length - 1];
        return [lastItem, ...prevItems.slice(0, prevItems.length - 1)];
      });      
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <Div>
        {visibleItems.map((item, index) =>
          <Tr key={index}>
            <HashTag key={item}>{item}</HashTag>
          </Tr>
        )}
     </Div>
    </>
  );
};