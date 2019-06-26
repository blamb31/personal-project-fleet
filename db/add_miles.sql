UPDATE cars
SET car_mileage = $3
WHERE car_id = $1 AND admin_id = $2;

SELECT * FROM admins a
JOIN cars c ON a.admin_id = c.admin_id
JOIN drivers d ON c.driver_id = d.driver_id
WHERE a.admin_id = $2 AND c.car_id = $1
