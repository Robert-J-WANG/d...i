-- 显示出所有员工的姓名，性别（使用男或者女），入职时间，薪水，所属部门（名称），所属公司（名称）
SELECT
	e.`name` AS eName,
	CASE
		WHEN e.ismale = 1 THEN
			'male'
		ELSE
			'female'
	END AS sex,
	e.joinDate,
	e.salary,
	d.`name` AS dName,
	c.`name` AS cName
FROM
	employee AS e
	INNER JOIN department AS d ON e.deptId = d.id
	INNER JOIN company AS c ON d.companyId = c.id;
	
	
-- 查看GreenSoft 和Sunrise Ltd 所有员工姓名，性别，入职时间，部门名，公司名
SELECT
	e.`name` AS eName,
	CASE
		WHEN e.ismale = 1 THEN 'male'
		ELSE 'female'
	END AS sex,
	e.joinDate,
	d.`name` AS dName,
	c.`name` AS cName
FROM
	employee AS e
	INNER JOIN department AS d ON e.deptId = d.id
	INNER JOIN company AS c ON d.companyId = c.id
WHERE
	c.`name` = 'GreenSoft'
	OR c.NAME = 'Sunrise Ltd';
	
	
-- 查询 Engineering 部门的所有员工姓名，性别，入职时间，部门名，公司名
SELECT
	e.`name` AS eName,
	CASE
		WHEN e.ismale = 1 THEN 'male'
		ELSE 'female'
	END AS sex,
	e.joinDate,
	d.`name` AS dName,
	c.`name` AS cName
FROM
	employee AS e
	INNER JOIN department AS d ON e.deptId = d.id
	INNER JOIN company AS c ON d.companyId = c.id
WHERE
	d.`name`='Engineering';
	
-- 列出所有员工居住的地址（要求去重）
SELECT DISTINCT location
FROM employee 
WHERE location is not NULL
