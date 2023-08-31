# Interactive-Journalist-Website

This repository showcases a project that exemplifies the utilization of the Model-View-Controller (MVC) architecture. The core technology stack includes Node.js for handling REST API requests, HTML5 for crafting the website's structure, and Mustache for creating logic-less templates. JavaScript is employed to code the logic components, incorporating various essential concepts such as promises, validation, middleware, and logging.

## Functionality

### Log Middleware
A custom middleware has been implemented to capture request details and log them into a file named "log.txt." This log includes essential information such as the date and time of each request, its path, originating IP address, query parameters, and request body. This logging mechanism facilitates easy tracking and analysis of server activity.

### Login Functionality
The login system has been enhanced by integrating it with a 'Users' table in the database. Instead of relying on hardcoded values, the system now verifies usernames and passwords against records in the 'Users' table. Upon successful login, users are dynamically redirected to the appropriate page based on their access level. A Users model has been created to streamline this functionality and manage interactions with the Users database table.

### Signup Process
A new feature enables users to sign up and create accounts. Users visiting the login page will find a "Sign-up" link that directs them to the signup page. Robust validation has been implemented for username and password inputs, ensuring they meet a minimum length requirement. In cases where validation fails, the page reloads with an error message. Conversely, successful submissions result in the creation of a user account in the database, with the default access level set as "member." The signup page then reloads, presenting users with a confirmation message and a link to the login page.

### Access Control
Access to the Editors page has been restricted through middleware. This middleware checks the user's access level, which is stored in the session variable. Only users with editor-level access are granted entry to the Editors page. If a public user or a member-level user attempts to access this page, they are automatically redirected to the Home page, ensuring proper access control.

### Editors Page Functionality
The Editors page features tables that display information about users and articles. The users table lists usernames, passwords, and access levels, while the articles table includes article titles and authors (referred to as "authors" in the table). Each table row contains a "Delete" link. Clicking the "D" link in the articles table removes the corresponding article from the Articles SQL table. Similarly, clicking the "D" link in the users table deletes the user from the Users SQL table, along with any articles authored by that user from the Articles SQL table.

Throughout the development process, strict adherence to the requirement of not utilizing any additional libraries, packages, or plugins has been maintained. This demonstrates the ability to work effectively with core technologies while implementing the required functionality.
