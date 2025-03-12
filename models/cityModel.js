import dbConfig from "../config/dbConfig.js"
import { DataTypes, Model } from "sequelize"

export class cityModel extends Model { }

cityModel.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},		
	zipcode: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	}
},
  {
    sequelize: dbConfig, // Sequelize-forbindelsen
    modelName: "city", // Navn på modellen
    timestamps: true, // Tilføjer createdAt og updatedAt felter
    underscored: true, // Bruger underscoring i stedet for camelCase i kolonnenavne
  }
)

