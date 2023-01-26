\c shake_n_make_test

SELECT * FROM cocktails
WHERE linked_user_id = 3;


-- LEFT JOIN users ON users.user_id = cocktails.linked_user_id