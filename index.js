const axios = require("axios");
const generateHTML = require("./generateHTML");
const inquirer = require("inquirer");
const pdf = require("html-pdf");

const questions = [
    {
        type: "input",
        message: "What is your GitHub user name?",
        name: "username"
    }
  
];

const data = {
    color: "red",
    name: ""
}

function writeToFile(fileName, data) {
 
}

function init() {
    // Prompt the user with a series of questions
    inquirer
        .prompt(questions)
        .then(function(response) {
            // console.log(response); // debug

            const queryUrl = `https://api.github.com/users/${response.username}`;

            // axios.get(queryUrl).then(function(axiosResponse) {
                // console.log(axiosResponse);  // debug

                // Assign name in data object
                data.name = "David Balsley";

                const html = generateHTML.generateHTML(data);
                // console.log(html);

                pdf.create(html).toFile("temp.pdf", function(err, res){
                    console.log(res.filename);
                  });
            // });
        });

}

init();

// Next steps:
// - Get colors from colors, using for ... in
// - Move pdf.create(html) into writeToFile, promisify it, avoid callback hell
// - At some point, restore call to axios
// - Add formatting to HTML
