import { DataTypes } from "sequelize";
import sequelize from "./db";

const Admin = sequelize.define(
  "Admin",
  {
    loginID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loginPwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  // 可选配置
  {
    freezeTableName: true, ////让生成的数据表名称和模型名称一致。 默认变成复数，Admin -> Admins
    // tableName: 'NewAdmin', //也可以自定义表名
    createdAt: false, // 移出创建时间列
    updatedAt: false, // 移除更新时间列
    paranoid: true, // 添加删除时间列
  }
);

export default Admin;
