import { DataTypes } from "sequelize";
import sequelize from "./db";

const Book = sequelize.define(
  "Book",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publishDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    paranoid: true,
  }
);

export default Book;
