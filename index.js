// const questions = [

// ];

// function writeToFile(fileName, data) {
// }

// function init() {

// }

// init();

// Importing File System
const fs = require("fs");
// Importing Path Package
const path = require("path");
// Importing Inquirer Package
const inquirer = require("inquirer");
// Importing API JavaScript
const api = require("./utils/api");
// Importing Generate Markdown JavaScript
const genMarkDown = require("./utils/generateMarkdown");

// Inquirer Prompts
const questions = [
    {
        // GitHub UN Prompt
        type: "input",
        name: "Username",
        message: "What is your GitHub username?"
    },
    {
        // Project Title Prompt
        type: "input",
        name: "Title",
        message: "What is the title to your project?"
    },
    {
        // Project Description Prompt
        type: "input",
        name: "Project Description",
        message: "Describe your project"
    },
    {
        // License Choice Prompt
        type: "list",
        name: "License",
        message: "What is the license to your project?",
        choices: ["APACHE 2.0", "MIT", "BSD 3","GPL 3.0", "None"]
    },
    {
        // Installation
        type: "input",
        name: "Installation",
        message: "What is the command to install dependencies?",
        default: "npm install"
    },
    {
        // Usage Prompt
        type: "input",
        name: "Usage",
        message: "Can you provide an example of the code's usage?"
    },
    {
        // Contribution Prompt
        type: "input",
        name: "Contributing",
        message: "How can the user contribute to the repo?"
    },
    {
        // Test Prompt
        type: "input",
        name: "Tests",
        message: "What command should be used to run the test?",
        default: "npm test"
    }
];

function writeToFile(fileName, data) {
    // writeFileSync is built in, .cwd = current working directory
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

// Declaring Initialize
function init() {
    // Run Inquirer Prompts
    inquirer.prompt(questions)
    // THEN grab responses and perform anonymous arrow function
    .then((responses) => {
        // Run Get User Function (Given Answer to Prompt) on API
        api.getUser(responses.GitHub)
        // THEN grab data object and perform anonymous arrow function
        .then(({data}) => {
            // ======================> spread allows for responses from api and for data from inquirer
            writeToFile("README.md", genMarkDown({...responses, ...data}));
        });  
    });
}

// Calling Initialize
init();