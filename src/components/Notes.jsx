import React, {useContext, useEffect, useRef, useState} from 'react'
import NoteContext from '../context/notes/noteContext';
import Noteitems from './Noteitems';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom'

export default function Notes(props) {
    
    const context = useContext(NoteContext);
    const history = useNavigate();
    const{notes, fetchNote, editNote} = context
    const{showAlert} = props
    useEffect(() => {
        console.log(localStorage.getItem('token'))
        if(localStorage.getItem('token'))
        {
            fetchNote();
        }
        else{
            history('/login');
        }
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})
    const updateNote = (currentNote) => {
      ref.current.click();
      setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
  }

  const handleClick = (e)=>{ 
      editNote(note.id, note.etitle, note.edescription, note.etag)
      refClose.current.click();
      props.showAlert("Note Edited", "success")
  }

  const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }
    
  return (
    <>
    <div className="row my-3 " style={{color:"white"}}>
                <h1>YOUR NOTES</h1>
                {notes.map((note)=>{
                    return <Noteitems showAlert={showAlert} key={note._id} updateNote={updateNote} note = {note}/>
                })}
    </div>
    <Addnote showAlert = {showAlert}/>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-theme">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
    
    </>
  )
}
