-- 删除旧表（如果存在）
DROP TABLE IF EXISTS nba_team;

-- 创建新表
CREATE TABLE nba_team (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    conference VARCHAR(20),
    division VARCHAR(50)
);

-- 插入 NBA 球队数据
INSERT INTO nba_team (name, conference, division) VALUES
-- East - Atlantic
('Boston Celtics', 'East', 'Atlantic'),
('Brooklyn Nets', 'East', 'Atlantic'),
('New York Knicks', 'East', 'Atlantic'),
('Philadelphia 76ers', 'East', 'Atlantic'),
('Toronto Raptors', 'East', 'Atlantic'),

-- East - Central
('Chicago Bulls', 'East', 'Central'),
('Cleveland Cavaliers', 'East', 'Central'),
('Detroit Pistons', 'East', 'Central'),
('Indiana Pacers', 'East', 'Central'),
('Milwaukee Bucks', 'East', 'Central'),

-- East - Southeast
('Atlanta Hawks', 'East', 'Southeast'),
('Charlotte Hornets', 'East', 'Southeast'),
('Miami Heat', 'East', 'Southeast'),
('Orlando Magic', 'East', 'Southeast'),
('Washington Wizards', 'East', 'Southeast'),

-- West - Northwest
('Denver Nuggets', 'West', 'Northwest'),
('Minnesota Timberwolves', 'West', 'Northwest'),
('Oklahoma City Thunder', 'West', 'Northwest'),
('Portland Trail Blazers', 'West', 'Northwest'),
('Utah Jazz', 'West', 'Northwest'),

-- West - Pacific
('Golden State Warriors', 'West', 'Pacific'),
('LA Clippers', 'West', 'Pacific'),
('Los Angeles Lakers', 'West', 'Pacific'),
('Phoenix Suns', 'West', 'Pacific'),
('Sacramento Kings', 'West', 'Pacific'),

-- West - Southwest
('Dallas Mavericks', 'West', 'Southwest'),
('Houston Rockets', 'West', 'Southwest'),
('Memphis Grizzlies', 'West', 'Southwest'),
('New Orleans Pelicans', 'West', 'Southwest'),
('San Antonio Spurs', 'West', 'Southwest');
