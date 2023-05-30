const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function init() {
  try {
    db = await sqlite.open({
      filename: 'database.db',
      driver: sqlite3.Database
    });
  } catch(err) {
      console.error(err);
  }
}

init();

// Return all users
async function getUsers()
{
  let results = await db.all("SELECT * FROM Users");
  return results;
}

async function deleteUser(username)
{
  // delete all articles for this user
  await db.run("DELETE FROM Articles WHERE username = ?",[username]);
  //delete user from users table
  await db.run("DELETE FROM Users WHERE username = ?",[username]);
}

async function deleteArticle(title)
{
  // delete all articles for this user
  await db.run("DELETE FROM Articles WHERE title = ?",[title]);
}



module.exports = {getUsers, deleteUser, deleteArticle};
