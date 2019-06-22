INSERT INTO admins (admin_first_name, admin_last_name, admin_username, admin_password, admin_phone, admin_img)
VALUES (${admin_first_name}, ${admin_last_name}, ${admin_username}, ${admin_password}, ${admin_phone}, ${admin_img})

RETURNING *;