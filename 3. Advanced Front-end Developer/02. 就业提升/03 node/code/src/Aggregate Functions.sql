SELECT
	AVG(salary) AS sal_avg,
	MAX(salary) AS sal_max,
	MIN(salary) AS sal_min,
	COUNT(salary) AS sal_count,
	SUM(salary) AS sal_sum
FROM
	employee;