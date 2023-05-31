# Interactive-Journalist-Website
This code sample showcases a project that demonstrates the utilization of the Model-View-Controller (MVC) architecture. 
It leverages Node.js to proficiently handle REST API requests. The website is meticulously crafted using HTML5 and Mustache, facilitating the implementation of logic-less templates. 
The logic components are skillfully coded in JavaScript, incorporating various essential concepts including promises, validation, middleware, and logging.


Functionality of the Code:

Log Middleware:
I implemented a middleware that captures request details and logs them to a file called "log.txt". Each request's date and time, path, IP address, query parameters, and request body are recorded in a comma-separated format. This allows for easy tracking and analysis of server activity.

Login Functionality:
The login system was enhanced by integrating it with a Users table in the database. Instead of using hardcoded values, the system now verifies the username and password against the records in the Users table. Upon successful login, users are redirected to the appropriate page based on their access level. I created a Users model to facilitate this functionality and handle interactions with the Users database table.

Signup Process:
I introduced a sign-up feature, allowing new users to create accounts. On the login page, users see a "Sign-up" link that directs them to the signup page. I implemented validation for the entered username and password, ensuring they are both at least one character long. If the validation fails, the page reloads with an error message. If successful, I implemented the creation of the user's account in the database with the access level set as "member". The signup page then reloads with a confirmation message and a link to the login page.

Access Control:
To restrict access to the Editors page, I implemented middleware that checks the user's access level stored in the session variable. Only users with an editor-level access are allowed to view the Editors page. If a public user or a member-level user attempts to access the page, they are automatically redirected to the Home page.

Editors Page Functionality:
On the Editors page, I implemented tables to display information about users and articles. The users table lists usernames, passwords, and access levels. The articles table includes article titles and authors (referred to as "authors" in the table). Each table row contains a "Delete" link. Clicking the "D" link in the articles table removes the corresponding article from the Articles SQL table. Similarly, clicking the "D" link in the users table deletes the user from the Users SQL table, along with any articles authored by that user from the Articles SQL table.

Throughout the development process, I adhered to the requirement of not using any additional libraries, packages, or plugins. This demonstrates my ability to work with core technologies and implement the required functionality effectively.
