const Clarifai = require('clarifai');
const imageRec = new Clarifai.App(config.imageId, config.imageSecret)


module.exports = (picture, habits) => {
  imageRec.models.predict(Clarifai.GENERAL_MODEL, newDate.picture)
  .then(data => {
    imageRecData = data;
    imageRecData.tags = data.outputs[0].data.concepts.map(item => item.name)
    // USE TAGS TO MATCH IMAGE TO HABIT (USER habit IDs ARE IN newDate.id_habits ARRAY -ONCE FIND CORRECT HABIT, OVERWRITE ID to id_habits)
    console.log('image recognized!!!:', imageRecData.tags)
    console.log('newDate right before add to sql', newDate)
}