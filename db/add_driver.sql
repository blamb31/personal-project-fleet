INSERT INTO drivers (admin_id, driver_first_name , driver_last_name, driver_phone, driver_img)
VALUES ( $1, $2, $3, $4, $5);

SELECT * FROM drivers d
JOIN admins a ON d.admin_id = a.admin_id
JOIN cars c ON d.driver_id = c.driver_id
WHERE a.admin_id = $1 AND c.admin_id = $1