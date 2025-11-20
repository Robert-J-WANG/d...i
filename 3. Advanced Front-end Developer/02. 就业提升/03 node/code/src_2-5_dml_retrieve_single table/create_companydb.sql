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
('Julia', 'Sydney', 0, '2014-07-25', 9900.50, 5, '1986-02-09');

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
