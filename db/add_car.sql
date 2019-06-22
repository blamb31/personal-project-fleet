INSERT INTO cars (driver_id, admin_id, car_make, car_model, car_year, car_color, car_mileage, car_img, car_address, car_zip_code, car_city, car_state, last_oil_change )
VALUES ( ${driver_id}, ${admin_id}, ${car_make}, ${car_model}, ${car_year}, ${car_color}, ${car_mileage}, ${car_img}, ${car_address}, ${car_zip_code}, ${car_city}, ${car_state}, ${last_oil_change});

RETURNING *