const DataTypes = require('sequelize');
const {Model} = DataTypes;

module.exports = class userAgent extends Model {
  static init(sequelize){
    return super.init({
      email:{
        type:DataTypes.STRING(30),
        allowNull:false,
        unique:false,
      },
      userAgent:{
        type:DataTypes.TEXT,
        allowNull:false,
      }, 
      userIP:{
        type:DataTypes.STRING(100),
        allowNull:false,
      },
    }, {
      modelName: 'UserAgent',
      tableName:'userAgent',
      charset:'utf8mb4',
      collate:'utf8mb4_general_ci',
      sequelize,
    });
  }
  static associate(db){
    db.UserAgent.belongsTo(db.User);
    }
};