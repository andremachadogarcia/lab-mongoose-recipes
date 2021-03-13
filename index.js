const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    const newRecipe = {
      title: 'Pasta With Sauce and Meat',
      level: 'Easy Peasy',
      ingridientes: ['Pasta', 'Tomatos', 'Meat'],
      cuisine: 'Italian',
      dishType: 'main_course',
      duration: 20,
      creator: 'André Garcia',
    };

    Recipe.create(newRecipe)
       .then(createdRecipe => console.log(createdRecipe.title))
       .catch(error => console.log(error))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
