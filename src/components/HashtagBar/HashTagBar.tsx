import { Number } from "mongoose";
import dummy from "../../db/articles.json";
import {
  Table,
  Tr,
  HashTag
} from "./styled"

export const HashTagBar = () => {

  const HashtagArr = dummy.articles.map((item) => item.hashtag);
  const oneHashtag = HashtagArr.flat();
  const onlyHashtag = Array.from(new Set(oneHashtag));
  console.log(onlyHashtag);
  
  return(
    <>
    <Table>
      <tbody>
            {onlyHashtag.map((item, index) => (
              index % 5 === 0 ? (
                <Tr key={index}>
                  <td>
                  <HashTag key={item}>{item}</HashTag>
                  {index + 1 < onlyHashtag.length ? <HashTag>{onlyHashtag[index + 1]}</HashTag> 
                  : null}
                  {index + 2 < onlyHashtag.length ? <HashTag>{onlyHashtag[index + 2]}</HashTag> 
                  : null}
                  {index + 3 < onlyHashtag.length ? <HashTag>{onlyHashtag[index + 3]}</HashTag> 
                  : null}
                  {index + 4 < onlyHashtag.length ? <HashTag>{onlyHashtag[index + 4]}</HashTag> 
                  : null}
                  </td>
                </Tr>
              ) : null
            ))}
      </tbody>
    </Table>
    </>
  )
}