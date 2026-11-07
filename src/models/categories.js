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

export { getAllCategories } 