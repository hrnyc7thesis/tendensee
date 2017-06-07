const db = require('./db-config.js');

let user;

  // HELPER FOR DATE FORMATTING
  twoDigits = d => {
      if(0 <= d && d < 10) return "0" + d.toString();
      if(-10 < d && d < 0) return "-0" + (-1*d).toString();
      return d.toString();
  }

  Date.prototype.toMysqlFormat = function() {
      return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
  };
module.exports = {

  // HELPERS FOR DATE FORMATTING

  // FUNCTION ESCAPES INPUT
  create: (input, table, cb) => {
    db.query(`INSERT INTO ${table} SET ?`, input, (err, res) => {
      if(err) console.log(err);
      // console.log('inserted:', res);
      cb(err, res)
    })
  },

  retrieve: (query, cb) => {
    db.query(query, (err, res)=> {
      if(err) console.log(err);
      // console.log(res);
      cb(err, res)
    })
  },

  update: (update, table, id, cb) => {
    db.query(`UPDATE ${table} SET ? WHERE id=?`, [update, id], (err, res) => {
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

  deleteFriendRelationship: (id_follower, id_followee, cb) => {
    db.query(`DELETE FROM friends WHERE id_follower=? AND id_followee=?`, [id_follower, id_followee], (err, res) => {
      if (err) console.error(err);
      cb(err, res);
    })
  },

  query: function(q, id) {
    let queries = {
      retrieveUser: `select * from users where users.id = "${id}"`,
      retrieveUserHabits: `select habits.* from users, habits where users.id = "${id}" AND habits.id_users = users.id`,
      retrieveDatesFromHabit: `select dates.* from habits, dates where habits.id = "${id}" AND dates.id_habits = habits.id ORDER BY date DESC`,
      retrieveAllOtherUsers: `select * from users where users.id <> "${id}"`,
      retrieveFriends: `select * from friends where id_follower = "${id}"`,
    }
    return queries[q]
  }
}
