SELECT * FROM admins a
JOIN cars c ON a.admin_id = c.admin_id
WHERE a.admin_id = ${admin_id} AND c.car_id = ${car_id}