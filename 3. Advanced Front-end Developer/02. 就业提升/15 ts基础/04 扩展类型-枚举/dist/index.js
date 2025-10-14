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
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
})(Gender || (Gender = {}));
let gender;
gender = Gender.Male;
gender = Gender.Female;
function searchGender(gender) {
    return gender;
}
