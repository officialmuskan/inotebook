import React, { useEffect } from "react";
import './About.css'
function About(){
    // const a = useContext(NoteContext)
    // useEffect(()=>{
    //     a.update();
    // },[])
    return(
        <>
            <section>
            <div className = "content">
                <h2>About Us</h2>
                <p>Welcome to My Notes App, your personal space for keeping track of your thoughts, ideas, and important information. Our app makes it easy to create, manage, and organize your notes in a simple and intuitive way.</p>
                <ul className = "links">
                    <li><a href = "#">Features</a></li>
                    <div className = "vertical-line"></div>
                    <li><a href = "#">Why?</a></li>
                    <div className = "vertical-line"></div>
                    <li><a href = "#">contact</a></li>
                </ul>
                
            </div>
            <div className = "content ">
                <h2>Features</h2>
                <p style={{listStyle:"none", width:"650px"}}>
                <li>Create Notes: Write down your thoughts, ideas, and to-do lists with ease.</li>
                <li>Edit Notes: Update and revise your notes whenever you need to make changes.</li>
                <li>Delete Notes: Remove unwanted or completed notes to keep your workspace tidy.</li>
                <li>User Authentication: Secure your notes by signing in and enjoy a personalized experience.</li>
                <h2 classNameName="mt-5">Contact</h2>
                <p style={{listStyle:"none", width:"600px"}}>
                    If you have any questions, feedback, or suggestions for improving our app, we'd love to hear from you. Please don't hesitate to contact our support team at <a href="mailto:support@mynotesapp.com">support@mynotesapp.com</a>.
                </p>
            </p>

               {/* <img src="https://cdn.pixabay.com/photo/2017/08/26/23/37/business-2684758__340.png" /> */}
            </div>

            
        </section>
        </>
    )
}
export default About;