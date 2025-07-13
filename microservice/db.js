const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./db.sqlite');

var createScript = `
    CREATE TABLE IF NOT EXISTS IT_PROJECTS (
        PROJECT_ID INTEGER PRIMARY KEY AUTOINCREMENT,
        PROJECT_NAME TEXT,
        START_DATE TEXT,
        TARGET_END_DATE TEXT,
        ACTUAL_END_DATE TEXT,
        CREATED_ON TEXT,
        CREATED_BY TEXT,
        MODIFIED_ON TEXT,
        MODIFIED_BY TEXT);`;

db.run(createScript, err => {
    if (err)
        console.error("Error at creating table: ", err);
    else
        console.log("Table created/loaded successfully");
    }
);

module.exports = db;