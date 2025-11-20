-- left jion
SELECT
	e.id,
	e.NAME AS empName,
	e.deptId,
	d.NAME AS deptName,
	d.buildDate
FROM
	employee AS e
	LEFT JOIN department AS d ON e.deptId = d.id;
	
-- right join
SELECT
	e.id,
	e.NAME AS empName,
	e.deptId,
	d.NAME AS deptName,
	d.buildDate
FROM
	employee AS e
	RIGHT JOIN department AS d ON e.deptId = d.id;
	
-- -inner join
SELECT
	e.id,
	e.NAME AS empName,
	e.deptId,
	d.NAME AS deptName,
	d.buildDate
FROM
	employee AS e
	INNER JOIN department AS d ON e.deptId = d.id;
	
-- -inner join more tables
SELECT
	e.id,
	e.`name` AS empName,
	e.deptId,
	d.`name` AS deptName,
	d.buildDate,
	d.companyId,
	c.`name` AS cName
FROM
	employee AS e
	INNER JOIN department AS d ON e.deptId = d.id
	INNER JOIN company AS c ON d.companyId = c.id;