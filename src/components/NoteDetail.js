import React from 'react';
import PropTypes from 'prop-types';
import { showFormattedDate } from '../utils/index';

function NoteDetail({ title, createdAt, body }) {
  return (
      <div className='Note-header'>
        <h2 className='Note_title'>{title}</h2>
        <h4 className='Note_CreatedAt'>{showFormattedDate(createdAt)}</h4>
        <h5 className='Note_body'>{body}</h5>
      </div>
  );
}

NoteDetail.propTypes = {
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
};

export default NoteDetail;
