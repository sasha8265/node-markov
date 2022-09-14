/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios')
const markov = require("./markov");


/** generate markovMachine from text */

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}


/** read file and generate text */

function makeText(file) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            // handle possible error
            console.error(`Cannot read file: ${file} - ${err}`);
            // kill the process and tell the shell it errored
            process.exit(1);
        } else {
            generateText(data);
            console.log("no errors");
        }
    });
}


/** read URL and generate text */

async function makeURLText(url) {
    let res;
    try {
        res = await axios.get(url);
    } catch (err) {
        console.log(`Error reaching ${url}: ${err}`);
        process.exit(1);
    }
    generateText(res.data);
    console.log("no errors");
}


/** read cmd line to decide which method to use */

let [method, path] = process.argv.slice(2);

if (method === "file") {
    makeText(path);
} else if (method === "url") {
    makeURLText(path);
} else {
    console.log(`Unknown Method: ${method}`);
    process.exit(1);
}

