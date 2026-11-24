import {
    getAllCategories,
    getCategoryDetails,
    updateCategoryAssignments
} from '../models/categories.js';

import {
    getCategoriesByProjectId,
    getProjectDetails
} from '../models/projects.js';



const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Categories';
    res.render('categories', { title, categories });
};

const showCategoryDetailPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryDetails(categoryId);

    if (!categoryDetails || categoryDetails.length === 0) {
        return res.status(404).render('404', {
            title: 'category not found'
        });
    }

    const title = categoryDetails[0].title

    res.render('category', {
        title,
        category: categoryDetails[0],
        projects: categoryDetails
    });
}

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = "Assign Categories to Project";

    res.render('assign-categories', {
        title,
        projectId,
        projectDetails,
        categories,
        assignedCategories
    });
};

const processAssignCategoriesForm = async (req, res) => {

    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
}

export {
    categoriesPage,
    showCategoryDetailPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
};
