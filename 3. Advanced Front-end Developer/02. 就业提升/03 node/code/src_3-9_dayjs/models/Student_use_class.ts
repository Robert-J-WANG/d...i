import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "./db";

export class Student extends Model<
  InferAttributes<Student>,
  InferCreationAttributes<Student>
> {
  declare id?: number;
  declare name: string;
  declare dob: Date | string;
  declare sex: boolean;
  declare mobile: string;
  declare deletedAt?: Date | string | null;
  declare ClassId?: number;
}

Student.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  // 可选配置
  {
    sequelize,
    freezeTableName: true, ////让生成的数据表名称和模型名称一致。 默认变成复数，Student -> Students
    // tableName: 'NewStudent', //也可以自定义表名
    createdAt: false, // 移出创建时间列
    updatedAt: false, // 移除更新时间列
    paranoid: true, // 添加删除时间列
  }
);

export default Student;
