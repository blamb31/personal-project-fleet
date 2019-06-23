UPDATE drivers
SET driver_first_name = $1, driver_last_name = $2, driver_phone = $3, driver_img = $4
WHERE driver_id = $5 AND admin_id = $6;

SELECT * FROM drivers
WHERE admin_id = $6