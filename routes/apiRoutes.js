const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const util = require("util");

// FS FUNCTIONS
// FS FUNCTIONS
// FS FUNCTIONS
// FS FUNCTIONS
const readAndAppend = (content, file) => {
    fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err
            ? console.error(err)
            : console.info(`\nData written to ${destination}`)
    );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
// FS FUNCTIONS
// FS FUNCTIONS
// FS FUNCTIONS
// FS FUNCTIONS

router.get("/", (req, res) => {
    // get all the notes from DB
    // for testing, just add/modify db.json
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));

    console.log("THIS WILL SHOW UP IN THE LOWER CONSOLE!!!");
    console.log(`GOT YOUR ${req.method} REQUEST`);
});

router.post("/", (req, res) => {
    console.log("TEST");
    console.log(req.body);

    // DECONSTRUCT REQ.BODY IF YOU NEED TO!!!
    const { title, text } = req.body;
    console.log(req.body);

    if (title && text) {
        const newNote = {
            id: uuidv4(),
            title,
            text,
        };
        readAndAppend(newNote, "./db/db.json");
    }

    // add a note to the DB
    var notesTest = [req.body];
    // res.json(`GOT YOUR ${req.method} REQUEST`);
    res.json(notesTest);
});

// BONUS - BE ABLE TO DELETE A NOTE AS WELL...

module.exports = router;
