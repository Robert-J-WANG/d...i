SELECT
	*
FROM
	employee
WHERE
	ismale = 1;
	
-- 查询指定的字段，并对字段进行处理，对查询结果进行筛选
SELECT
	id,
	`name`,
	-- 对ismale处理
	CASE
		WHEN ismale = 1 THEN
			'male'
		ELSE
			'female'
	END AS sex,
	location,
	-- 对salary进行处理
	CASE
		WHEN salary > 8000 THEN
			'high'
		WHEN salary > 6000 THEN
			'medium'
		ELSE
			'low'
	END AS 'salary level',
	salary
FROM
	employee
WHERE
	ismale = 1;
	
-- where 筛选条件的其他写法
-- 1. in
SELECT
	*
FROM
	department
WHERE
	companyId IN (1, 2, 4);
-- 2. is / IS NOT
SELECT
	*
FROM
	employee
WHERE
	location IS NULL;
	
-- IS NOT
SELECT
	*
FROM
	employee
WHERE
	location IS NOT NULL;
	
-- >=
SELECT
	*
FROM
	employee
WHERE
	salary >= 8000;
	
-- between and
SELECT
	*
FROM
	employee
WHERE
	salary BETWEEN 5500
	AND 7400;
	
-- like
SELECT
	*
FROM
	employee
WHERE
	`name` LIKE '%a%';
	
-- 或者
SELECT
	*
FROM
	employee
WHERE
	`name` LIKE '_a_';
	
-- AND
SELECT
	*
FROM
	employee
WHERE
	`name` LIKE '%a%'
	AND ismale = 0
	AND salary >= 7000;
	
-- OR
SELECT
	*
FROM
	employee
WHERE
	`name` LIKE '%a%'
	AND ismale = 0
	OR (salary < 7000 AND birthday <= (1980-1-1));
	