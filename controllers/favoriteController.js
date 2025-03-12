import express from 'express';
import { errorResponse, successResponse } from '../utils/responseUtils.js';
import { getQueryAttributes, getQueryLimit, getQueryOrder } from '../utils/apiUtils.js';
import { favoriteModel as model } from '../models/favoriteModel.js';

export const favoriteController = express.Router();
// Base-URL for alle ruter i denne controller
const url = 'favorites';

// GET: Henter alle records fra databasen
favoriteController.get(`/${url}`, async (req, res) => {
    try {
        // Henter liste af records fra modellen
        const list = await model.findAll({
            // Begrænser felter
            attributes: getQueryAttributes(req.query, 'id, name'),
            // Begrænser antal records
            limit: getQueryLimit(req.query),
            // Sorterer resultat stigende efter felt 
            order: getQueryOrder(req.query),
        });
        if (!list || list.length === 0) {
            return errorResponse(res, `No records found`, 404); // Returnerer fejl hvis ingen poster findes
        }
        successResponse(res, list); // Returnerer succesrespons med listen
    } catch (error) {
        errorResponse(res, `Error fetching records: ${error.message}`); // Håndterer fejl
    }
});

// POST: Opretter en ny record i databasen
favoriteController.post(`/${url}`, async (req, res) => {
    try {
        // Henter data fra request body
        const data = req.body;
        // Opretter en ny record
        const result = await model.create(data);
        // Returnerer succesrespons
        successResponse(res, result, `Record created successfully`, 201);
    } catch (error) {
        // Håndterer fejl
        errorResponse(res, `Error creating record: ${error.message}`);
    }
});

// DELETE: Sletter en record baseret på ID
favoriteController.delete(`/${url}/:id([0-9]+)`, async (req, res) => {
    try {
        // Læser ID fra URL
        const { id } = req.params; 
        // Sletter record fra databasen
        const deleted = await model.destroy({ where: { id } }); 
        // Fejl hvis ingen record findes
        if (!deleted) return errorResponse(res, `No record found with ID: ${id}`, 404); 
        // Returnerer succesrespons
        successResponse(res, null, `Record deleted successfully`); 
    } catch (error) {
        // Håndterer fejl
        errorResponse(res, `Error deleting record: ${error.message}`); 
    }
});