const inquierer = require('inquirer');
const fs = require('fs');

// Store license info in global variable
const licenses = {
    'MIT License': {
        badge: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
        description: `MIT License

        Copyright (c) [year] [fullname]
        
        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:
        
        The above copyright notice and this permission notice shall be included in all
        copies or substantial portions of the Software.
        
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
        SOFTWARE.`
    },
    'ISC License': {
        badge:"[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)",
        description: `ISC License

        Copyright (c) [year] [fullname]
        
        Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted, provided that the above
        copyright notice and this permission notice appear in all copies.
        
        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.`
    },
    'Unlicense': {
        badge: "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)",
        description: `This is free and unencumbered software released into the public domain.

        Anyone is free to copy, modify, publish, use, compile, sell, or
        distribute this software, either in source code form or as a compiled
        binary, for any purpose, commercial or non-commercial, and by any
        means.
        
        In jurisdictions that recognize copyright laws, the author or authors
        of this software dedicate any and all copyright interest in the
        software to the public domain. We make this dedication for the benefit
        of the public at large and to the detriment of our heirs and
        successors. We intend this dedication to be an overt act of
        relinquishment in perpetuity of all present and future rights to this
        software under copyright law.
        
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
        EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
        IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
        OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
        ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
        OTHER DEALINGS IN THE SOFTWARE.
        
        For more information, please refer to <https://unlicense.org>`
    }
}

// TODO: Create an array of questions for user input
const questions = [
// GIVEN a command-line application that accepts user input

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
        name: '## Description',
        message: 'What is the description of your project?'
    },
    {
        type: 'input',
        name: '## Installation',
        message: 'Installation instructions:'
    },
    {
        type: 'input',
        name: '## Usage',
        message: 'What is the usage information?'
    },
    {
        type: 'input',
        name: '## Contributing',
        message: 'Contribution instructions:'
    },
    {
        type: 'input',
        name: '## Testing',
        message: 'What are the testing instructions?'
    },
    {
        type: 'list',
        name: '## License',
        message: 'What license would you like to use?',
        choices: [
            'ISC License',
            'MIT License',
            'Unlicense'
        ]
    }
];


function writeToFile(fileName, data) {
    let finalMarkdown = "";
    // WHEN I enter my project title
    // THEN this is displayed as the title of the README
    finalMarkdown += `# ${data.Title}\n`

    // WHEN I choose a license for my application from a list of options
    // THEN a badge for that license is added near the top of the README
    finalMarkdown += licenses[data['## License']].badge + "\n";

    // WHEN I click on the links in the Table of Contents
    // THEN I am taken to the corresponding section of the README
    finalMarkdown += 
    "- [Description](#description)\n- [Installation](#installation)\n- [Usage](#usage)\n- [Contributing](#contributing)\n- [Testing](#testing)\n- [License](#license)";

    finalMarkdown += "\n";

    for(let key in data) {
        if(key=== "# Title" || !key.startsWith("## ")) {
            continue;
        } else if (key === "## License") {
            // Add questions section before License section
            finalMarkdown += "## Questions\n";
            finalMarkdown += `- How to contact me: ${data['email']}\n`;
            finalMarkdown += `- GitHub Profile: [${data['ghUser']}](https://github.com/${data['ghUser']})\n`;

            // Insert github username and year into description for licenses.
            finalMarkdown += key + "\n" + licenses[data[key]].description.replace(['[fullname]'], data['ghUser']).replace('[year]', new Date().getFullYear());
        }else {
            finalMarkdown += key + "\n" + data[key] + "\n";
        }

    }

    fs.appendFile('README.md',finalMarkdown, (err) => err ? console.log(err) : console.log('Readme Created!'));
}

// TODO: Create a function to initialize app
function init() {
    inquierer.prompt(questions)
    .then((answers) => {
        // console.log(answers);
        writeToFile('README.md', answers);
    })
}

// Function call to initialize app
init();
