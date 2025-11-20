-- 如果数据库已存在，则删除
DROP DATABASE IF EXISTS companydb;

-- 重新创建数据库
CREATE DATABASE companydb CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE companydb;

-- 1. 公司表
CREATE TABLE company (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20),
    location VARCHAR(255),
    buildDate DATE
);

-- 2. 部门表
CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    companyId INT,
    buildDate DATE,
    FOREIGN KEY (companyId) REFERENCES company(id)
);

-- 3. 员工表
CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    location VARCHAR(200),
    ismale TINYINT,
    joinDate DATE,
    salary DECIMAL(10, 2),
    deptId INT,
    birthday DATE,
    FOREIGN KEY (deptId) REFERENCES department(id)
);

-- 4. 用户表
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    loginId VARCHAR(255),
    loginPwd VARCHAR(255)
);

-- 插入 company（10 条）
INSERT INTO company (name, location, buildDate) VALUES
('TechCorp', 'New York', '2000-03-15'),
('GreenSoft', 'London', '2005-07-20'),
('Sunrise Ltd', 'Beijing', '2010-05-01'),
('GlobalWorks', 'Tokyo', '1998-11-11'),
('OceanData', 'Sydney', '2012-09-09'),
('SkyNet', 'Los Angeles', '2015-12-01'),
('StarTech', 'Shanghai', '2018-02-28'),
('InnoLab', 'Berlin', '2003-04-04'),
('PrimeLogic', 'Paris', '2007-01-19'),
('NextGen', 'Toronto', '2013-10-30');

-- 插入 department（10 条）
INSERT INTO department (name, companyId, buildDate) VALUES
('HR', 1, '2001-04-01'),
('Finance', 1, '2002-06-15'),
('R&D', 2, '2006-08-10'),
('Marketing', 2, '2007-07-22'),
('Engineering', 3, '2011-03-12'),
('Sales', 3, '2012-02-01'),
('Support', 4, '1999-12-15'),
('Quality Assurance', 4, '2000-01-01'),
('Product', 5, '2013-05-20'),
('Operations', 5, '2014-08-30');

-- 插入 employee（10 条）
INSERT INTO employee (name, location, ismale, joinDate, salary, deptId, birthday) VALUES
('Alice', 'New York', 0, '2020-01-01', 6500.00, 1, '1990-04-12'),
('Bob', 'New York', 1, '2018-06-14', 7200.00, 1, '1988-09-23'),
('Charlie', 'London', 1, '2019-03-10', 8000.50, 2, '1992-12-02'),
('Diana', 'London', 0, '2017-10-05', 9000.00, 2, '1987-05-18'),
('Eric', 'Beijing', 1, '2021-03-16', 5500.00, 3, '1995-06-30'),
('Fiona', 'Beijing', 0, '2016-11-20', 7800.25, 3, '1991-01-07'),
('George', 'Tokyo', 1, '2015-04-01', 9500.00, 4, '1985-08-08'),
('Helen', 'Tokyo', 0, '2022-02-10', 6200.00, 4, '1997-11-21'),
('Ian', 'Sydney', 1, '2019-09-01', 8300.00, 5, '1993-03-12'),
('Julia', 'Sydney', 0, '2014-07-25', 9900.50, 5, '1986-02-09'),
('Kevin', 'New York', 1, '2019-01-15', 7100.00, 1, '1991-02-10'),
('Lily', 'London', 0, '2020-03-22', 6800.00, 2, '1994-07-14'),
('Mike', 'Beijing', 1, '2021-11-05', 5400.00, 3, '1996-09-18'),
('Nina', 'Tokyo', 0, '2018-06-09', 8000.00, 4, '1989-12-25'),
('Oscar', 'Sydney', 1, '2017-04-12', 8700.00, 5, '1990-08-03'),
('Paula', 'New York', 0, '2019-10-22', 6900.00, 1, '1993-11-12'),
('Quentin', 'London', 1, '2018-02-17', 7600.00, 2, '1992-05-27'),
('Rachel', 'Beijing', 0, '2020-07-09', 7200.00, 3, '1995-04-16'),
('Sam', 'Tokyo', 1, '2021-03-18', 8100.00, 4, '1991-10-21'),
('Tina', 'Sydney', 0, '2017-09-30', 6300.00, 5, '1994-01-05'),

