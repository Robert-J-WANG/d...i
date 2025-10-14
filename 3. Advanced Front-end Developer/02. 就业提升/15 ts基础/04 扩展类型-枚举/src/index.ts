/* let gender: "male" | "female";

gender = "male";
gender = "female";

function searchGender(gender: "male" | "female") {
  return gender;
} */

/* type Gender = "male" | "female";

let gender: Gender;
gender = "male";
gender = "female";

function searchGender(gender: Gender) {
  return gender;
}
 */

enum Gender {
  Male = "male",
  Female = "female",
}

let gender: Gender;
gender = Gender.Male;
gender = Gender.Female;

function searchGender(gender: Gender) {
  return gender;
}

function printGender() {
  let vals = Object.values(Gender);
  vals.forEach((v) => console.log(v));
}
printGender();

enum Level {
  level1 = "one",
  level2 = "two",
  level3 = "three",
}

enum LevelNum {
  level1 = 1,
  level2,
  level3,
}

let level2 = LevelNum.level2;
let level3 = LevelNum.level3;
console.log(level2);
console.log(level3);
