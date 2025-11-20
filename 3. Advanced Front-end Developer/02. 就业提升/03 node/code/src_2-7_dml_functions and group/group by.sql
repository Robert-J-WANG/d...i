-- 基础用法
SELECT
	d.`name` AS dName
FROM
	employee AS e
	INNER JOIN department AS d ON e.deptId = d.id
GROUP BY
	d.`name`;
	
-- 	结合聚合函数 - 在分组的列上可以使用 COUNT, SUM, AVG,等 函数
SELECT
	d.`name` AS dName,
	COUNT(e.id) AS number_of_employee,
	AVG(e.salary) AS avrage_salary
FROM
	employee AS e
	INNER JOIN department AS d ON e.deptId = d.id
GROUP BY
	d.`name`;
	
-- 	`HAVING` 子句
SELECT
	d.`name` AS dName,
	COUNT(e.id) AS number_of_employee,
	AVG(e.salary) AS avrage_salary
FROM
	employee AS e
	INNER JOIN department AS d ON e.deptId = d.id
GROUP BY
	d.`name`
HAVING
	number_of_employee > 5;
-- 结合条件查询
SELECT
	d.`name` AS dName,
	COUNT(e.id) AS number_of_employee,
	AVG(e.salary) AS avrage_salary
FROM
	employee AS e
	INNER JOIN department AS d ON e.deptId = d.id
WHERE
	e.salary >= 5000
	AND TIMESTAMPDIFF(YEAR, e.birthday, CURRENT_DATE()) >= 30
GROUP BY
	d.`name`
HAVING
	number_of_employee > 5;
	
-- 	结合排序
SELECT
	d.`name` AS dName,
	COUNT(e.id) AS number_of_employee,
	AVG(e.salary) AS avrage_salary
FROM
	employee AS e
	INNER JOIN department AS d ON e.deptId = d.id
WHERE
	e.salary >= 5000
	AND TIMESTAMPDIFF(YEAR, e.birthday, CURRENT_DATE()) >= 30
GROUP BY
	d.`name`
HAVING
	number_of_employee > 5
ORDER BY
	avrage_salary DESC;