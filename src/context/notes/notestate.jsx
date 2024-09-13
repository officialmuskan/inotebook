import react, { useEffect, useState } from "react";
import NoteContext from "./notecontext";
const NoteState = (props)=>{
    // const s1 = {
    //     "name" : "Muskan",
    //     "class" : "3rd yr"
    // }
    // const [state, setState] = useState(s1)
    // const update = ()=>{
    //     setTimeout(()=>{
    //         setState(
    //             {
    //                 "name" : "Puneet",
    //                 "class" : "1st yr"
    //             }
    //         )
    //     }, 1000)
    // }
    // return(
    //     <NoteContext.Provider value={{state, update}}>
    //         {props.children}
    //     </NoteContext.Provider>
    // )
    // const notesin = [
    //     {
    //       "_id": "651577ef80253d653afcddc1e",
    //       "user": "6515630deea1e8dd62cc9392",
    //       "title": "hello",
    //       "description": "fjkkkaka",
    //       "tags": "gjkajk",
    //       "date": "2023-09-28T13:26:16.806Z",
    //       "__v": 0
    //     },
    //     {
    //       "_id": "65242dc51b8b1f613249ba99",
    //       "user": "6515630deea1e8dd62cc9392",
    //       "title": "hello",
    //       "description": "fjkkkaka",
    //       "tags": "gjkajk",
    //       "date": "2023-10-09T16:43:49.911Z",
    //       "__v": 0
    //     }
    // ]
    const notesin = []
    const onenote={}
    
    const host = "http://localhost:5000"
    const [notes, setNotes] = useState(notesin)
    const[note, setNote] = useState(onenote);
    const fetchNote = async()=>{
      const response = await fetch("http://localhost:5000/api/notes/fetchallnotes",
      {
        method:"GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
          
        },
        
      });
      const json = await response.json();
      
      setNotes(json)    
    }
    const fetchaNote = async(id)=>{
      
      const response = await fetch(`${host}/api/notes/fetch/${id}`,
        {
          method:"GET",
          headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
          
        }});
      const json = await response.json();
      
      setNote(json)
      
      
    }
    //ADD
    const addNote = async(title, description, tag)=>{

      const response = await fetch(`${host}/api/notes/addnote`,
      {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
          
        },
        body:JSON.stringify({title, description, tag})
      });
      
      

            const note = await response.json();
            setNotes(notes.concat(note))
    }
    
    //DELETE
    const delNote = async(id)=>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`,
      {
        method:"DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
          
        }
      });
        const json = response.json();
        
        const newNote = notes.filter((note)=>{return note._id !== id})
        setNotes(newNote)
        
    }
    // //EDIT
    const editNote = async(id,title, description, tag )=>{
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json(); 
  
       let newNotes = JSON.parse(JSON.stringify(notes))
      // Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag; 
          break; 
        }
      }  
      
        
      setNotes(newNotes);
    }
    
    return(
        <NoteContext.Provider value={{notes, addNote,delNote, fetchNote, editNote,note, fetchaNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;