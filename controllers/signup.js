const express = require('express');
var router = express.Router()

const SignupModel = require('../models/signup.js');

// Displays the sign up page
router.get("/", async function(req, res)
{
    // Display error if signup is not successful, we are clearning it here
    req.TPL.signup_error = req.session.signup_error;
    req.session.signup_error = "";
    // render the login page
 	res.render("signup", req.TPL);
});

router.post("/attemptsignup", async function(req, res){
	let username = req.body.username_signup;
	let password = req.body.password_signup;

	let valid = SignupModel.validate(username, password);

	if (valid)
	{
		SignupModel.addUser(username, password);
		req.TPL.success_message = true;
		res.render('signup', req.TPL);
	}
	else
	{
		// if we have an error, reload the login page with an error
    	req.session.signup_error = "Username/password cannot be blank";
    	res.redirect("/signup");
	}
});

module.exports = router;