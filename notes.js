const { default: chalk } = require('chalk');
const fs = require('fs')

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(
        (instance) => instance.title === title
    )
    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    else{
        console.log(chalk.red.inverse('No note found'))
    }
}

const addNote = (title , body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(
        (note) => note.title === title
    )
    if(!duplicateNote){
        notes.push(
            {
                title : title,
                body : body
            }
        )
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
    }
    else{
        console.log(chalk.red.inverse('Title taken'))
    }

}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title
    )
    if(notesToKeep.length < notes.length){
        console.log(chalk.green.inverse('Note Removed'))
        saveNotes(notesToKeep)
    }
    else{
        console.log(chalk.red.inverse('NO note found'))
    }
}

const listNotes = ()=>{
    console.log(chalk.white.inverse('Your Notes'))
    const notes = loadNotes()
    notes.forEach(note => {
        console.log(note.title)
    });
    
}

const loadNotes =  () => {
    try{
        const bufferData = fs.readFileSync("./notes.json")
        const jsonData = bufferData.toString()
        return JSON.parse(jsonData)
    }
    catch (e) {
        return []
    }

}

const saveNotes = (notes) => {
    const jsonData = JSON.stringify(notes)
    fs.writeFileSync("./notes.json" , jsonData)
}

module.exports = {
    readNote : readNote,
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
};

