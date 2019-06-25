INSERT INTO admins (admin_first_name, admin_last_name, admin_username, admin_password, admin_phone, admin_img, admin_company_name)
VALUES (${admin_first_name}, ${admin_last_name}, ${admin_username}, ${admin_password}, ${admin_phone}, ${admin_img}, ${admin_company_name})

RETURNING *;