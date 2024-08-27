import React, {useContext} from 'react'
import NoteContext from '../context/notes/notecontext';

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
    <div className="card my-3 "style={{backgroundColor: "#C850C0", color:"white", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} >
                    
        <div className="card-body" >
            <h5 className='card-title'>{note.title}</h5>
            <p className='card-description text-muted'>{note.description}</p>
            <i className='far fa-trash-alt' onClick={handleClick}></i>
            <i className='far fa-edit mx-3' onClick={()=>{updateNote(note)}}></i>

            
        
            
        </div>
  </div>
  </div>
  )
}
