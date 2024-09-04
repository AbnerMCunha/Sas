import { openDb } from "./configDb.js";


export async function createUsersTable(req, res) {
    openDb().then(db => {
        db.exec(`CREATE TABLE IF NOT EXISTS USERS( usrId INTEGER PRIMARY KEY AUTOINCREMENT, usrName VARCHAR(50), usrType VARCHAR(1)  );`)
    })
}

export async function selectUsers(req, res) {
    openDb().then(db => {
        db.all(`SELECT * FROM USERS;`).then(data => res.json(data))
    })
}

export async function updateUser(req, res) {

    let {id} = req.params;  
    let {name} = req.body;
    
    openDb().then(db => {
        db.run(`UPDATE USERS SET usrName = ? WHERE usrId = ? ;`, [name, id])
        .then(res.send({"statusCode":200, "msg":`User name updated successfully to ${name}`}))
    })
}

export async function insertUser(req, res) {
    
    let {usrName} = req.body;    
    openDb().then(db => {
        db.run("INSERT INTO USERS(usrName) VALUES( ? );" , [usrName])
    })
    res.send({"statusCode":200, "msg":`New User "${usrName}" registered`})
}


export async function selectUserId(req, res) {
    let {id }= req.params;  
    openDb().then(db => {
        db.get(`SELECT * FROM USERS WHERE usrId = ?;`, [id]).then(data => res.json(data))
    })
}

export async function selectUserByName(req, res) {

    let {name }= req.body;  
    
    openDb().then(db => {
        db.all(`SELECT * FROM USERS WHERE usrName LIKE ?`, [`%${name}%`])
          .then(data => res.json(data))
          .catch(err => res.status(500)
          .json({ error: err.message }));
    });
}

export async function selectUserByType(req, res) {
    
    let {type}= req.body;  
    openDb().then(db => {
        db.all(`SELECT * FROM USERS WHERE usrType = ? ;`, [`${type}`]).then(data => res.json(data))
    })
}
