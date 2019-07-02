DELETE FROM cars
WHERE car_id = $1 AND admin_id = $2;

SELECT * FROM admins a
JOIN cars c ON a.admin_id = c.admin_id
LEFT JOIN drivers d ON c.driver_id = d.driver_id
WHERE a.admin_id = $2 AND c.driver_id IN (SELECT driver_id from drivers WHERE a.admin_id = $2)
OR a.admin_id = $2 AND c.driver_id IS null 