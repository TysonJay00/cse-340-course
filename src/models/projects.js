import db from './db.js'

const getAllProjects = async () => {
  const query = `
        SELECT
            service_project.project_id,
            service_project.title,
            service_project.description,
            service_project.location,
            service_project.date,
            organization.organization_id,
            organization.name AS organization_name
        FROM service_project
        JOIN organization
        ON service_project.organization_id = organization.organization_id;
    `;

  const result = await db.query(query);
  return result.rows;
};


const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY date;
      `;

  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  return result.rows;
};

// Get the next upcoming service projects
const getUpcomingProjects = async (number_of_projects) => {
  const query = `
        SELECT
            service_project.project_id,
            service_project.title,
            service_project.description,
            service_project.date,
            service_project.location,
            service_project.organization_id,
            organization.name AS organization_name
        FROM service_project
        JOIN organization
            ON service_project.organization_id = organization.organization_id
        WHERE service_project.date >= CURRENT_DATE
        ORDER BY service_project.date ASC
        LIMIT $1;
    `;

  const queryParams = [number_of_projects];
  const result = await db.query(query, queryParams);
  return result.rows;
};

// Get one service project by its ID
const getProjectDetails = async (id) => {
  const query = `
        SELECT
            service_project.project_id,
            service_project.title,
            service_project.description,
            service_project.location,
            service_project.date,
            organization.organization_id,
            organization.name AS organization_name
        FROM service_project
        JOIN organization
            ON service_project.organization_id = organization.organization_id
        WHERE service_project.project_id = $1;
    `;

  const queryParams = [id];
  const result = await db.query(query, queryParams);

  return result.rows[0] || null;
};

const getCategoriesByProjectId = async (projectId) => {
  const query = `
        SELECT
            service_categories.categories_id,
            service_categories.title
        FROM service_categories
        JOIN service_project_categories
            ON service_categories.categories_id =
               service_project_categories.categories_id
        WHERE service_project_categories.project_id = $1;
    `;

  const queryParams = [projectId];
  const result = await db.query(query, queryParams);

  return result.rows;


};

export {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
  getCategoriesByProjectId
};