import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT
          categories_id, title
        FROM service_categories
        ORDER BY categories_id
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (categoryId) => {
    const query = `
        SELECT categories_id, title
        FROM service_categories
        WHERE categories_id = $1
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows[0];
};

const getCategoryDetails = async (categoryId) => {
    const query = `
        SELECT
            service_categories.categories_id,
            service_categories.title,
            service_project.project_id,
            service_project.title AS project_title
        FROM service_categories
        LEFT JOIN service_project_categories
            ON service_categories.categories_id =
               service_project_categories.categories_id
        LEFT JOIN service_project
            ON service_project_categories.project_id =
               service_project.project_id
        WHERE service_categories.categories_id = $1
        ORDER BY service_project.date
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const assignCategoryToProject = async (projectId, categoryId) => {
    const query = `
        INSERT INTO service_project_categories
        (project_id, categories_id)
        VALUES ($1, $2)
    `;

    await db.query(query, [projectId, categoryId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {

    console.log('Model Project ID:', projectId);
    console.log('Model Category IDs:', categoryIds);

    const deleteQuery = `
        DELETE FROM service_project_categories
        WHERE project_id = $1
    `;

    await db.query(deleteQuery, [projectId]);

    for (const categoryId of categoryIds) {
        if (!categoryId || !Number.isInteger(Number(categoryId))) {
            throw new Error(`Invalid category ID: "${categoryId}"`);
        }

        await assignCategoryToProject(projectId, categoryId);
    }
};

const createCategory = async (name) => {
    const query = `
        INSERT INTO service_categories (title)
        VALUES ($1)
        RETURNING categories_id
    `;

    const queryParams = [name];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new category with ID:', result.rows[0].categories_id);
    }

    return result.rows[0].categories_id;
};

const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE service_categories
        SET title = $1
        WHERE categories_id = $2
        RETURNING categories_id
    `;

    const queryParams = [name, categoryId];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated category with ID:', categoryId);
    }

    return result.rows[0].categories_id;
};

export {
    getAllCategories,
    getCategoryById,
    getCategoryDetails,
    updateCategoryAssignments,
    createCategory,
    updateCategory
};