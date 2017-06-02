const Clarifai = require('clarifai');
const config = require('./config.js');
const imageRec = new Clarifai.App(config.imageId, config.imageSecret)
const dbHelpers = require('./db/helpers.js');
const moment = require('moment');


const habitTypes = ['Fitness', 'Diet', 'Study', 'Time', 'Sleeping', 'Hygiene', 'timeManagement'];

const keywords = {
  'Fitness': ['fitness', 'exercise', 'weights', 'working out', 'footwear', 'shoe'],
  'Diet': ['food', 'drink', 'eating', 'meal', 'snack', 'diet', 'water', 'no person'],
  'Study': ['reading', 'read', 'books', 'book', 'study', 'school', 'whiteboard', 'chalkboard'],
  'Time Mgmt.': ['clock', 'watch', 'time'],
  'Sleeping': ['sleep', 'sleeping', 'bed', 'pillow', 'alarm'],
  'Hygiene': ['floss', 'toothbrush', ],
  'Mindset': ['meditation', 'mindset'],
  'Reading': ['TAKE THIS OUT - TOO CLOSE TO STUDY']
}

module.exports = (pic, habits) => {
  return imageRec.models.predict(Clarifai.GENERAL_MODEL, pic)
  .then(data => {
    let imageRecData = data;
    imageRecData.tags = data.outputs[0].data.concepts.map(t => t.name.toLowerCase());
    console.log('image recognized!!!:', imageRecData.tags)
    let result;
    habits.forEach(habit => {
      keywords[habit.type].forEach(word => {
        if(imageRecData.tags.indexOf(word)>-1) {
          result = result || habit;
          console.log('habit match! Result:', result)
        }
      })
    })
    if(!result) {
      let index = Math.floor(Math.random()*habits.length);
      result = habits[index];
      console.log('NO MATCH FOR IMAGE REC - RANDOMIZED RESULT:', result)
    }
    console.log('result', result)
    return result;
  })
  .catch(err => console.error('Image Recognition Error', err));
}
