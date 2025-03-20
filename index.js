import express from 'express'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import { dbController } from './Controllers/dbController.js'
import { userController } from './controllers/userController.js'
import { authController } from './controllers/authController.js'
import { cityController } from './controllers/cityController.js'
import { reviewController } from './controllers/reviewController.js'
import { estateController } from './controllers/estateController.js'
import { favoriteController } from './controllers/favoriteController.js'
import { staffController } from './controllers/staffController.js'

// Express Route Settings
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from 'assets' folder (Change if needed)
app.use('/images', express.static(path.join(__dirname, 'assets/images')));

// Route for root
app.get('/', (req, res) => {
    res.send('Hello world')
})

// Use controllers
app.use(
    estateController,
    cityController,
    reviewController,
    favoriteController,
    staffController,
    userController,
    authController,
    dbController
)

// 404 route - skal være sidst!
app.get('*', (req, res) => {
    res.send('404 - kunne ikke finde siden')
})

// Server settings
app.listen(4242, () => {
    console.log(`Server kører på adressen http://localhost:4242`)
})