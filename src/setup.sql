CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES ('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT fk_service_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);

INSERT INTO service_project
(organization_id, title, description, location, date)
VALUES

(1, 'Community Park Renovation',
 'Renovate a local park by repairing benches and improving playground equipment.',
 'Central Community Park', '2026-11-15'),

(1, 'Neighborhood Home Repairs',
 'Help families repair and improve their homes.',
 'Downtown Neighborhood', '2026-11-20'),

(1, 'Community Garden Construction',
 'Build garden beds and walkways for a neighborhood community garden.',
 'Westside Community Garden', '2026-11-25'),

(1, 'School Playground Improvement',
 'Improve playground equipment and outdoor spaces at a local school.',
 'Lincoln Elementary School', '2026-12-01'),

(1, 'Community Shelter Renovation',
 'Assist with repairing and improving a community shelter.',
 'Hope Community Shelter', '2026-12-05'),


(2, 'Urban Garden Planting',
 'Plant vegetables and herbs in an urban community garden.',
 'Eastside Urban Garden', '2026-11-16'),

(2, 'Community Food Harvest',
 'Harvest fresh vegetables to distribute to families in need.',
 'Green Valley Farm', '2026-11-21'),

(2, 'Composting Education Day',
 'Teach residents how to compost household food waste.',
 'Community Learning Center', '2026-11-26'),

(2, 'Tree Planting Initiative',
 'Plant trees to improve neighborhood green spaces.',
 'Riverside Park', '2026-12-02'),

(2, 'School Garden Program',
 'Create a school garden where students can learn about growing food.',
 'Lincoln Elementary School', '2026-12-06'),


(3, 'Food Bank Volunteer Day',
 'Help organize and distribute food donations to local families.',
 'Community Food Bank', '2026-11-17'),

(3, 'Senior Center Assistance',
 'Help seniors with cleaning, activities, and community support.',
 'Sunrise Senior Center', '2026-11-22'),

(3, 'Clothing Donation Drive',
 'Collect and organize donated clothing for people in need.',
 'Unity Community Center', '2026-11-27'),

(3, 'Community Cleanup Day',
 'Organize volunteers to clean parks and public spaces.',
 'Riverside Park', '2026-12-03'),

(3, 'Holiday Giving Project',
 'Collect and distribute holiday gifts to families in need.',
 'Unity Community Center', '2026-12-07');
