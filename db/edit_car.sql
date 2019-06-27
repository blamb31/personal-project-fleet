UPDATE cars
SET driver_id = $1, admin_id = $2, car_make = $3, car_model = $4, car_year = $5, car_color = $6, car_mileage = $7, car_img = $8, car_address = $9, car_zip_code = $10, car_city = $11, car_state = $12, last_oil_change = $13
WHERE car_id = $14 AND admin_id = $2;

SELECT * FROM admins a
JOIN cars c ON a.admin_id = c.admin_id
JOIN drivers d ON c.driver_id = d.driver_id
WHERE a.admin_id = $2 AND c.car_id = $14
