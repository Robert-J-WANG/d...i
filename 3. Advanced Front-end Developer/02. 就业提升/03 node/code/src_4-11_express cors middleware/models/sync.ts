import Admin from "./Admin_use_class";
import Book from "./Book_use_class";
import Class from "./Class_use_class";
import Student from "./Student_use_class";
import sequelize from "./db";

//表之间的关系定义：
Class.hasMany(Student);
Student.belongsTo(Class);

/* Student.hasOne(Book);
Book.belongsTo(Student); */

export { sequelize, Admin, Book, Class, Student };
