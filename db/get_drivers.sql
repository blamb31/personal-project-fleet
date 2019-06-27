SELECT * FROM drivers d
JOIN admins a ON d.admin_id = a.admin_id
JOIN cars c ON d.driver_id = c.driver_id
WHERE a.admin_id = $1 AND c.admin_id = $1