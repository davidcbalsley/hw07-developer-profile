# Developer Profile Generator
This repository houses the files that implement a developer profile generator.

![Screenshot for developer profile generator](src/images/profile-screenshot.png)

### Purpose

This website serves as an easy means to track appointments in a given day. It allows a user to record their important events, and also provides a graphical representation of the current time, making it that much simpler to quickly identify the next top priority on one's agenda.

### Functionality

To record an appointment, find the row for the corresponding time, then click the large text area in the middle. Type a description of your upcoming event. When you're ready to save, click the lock button to the right. The page will store your description in local storage, ensuring that your notes will persist, even if you close and re-open your browser window.

In addition, as you refresh the page throughout the day, the time slots will change in color to reflect the current time. Times in the past will appear in grey; in the present, in red; and in the future, in green.

### Concepts and techniques
* Using the Moment.js library to format dates
* Using indexOf

https://davidcbalsley.github.io/hw05-day-planner/
