import React from 'react';
import { useParams } from 'react-router-dom';
import { showFormattedDate } from '../utils/index';
import {getNote} from '../utils/api'
 
function DetailPage (){
  const params = useParams();
  const [note,setNote] = React.useState([]);
  React.useEffect(() =>{
    getNote(params.id).then(({data}) =>{
      setNote(data)
    });
  }, [params.id]);



  return(
    <div className='Note-detail__body'>
       <h4 className='Note_CreatedAt'>{showFormattedDate(note.createdAt)}</h4>
       <h3 className='Note-detail-title'>{note.title}</h3> 
       <p className='Note-detail-title'>{note.body}</p> 
     </div> 
  );
}


export default DetailPage;