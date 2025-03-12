import dbConfig from "../config/dbConfig.js"
import { DataTypes, Model } from "sequelize"
import { estateModel, imageModel } from "./index.js"

export class estateImageRelModel extends Model { }

estateImageRelModel.init({
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
	image_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: imageModel,
			key: 'id'
		}
	},
	is_main: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	}
},
  {
    sequelize: dbConfig, // Sequelize-forbindelsen
    modelName: "estate_image_rel", // Navn på modellen
    timestamps: true, // Tilføjer createdAt og updatedAt felter
	freezeTableName: true,
    underscored: true, // Bruger underscoring i stedet for camelCase i kolonnenavne
  }
)

