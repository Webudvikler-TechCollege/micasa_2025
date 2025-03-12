import express from 'express';
import dbConfig from '../config/dbConfig.js';
import { seedFromCsv } from '../utils/seedUtils.js';
import { userModel, estateModel, cityModel, typeModel, imageModel, estateImageRelModel, staffModel, reviewModel, favoriteModel, energyLabelModel } from '../models/index.js';
import { errorResponse, successResponse } from '../utils/responseUtils.js';

export const dbController = express.Router();

// Test database connection
dbController.get('/test', async (req, res) => {	
	try {
		await dbConfig.authenticate();
		successResponse(res,'','Database connection successful')
	} catch (error) {
		errorResponse(res,'Could not connect to the database')
	}
});

// Synchronize database tables
dbController.get('/sync', async (req, res) => {
	try {
		const forceSync = req.query.force === 'true';
		await dbConfig.sync({ force: forceSync });
		successResponse(res,'',`Database synchronized ${forceSync ? 'with force' : 'without force'}`)
	} catch (error) {
		errorResponse(res,`Synchronize failed!`, error)
	}
});

// Seed database from CSV files
dbController.get('/seedfromcsv', async (req, res) => {
	try {
		// Array med seed filer og models
		const files_to_seed = [
			{ file: 'user.csv', model: userModel },
			{ file: 'city.csv', model: cityModel },
			{ file: 'energy-label.csv', model: energyLabelModel },
			{ file: 'estate-type.csv', model: typeModel },
			{ file: 'estate.csv', model: estateModel },
			{ file: 'favorite.csv', model: favoriteModel },
			{ file: 'image.csv', model: imageModel },
			{ file: 'review.csv', model: reviewModel },
			{ file: 'staff.csv', model: staffModel },
			{ file: 'estate-image-rel.csv', model: estateImageRelModel },
		]
		// Array til svar
		const files_seeded = []

		// Sync'er database
		await dbConfig.sync({ force: true });

		// Looper og seeder filer til modeller
		for(let item of files_to_seed) {
			files_seeded.push(await seedFromCsv(item.file, item.model))	
		}
		successResponse(res,{ 'Files seeded': files_seeded},`Seeding completed!`,)
	} catch (error) {
		errorResponse(res,`Seeding failed!`, error)
	}
});
