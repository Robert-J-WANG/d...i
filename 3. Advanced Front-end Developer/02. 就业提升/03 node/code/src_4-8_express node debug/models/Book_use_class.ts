import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "./db";

export class Book extends Model<
  InferAttributes<Book>,
  InferCreationAttributes<Book>
> {
  declare id?: number;
  declare name: string;
  declare imgUrl: string;
  declare publishDate: string;
  declare author: string;
  declare deletedAt?: Date | null;
}

Book.init(
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  // 可选配置
  {
    sequelize,
    freezeTableName: true, ////让生成的数据表名称和模型名称一致。 默认变成复数，Book -> Books
    // tableName: 'NewBook', //也可以自定义表名
    createdAt: false, // 移出创建时间列
    updatedAt: false, // 移除更新时间列
    paranoid: true, // 添加删除时间列
  }
);

export default Book;