('Umar', 'New York', 1, '2016-11-16', 7500.00, 1, '1987-07-12'),
('Vera', 'London', 0, '2022-01-20', 5800.00, 2, '1998-03-22'),
('Will', 'Beijing', 1, '2019-04-14', 6700.00, 3, '1993-06-10'),
('Xena', 'Tokyo', 0, '2021-08-02', 9000.00, 4, '1997-12-01'),
('Yan', 'Sydney', 1, '2020-06-19', 8200.00, 5, '1990-04-19'),
('Zara', 'New York', 0, '2018-05-13', 6100.00, 1, '1996-09-18'),
('Allen', 'London', 1, '2019-07-08', 7400.00, 2, '1992-02-06'),
('Bella', 'Beijing', 0, '2017-12-21', 6600.00, 3, '1995-01-24'),
('Carl', 'Tokyo', 1, '2016-08-17', 8800.00, 4, '1988-11-05'),
('Demi', 'Sydney', 0, '2021-10-11', 6000.00, 5, '1999-05-30'),
('Evan', 'New York', 1, '2020-01-11', 7100.00, 1, '1994-09-12'),
('Faye', 'London', 0, '2019-03-14', 7300.00, 2, '1993-10-25'),
('Gavin', 'Beijing', 1, '2017-02-16', 6900.00, 3, '1991-07-18'),
('Holly', 'Tokyo', 0, '2018-07-22', 8100.00, 4, '1997-03-26'),
('Isaac', 'Sydney', 1, '2016-05-09', 8700.00, 5, '1989-12-18'),
('Jenny', 'New York', 0, '2019-09-28', 6400.00, 1, '1996-11-03'),
('Kyle', 'London', 1, '2020-04-06', 7200.00, 2, '1994-10-10'),
('Laura', 'Beijing', 0, '2021-02-15', 6600.00, 3, '1997-06-22'),
('Morris', 'Tokyo', 1, '2018-12-09', 8300.00, 4, '1992-08-11'),
('Nora', 'Sydney', 0, '2020-01-30', 5900.00, 5, '1998-01-19'),
('Owen', 'New York', 1, '2017-10-17', 7500.00, 1, '1991-03-04'),
('Penny', 'London', 0, '2018-03-14', 6100.00, 2, '1995-04-28'),
('Roger', 'Beijing', 1, '2021-09-23', 6800.00, 3, '1996-07-30'),
('Sophie', 'Tokyo', 0, '2017-05-29', 8400.00, 4, '1993-02-12'),
('Tim', 'Sydney', 1, '2019-11-11', 7100.00, 5, '1990-05-21'),
('Una', 'New York', 0, '2020-06-14', 6300.00, 1, '1996-09-14'),
('Victor', 'London', 1, '2016-03-07', 7700.00, 2, '1988-11-09'),
('Wendy', 'Beijing', 0, '2018-11-02', 6200.00, 3, '1997-04-10'),
('Xavier', 'Tokyo', 1, '2019-02-16', 8600.00, 4, '1991-10-03'),
('Yvonne', 'Sydney', 0, '2021-05-05', 6000.00, 5, '1998-08-22'),
('Zack', 'New York', 1, '2017-01-18', 7400.00, 1, '1992-03-27'),
('Abby', 'London', 0, '2019-08-24', 6900.00, 2, '1994-02-18'),
('Brandon', 'Beijing', 1, '2020-10-04', 6500.00, 3, '1996-05-29'),
('Cathy', 'Tokyo', 0, '2018-06-27', 8100.00, 4, '1993-07-08'),
('Derek', 'Sydney', 1, '2021-03-15', 7800.00, 5, '1999-01-30'),
('Elaine', 'New York', 0, '2016-04-22', 6400.00, 1, '1990-12-17'),
('Frank', 'London', 1, '2020-08-19', 7200.00, 2, '1995-03-14'),
('Grace', 'Beijing', 0, '2017-07-05', 6900.00, 3, '1993-09-01'),
('Henry', 'Tokyo', 1, '2019-10-28', 8300.00, 4, '1991-11-30'),
('Irene', 'Sydney', 0, '2021-12-03', 6100.00, 5, '1999-06-17'),
('Jack', 'New York', 1, '2018-02-11', 7600.00, 1, '1994-05-05'),
('Kelly', 'London', 0, '2016-12-09', 6700.00, 2, '1992-10-02'),
('Leon', 'Beijing', 1, '2022-01-03', 5900.00, 3, '1998-01-16'),
('Monica', 'Tokyo', 0, '2017-08-18', 8400.00, 4, '1993-12-24'),
('Neil', 'Sydney', 1, '2019-03-30', 7000.00, 5, '1990-09-10'),
('Olivia', 'New York', 0, '2020-12-01', 6500.00, 1, '1996-09-26'),
('Peter', 'London', 1, '2018-04-16', 7800.00, 2, '1993-06-14'),
('Queena', 'Beijing', 0, '2017-11-30', 6100.00, 3, '1995-01-07'),
('Ray', 'Tokyo', 1, '2021-07-07', 9000.00, 4, '1997-03-09'),
('Sara', 'Sydney', 0, '2016-10-14', 6300.00, 5, '1992-11-22'),
('Tommy', 'New York', 1, '2019-05-29', 7600.00, 1, '1994-04-25'),
('Ursula', 'London', 0, '2020-09-08', 6200.00, 2, '1997-06-01'),
('Vince', 'Beijing', 1, '2021-04-19', 7000.00, 3, '1996-10-30'),
('Willa', 'Tokyo', 0, '2018-08-22', 8200.00, 4, '1993-07-19'),
('Xander', 'Sydney', 1, '2017-03-13', 8800.00, 5, '1991-02-02'),
('Yuki', 'New York', 0, '2019-06-06', 6300.00, 1, '1996-05-17'),
('Zion', 'London', 1, '2021-11-12', 6900.00, 2, '1998-08-29'),
('Aria', 'Beijing', 0, '2017-09-17', 6200.00, 3, '1995-09-08'),
('Blake', 'Tokyo', 1, '2018-01-23', 8600.00, 4, '1990-10-11'),
('Clara', 'Sydney', 0, '2020-02-14', 6400.00, 5, '1997-01-06'),
('Damon', 'New York', 1, '2019-12-03', 7600.00, 1, '1994-08-14'),
('Elsa', 'London', 0, '2021-03-20', 6100.00, 2, '1998-02-26'),
('Felix', 'Beijing', 1, '2016-06-09', 7500.00, 3, '1991-04-21'),
('Gloria', 'Tokyo', 0, '2022-01-26', 9200.00, 4, '1999-10-07'),
('Hank', 'Sydney', 1, '2018-10-01', 6900.00, 5, '1993-03-30');

-- 插入 user（10 条）
INSERT INTO user (loginId, loginPwd) VALUES
('admin', '123456'),
('user1', 'pwd001'),
('user2', 'pwd002'),
('manager', 'pwd003'),
('guest', 'pwd004'),
('devA', 'pwd005'),
('devB', 'pwd006'),
('testUser', 'pwd007'),
('root', 'pwd008'),
('operator', 'pwd009');
