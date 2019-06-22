DELETE FROM cars
WHERE car_id = $1 AND admin_id = $2;

SELECT * FROM cars 
WHERE admin_id = $2;