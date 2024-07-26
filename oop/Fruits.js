class Fruits {
  constructor(name, color, weight, location) {
    this.name = name;
    this.color = color;
    this.weight = weight;
    this.location = location;
  }

  fruitDescription() {
    console.log(
      `This is ${this.name} fruit. It is in ${this.color} in color and it grows in ${this.location} region`,
    );
  }
}

module.exports = Fruits;
