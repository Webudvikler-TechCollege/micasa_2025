import express from 'express';
import { errorResponse, successResponse } from '../utils/responseUtils.js';
import { getQueryAttributes, getQueryLimit, getQueryOrder } from '../utils/apiUtils.js';
import { reviewModel as model } from '../models/reviewModel.js';
import { userModel } from '../models/userModel.js';

export const reviewController = express.Router();
// Base-URL for alle ruter i denne controller
const url = 'reviews';

// GET: Henter alle records fra databasen
reviewController.get(`/${url}`, async (req, res) => {
    try {
        // Henter liste af records fra modellen
        const list = await model.findAll({
            // Begrænser felter
            attributes: getQueryAttributes(req.query, 'id, subject, created_at'),
            // Begrænser antal records
            limit: getQueryLimit(req.query),
            // Sorterer resultat stigende efter felt 
            order: getQueryOrder(req.query),
            include: {
                model: userModel,
                attributes: ['firstname', 'lastname', 'email']
            }
        });
        if (!list || list.length === 0) {
            return errorResponse(res, `No records found`, 404); // Returnerer fejl hvis ingen poster findes
        }
        successResponse(res, list); // Returnerer succesrespons med listen
    } catch (error) {
        errorResponse(res, `Error fetching records: ${error.message}`); // Håndterer fejl
    }
});

// GET: Henter en enkelt record baseret på ID
reviewController.get(`/${url}/:id([0-9]+)`, async (req, res) => {
    try {
        // Læser ID fra URL
        const id = parseInt(req.params.id, 10);
        // Finder en enkelt record baseret på ID
        let details = await model.findByPk(id);
        // Fejlhåndtering hvis ingen record matcher
        if (!details) return errorResponse(res, `Record not found`, 404);
        // Returnerer matchende record
        successResponse(res, details);
    } catch (error) {
        errorResponse(res, `Error fetching record details: ${error.message}`); // Håndterer fejl
    }
});

// POST: Opretter en ny record i databasen
reviewController.post(`/${url}`, async (req, res) => {
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

// PUT: Opdaterer en eksisterende record baseret på ID
reviewController.put(`/${url}/:id([0-9]+)`, async (req, res) => {
    try {
        // Læser ID fra URL
        const { id } = req.params;
        // Henter data fra request body
        const data = req.body;
        // Opdaterer record 
        const [updated] = await model.update(data, {
            where: { id }, 
            individualHooks: true // Åbner for hooks i modellen
        });
        // Fejl hvis ingen record findes
        if (!updated) return errorResponse(res, `No record found with ID: ${id}`, 404); 
        // Returnerer succesrespons
        successResponse(res, { id, ...data }, `Record updated successfully`); 
    } catch (error) {
        // Håndterer fejl
        errorResponse(res, `Error updating record: ${error.message}`); 
    }
});

// DELETE: Sletter en record baseret på ID
reviewController.delete(`/${url}/:id([0-9]+)`, async (req, res) => {
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
