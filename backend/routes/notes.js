const express = require('express')
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const { body , validationResult} = require('express-validator');
const Notes = require('../models/Notes');

//get all the notes
router.get('/fetchallnotes', fetchUser, async (req, res)=>{   
    try {
        
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("eror occr")
    }
    
})

router.post('/addnote', fetchUser,[body('title', 'enter a valid name').isLength({min:3}),
body('description').isLength({min: 5})], async (req, res)=>{   

    try{
        const result = validationResult(req);
        const {title, description, tags} = req.body
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        const note = new Notes({
            title, description, tags, user: req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote)
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("eror occr")
    }
})

router.put('/updatenote/:id', fetchUser, async (req, res)=>{   

    try{
        // const result = validationResult(req);
        const {title, description, tags} = req.body
        
        const newNote = {}
        if(title){
            newNote.title = title
        };
        if(description){
            newNote.description = description
        };
        if(tags){
            newNote.tags = tags
        };

        let note = await Notes.findById(req.params.id);
        if(!note){
            res.status(404).send("not found")
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("not allow")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note})
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("eror occr")
    }
})

router.delete('/deletenote/:id', fetchUser, async (req, res)=>{   
    try{
        const {title, description, tags} = req.body
        let note = await Notes.findById(req.params.id);
        if(!note){
            res.status(404).send("not found")
        }
        //allow deletion
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("not allow")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json("deletef")
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("eror occr")
    }
})
module.exports = router