SELECT * FROM admins a
JOIN drivers d ON a.admin_id = d.admin_id
WHERE a.admin_id = $1 AND d.driver_id = $2