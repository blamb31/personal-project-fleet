SELECT * FROM admins a
JOIN cars c ON a.admin_id = c.admin_id
WHERE a.admin_id = $1