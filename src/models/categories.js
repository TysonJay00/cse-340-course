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

const getCategoryDetails = async (categoryId) => {
    const query = `
    SELECT
       service_categories.categories_id,
       service_categories.title,
       service_project.project_id,
       service_project.title AS project_title
    FROM service_categories
    JOIN service_project_categories
    ON service_categories.categories_id =
       service_project_categories.categories_id
    JOIN service_project
    ON service_project_categories.project_id =
       service_project.project_id
    WHERE service_categories.categories_id = $1
    ORDER BY service_project.date
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
}

export { getAllCategories }
export { getCategoryDetails }