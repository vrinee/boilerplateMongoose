require('dotenv').config();
mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const personSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})
let Person = mongoose.model("Person",personSchema);

const createAndSavePerson = (done) => {
  var james = new Person({name:"James",age:25,favoriteFoods:["pizza","hamburguer","soda"]})

  james.save(function(err, data) {
  if(err) return console.log(err);
  done(null ,data);
  });
};
var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err,personFound){
    if(err) return console.log(err);
    done(null, personFound);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: [food]}, function(err,personfound){
    if(err) return console.log(err);
    done(null, personfound)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err,personfound){
    if(err) return console.log(err);
    done(null, personfound)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';


  Person.findById(personId, (err, personFound) =>{
    if(err) return console.log(err); 
    personFound.favoriteFoods.push(foodToAdd);

    personFound.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName},
    { age: ageToSet },
    { new: true }, // This option returns the updated document
    (err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    }
  )

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.log(err);
    done(null ,data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 }) 
    .limit(2) 
    .select({ age: 0 }) 
    .exec((err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
