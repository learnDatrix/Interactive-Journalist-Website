const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function init() {
  try {
    db = await sqlite.open({
      filename: 'database.db',
      driver: sqlite3.Database
    });
  } catch(err) {
      console.error("ddddd");
  }
}

init();

// Validate if username and password
function validate(username, password){

  if (username.length >= 1 && password.length >= 1){
    return true;
  }
  else{
    return false;
  }
}

async function addUser(username, password){

  await db.run("INSERT INTO Users Values (?,?,?)",[username, password, 'member'])
}


module.exports = {validate, addUser};
