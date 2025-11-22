import Admin from "./Admin";
import Book from "./Book";
import Class from "./Class";
import Student from "./Student";
import sequelize from "./db";

//表之间的关系定义：
Class.hasMany(Student);

Student.hasMany(Book);

export { sequelize, Admin, Book, Class, Student };
