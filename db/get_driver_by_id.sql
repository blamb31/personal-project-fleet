SELECT * FROM admins a
JOIN drivers d ON a.admin_id = d.admin_id
WHERE a.admin_id = ${admin_id} AND d.driver_id = ${driver_id}