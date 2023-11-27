'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products.init({
    name_products: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'products',
  });
  // products.associate = (models)=>{
  //   products.belongsTo(models.user,{foreignKey:"user_id",as:"user"})
  // }
  return products;
};