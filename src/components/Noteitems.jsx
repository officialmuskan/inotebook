import React, {useContext} from 'react'
import NoteContext from '../context/notes/notecontext';
import { useNavigate } from 'react-router-dom';

export default function Noteitems(props) {
  const context = useContext(NoteContext);
  const nav = useNavigate();
  const { note, updateNote } = props;
    const{delNote} = context
    const opennote = ()=>{     
      nav(`/display/${note._id}`);
    }
    
    const handleClick = (e)=>{ 
      delNote(note._id)
      props.showAlert("Deleted Successfully", "success")
  }
  return (
    
        
    <div className="col-md-4">
    <div className="card my-3 "style={{backgroundColor: "#C850C0", color:"white", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} >
                    
        <div className="card-body" >
            <h5 className='card-title' onClick={opennote}>{note.title.slice(0,15)}...</h5>
            
            <p className='card-description text-muted'>{note.description.slice(0,25)}...</p>
            
             <i className='far fa-trash-alt' onClick={handleClick}></i>
            
        </div>
  </div>
  </div>
  )
}
