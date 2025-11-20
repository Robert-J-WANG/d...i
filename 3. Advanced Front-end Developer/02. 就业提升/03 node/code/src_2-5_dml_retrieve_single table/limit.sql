-- limit
SELECT
	*
FROM
	company
	LIMIT 2,
	4;
-- 结合排序
SELECT
	*
FROM
	company
ORDER BY
	location
	LIMIT 2,
	4;