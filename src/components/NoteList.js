import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

function NoteList({ notes, onDelete }) {
  if (!notes.length) {
    return <h2 className='catatan-notFound'>Tidak ada catatan</h2>;
  }
  
  return (
    <div className='Note-list'>
      {
        notes.map((note) => (
          <NoteItem 
          key={note.id}
          id={note.id}
          onDelete={onDelete}
          {...note} />
        ))
      }
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default NoteList;
