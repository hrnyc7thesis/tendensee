const db = require('./db-config.js');

let user;

module.exports = {
  // FUNCTION ESCAPES INPUT
  create: (input, table, cb) => {
    db.query(`INSERT INTO ${table} SET ?`, input, (err, res) => {
      if(err) console.log(err);
      console.log('inserted:', res.insertID)
      cb(err, res)
    })
  },

  retrieve: (query, cb) => {
    db.query(query, (err, res)=> {
      if(err) console.log(err);
      console.log(res);
      cb(err, res)
    })
  },

  update: (update, table, cb) => {
    db.query(`UPDATE ${table} SET ?`, update, (err, res) => {
      if(err) console.log(err);
      console.log('updated:', res.changedRows, 'rows')
      cb(err, res)
    })
  },

  delete: (targetId, table, cb) => {
    db.query(`DELETE FROM ${table} WHERE id=?`, targetId, (err, res) => {
      if(err) console.log(err);
      console.log('deleted:', res.affectedRows, 'rows')
      cb(err, res)
    })
  },

  query: function(q, userId) {
    let queries = {
      retrieveUser: `select * from users where users.id = "${userId}"`,
      retrieveUserHabits: `select habits.* from users, habits where users.id = "${userId}" AND habits.id_users = users.id`,
      retrieveUserDates: `select dates.* from users, habits, dates where users.id = "${userId}" AND habits.id_users = users.id AND dates.id_users = users.id`,
    }
    return queries[q]
  },

}