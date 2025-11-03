// const a = undefined;
// console.log(a.name);

function getName(): string | number {
  if (Math.random() > 0.5) {
    return "zhu feng";
  } else {
    return 404;
  }
}

let myName = getName();
if (typeof myName === "string") {
  myName = myName
    .split(" ")
    .filter((item) => item)
    .map((item) => item[0].toUpperCase() + item.substring(1))
    .join(" ");
}
console.log(myName);
