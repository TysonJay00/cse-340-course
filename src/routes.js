
import express from 'express';

import { homePage } from './controllers/index.js';
import { organizationsPage, showOrganizationDetailsPage } from './controllers/organizations.js';
import {
    showProjectsPage,
    showProjectDetailsPage
} from './controllers/projects.js';
import { categoriesPage, showCategoryDetailPage } from './controllers/categories.js';
import { errorsPage } from './controllers/errors.js';


const router = express.Router();

router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);


router.get('/categories', categoriesPage);
router.get('/category/:id', showCategoryDetailPage);

// Error-handling routes
router.get('/test-error', errorsPage);

export default router;
