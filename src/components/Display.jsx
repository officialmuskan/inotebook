import React, { useEffect,useState,useRef } from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/notecontext";
import { useParams } from "react-router-dom";
// NoteContext
// {useContext}
function countchar(des){
   
    let c = 0;
    let i = 0;
    while(i<des?.length){
        if(des[i]!==" "){
            c=c+1;
        }
        i++;
    }
    return c;

}
export default function Display(props){
    const context = useContext(NoteContext);
    //For Copying
    const handlecopy = (text)=>{
        if(text.length!==0)
        {navigator.clipboard.writeText(text)
        props.showAlert("Text Copied !! ", "success") }   
    }
    //For Editing
    const [editMode, setEditMode]=useState(false);
    const ref = useRef(null)
    const refClose = useRef(null)
    const [notes, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""}) 
    const updateNote = (currentNote) => {
        setEditMode(true)
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }
    const onChange = (e)=>{
        setNote({...notes, [e.target.name]: e.target.value})
    }
    const allClear = async(currentNote)=>{
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: "", etag:currentNote.tag})
    
        // await editNote(notes.id, notes.etitle, notes.edescription, notes.etag)
        

    }
    const handleClick = async(e)=>{ 
        await editNote(notes.id, notes.etitle, notes.edescription, notes.etag)
        await fetchaNote(id)
        setEditMode(false)
        // refClose.current.click();
        props.showAlert("Note Edited", "success")
    }
    const adjustTextareaHeight = (e) => {
        let no = (e.target.value.match(/\n/g) || []).length;
        let noo = 20 + no * 40;
        // e.target.style.height = "auto"; // Reset height to auto to shrink if necessary
        e.target.style.height = `${noo}px`; // Set height based on scroll height
    };

    
    // const { notes, updateNote } = props;
    // const {note} = props;
    //for note-display
    const {id} = useParams();
    const {fetchaNote,note,editNote} = context;
    useEffect(()=>{           
        fetchaNote(id);   
    },[]);
    
    const c = countchar(note?.note?.description)
    return(
        <>  
     <div style={{color:"white"}}>
        <div className="row-md-6">
            {!editMode ? (<>
                <h2 className="col">{note?.note?.title} 
        
        <i style={{color:"white", fontSize:"17px"}} className='far col fa-edit mx-3' onClick={()=>{updateNote(note?.note)}}></i>
        </h2>
            </>):(<>
                <input style={{background:"#12192c",color:"white", border:"none", fontSize:"calc(1.325rem + .9vw)"}}
                            type="text"
                            className="form-control"
                            name="etitle"
                            value={notes.etitle}
                            onChange={onChange}
                            minLength={5}
                            required
                        />
            </>)}
        
        </div>
        <br></br>
        {!editMode ? (
                <>
                    {/* Display the note description in non-editable mode */}
                    <h6 className="text-secondary">
                        {note?.note?.date.slice(0, 10)} {note?.note?.date.slice(11, 16)} |{" "}
                        {note?.note?.description.length} characters
                        <i
                            style={{ color: "grey" }}
                            className="far col fa-copy mx-3"
                            onClick={() => handlecopy(note?.note?.description)}
                        ></i>
                    </h6>
                    <p style={{ whiteSpace: "pre-line", fontSize: "1.5rem" }}>
                        {note?.note?.description}
                    </p>
                </>
            ) : (
                <>
                    <h6 className="text-secondary">
                        {note?.note?.date.slice(0, 10)} {note?.note?.date.slice(11, 16)} |{" "}
                        {note?.note?.description.length} characters 
                        <button onClick={()=>{allClear(note?.note)}} type="button" className="btn btn-danger mx-2 py-1 px-1" data-bs-dismiss="modal">Clear Text</button>
                        </h6>
                    {/* Editable description field */}
                    <textarea style={{background:"#12192c",color:"white", border:"none", fontSize: "1.5rem",whiteSpace: "pre-line"}}
                        className="form-control"
                        name="edescription"
                        value={notes.edescription}
                        onMouseOver={(e)=>{
                            adjustTextareaHeight(e);
                        }}
                        
                        onChange={(e)=>{
                            onChange(e)
                            adjustTextareaHeight(e);
                        }}
                        
                        minLength={5}
                        required
                    ></textarea>
                </>
            )} 
        {editMode?(<>
            <div className="modal-footer">

                            <button onClick={function(){setEditMode(!editMode)}} type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            <button disabled={notes.etitle.length<5 || notes.edescription.length<5} onClick={handleClick} type="button" className="btn mx-2  btn-success">Update Note</button>
                        </div>
        </> ):(<></>)}
                        

 
    </div>
    </>
    )
}