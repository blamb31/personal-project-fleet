SELECT * FROM admins a
JOIN cars c ON a.admin_id = c.admin_id
LEFT JOIN drivers d ON c.driver_id = d.driver_id
WHERE a.admin_id = $1 AND c.car_id = $2

