# Developer Profile Generator
This repository houses the files that implement a developer profile generator.

![Screenshot for developer profile generator](src/images/profile-screenshot.png)

### Purpose

This application provides a convenient means to generate a profile for a developer based on their GitHub account. Relying on only the developer's username, it generates a PDF that lists some general information about the programmer, including their location and bio, along with statistics about their GitHub repositories.

### Functionality

This application runs in node. To begin, from the command line, enter 'node index.js'.

At the first prompt, enter the GitHub username for the developer whose profile you'd like to generate. At the next prompt, choose your favorite color -- the application will use this color to style the resulting document.

The application queries GitHub to get information about the specified user and their repos. It collects this information and publishes it in a file named 'resume.pdf'.

### Concepts and techniques
* Axios
* Chaining
* Modules
* Node
* String literals

https://github.com/davidcbalsley/hw07-developer-profile
