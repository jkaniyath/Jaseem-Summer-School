const Fruits = require("./Fruits");
const Person = require("./Person");

let student = new Person("John", "Smith", 18, "Janitor", false);
let anotherStudent = new Person("Jack", "Rooney", 22, "Programmer", false);

let apple = new Fruits("Apple", "Red or Green", 0.35, "Colder");
let banana = new Fruits("Banana", "Yellow or Green", 0.37, "Sub Condinent");

student.introduce();
apple.fruitDescription();
