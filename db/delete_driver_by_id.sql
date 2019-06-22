DELETE FROM drivers
WHERE driver_id = $1 AND admin_id = $2;

SELECT * FROM drivers 
WHERE admin_id = $2;