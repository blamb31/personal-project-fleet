INSERT INTO cars (driver_id, admin_id, car_make, car_model, car_year, car_color, car_mileage, car_img, car_address, car_zip_code, car_city, car_state, last_oil_change )
VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);

SELECT * FROM admins a
JOIN cars c ON a.admin_id = c.admin_id
JOIN drivers d ON c.driver_id = d.driver_id
WHERE a.admin_id = $2 AND c.driver_id IN (SELECT driver_id from drivers WHERE admin_id = $2)

-- SELECT * FROM cars c
-- JOIN admins a ON a.admin_id = c.admin_id
-- FULL OUTER JOIN drivers d ON c.driver_id = d.driver_id
-- WHERE a.admin_id = $2 AND c.driver_id IN (SELECT driver_id from drivers WHERE admin_id = $2) OR c.driver_id IS null