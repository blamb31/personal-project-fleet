UPDATE admins
SET admin_first_name = $1, admin_last_name = $2, admin_phone = $3, admin_img = $4, admin_company_name = $5
WHERE admin_id = $6;

SELECT * FROM admins
WHERE admin_id = $6