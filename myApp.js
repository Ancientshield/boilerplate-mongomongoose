require('dotenv').config();

// 1. Install and Set Up Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// 2. Create a Model
const Schema = mongoose.Schema;
const personSchema = new Schema({
	name: { type: String, required: true },
	age: Number,
	favoriteFoods: [String],
});

const Person = mongoose.model('Person', personSchema);

// 3. Create and Save a Record of a Model
const createAndSavePerson = (done) => {
	const person = new Person({
		name: 'Brian',
		age: 26,
		favoriteFoods: ['Rice', 'Beans', 'Oat'],
	});
	person.save((err, data) => {
		if (err) return console.error(err);
		done(null, data);
	});
};

// 4. Create Many Records using model.create()
const arrayOfPeople = [
	{ name: 'Adam', age: 24, favoriteFoods: ['indomie noodle'] },
	{ name: 'Sola', age: 36, favoriteFoods: ['roasted yam'] },
	{ name: 'Colins', age: 48, favoriteFoods: ['Red wine'] },
];

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, (err, people) => {
		if (err) return console.log(err);
		done(null, people);
	});
};

// 5. Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
	Person.find({ name: personName }, (err, personFound) => {
		if (err) return console.log(err);
		done(null, personFound);
	});
};

// 6. Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
	Person.findOne({ favoriteFoods: food }, (err, singleFood) => {
		if (err) return console.log(err);
		done(null, singleFood);
	});
};

// 7. Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
	Person.findById(personId, (err, data) => {
		if (err) return console.log(err);
		done(null, data);
	});
};

// 8. Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
	const foodToAdd = 'hamburger';

	// Find Person ID
	Person.findById(personId, (err, person) => {
		if (err) return console.log(err);

		// Edit Person
		person.favoriteFoods.push(foodToAdd);

		// Save Person
		person.save((err, updatedPerson) => {
			if (err) return console.log(err);
			done(null, updatedPerson);
		});
	});
};

// 9. Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
	const ageToSet = 20;

	Person.findOneAndUpdate(
		{ name: personName },
		{ age: ageToSet },
		{ new: true },
		(err, updatedDoc) => {
			if (err) return console.log(err);
			done(null, updatedDoc);
		}
	);
};

const removeById = (personId, done) => {
	done(null /*, data*/);
};

const removeManyPeople = (done) => {
	const nameToRemove = 'Mary';

	done(null /*, data*/);
};

const queryChain = (done) => {
	const foodToSearch = 'burrito';

	done(null /*, data*/);
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
