
DROP TABLE IF EXISTS `up_user`;
CREATE TABLE `up_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL DEFAULT '',
  `nickname` varchar(255) NOT NULL,
  `realname` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `qq` text,
  `email` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `signature` text DEFAULT NULL COMMENT '个性签名',
  `level` int(11) NOT NULL DEFAULT '1',
  `rank` int(11) NOT NULL DEFAULT '0',
  `icon` varchar(255) DEFAULT NULL,
  `code` varchar(255) NOT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  `destroy` tinyint(1) NOT NULL DEFAULT '0',
  `register_ip` varchar(255) DEFAULT NULL,
  `last_login_ip` varchar(255) DEFAULT NULL,
  `ctime` datetime DEFAULT CURRENT_TIMESTAMP,
  `cuid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';
INSERT INTO `day-day-up`.`up_user` (`id`, `username`, `password`, `nickname`, `realname`, `phone`, `qq`, `email`, `birthday`, `level`, `rank`, `icon`, `code`, `disabled`, `destroy`, `register_ip`, `last_login_ip`, `ctime`, `cuid`) VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'DayUp', NULL, NULL, NULL, NULL, NULL, '1', '0', NULL, '21232f297a57a5a743894a0e4a801fc3', '0', '0', NULL, NULL, '2021-02-25 19:18:35', NULL);


DROP TABLE IF EXISTS `up_role`;
CREATE TABLE `up_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT '',
  `ctime` datetime DEFAULT CURRENT_TIMESTAMP,
  `cuid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

DROP TABLE IF EXISTS `up_article`;
CREATE TABLE `up_article` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` tinytext NOT NULL,
  `sub_title` tinytext NOT NULL,
  `content` text,
  `type` tinyint(4) DEFAULT NULL,
  `description` varchar(255) DEFAULT '',
  `ctime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文章表';

DROP TABLE IF EXISTS `up_permission`;
CREATE TABLE `up_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限表';

DROP TABLE IF EXISTS `up_rank_award`;
CREATE TABLE `up_rank_award` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `pay` int(11) NOT NULL DEFAULT '0',
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `available_days` int(11) DEFAULT '0',
  `available_date` datetime DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `limit_level` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT '',
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  `destroy` tinyint(1) NOT NULL DEFAULT '0',
  `ctime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='积分奖励表';

DROP TABLE IF EXISTS `up_message`;
CREATE TABLE `up_message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` text,
  `type` tinyint(2),
  `from_user_id` bigint(20),
  `to_user_id` bigint(20),
  `ctime` datetime DEFAULT CURRENT_TIMESTAMP,
  `rtime` datetime,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='消息表';

DROP TABLE IF EXISTS `up_praise_record`;
CREATE TABLE `up_praise_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `article_id` bigint(20) DEFAULT NULL,
  `article_user_id` bigint(20) DEFAULT NULL,
  `ctime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='点赞表';


DROP TABLE IF EXISTS `up_r_user_article`;
CREATE TABLE `up_r_user_article` (
  `user_id` bigint(20) NOT NULL,
  `article_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`article_id`),
  CONSTRAINT `up_r_user_article_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `up_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `up_r_user_article_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `up_article` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户文章关联表';


DROP TABLE IF EXISTS `up_resou`;
CREATE TABLE `up_resou` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`ranking` INT (4) DEFAULT NULL,
	`disabled` TINYINT (1) NOT NULL DEFAULT '0',
	`destroy` TINYINT (1) NOT NULL DEFAULT '0',
	`title` VARCHAR (255) NOT NULL,
	`href` VARCHAR (255) NOT NULL,
	`hotlevel` INT DEFAULT NULL,
		`description` VARCHAR (255) DEFAULT '',
	`ctime` datetime DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
) ENGINE = INNODB DEFAULT CHARSET = utf8 COMMENT = '每日热搜';

DROP TABLE IF EXISTS `up_jianshu`;
CREATE TABLE `up_jianshu` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `href` varchar(255) NOT NULL,
  `ctime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='简书';