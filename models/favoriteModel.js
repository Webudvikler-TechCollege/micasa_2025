import dbConfig from "../config/dbConfig.js"
import { DataTypes, Model } from "sequelize"
import { estateModel, imageModel, userModel } from "./index.js"

export class favoriteModel extends Model { }

favoriteModel.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},		
	estate_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: estateModel,
			key: 'id'
		}
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: userModel,
			key: 'id'
		}
	}
},
  {
    sequelize: dbConfig, // Sequelize-forbindelsen
    modelName: "favorite", // Navn på modellen
    timestamps: true, // Tilføjer createdAt og updatedAt felter
    underscored: true, // Bruger underscoring i stedet for camelCase i kolonnenavne
  }
)

