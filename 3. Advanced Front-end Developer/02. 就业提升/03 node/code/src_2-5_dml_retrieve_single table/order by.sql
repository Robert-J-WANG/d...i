-- order by - asc
SELECT
	*
FROM
	employee
WHERE
	`name` LIKE '%a%'
	AND ismale = 0
	OR (salary < 7000 AND birthday <= (1980-1-1))
ORDER BY
	salary ASC;
	
-- order by - desc
SELECT
	*
FROM
	employee
WHERE
	`name` LIKE '%a%'
	AND ismale = 0
	OR (salary < 7000 AND birthday <= (1980-1-1))
ORDER BY
	salary DESC;
	
-- 组合排序
SELECT
	*
FROM
	employee
WHERE
	location IS NOT NULL
	AND salary >= 7000
ORDER BY
	ismale,
	birthday DESC;