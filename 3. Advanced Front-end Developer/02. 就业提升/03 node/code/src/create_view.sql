CREATE VIEW eInfo_of_company AS SELECT
	e.NAME AS eName,
	d.NAME AS dName,
	c.NAME AS cName,
	e.salary AS salary,
	e.location AS location
FROM
	employee AS e
	INNER JOIN department AS d ON e.deptId = d.id
	INNER JOIN company AS c ON d.companyId = c.id;