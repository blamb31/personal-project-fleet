SELECT * FROM drivers d
JOIN admins a ON d.admin_id = a.admin_id
WHERE a.admin_id = $1 