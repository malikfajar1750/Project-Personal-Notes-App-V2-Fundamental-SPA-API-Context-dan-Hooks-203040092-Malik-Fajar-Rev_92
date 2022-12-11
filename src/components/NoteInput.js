import React from 'react';
import PropTypes from 'prop-types';

class NoteInput extends React.Component {

    constructor(props) {
        super(props);

        // inisialisasi state
        this.state = {
          title: '',
          body: '',
          limit: 50 ,
        }
      
        this.ontitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onbodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
      
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
      }
      
      onTitleChangeEventHandler(event) {
        this.setState(() => {
          return {
            title: event.target.value.slice(0, this.state.limit),
          }
          

        });
      }
     
      onBodyChangeEventHandler(event) {
        this.setState(() => {
          return {
            body  : event.target.value,
          }
        });
      }
      
      onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.addNote(this.state);
      }

      render() {
        return (
          <form className='Note-input' onSubmit={this.onSubmitEventHandler}>
            <div className='Note-lenght'>
                <h1>Masukan Catatan </h1>
              <label htmlFor="title" className="sisa-note">
                Judul : <span>{this.state.limit - this.state.title.length} sisa karakter</span>
                </label>
              </div>
           <input type="text" placeholder="Masukan Judul" 
              value={this.state.title} 
              onChange={this.ontitleChangeEventHandler} required />

            <textarea className='Textarea-input' type="text" placeholder="Masukan isi" rows="9" cols="70"
             value={this.state.body} onChange={this.onbodyChangeEventHandler} required/>
            <button type="submit">Tambah</button>
          </form>
        )
      }
     }
     
     NoteInput.propTypes = {
      addNote: PropTypes.func.isRequired,
     }
export default NoteInput;
