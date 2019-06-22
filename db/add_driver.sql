INSERT INTO drivers (admin_id, driver_first_name , driver_last_name, driver_phone, driver_img)
VALUES ( $1, $2, $3, $4, $5);

SELECT * FROM admins a
JOIN drivers d ON a.admin_id = d.admin_id
WHERE a.admin_id = $1