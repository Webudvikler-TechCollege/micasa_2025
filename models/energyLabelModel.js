import dbConfig from "../config/dbConfig.js"
import { DataTypes, Model } from "sequelize"

export class energyLabelModel extends Model { }

energyLabelModel.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},		
	name: {
		type: DataTypes.STRING,
		allowNull: false
	}
},
  {
    sequelize: dbConfig, // Sequelize-forbindelsen
    modelName: "energy_label", // Navn på modellen
    timestamps: false, // Tilføjer createdAt og updatedAt felter
    underscored: true, // Bruger underscoring i stedet for camelCase i kolonnenavne
  }
)

