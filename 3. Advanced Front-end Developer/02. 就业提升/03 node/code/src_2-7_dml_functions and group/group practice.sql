-- 综合练习
--
-- 1. 查询 GreenSoft 公司每个部门员工的数量
SELECT
	d.`name` AS dName,
	COUNT(e.id) AS count_employee
FROM
	employee AS e
	INNER JOIN department AS d ON e.deptId = d.id
	INNER JOIN company AS c ON d.companyId = c.id
WHERE
	c.`name` = 'GreenSoft'
GROUP BY
	d.id;
--
-- 2. 查询每个公司员工的数量
SELECT
	c.`name` AS cName,
	COUNT(e.id) AS count_employee
FROM
	employee AS e
	INNER JOIN department AS d ON e.deptId = d.id
	INNER JOIN company AS c ON d.companyId = c.id
GROUP BY
	c.id;
	
--
-- 3. 查询员工人数大于10的公司信息
SELECT
	c.id,
	c.NAME AS cNAME,
	c.location,
	c.buildDate,
	COUNT(e.id) AS count_employee
FROM
	employee e
	INNER JOIN department d ON e.deptId = d.id
	INNER JOIN company c ON d.companyId = c.id
GROUP BY
	c.id
HAVING
	count_employee > 10;
	
--
-- 4. 查询所有员工分布在哪些居住地，统计居住地的数量
SELECT
	e.location AS location,
	COUNT(e.id) AS count_employee
FROM
	employee AS e
	INNER JOIN department AS d ON e.deptId = d.id
	INNER JOIN company AS c ON d.companyId = c.id
GROUP BY
	location
HAVING
	location IS NOT NULL;
	
--
-- 5. 查询所有公司5年内入职的居住在beijing的女员工数量
SELECT
	c.NAME AS cName,
	COUNT(e.id) AS count_employee
FROM
	employee AS e
	INNER JOIN department AS d ON e.deptId = d.id
	INNER JOIN company AS c ON d.companyId = c.id
WHERE
	e.isMale = 0
	AND e.location = 'Beijing'
GROUP BY
	c.id;
--
-- 6. 查询 GreenSoft 公司里比平均工资高的员工
SELECT
	c.NAME AS cName,
	e.NAME AS eName,
	e.salary AS salary
FROM
	employee e
	INNER JOIN department d ON e.deptId = d.id
	INNER JOIN company c ON d.companyId = c.id
WHERE
	c.NAME = 'GreenSoft'
	AND e.salary > (
		SELECT
			AVG(e2.salary)
		FROM
			employee e2
			INNER JOIN department d2 ON e2.deptId = d2.id
			INNER JOIN company c2 ON d2.companyId = c2.id
		WHERE
			c2.NAME = 'GreenSoft'
	);
--
-- 7. 查询每个公司每个月的总支出薪水，并从高到低排序
SELECT
	c.NAME AS cName,
	SUM(e.salary)
FROM
	employee e
	INNER JOIN department d ON e.deptId = d.id
	INNER JOIN company c ON d.companyId = c.id
GROUP BY
	c.id;