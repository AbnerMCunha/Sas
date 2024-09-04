import { openDb } from "./configDb.js";

export async function createMessageTable(req, res) {
    openDb().then(db => {
        db.exec(`CREATE TABLE IF NOT EXISTS Message (
                MessageId    INTEGER PRIMARY KEY AUTOINCREMENT,
                MessageTitle TEXT NOT NULL,
                MessageDsc   TEXT,
                MessageCategoryId,
                FOREIGN KEY(MessageCategoryId) REFERENCES MessageCategory(MessageCategoryId)
            );`)
    })
}

export async function selectMessage(req, res) {
    openDb().then(db => {
        db.all(`SELECT * FROM Message;`).then(data => res.json(data))
    })
}

export async function updateMessage(req, res) {
    let {id} = req.params;
    let {MessageTitle, MessageDsc} = req.body;
    console.log(id,MessageTitle, MessageDsc);   
    openDb().then(db => {
        db.run(`UPDATE Message 
            SET MessageTitle = ?, 
            MessageDsc = ? 
            WHERE MessageId = ? ;`, [MessageTitle, MessageDsc, id])
        .then(res.send({"statusCode":200, "msg":`Message ${id}-${MessageTitle} updated successfully!`}))
    })
}

export async function insertMessage(req, res) {
    
    let {MessageTitle, MessageDsc} = req.body;    
    
    openDb().then(db => {
        db.run("INSERT INTO Message(MessageTitle, MessageDsc) VALUES( ?, ? );" , [MessageTitle, MessageDsc])
    })
    res.send({"statusCode":200, "msg":`New Message "${MessageTitle}" registered`})
}


export async function selectMessageById(req, res) {
    let {id }= req.params;  
    openDb().then(db => {
        db.get(`SELECT * FROM Message WHERE MessageId = ?;`, [id]).then(data => res.json(data))
    })
}

export async function selectMessageByText(req, res) {

    let {txt}= req.body;  
    openDb().then(db => {
        db.all(`SELECT * FROM Message WHERE MessageDsc LIKE ? or MessageTitle LIKE ?`, [`%${txt}%`])
          .then(data => res.json(data))
          .catch(err => res.status(500)
          .json({ error: err.message }));
    });
}

