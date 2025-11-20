-- login
SELECT
	*
FROM
	`user`
WHERE
	loginId = 'admin'
	AND loginPwd = '123456';
	
-- 员工列表，第3页
SELECT
	*
FROM
	employee
ORDER BY
	joinDate DESC
	LIMIT 8,
	4;
-- 查询工资最高的女员工
SELECT
	*
FROM
	employee
WHERE
	ismale = 0
ORDER BY
	salary DESC
	LIMIT 0, 1;