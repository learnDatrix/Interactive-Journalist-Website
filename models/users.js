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

// Create a new user given a title, content and username
async function getUsers(username, password)
{
  try
  {
    const row = await db.get("SELECT * FROM Users WHERE username= ? AND password = ?",
                          [username, password]);
    if(!row){
      throw new Error('User not found');
    }
    return row.level;
  }
  catch (err){
    console.error(err);
  }
}

module.exports = {getUsers};
