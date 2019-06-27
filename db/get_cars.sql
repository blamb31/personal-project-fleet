SELECT * FROM admins a
JOIN cars c ON a.admin_id = c.admin_id
LEFT JOIN drivers d ON c.driver_id = d.driver_id
WHERE a.admin_id = 3 AND c.driver_id IN (SELECT driver_id from drivers WHERE admin_id = 3)
OR c.driver_id IS null 
