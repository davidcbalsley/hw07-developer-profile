const axios = require("axios");
const generateHTML = require("./generateHTML");
const inquirer = require("inquirer");
const pdf = require("html-pdf");

let favoriteColor = "";

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
            // Get information about the user
           
            // Create the query string -- incpororate the username entered by the user
            const userQueryUrl = `https://api.github.com/users/${inquirerResponse.username}`;

            favoriteColor = inquirerResponse.favoriteColor;

            return axios.get(userQueryUrl);
        })
        .then(function(axiosUserResponse) {
            // Get information about the user's repos, so that we can calculate the user's number of stars

            // Create the query string -- incorporate the username entered by the user
            const userReposUrl = `https://api.github.com/users/${axiosUserResponse.data.login}/starred`;

            axios.get(userReposUrl).then(function(axiosRepoResponse) {
                
                let totalStarCount = 0;     // The total number of stars for the user's repos

                // Get the count of stars for each repo
                const repoStarCounts = axiosRepoResponse.data.map(function(repo) {
                    return repo.stargazers_count;
                });

                // Add up the total count of stars for all of the repos
                for (var i = 0; i < repoStarCounts.length; i++) {
                    totalStarCount += parseInt(repoStarCounts[i]);
                }

                // Assign the color for the resume so that it matches the favorite color chosen by the user
                axiosUserResponse.data.color = favoriteColor;

                // Add the total number of stars to axiosUserResponse.data
                axiosUserResponse.data.starCount = totalStarCount;

                // Create the HTML
                const html = generateHTML.generateHTML(axiosUserResponse.data);       

                // Create a PDF
                writeToFile("resume.pdf", html);

            });
        });

}

init();

// Next steps:
// - Fix formatting to HTML
// -- Fix spacing between links
// - Switch out library for generating PDF?
// - Avoid callback hell
// - Handle case where GitHub username not found


