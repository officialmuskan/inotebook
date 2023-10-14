import React,{useContext} from 'react'
import NoteContext from '../context/notes/noteContext';

export default function Noteitems(props) {
  const context = useContext(NoteContext);
  const { note, updateNote } = props;
  
  
    const{delNote} = context
    const handleClick = (e)=>{
      
      delNote(note._id)
      props.showAlert("Deleted Successfully", "success")
  }
  return (
    
        
    <div className="col-md-3">
    <div className="card my-3 "style={{backgroundColor: "#12192c", color:"white"}} >
                    
        <div className="card-body" >
            <h5 className='card-title'>{note.title}</h5>
            <p className='card-description text-secondary'>{note.description}</p>
            <i className='far fa-trash-alt' onClick={handleClick}></i>
            <i className='far fa-edit mx-3' onClick={()=>{updateNote(note)}}></i>

            
        
            
        </div>
  </div>
  </div>
  )
}
