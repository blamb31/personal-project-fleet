UPDATE cars
SET driver_id = $1, car_make = $2, car_model = $3, car_year = $4, car_color = $5, car_mileage = $6, car_img = $7, car_address = $8, car_zip_code = $9, car_city = $10, car_state = $11, last_oil_change = $12
WHERE car_id = $13 AND admin_id = $14;

SELECT * FROM admins a
JOIN cars c ON a.admin_id = c.admin_id
WHERE a.admin_id = $14