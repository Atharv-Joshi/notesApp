const chalk = require('chalk') 
const yargs = require('yargs')
const notes = require('./notes')

//Settings yargs version
yargs.version("12.0.2")

//Create add command
yargs.command({
    command:'add',
    describe:'Add new note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type: 'string'
        },
        body:{
            describe:'Note Body',
            demandOption:true,
            type:'string'
        },
    },
    handler(argv) {
        notes.addNote(argv.title , argv.body)
    }
})

//Create remove command
yargs.command({
    
    command:'remove',
    describe:'Remove a note',
    builder:{
        title:{
            describe:'Title of note to be removed',
            type:'string',
            demandOption:true
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//Create list command
yargs.command({
    command:'list',
    describe:'List yournotes',
    handler() {
        notes.listNotes()
    }
})

//Create read command
yargs.command({
    command:'read',
    describe:'read a note',
    builder:{
        title : {
            describe : "Title of Note",
            type: "string",
            demandOption: true,
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()