-- 查询单个字段
SELECT
	id
FROM
	company;
	
-- 查询多个字段
SELECT
	id,
	`name`,
	location
FROM
	company;
	
-- 查询全部
SELECT
	*
FROM
	company;
	
-- 别名 as
SELECT
	ismale AS sex
FROM
	employee;
	
-- 对某一列数据进行进一步处理 case end - 方式1
-- SELECT
-- 	id,
-- 	`name`,
-- 	CASE
-- 		ismale
-- 		WHEN 1 THEN
-- 			'male'
-- 		ELSE
-- 			'female'
-- 	END AS sex,
-- 	location,
-- 	salary
-- FROM
-- 	employee;
-- 对某一列数据进行进一步处理 case end - 方式2
SELECT
	id,
	`name`,
	CASE
		WHEN ismale = 1 THEN
			'male'
		ELSE
			'female'
	END AS sex,
	location,
	salary
FROM
	employee;
	
-- 对多个字段处理
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
	END AS 'salary level', -- 同时新增一个字段到查询结果
	salary
FROM
	employee;