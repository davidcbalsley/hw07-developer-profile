const axios = require("axios");
const generateHTML = require("./generateHTML");
const inquirer = require("inquirer");
const pdf = require("html-pdf");

// List of questions to ask the user
const questions = [
    {
        type: "input",
        message: "What is your GitHub user name?",
        name: "username"
    },
    {
        type: "list",
        message: "What is your favorite color?",
        name: "favoriteColor",
        choices: Object.keys(generateHTML.colors)
    }  
];

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
        .then(function(inquirerResponse) {
           
            // Create the query string -- incpororate the username entered by the user
            const queryUrl = `https://api.github.com/users/${inquirerResponse.username}`;

            axios.get(queryUrl).then(function(axiosResponse) {
                // console.log(axiosResponse);  // debug

                // Assign the color for the resume so that it matches the favorite color chosen by the user
                axiosResponse.data.color = inquirerResponse.favoriteColor;

                // const html = generateHTML.generateHTML(data);
                const html = generateHTML.generateHTML(axiosResponse.data);

                // console.log(html);  // debug          

                // Create a PDF
                writeToFile("resume.pdf", html);
            });            
        });
}

init();

// Next steps:
// - Fixformatting to HTML
// - Get colors from colors, using for ... in
// - Get data from axiosResponse, use it to populate document
// - Move pdf.create(html) into writeToFile, promisify it, avoid callback hell


