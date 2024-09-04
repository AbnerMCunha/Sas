import { openDb } from "./configDb.js";

export async function createMessageCategoryTable(req, res) {
    openDb().then(db => {
        db.exec(`CREATE TABLE IF NOT EXISTS MessageCategory (
                MessageCategoryId    INTEGER PRIMARY KEY AUTOINCREMENT,
                MessageCategoryTitle TEXT NOT NULL,
                MessageCategoryDsc   TEXT
            );`)
    })
}

export async function selectMessageCategory(req, res) {
    openDb().then(db => {
        db.all(`SELECT * FROM MessageCategory;`).then(data => res.json(data))
    })
}

export async function updateMessageCategory(req, res) {
    let {id} = req.params;
    let {MessageCategoryTitle, MessageCategoryDsc} = req.body;
    
    openDb().then(db => {
        db.run(`UPDATE MessageCategory 
            SET MessageCategoryTitle = ?, 
            MessageCategoryDsc = ? 
            WHERE MessageCategoryId = ? ;`, [MessageCategoryTitle, MessageCategoryDsc, id])
        .then(res.send({"statusCode":200, "msg":`MessageCategory ${id}-${MessageCategoryTitle} updated successfully!`}))
    })
}

export async function insertMessageCategory(req, res) {
    
    let {MessageCategoryTitle, MessageCategoryDsc} = req.body;    
    openDb().then(db => {
        db.run("INSERT INTO MessageCategory(MessageCategoryTitle, MessageCategoryDsc) VALUES( ?, ? );" , [MessageCategoryTitle, MessageCategoryDsc])
    })
    res.send({"statusCode":200, "msg":`New MessageCategory "${MessageCategoryTitle}" registered`})
}


export async function selectMessageCategoryById(req, res) {
    let {id }= req.params;  
    openDb().then(db => {
        db.get(`SELECT * FROM MessageCategory WHERE MessageCategoryId = ?;`, [id]).then(data => res.json(data))
    })
}

export async function selectMessageCategoryByText(req, res) {

    let {txt}= req.body;  
    openDb().then(db => {
        db.all(`SELECT * FROM MessageCategory WHERE MessageCategoryDsc LIKE ? or MessageCategoryTitle LIKE ?`, [`%${txt}%`])
          .then(data => res.json(data))
          .catch(err => res.status(500)
          .json({ error: err.message }));
    });
}

