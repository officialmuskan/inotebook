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
    const ref = useRef(null)
    const refClose = useRef(null)
    const [notes, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})
    const context = useContext(NoteContext);
    
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})

        // console.log
    }
    const onChange = (e)=>{
        setNote({...notes, [e.target.name]: e.target.value})
    }
    // const { notes, updateNote } = props;
    // const {note} = props;
    const {id} = useParams();
    console.log(id)
    
    const {fetchaNote,note,editNote} = context;
//    console.log("hdhha")
// fetchaNote(id)
    useEffect(()=>{  
        console.log("hdhha")     
        fetchaNote(id);   
    },[]);
    console.log(note)
    
// console.log(note.note.title);
const handleClick = async(e)=>{ 
     await editNote(notes.id, notes.etitle, notes.edescription, notes.etag)
     await fetchaNote(id)
    refClose.current.click();
    
    
    // props.showAlert("Note Edited", "success")
}

     const c = countchar(note?.note?.description)
    return(
        <>  
     <div style={{color:"white"}}>
        <div className="row">
        <h2 className="col">Title : {note?.note?.title}</h2>
        <i style={{color:"white"}} className='far col fa-edit mx-3' onClick={()=>{updateNote(note?.note)}}></i>
        </div>
        <h6 className="text-secondary">{note?.note?.date.slice(0,10)} {note?.note?.date.slice(11,16)} | {c} charachters</h6>
        <p style={{ whiteSpace: 'pre-line',fontSize:"1.5rem" }}>{note?.note?.description}</p>
        {/* {/* <button type="button">update</button> */}
      </div> 

    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content" style={{backgroundColor:"#12192ca5"}}>
                        <div className="modal-header" style={{color:"white"}}>
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" style={{backgroundColor:"white"}} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{color:"white"}}>
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={notes.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={notes.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={notes.etag} onChange={onChange}/>
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            <button disabled={notes.etitle.length<5 || notes.edescription.length<5} onClick={handleClick} type="button" className="btn  btn-success">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            
    </>
    )
}