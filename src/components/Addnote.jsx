import React, {useContext, useState} from 'react'
import NoteContext from "../context/notes/notecontext"
import { useNavigate } from 'react-router-dom';

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    
 const navigate = useNavigate();
    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Note added", "success")
        navigate("/")
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container mt-5 " style={{color:"white", backgroundColor:"#12192ca5"}}>
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3 col-lg-6">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input style={{backgroundColor: "#12192ca9", color:"white"}} type="text" placeholder='Add a title with min 5 charachters' className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3 col-lg-9">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea style={{backgroundColor: "#12192ca9", color:"white"}}  type="text" rows={10} className="form-control" id="description" placeholder='Add a description of min length 5 to enable add note btn' name="description" value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3 col-lg-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input style={{backgroundColor: "#12192ca9", color:"white"}}  type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                </div>
               
                <button style={{color:"white"}} disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-theme" onClick={handleClick}>Add Note</button>

            </form>
        </div>
    )
}

export default AddNote