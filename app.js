const express = require('express');
const app = express();
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const fs = require('fs/promises');


// Include the mustache engine to help us render our pages
app.engine("mustache", mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// We use the .urlencoded middleware to process form data in the request body,
// which is something that occurs when we have a POST request.
app.use(express.urlencoded({extended: false}));

// Use the session middleware
app.use(session({secret: 'keyboard cat'
                ,resave: false
                ,saveUninitialized:false}))

// middleware to log requests with specific contents
app.use(async function(req, res, next){
    try{
        let time = new Date();
        let path = req.path;
        let ip = req.ip;
        let query_param = JSON.stringify(req.query);
        let req_body = JSON.stringify(req.body);
        let content = time + ", " + path + ", " + ip + ", " + query_param + ", " + req_body + "\n";

        await fs.appendFile('log.txt', content);

        next();
    }
    catch (err){
        console.log(err);
    }
});

// Create a middleware to populate an initial template array
app.use(function(req,res,next) {

  // reset the template obect to a blank object on each request
  req.TPL = {};

  // decide whether to display the login or logout button in the navbar
  req.TPL.displaylogin = !req.session.username
  req.TPL.displaylogout = req.session.username

  next();
});

// Create middlewares for setting up navigational highlighting
// - we could condense this significantly, for example by having one middleware
// that looks at the URL and decides based on a configuration array... but it
// would come at the cost of readability (which matters more right now since
// we are learning middlewares for the first time).
app.use("/home",
        function(req,res,next) { req.TPL.homenav = true; next(); });
app.use("/articles",
        function(req,res,next) { req.TPL.articlesnav = true; next(); });
app.use("/members",
        function(req,res,next) { req.TPL.membersnav = true; next(); });
app.use("/editors",
        function(req,res,next) { req.TPL.editorsnav = true; next(); });
app.use("/login",
        function(req,res,next) { req.TPL.loginnav = true; next(); });
app.use("/signup",
        function(req,res,next) { req.TPL.loginnav = true; next(); });

// protect access to the members page, re-direct user to home page if nobody
// is logged in...
app.use("/members", function(req,res,next) {

  if (req.session.username) next();
  else res.redirect("/home");

});

// Middleware to monitor access to 'page' depending on priveleges
app.use("/editors", function(req,res,next){
    if (req.session.level === "editor"){
        next();
    }
    else{
        res.redirect("/home");
    }
});

// Include Controllers
app.use("/home", require("./controllers/home"));
app.use("/articles", require("./controllers/articles"));
app.use("/members", require("./controllers/members"));
app.use("/editors", require("./controllers/editors"));
app.use("/login", require("./controllers/login"));
app.use("/signup", require("./controllers/signup"));

// - We route / to redirect to /home by default
app.get("/", function(req, res) {
  res.redirect("/home");
});

// Catch-all router case
app.get(/^(.+)$/, function(req,res) {
  res.sendFile(__dirname + req.params[0]);
});

// Start the server
var server = app.listen(8081, function() {console.log("Server listening...");})
