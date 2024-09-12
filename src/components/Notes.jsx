import React, {useContext, useEffect, useRef, useState} from 'react'
import NoteContext from '../context/notes/notecontext';
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
    // const navigate = useNavigate
    const addnotebtn = ()=>{
        history('/addnote');
    }
    
    

  

  
    
  return (
    <>
    <div className='row-md-6 d-flex justify-content-between'>
        <div className='col-md-3'>
        <h1 style={{color:"white"}}>YOUR NOTES</h1>
        </div>
        <div className='col-md-2'>
        <button onClick={addnotebtn} style={{backgroundColor:"#C850C0",borderRadius:'50%', fontSize:'15px'}}  className="btn btn-theme">+</button>
    
        </div>
    </div>
    
    
    <div className="row my-3" style={{color:"white"}}>
                
                {notes.length === 0 ? (
        <p className='text-secondary'>Try Adding Some Note</p>
    ) : (
        notes.map((note) => {
            return (
                <Noteitems
                    showAlert={showAlert}
                    key={note._id}
                    // updateNote={updateNote}
                    note={note}
                />
            );
        })
    )}
    </div>
    
    
    
    </>
  )
}
