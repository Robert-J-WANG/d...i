SELECT
	*
FROM
	einfo_of_company AS v
WHERE
	V.salary > 8000
	AND V.eName LIKE '%E%';