'use strict';
const {
  Model
} = require('sequelize');
const products = require('./products');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'users',
  });
  // users.associate=(models=>{
  //   users.hasMany(models.products,{foreignKey:'user_id',as:'products'})
  // })
  return users;
};