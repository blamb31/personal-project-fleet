UPDATE drivers
SET driver_first_name = $1, driver_last_name = $2, driver_phone = $3, driver_img = $4
WHERE driver_id = $5 AND admin_id = $6;

SELECT * FROM admins a
JOIN cars c ON a.admin_id = c.admin_id
WHERE a.admin_id = $6