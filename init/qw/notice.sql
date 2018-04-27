/*
 * @Author: Maiduo
 * @Date: 2018-04-26 16:09:21
*/
CREATE TABLE IF NOT EXISTS `erms_notice`(
`id` int(11) NOT NULL AUTO_INCREMENT,
`title` VARCHAR(255) DEFAULT NULL,
`content` LONGTEXT DEFAULT NULL,
`teacher_id` int(11) DEFAULT NULL,
`create_time` VARCHAR(255) DEFAULT NULL,
`modified_time` VARCHAR(255) DEFAULT NULL,
PRIMARY KEY(`id`),
CONSTRAINT fk_2 FOREIGN KEY (`teacher_id`) REFERENCES `erms_teacher` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;