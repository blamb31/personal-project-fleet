CREATE TABLE admins (
    admin_id SERIAL PRIMARY KEY,
    admin_first_name VARCHAR,
    admin_last_name VARCHAR,
    admin_username VARCHAR,
    admin_password VARCHAR,
    admin_phone VARCHAR,
    admin_img TEXT
);

CREATE TABLE drivers (
    driver_id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admins(admin_id),
    driver_first_name VARCHAR,
    driver_last_name VARCHAR,
    driver_phone VARCHAR,
    driver_img TEXT
);

CREATE TABLE cars (
    car_id SERIAL PRIMARY KEY,
    driver_id INTEGER REFERENCES drivers(driver_id),
    admin_id INTEGER REFERENCES admins(admin_id),
    car_make VARCHAR,
    car_model VARCHAR,
    car_year VARCHAR,
    car_color VARCHAR,
    car_mileage VARCHAR,
    car_img VARCHAR,
    car_address VARCHAR,
    car_zip_code VARCHAR,
    car_city VARCHAR,
    car_state VARCHAR,
    last_oil_change INTEGER
)

