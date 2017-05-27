const Clarifai = require('clarifai');
const config = require('./config.js');
const imageRec = new Clarifai.App(config.imageId, config.imageSecret)
const dbHelpers = require('./db/helpers.js');


const habitTypes = ['Fitness', 'Diet', 'Study', 'Time', 'Sleeping', 'Hygiene', 'timeManagement'];

const keywords = {
  'Fitness': ['fitness', 'exercise', 'weights', 'working out'],
  'Diet': ['food', 'drink', 'eating', 'meal', 'snack', 'diet', 'water'],
  'Study': ['reading', 'read', 'books', 'book', 'study', 'school', 'whiteboard', 'chalkboard'],
  'Time Mgmt.': ['clock', 'watch', 'time'],
  'Sleeping': ['sleep', 'sleeping', 'bed', 'pillow', 'alarm'],
  'Hygiene': ['floss', 'toothbrush', ],
  'Mindset': ['meditation', 'mindset'],
  'Reading': ['TAKE THIS OUT - TOO CLOSE TO STUDY']
}

module.exports = (picture, habits) => {
  return imageRec.models.predict(Clarifai.GENERAL_MODEL, picture)
  .then(data => {
    let imageRecData = data;
    imageRecData.tags = data.outputs[0].data.concepts.map(item => item.name.toLowerCase()).slice(0,5)
    console.log('image recognized!!!:', imageRecData.tags)
    let result;
    let uncheckedHabits = [];
    console.log('habit efore foreach', habits)
    habits.forEach((habit, idx) => {
      if(habit.dates && new Date().toMysqlFormat() != habit.dates[habit.dates.length-1]) {
        console.log('habit name & type', habit.name, habit.type);
        uncheckedHabits.push(habit);
        console.log('keywords arr', keywords[habit.type]);
        keywords[habit.type].forEach(word => {
          if(imageRecData.tags.indexOf(word)>-1) {
            console.log('habit match!: habit & tags', habit, imageRecData.tags)
            habit.index = idx;
            result = result || habit;
          }
        })
      }
    })
    if(!result && uncheckedHabits.length) {
      console.log('uncheckedHabits', uncheckedHabits)
      let index = Math.floor(Math.random()*uncheckedHabits.length);
      result = uncheckedHabits[index];
      result.index = index;
    }
    console.log('result', result)
    return result;
  })
  .catch(err => console.error(err));
}