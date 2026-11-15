import { getAllCategories } from '../models/categories.js';
import { getCategoryDetails } from '../models/categories.js';

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

export { categoriesPage };
export { showCategoryDetailPage };
