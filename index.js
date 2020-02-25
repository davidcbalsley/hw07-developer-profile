const axios = require("axios");
const generateHTML = require("./generateHTML");
const inquirer = require("inquirer");
const pdf = require("html-pdf");
// const util = require("util");

// List of questions to ask the user
const questions = [
    {
        type: "input",
        message: "What is your GitHub user name?",
        name: "username"
    }
  
];

// 
const data = {
    color: "red",
    name: "David Balsley",
    html_url: "",
    blog: "",
    publid_repos: 16,
    followers: 0,
    following: 1
}

// Create a PDF file from HTML
function writeToFile(fileName, data) {
    pdf.create(data).toFile(fileName, function(err, res) {
        if (err) {
            return console.log(err);
        }
    });
}


function init() {
    // Prompt the user with a series of questions
    inquirer
        .prompt(questions)
        .then(function(response) {
            // console.log(response); // debug

            const queryUrl = `https://api.github.com/users/${response.username}`;

            axios.get(queryUrl).then(function(axiosResponse) {
                // console.log(axiosResponse);  // debug

                // Assign name in data object
                // data.name = "David Balsley";
                // data.name = axiosResponse. ...  //

                // data.color = 

                // const html = generateHTML.generateHTML(data);
                const html = generateHTML.generateHTML(data);
                // console.log(html);             

                // Create a PDF
                writeToFile("resume.pdf", html);
                // return writeToFileAsync("resume.pdf", html);   
            });            
        });
}

init();

// Next steps:
// - Add formatting to HTML
// - Get colors from colors, using for ... in
// - Get data from axiosResponse, use it to populate document
// - Move pdf.create(html) into writeToFile, promisify it, avoid callback hell

// - At some point, restore call to axios

