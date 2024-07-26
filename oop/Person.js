class Person {
  constructor(name, surnmae, age, job, isSlleping) {
    this.name = name;
    this.surnmae = surnmae;
    this.age = age;
    this.job = job;
    this.isSlleping = isSlleping;
  }

  sleeping() {
    this.isSlleping = true;
    return this.isSlleping;
  }

  calcAge() {
    return 2024 - this.age;
  }

  introduce() {
    console.log(`Hi my name is ${this.name}`);
  }
}

module.exports = Person;
