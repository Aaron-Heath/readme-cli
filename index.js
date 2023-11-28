const inquierer = require('inquirer');

// TODO: Create an array of questions for user input
const questions = [
// GIVEN a command-line application that accepts user input
// WHEN I enter my project title
    {
        type: 'input',
        name: 'ghUser',
        message: "What is your GitHub username?"
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address: '
    },
    {
        type: 'input',
        name: 'Title',
        message: 'What is your README title?'
    },
    {
        type: 'input',
        name: 'Description',
        message: 'What is the description of your project?'
    },
    {
        type: 'input',
        name: 'Usage Information',
        message: 'What is the usage information?'
    },
    {
        type: 'input',
        name: 'Contribution Guidelines',
        message: 'Describe the contribution guidelines.'
    },
    {
        type: 'input',
        name: 'Tests',
        message: 'What are the testing instructions?'
    },
    {
        type: 'list',
        name: 'license',
        message: 'What license would you like to use?',
        choices: [
            'Apache-2.0',
            'MIT License',
            'OSL-3.0',
            'PostgreSQL',
            'OFL-1.1',
            'Unlicense'
        ]
    }


// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    // THEN this is displayed as the title of the README
}

// TODO: Create a function to initialize app
function init() {
    inquierer.prompt(questions)
    .then((answers) => {
        console.log(answers);
    })
}

// Function call to initialize app
init();
