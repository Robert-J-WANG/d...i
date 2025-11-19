import { EventEmitter } from "events";

const event = new EventEmitter();
event.on("hello1", () => {
  console.log("hello1");
});

event.on("hello2", () => {
  console.log("hello2");
});

event.on("hello3", () => {
  console.log("hello3");
});

event.emit("hello1");
event.emit("hello2");
event.emit("hello3");
