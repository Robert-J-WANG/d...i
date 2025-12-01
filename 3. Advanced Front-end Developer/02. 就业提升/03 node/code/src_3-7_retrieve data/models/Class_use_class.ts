import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "./db";

export class Class extends Model<
  InferAttributes<Class>,
  InferCreationAttributes<Class>
> {
  declare id?: number;
  declare name: string;
  declare openDate: Date | string;
  declare deletedAt?: Date | null;
}

Class.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    openDate: {
      type: DataTypes.DATE,
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

export default Class;
