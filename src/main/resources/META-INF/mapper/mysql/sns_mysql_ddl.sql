-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        5.7.11-log - MySQL Community Server (GPL)
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- usns 데이터베이스 구조 내보내기
DROP DATABASE IF EXISTS `usns`;
CREATE DATABASE IF NOT EXISTS `usns` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `usns`;

-- 테이블 usns.ung_attachfile 구조 내보내기
DROP TABLE IF EXISTS `ung_attachfile`;
CREATE TABLE IF NOT EXISTS `ung_attachfile` (
  `FILE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `FILE_NAME` varchar(500) DEFAULT NULL COMMENT '실제 파일명',
  `FILE_SAVE_NAME` varchar(100) DEFAULT NULL COMMENT '스토리지 저장 파일명',
  `FILE_CONTENT_TYPE` varchar(100) DEFAULT NULL,
  `THUMB_FILE_NAME` varchar(600) DEFAULT NULL COMMENT '경로 + 파일명',
  `MBL_THUMB_FILE_NAME` varchar(600) DEFAULT NULL,
  `FILE_EXT` varchar(20) DEFAULT NULL,
  `REPOSITORY_TYPE` varchar(10) DEFAULT NULL COMMENT '서버저장(LOCAL), SharePoint 연동(SHAREPOINT)',
  `FEED_ID` bigint(20) NOT NULL,
  `FILE_URL` varchar(500) DEFAULT NULL COMMENT '파일 경로, 쉐어포인트인 경우 파일 URL',
  `ISTRANSFER` int(1) DEFAULT NULL COMMENT '쉐어포인트로 전환 유무',
  `TRANSFER_CNT` int(1) DEFAULT NULL,
  `REG_MEMBER_ID` bigint(20) DEFAULT NULL,
  `TRANSFER_DTTM` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`FILE_ID`),
  KEY `UNG_ATTACHFILE_IDX` (`FEED_ID`,`FILE_ID`),
  KEY `UNG_ATTACHFILE_IDX1` (`REG_MEMBER_ID`,`FILE_ID`),
  CONSTRAINT `ung_attachfile_ibfk_1` FOREIGN KEY (`FEED_ID`) REFERENCES `ung_feed` (`FEED_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_attachfile:~33 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_attachfile` DISABLE KEYS */;
INSERT INTO `ung_attachfile` (`FILE_ID`, `FILE_NAME`, `FILE_SAVE_NAME`, `FILE_CONTENT_TYPE`, `THUMB_FILE_NAME`, `MBL_THUMB_FILE_NAME`, `FILE_EXT`, `REPOSITORY_TYPE`, `FEED_ID`, `FILE_URL`, `ISTRANSFER`, `TRANSFER_CNT`, `REG_MEMBER_ID`, `TRANSFER_DTTM`) VALUES
	(1, '한글.zip', '4b7f87ac-1eb0-44aa-a139-65f463603c04.zip', 'application/x-zip-compressed', '/', '/', 'zip', 'LOCAL', 23, '0\\sns\\attaches\\2016\\1\\12\\23', 0, 0, 2, '2016-01-12 12:12:24'),
	(2, 'salary.csv', '254442e8-4408-4ddb-94d1-dfa60a881f83.csv', 'application/vnd.ms-excel', '/', '/', 'csv', 'LOCAL', 23, '0\\sns\\attaches\\2016\\1\\12\\23', 0, 0, 2, '2016-01-12 12:12:24'),
	(3, '8361d7e5-52b7-43a5-9363-1337a5340c9f.jpg', 'ac6f128d-0b3c-4c9d-b8f6-aa6cd94bfcca.jpg', 'image/jpeg', '/', '/', 'jpg', 'LOCAL', 23, '0\\sns\\attaches\\2016\\1\\12\\23', 0, 0, 2, '2016-01-12 12:12:24'),
	(4, 'NOTICE.txt', 'a22fbd13-6a19-4dc9-abd1-bde23c993b06.txt', 'text/plain', '/', '/', 'txt', 'LOCAL', 26, '0\\sns\\attaches\\2016\\1\\12\\26', 0, 0, 1, '2016-01-12 16:37:48'),
	(5, '유엔진솔루션즈_로고.png', '35a139dd-2cd5-4a2e-8994-997529b69705.png', 'image/png', '/', '/', 'png', 'LOCAL', 32, '0\\sns\\attaches\\2016\\1\\12\\32', 0, 0, 1, '2016-01-12 16:43:30'),
	(6, 'SNS웹_퀵가이드-v0.1.pptx', '7ac0be4d-cc50-43a1-9211-b0ac664f3b00.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', '/', '/', 'pptx', 'LOCAL', 54, '0\\sns\\attaches\\2016\\1\\14\\54', 0, 0, 2, '2016-01-14 16:36:10'),
	(7, '협업포탈_매뉴얼_SNS웹.pptx', '716503c1-8f81-4c9e-9516-e609741ea88d.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', '/', '/', 'pptx', 'LOCAL', 54, '0\\sns\\attaches\\2016\\1\\14\\54', 0, 0, 2, '2016-01-14 16:36:10'),
	(8, '협업포탈_매뉴얼_SNS웹.pptx', '8874df7c-62fd-413b-8982-fe2ca209f4d6.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', '/', '/', 'pptx', 'LOCAL', 55, '0\\sns\\attaches\\2016\\1\\14\\55', 0, 0, 2, '2016-01-14 16:36:56'),
	(9, 'SNS웹_퀵가이드-v0.1.pptx', 'aa4d15bd-b6dd-4623-a862-f1e0eaa62db5.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', '/', '/', 'pptx', 'LOCAL', 55, '0\\sns\\attaches\\2016\\1\\14\\55', 0, 0, 2, '2016-01-14 16:36:56'),
	(10, 'SNS웹_퀵가이드-v0.1.pptx', '25674eb3-a3e8-4acf-80b8-6c88495c9b3a.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', '/', '/', 'pptx', 'LOCAL', 56, '0\\sns\\attaches\\2016\\1\\14\\56', 0, 0, 2, '2016-01-14 16:45:44'),
	(11, '협업포탈_매뉴얼_SNS웹.pptx', '39b7068e-4997-407d-ae4c-9330aff96336.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', '/', '/', 'pptx', 'LOCAL', 56, '0\\sns\\attaches\\2016\\1\\14\\56', 0, 0, 2, '2016-01-14 16:45:44'),
	(12, 'SNS웹_퀵가이드-v0.1.pptx', '0bf32383-5a22-4121-85a8-081b023a12a9.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', '/', '/', 'pptx', 'LOCAL', 57, '1\\sns\\attaches\\2016\\1\\14\\57', 0, 0, 117, '2016-01-14 16:57:50'),
	(13, '협업포탈_매뉴얼_SNS웹.pptx', '3198341c-fdda-4c9c-adcf-de1515af872f.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', '/', '/', 'pptx', 'LOCAL', 57, '1\\sns\\attaches\\2016\\1\\14\\57', 0, 0, 117, '2016-01-14 16:57:50'),
	(14, '2명이상 그룹원 추가시 오류남.PNG', '70a370fd-dc7b-4f8b-8924-5987d545102d.png', 'image/png', '/', '/', 'png', 'LOCAL', 61, '0\\sns\\attaches\\2016\\1\\14\\61', 0, 0, 115, '2016-01-14 17:36:40'),
	(15, 'S-Method_알파매핑_초안_20160118 (1).xlsx', 'e32e2fa1-960e-45c0-836d-07cfceefecdc.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '/', '/', 'xlsx', 'LOCAL', 77, '0\\sns\\attaches\\2016\\1\\20\\77', 0, 0, 115, '2016-01-20 17:30:16'),
	(16, '매핑 표.xlsx', '50e1fc48-7cd0-4f9b-a651-7057026f870c.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '/', '/', 'xlsx', 'LOCAL', 77, '0\\sns\\attaches\\2016\\1\\20\\77', 0, 0, 115, '2016-01-20 17:30:16'),
	(17, '에센스1.0_알파상태_체크리스트_v1.0_진단용_금득규.xlsx', 'f175fd76-5251-4d36-93b6-7457dc6d1c13.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '/', '/', 'xlsx', 'LOCAL', 77, '0\\sns\\attaches\\2016\\1\\20\\77', 0, 0, 115, '2016-01-20 17:30:16'),
	(18, 'bug.png', '063427a1-423a-4562-bca8-a0f1c27e5d47.png', 'image/png', '/', '/', 'png', 'LOCAL', 78, '0\\sns\\attaches\\2016\\1\\20\\78', 0, 0, 112, '2016-01-20 17:58:20'),
	(19, '매핑 표_수정.xlsx', '04bbc3a7-d3fd-4f52-87ee-4414a1de6c45.xlsx', 'application/haansoftxlsx', '/', '/', 'xlsx', 'LOCAL', 80, '0\\sns\\attaches\\2016\\1\\20\\80', 0, 0, 116, '2016-01-20 18:01:33'),
	(20, '매핑 표_수정_3.xlsx', 'fc5f2126-39ae-4162-9108-6e6c476df669.xlsx', 'application/haansoftxlsx', '/', '/', 'xlsx', 'LOCAL', 81, '0\\sns\\attaches\\2016\\1\\21\\81', 0, 0, 116, '2016-01-21 16:52:03'),
	(21, '환경설정.PNG', 'fd117bed-ae5c-4e63-973b-d2ef9a10f46e.png', 'image/png', '/', '/', 'png', 'LOCAL', 85, '1\\sns\\attaches\\2016\\1\\22\\85', 0, 0, 59, '2016-01-22 11:21:18'),
	(22, '픽셀아이콘_550ea(16픽셀_컬러).psd', 'a83638ed-20b4-40ad-a227-cefb26f39d2d.psd', 'application/octet-stream', '/', '/', 'psd', 'LOCAL', 92, '1\\sns\\attaches\\2016\\1\\26\\92', 0, 0, 62, '2016-01-26 10:11:15'),
	(23, 's-method 매핑  다이어그램.pptx', 'a792c627-7536-4a99-a27a-5830072e9e5e.pptx', 'application/haansoftpptx', '/', '/', 'pptx', 'LOCAL', 93, '0\\sns\\attaches\\2016\\1\\26\\93', 0, 0, 116, '2016-01-26 14:31:08'),
	(24, 'S-Method_알파매핑_초안_김상훈_0125.xlsx', '93718096-c43b-4cbb-89e4-66c799d22a20.xlsx', 'application/haansoftxlsx', '/', '/', 'xlsx', 'LOCAL', 93, '0\\sns\\attaches\\2016\\1\\26\\93', 0, 0, 116, '2016-01-26 14:31:08'),
	(25, 'S-Method_알파매핑_초안_최형윤_0125.xlsx', 'a95b26ef-e9dd-4810-b865-4e57f210d28d.xlsx', 'application/haansoftxlsx', '/', '/', 'xlsx', 'LOCAL', 93, '0\\sns\\attaches\\2016\\1\\26\\93', 0, 0, 116, '2016-01-26 14:31:08'),
	(26, 'S-Method_알파매핑_초안_통합0125.xlsx', '0e431595-daa1-475f-aa27-aea59990b962.xlsx', 'application/haansoftxlsx', '/', '/', 'xlsx', 'LOCAL', 93, '0\\sns\\attaches\\2016\\1\\26\\93', 0, 0, 116, '2016-01-26 14:31:08'),
	(27, 'S-method_김상훈.png', '51f7e8ff-497a-4dde-958f-d3f75e63c8d5.png', 'image/png', '/', '/', 'png', 'LOCAL', 94, '0\\sns\\attaches\\2016\\1\\26\\94', 0, 0, 116, '2016-01-26 18:38:40'),
	(28, 'gnb_logo.png', '6ae1d58e-33a6-4c3e-bd98-9a897d88f782.png', 'image/png', '/', '/', 'png', 'LOCAL', 101, '0\\sns\\attaches\\2016\\2\\11\\101', 0, 0, 2, '2016-02-11 10:22:18'),
	(29, 'Tulips.jpg', '0a7daa27-57c1-43f7-81c9-301fd852875a.jpg', 'image/jpeg', '/', '/', 'jpg', 'LOCAL', 102, '0\\sns\\attaches\\2016\\2\\11\\102', 0, 0, 2, '2016-02-11 10:22:50'),
	(30, 'Chrysanthemum.jpg', 'c816d5de-aa67-4bb0-b8e2-d72bf6b00746.jpg', 'image/jpeg', '/', '/', 'jpg', 'LOCAL', 104, '0\\sns\\attaches\\2016\\2\\11\\104', 0, 0, 2, '2016-02-11 10:35:30'),
	(31, 'Penguins.jpg', 'b44aa75a-83ff-4ede-aa8d-d58b98020323.jpg', 'image/jpeg', '/', '/', 'jpg', 'LOCAL', 104, '0\\sns\\attaches\\2016\\2\\11\\104', 0, 0, 2, '2016-02-11 10:35:30'),
	(32, 'Tulips.jpg', '2b3dd8e9-7d2a-494a-b3ce-6396898fbe48.jpg', 'image/jpeg', '/', '/', 'jpg', 'LOCAL', 104, '0\\sns\\attaches\\2016\\2\\11\\104', 0, 0, 2, '2016-02-11 10:35:30'),
	(33, '4c98b396-d4ba-400e-a9e1-d71d412107ea_650.jpg', 'cffc06c2-3687-43b9-8779-c338ff5b95e1.jpg', 'image/jpeg', '/', '/', 'jpg', 'LOCAL', 125, '0\\sns\\attaches\\2016\\5\\4\\125', 0, 0, 109, '2016-05-04 15:17:29'),
	(34, 'favicon.ico', '6224e61f-56d4-4b32-84a7-b90a33e82ba3.ico', 'image/x-icon', '/', '/', 'ico', 'LOCAL', 141, '0\\sns\\attaches\\2017\\2\\14\\141', 0, 0, 109, '2017-02-14 15:28:10');
/*!40000 ALTER TABLE `ung_attachfile` ENABLE KEYS */;

-- 테이블 usns.ung_bookmark 구조 내보내기
DROP TABLE IF EXISTS `ung_bookmark`;
CREATE TABLE IF NOT EXISTS `ung_bookmark` (
  `FEED_ID` bigint(20) NOT NULL,
  `MEMBER_ID` bigint(20) NOT NULL,
  `REGDTTM` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `UNG_BOOKMARK_IDX` (`MEMBER_ID`),
  KEY `UNG_BOOKMARK_IDX1` (`FEED_ID`),
  CONSTRAINT `ung_bookmark_ibfk_1` FOREIGN KEY (`FEED_ID`) REFERENCES `ung_feed` (`FEED_ID`),
  CONSTRAINT `ung_bookmark_ibfk_2` FOREIGN KEY (`MEMBER_ID`) REFERENCES `ung_member` (`MEMBER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_bookmark:~6 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_bookmark` DISABLE KEYS */;
INSERT INTO `ung_bookmark` (`FEED_ID`, `MEMBER_ID`, `REGDTTM`) VALUES
	(22, 2, '2016-01-12 11:45:47'),
	(26, 1, '2016-01-12 16:38:59'),
	(30, 1, '2016-01-12 16:46:05'),
	(28, 1, '2016-01-12 16:49:31'),
	(133, 109, '2016-05-04 15:24:32'),
	(76, 109, '2016-11-25 16:47:29');
/*!40000 ALTER TABLE `ung_bookmark` ENABLE KEYS */;

-- 테이블 usns.ung_chat_follower 구조 내보내기
DROP TABLE IF EXISTS `ung_chat_follower`;
CREATE TABLE IF NOT EXISTS `ung_chat_follower` (
  `ROOM_ID` bigint(20) NOT NULL COMMENT '채팅방 ID',
  `FOLLOWER_ID` varchar(150) NOT NULL COMMENT '참여자 ID',
  `FOLLOWER_NAME` varchar(150) NOT NULL COMMENT '참여자 이름',
  `REGDTTM` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '참여 일시',
  PRIMARY KEY (`ROOM_ID`,`FOLLOWER_ID`),
  UNIQUE KEY `UNG_CHATTING_FOLLOWER_IDX` (`ROOM_ID`,`FOLLOWER_ID`),
  UNIQUE KEY `UNG_CHATTING_FOLLOWER_IDX01` (`FOLLOWER_ID`,`ROOM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_chat_follower:~4 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_chat_follower` DISABLE KEYS */;
INSERT INTO `ung_chat_follower` (`ROOM_ID`, `FOLLOWER_ID`, `FOLLOWER_NAME`, `REGDTTM`) VALUES
	(126, '007', '장진영', '2017-03-29 14:21:40'),
	(126, '012', '윤병선', '2017-03-29 14:21:40'),
	(126, 'ENKI001', '정경현', '2017-03-29 14:21:40'),
	(127, '012', '윤병선', '2017-03-29 15:20:19');
/*!40000 ALTER TABLE `ung_chat_follower` ENABLE KEYS */;

-- 테이블 usns.ung_chat_message 구조 내보내기
DROP TABLE IF EXISTS `ung_chat_message`;
CREATE TABLE IF NOT EXISTS `ung_chat_message` (
  `MESSAGE_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `ROOM_ID` bigint(20) NOT NULL COMMENT '채팅방 ID',
  `USER_ID` varchar(150) DEFAULT NULL COMMENT '사용자 아이디',
  `USER_NAME` varchar(150) DEFAULT NULL COMMENT '사용자 이름',
  `MESSAGE_TYPE` varchar(150) DEFAULT NULL COMMENT '메세지 타입',
  `MESSAGE` text,
  `WHISPER_ID` varchar(150) DEFAULT NULL COMMENT '귓속말 대상 아이디',
  `WHISPER_NAME` varchar(150) DEFAULT NULL COMMENT '귓속말 대상 이름',
  `REGDTTM` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '사용자 등록일',
  PRIMARY KEY (`MESSAGE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=303 DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_chat_message:~10 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_chat_message` DISABLE KEYS */;
INSERT INTO `ung_chat_message` (`MESSAGE_ID`, `ROOM_ID`, `USER_ID`, `USER_NAME`, `MESSAGE_TYPE`, `MESSAGE`, `WHISPER_ID`, `WHISPER_NAME`, `REGDTTM`) VALUES
	(293, 126, '012', '윤병선', 'MESSAGE', '1', NULL, NULL, '2017-03-29 15:56:37'),
	(294, 126, '012', '윤병선', 'MESSAGE', '2', NULL, NULL, '2017-03-29 15:56:38'),
	(295, 126, '012', '윤병선', 'MESSAGE', '3', NULL, NULL, '2017-03-29 15:56:39'),
	(296, 126, '012', '윤병선', 'MESSAGE', '4', NULL, NULL, '2017-03-29 15:56:40'),
	(297, 126, '012', '윤병선', 'MESSAGE', 'ㄴㅁㅇㄹㄴㅁㄹㅇㅁㄴㄹ', NULL, NULL, '2017-03-29 15:57:04'),
	(298, 126, '012', '윤병선', 'WHISPER', '111111', 'ENKI001', '정경현', '2017-03-29 17:12:59'),
	(299, 126, '012', '윤병선', 'MESSAGE', 'aaaaaaa', NULL, NULL, '2017-03-29 17:13:14'),
	(300, 126, '012', '윤병선', 'MESSAGE', 'aaaa', NULL, NULL, '2017-03-29 17:13:34'),
	(301, 126, '012', '윤병선', 'WHISPER', 'aaaaaaaa', '007', '장진영', '2017-03-29 17:13:51'),
	(302, 126, '012', '윤병선', 'WHISPER', 'asdf', '007', '장진영', '2017-03-29 17:13:54');
/*!40000 ALTER TABLE `ung_chat_message` ENABLE KEYS */;

-- 테이블 usns.ung_chat_notice 구조 내보내기
DROP TABLE IF EXISTS `ung_chat_notice`;
CREATE TABLE IF NOT EXISTS `ung_chat_notice` (
  `NOTICE_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `ITEM_TYPE` varchar(150) DEFAULT NULL COMMENT '아이템 타입',
  `ITEM_ID` bigint(20) NOT NULL COMMENT '아이템 ID',
  `ITEM_TITLE` varchar(255) NOT NULL COMMENT '아이템 타이틀',
  `ITEM_CONTENT` text,
  `TO_FOLLOWER_ID` varchar(150) DEFAULT NULL COMMENT '보낸 유저 ID',
  `TO_FOLLOWER_NAME` varchar(150) DEFAULT NULL COMMENT '보낸 유저 명',
  `FROM_FOLLOWER_ID` varchar(150) DEFAULT NULL COMMENT '받을 유저 ID',
  `FROM_FOLLOWER_NAME` varchar(150) DEFAULT NULL COMMENT '받을 유저 명',
  `ISREAD` int(1) DEFAULT '0' COMMENT '확인 여부',
  `REGDTTM` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '알림 등록일',
  PRIMARY KEY (`NOTICE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_chat_notice:~2 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_chat_notice` DISABLE KEYS */;
INSERT INTO `ung_chat_notice` (`NOTICE_ID`, `ITEM_TYPE`, `ITEM_ID`, `ITEM_TITLE`, `ITEM_CONTENT`, `TO_FOLLOWER_ID`, `TO_FOLLOWER_NAME`, `FROM_FOLLOWER_ID`, `FROM_FOLLOWER_NAME`, `ISREAD`, `REGDTTM`) VALUES
	(145, 'INVITE', 126, '테스트방', '윤병선님이 [테스트방]방으로 장진영님을 초대하였습니다.', '007', '장진영', '012', '윤병선', 1, '2017-03-29 14:21:40'),
	(146, 'INVITE', 126, '테스트방', '윤병선님이 [테스트방]방으로 정경현님을 초대하였습니다.', 'ENKI001', '정경현', '012', '윤병선', 1, '2017-03-29 14:21:40');
/*!40000 ALTER TABLE `ung_chat_notice` ENABLE KEYS */;

-- 테이블 usns.ung_chat_read 구조 내보내기
DROP TABLE IF EXISTS `ung_chat_read`;
CREATE TABLE IF NOT EXISTS `ung_chat_read` (
  `ROOM_ID` bigint(20) NOT NULL COMMENT '채팅방 ID',
  `USER_ID` varchar(150) NOT NULL COMMENT '사용자 아이디',
  `MESSAGE_COUNT` bigint(20) NOT NULL DEFAULT '1' COMMENT '메세지 카운트',
  `REGDTTM` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
  `MODDTTM` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '갱신일시',
  PRIMARY KEY (`ROOM_ID`,`USER_ID`),
  UNIQUE KEY `UNG_CHAT_READ_IDX` (`ROOM_ID`,`USER_ID`),
  UNIQUE KEY `UNG_CHAT_READ_IDX01` (`USER_ID`,`ROOM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_chat_read:~2 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_chat_read` DISABLE KEYS */;
INSERT INTO `ung_chat_read` (`ROOM_ID`, `USER_ID`, `MESSAGE_COUNT`, `REGDTTM`, `MODDTTM`) VALUES
	(126, '007', 9, '2017-03-29 15:56:37', '2017-03-29 17:13:54'),
	(126, 'ENKI001', 8, '2017-03-29 15:56:37', '2017-03-29 17:13:34');
/*!40000 ALTER TABLE `ung_chat_read` ENABLE KEYS */;

-- 테이블 usns.ung_chat_room 구조 내보내기
DROP TABLE IF EXISTS `ung_chat_room`;
CREATE TABLE IF NOT EXISTS `ung_chat_room` (
  `ROOM_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '채팅방 ID',
  `ROOM_TITLE` varchar(255) NOT NULL COMMENT '채팅방 타이틀',
  `ESTABLISHER_ID` varchar(150) DEFAULT NULL COMMENT '방 개설자 ID',
  `ESTABLISHER_NAME` varchar(150) DEFAULT NULL COMMENT '방 개설자 이름',
  `REGDTTM` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '개설 일자',
  PRIMARY KEY (`ROOM_ID`),
  UNIQUE KEY `USER_ID` (`ROOM_ID`),
  KEY `CHATTING_ROOM_IDX` (`ROOM_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_chat_room:~2 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_chat_room` DISABLE KEYS */;
INSERT INTO `ung_chat_room` (`ROOM_ID`, `ROOM_TITLE`, `ESTABLISHER_ID`, `ESTABLISHER_NAME`, `REGDTTM`) VALUES
	(126, '테스트방', '012', '윤병선', '2017-03-29 14:21:40'),
	(127, '테스트방ㅅ', '012', '윤병선', '2017-03-29 15:20:19');
/*!40000 ALTER TABLE `ung_chat_room` ENABLE KEYS */;

-- 테이블 usns.ung_feed 구조 내보내기
DROP TABLE IF EXISTS `ung_feed`;
CREATE TABLE IF NOT EXISTS `ung_feed` (
  `FEED_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `FEED_TYPE` varchar(20) DEFAULT NULL COMMENT '일반글(GENERAL), 댓글(COMMENT), 공유(SHARE), 설문(POLL), 결재(APPROVAL), 게시판(BOARD), sharepoint(SHAREPOINT)',
  `FEED_TITLE` varchar(4000) DEFAULT NULL,
  `CONTENTS_TYPE` varchar(20) DEFAULT NULL COMMENT 'html, xml',
  `APPROVAL_STATUS` varchar(20) DEFAULT NULL COMMENT '승인(APPROVAL), 반려(REJECT)',
  `REG_MEMBER_ID` bigint(20) DEFAULT NULL,
  `REGDTTM` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `P_FEED_ID` bigint(20) DEFAULT NULL,
  `P_MEMBER_ID` bigint(20) DEFAULT NULL,
  `CMT_LST_SEC_FEED_ID` bigint(20) DEFAULT NULL,
  `CMT_LST_REGDTTM` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '피드에 대해 댓글이 추가되면 수정됨',
  `FEED_PER_SEQ` int(3) NOT NULL DEFAULT '0' COMMENT '피드는 0, 새로운 댓글은 무조건 1이며, 댓글이 추가될때마다 기존 댓글을 +1 UPDATE 하도록 함.',
  `FEED_CONTENTS` text,
  `NOTICE_STARTDATE` varchar(8) DEFAULT NULL COMMENT '공지사항 게시일자',
  `DUEDATE` varchar(8) DEFAULT NULL COMMENT '공지사항, 할일 만료 예정일자',
  `ENDDATE` varchar(8) DEFAULT NULL COMMENT '할일 완료일자',
  `COMP_MEMBER_ID` bigint(20) DEFAULT NULL,
  `LIKEIT_CNT` int(5) DEFAULT NULL,
  `CMT_CNT` int(5) DEFAULT NULL,
  `SHARE_CNT` int(5) DEFAULT NULL,
  `ISDELETED` int(1) DEFAULT '0',
  `INF_ID` varchar(50) DEFAULT NULL,
  `TENANT_ID` bigint(20) DEFAULT NULL,
  `TENANT_FEED_ID` bigint(20) DEFAULT NULL,
  `REL_MODIFY_DTTM` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '검색엔진 인덱싱용 컬럼',
  `MODIFY_DTTM` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`FEED_ID`),
  UNIQUE KEY `UNG_FEED_IDX` (`FEED_ID`,`ISDELETED`),
  UNIQUE KEY `UNG_FEED_IDX1` (`P_FEED_ID`,`FEED_TYPE`,`ISDELETED`,`FEED_ID`),
  UNIQUE KEY `UNG_FEED_IDX2` (`FEED_TYPE`,`FEED_ID`,`ISDELETED`),
  UNIQUE KEY `UNG_FEED_IDX4` (`DUEDATE`,`FEED_ID`,`FEED_TYPE`,`ISDELETED`),
  KEY `UNG_FEED_IDX3` (`REG_MEMBER_ID`,`ISDELETED`)
) ENGINE=InnoDB AUTO_INCREMENT=165 DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_feed:~152 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_feed` DISABLE KEYS */;
INSERT INTO `ung_feed` (`FEED_ID`, `FEED_TYPE`, `FEED_TITLE`, `CONTENTS_TYPE`, `APPROVAL_STATUS`, `REG_MEMBER_ID`, `REGDTTM`, `P_FEED_ID`, `P_MEMBER_ID`, `CMT_LST_SEC_FEED_ID`, `CMT_LST_REGDTTM`, `FEED_PER_SEQ`, `FEED_CONTENTS`, `NOTICE_STARTDATE`, `DUEDATE`, `ENDDATE`, `COMP_MEMBER_ID`, `LIKEIT_CNT`, `CMT_CNT`, `SHARE_CNT`, `ISDELETED`, `INF_ID`, `TENANT_ID`, `TENANT_FEED_ID`, `REL_MODIFY_DTTM`, `MODIFY_DTTM`) VALUES
	(1, 'APPROVAL', 'fdsfafs', NULL, NULL, 1, '2016-01-14 13:27:22', 0, 0, NULL, '2016-01-11 15:43:00', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(2, 'GENERAL', 'aaaa', NULL, NULL, 1, '2016-01-11 15:49:34', 0, 0, NULL, '2016-01-11 15:49:34', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(3, 'GENERAL', 'aaaa', NULL, NULL, 1, '2016-01-11 15:55:31', 0, 0, NULL, '2016-01-11 15:55:31', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(4, 'GENERAL', 'aaaaaaaaaaa', NULL, NULL, 1, '2016-01-11 16:11:01', 0, 0, NULL, '2016-01-11 16:11:01', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(5, 'GENERAL', 'qqqq', NULL, NULL, 1, '2016-01-11 16:21:00', 0, 0, NULL, '2016-01-11 16:21:00', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(6, 'GENERAL', 'GGGGGGGG', NULL, NULL, 1, '2016-01-11 16:49:08', 0, 0, NULL, '2016-01-11 16:49:08', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(7, 'GENERAL', 'EEEE', NULL, NULL, 1, '2016-01-11 17:13:01', 0, 0, 8, '2016-01-11 17:07:25', 0, '', NULL, '', NULL, NULL, NULL, 1, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(8, 'COMMENT', 'test', NULL, NULL, 1, '2016-01-11 17:07:25', 7, 0, NULL, '2016-01-11 17:13:01', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(9, 'GENERAL', 'test', NULL, NULL, 1, '2016-01-11 17:10:49', 0, 0, NULL, '2016-01-11 17:10:49', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(10, 'GENERAL', 'test', NULL, NULL, 1, '2016-01-11 17:10:52', 0, 0, NULL, '2016-01-11 17:10:52', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(11, 'GENERAL', 'test', NULL, NULL, 1, '2016-01-11 17:10:52', 0, 0, NULL, '2016-01-11 17:10:52', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(12, 'GENERAL', 'test', NULL, NULL, 1, '2016-01-11 17:10:53', 0, 0, NULL, '2016-01-11 17:10:53', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(13, 'GENERAL', 'test', NULL, NULL, 1, '2016-01-11 17:10:53', 0, 0, NULL, '2016-01-11 17:10:53', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(14, 'GENERAL', 'test', NULL, NULL, 1, '2016-01-11 17:27:39', 0, 0, NULL, '2016-01-11 17:10:53', 0, '', NULL, '', NULL, NULL, NULL, NULL, 1, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(15, 'SHARE', 'test', NULL, NULL, 1, '2016-01-11 17:22:03', 14, 0, NULL, '2016-01-11 17:22:03', 0, '{"LINK":{"description":"","image":"/sns/members/imgs?memberId=1","title":"test","url":"/sns/feeds/14"}}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(16, 'GENERAL', 'ㄹㅇㄻㄹㄴㅁㄹㄴㅁ', NULL, NULL, 2, '2016-01-11 17:55:09', 0, 0, NULL, '2016-01-11 17:55:09', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(17, 'APPROVAL', '이렇게 쓰지요~', NULL, NULL, 3, '2016-01-29 18:11:06', 0, 0, NULL, '2016-01-11 18:08:57', 0, '{"LINK":{"title":"전자결재 요청 - 휴가","url":"http://www.uengine.org/web/guest/63","image":"","description":null}}', NULL, '', NULL, NULL, 1, NULL, 1, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(18, 'GENERAL', '@[홍재원](3) 이런식으로 멘션을 추가할 수 있어요~\n\n링크도 되요\n\nwww.naver.com\n', NULL, NULL, 2, '2016-01-11 18:11:22', 0, 0, NULL, '2016-01-11 18:11:22', 0, '{"LINK":{"title":"네이버 메인","url":"http://www.naver.com/","image":"http://static.naver.net/www/mobile/edit/2015/0429/mobile_20514817711.png","description":"네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요"}}', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(19, 'GENERAL', 'fdsafafsafsa', NULL, NULL, 2, '2016-01-11 18:16:10', 0, 0, NULL, '2016-01-11 18:16:10', 0, '', NULL, '20160129', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(20, 'GENERAL', 'sdfsfsafsafa', NULL, NULL, 2, '2016-01-12 11:39:12', 0, 0, NULL, '2016-01-12 11:39:12', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(21, 'GENERAL', 'fsdfasfsa\nfafaf\n', NULL, NULL, 2, '2016-01-12 11:39:50', 0, 0, NULL, '2016-01-12 11:39:50', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(22, 'GENERAL', 'aaaa\n2222\nffff\n', NULL, NULL, 2, '2016-01-12 11:40:17', 0, 0, NULL, '2016-01-12 11:40:17', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(23, 'GENERAL', '', NULL, NULL, 2, '2016-01-12 12:07:06', 0, 0, NULL, '2016-01-12 12:07:06', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(24, 'GENERAL', '#유엔진 #테스트 #SNS 해시태그 등록', NULL, NULL, 2, '2016-01-19 13:57:46', 0, 0, NULL, '2016-01-12 12:20:14', 0, '', NULL, '', NULL, NULL, 0, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(25, 'GENERAL', '여기는 test 그룹', NULL, NULL, 2, '2016-01-12 14:40:00', 0, 0, NULL, '2016-01-12 14:40:00', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(26, 'GENERAL', '새글을 써봅니다. \n아야어여.. ', NULL, NULL, 1, '2016-01-12 16:38:52', 0, 0, 27, '2016-01-12 16:33:26', 0, '', NULL, '', NULL, NULL, 1, 1, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(27, 'COMMENT', '댓글입력 아아아ㅏ', NULL, NULL, 1, '2016-01-12 16:33:26', 26, 0, NULL, '2016-01-12 16:38:37', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(28, 'GENERAL', '이거이거 해야함. ', NULL, NULL, 1, '2016-01-12 16:48:36', 0, 0, 35, '2016-01-12 16:43:26', 0, '', NULL, '20160114', NULL, NULL, NULL, 2, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(29, 'GENERAL', '해 봅니다.', NULL, NULL, 2, '2016-01-12 16:35:25', 0, 0, NULL, '2016-01-12 16:35:25', 0, '', NULL, '20160112', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(30, 'GENERAL', '2016년 1월 12일', NULL, NULL, 1, '2016-01-12 17:43:14', 0, 0, 40, '2016-01-12 17:37:35', 0, '', NULL, '', NULL, NULL, NULL, 5, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(31, 'COMMENT', '아아아\n', NULL, NULL, 1, '2016-01-12 17:43:13', 30, 0, NULL, '2016-01-12 16:43:12', 5, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(32, 'COMMENT', '이거 확인 바람', NULL, NULL, 1, '2016-01-12 17:43:13', 30, 0, NULL, '2016-01-12 16:43:30', 4, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(33, 'COMMENT', 'ㅇㅇ', NULL, NULL, 1, '2016-01-12 17:43:13', 30, 0, NULL, '2016-01-12 16:44:46', 3, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(34, 'GENERAL', '머하지', NULL, NULL, 1, '2016-01-12 16:40:41', 0, 0, NULL, '2016-01-12 16:40:41', 0, '', NULL, '20160113', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(35, 'COMMENT', '111', NULL, NULL, 1, '2016-01-12 16:48:36', 28, 0, NULL, '2016-01-12 16:48:30', 2, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(36, 'COMMENT', '222', NULL, NULL, 1, '2016-01-12 16:43:26', 28, 0, NULL, '2016-01-12 16:48:36', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(37, 'GENERAL', '알림 라인 보이려나??', NULL, NULL, 2, '2016-01-12 16:56:08', 0, 0, 38, '2016-01-12 16:50:58', 0, '', NULL, '', NULL, NULL, NULL, 1, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(38, 'COMMENT', '왜 알림 라인이 안 뜨지??', NULL, NULL, 2, '2016-01-12 16:50:58', 37, 0, NULL, '2016-01-12 16:56:08', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(39, 'GENERAL', '음...이건??', NULL, NULL, 3, '2016-01-12 16:57:24', 0, 0, NULL, '2016-01-12 16:57:24', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(40, 'COMMENT', '@[김용훈](2) 멘션으로 팔로우 하기', NULL, NULL, 3, '2016-01-12 17:43:13', 30, 0, NULL, '2016-01-12 17:04:47', 2, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(41, 'SHARE', 'test', NULL, NULL, 1, '2016-01-12 17:35:07', 17, 0, NULL, '2016-01-12 17:35:07', 0, '{"LINK":{"description":"","image":"/sns/members/imgs?memberId=3","title":"이렇게 쓰지요~","url":"/sns/feeds/17"}}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(42, 'COMMENT', 'test', NULL, NULL, 1, '2016-01-12 17:37:35', 30, 1, NULL, '2016-01-12 17:43:13', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(43, 'GENERAL', '알림 영역이 되야 할텐데...', NULL, NULL, 2, '2016-01-12 17:49:16', 0, 0, 44, '2016-01-12 17:44:05', 0, '', NULL, '', NULL, NULL, NULL, 1, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(44, 'COMMENT', '@[홍재원](3) 이거군', NULL, NULL, 2, '2016-01-12 17:44:05', 43, 0, NULL, '2016-01-12 17:49:16', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(45, 'GENERAL', '마우스 우클릭 새로고침 하시면 유엔진 로고로 바뀝니다.\n근데 색감이 안어울리네요 ^^\n', NULL, NULL, 2, '2016-01-13 12:43:54', 0, 0, 46, '2016-01-13 12:38:43', 0, '', NULL, '', NULL, NULL, NULL, 1, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(46, 'COMMENT', '사람과 그룹의 깨진 이미지 디폴트 이미지로 나오도록 함.', NULL, NULL, 2, '2016-01-13 12:38:43', 45, 0, NULL, '2016-01-13 12:43:54', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(47, 'GENERAL', '#해시태그 \n@[테스터](1) 에게 전달', NULL, NULL, 2, '2016-01-14 13:06:54', 0, 0, NULL, '2016-01-14 13:06:54', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(48, 'GENERAL', 'ㄹㄻㅁ', NULL, NULL, 2, '2016-01-14 13:08:26', 0, 0, NULL, '2016-01-14 13:08:26', 0, '', NULL, '20160127', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(49, 'POLL', 'ㄹㄴㄻ', NULL, NULL, 2, '2016-01-14 13:08:44', 0, 0, NULL, '2016-01-14 13:08:44', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(50, 'GENERAL', '테스트 엔터키', NULL, NULL, 2, '2016-01-14 17:20:18', 0, 0, NULL, '2016-01-14 13:12:09', 0, '', NULL, '', NULL, NULL, NULL, NULL, 1, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(51, 'GENERAL', '테스트', NULL, NULL, 4, '2016-01-14 13:20:35', 0, 0, 52, '2016-01-14 13:15:24', 0, '', NULL, '', NULL, NULL, NULL, 1, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(52, 'COMMENT', 'ㅇㅇㅇㅇ', NULL, NULL, 4, '2016-01-14 13:15:24', 51, 0, NULL, '2016-01-14 13:20:34', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(53, 'GENERAL', '\n\nwww.daum.net\n', NULL, NULL, 2, '2016-01-14 13:59:16', 0, 0, NULL, '2016-01-14 13:59:16', 0, '{"LINK":{"title":"모두가 즐거워지는 인터넷 라이프 &ndash; Daum","url":"http://www.daum.net/","image":"http://i1.daumcdn.net/svc/image/U03/common_icon/5587C4E4012FCD0001","description":"인터넷 세상의 즐거움을 함께하고 싶은 순간, 다음에서 쉽고 편하게 모두와 나눠보세요."}}', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(54, 'GENERAL', '', NULL, NULL, 2, '2016-01-14 16:59:55', 0, 0, NULL, '2016-01-14 16:30:59', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 1, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(55, 'GENERAL', '매뉴얼', NULL, NULL, 2, '2016-01-14 16:59:47', 0, 0, NULL, '2016-01-14 16:31:45', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 1, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(56, 'GENERAL', '매뉴얼', NULL, NULL, 2, '2016-01-15 09:45:22', 0, 0, 70, '2016-01-15 09:40:10', 0, '', NULL, '', NULL, NULL, NULL, 3, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(57, 'GENERAL', '매뉴얼입니다.\n한화에서 작성한 매뉴얼이므로 안 맞는 부분도 있으니 감안하셔서 보시기 바랍니다.', NULL, NULL, 117, '2016-01-14 18:43:21', 0, 0, 68, '2016-01-14 18:38:10', 0, '', NULL, '', NULL, NULL, NULL, 1, NULL, 0, NULL, 2, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(58, 'SHARE', '테스트입니다.', NULL, NULL, 115, '2016-01-14 17:21:44', 50, 0, 59, '2016-01-14 17:16:33', 0, '{"LINK":{"description":"","image":"/sns/members/imgs?memberId=2","title":"테스트 엔터키","url":"/sns/feeds/50"}}', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(59, 'COMMENT', '흠...\n', NULL, NULL, 115, '2016-01-14 17:16:33', 58, 0, NULL, '2016-01-14 17:21:44', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(60, 'GENERAL', '1', NULL, NULL, 115, '2016-01-14 17:25:16', 0, 0, NULL, '2016-01-14 17:25:16', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(61, 'GENERAL', '2명이상 그룹원 동시 추가시 오류발생', NULL, NULL, 115, '2016-01-15 09:43:46', 0, 0, 71, '2016-01-15 09:38:35', 0, '', NULL, '', NULL, NULL, NULL, 1, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(62, 'GENERAL', '에센스 2차 교육 진행 예정입니다.', NULL, NULL, 115, '2016-01-19 15:27:16', 0, 0, 74, '2016-01-19 15:22:03', 0, '', NULL, '20160115', '20160119', 115, NULL, 1, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(63, 'GENERAL', 'S-Method 1차 분석', NULL, NULL, 115, '2016-01-19 15:27:06', 0, 0, 73, '2016-01-19 15:21:53', 0, '', NULL, '20160118', '20160119', 115, NULL, 1, 1, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(64, 'SHARE', '', NULL, NULL, 115, '2016-01-14 17:41:29', 63, 0, NULL, '2016-01-14 17:35:18', 0, '{"LINK":{"description":"","image":"/sns/members/imgs?memberId=115","title":"S-Method 1차 분석","url":"/sns/feeds/63"}}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(65, 'GENERAL', '타 회사 직원 팔로워 하기\n전체회사 체크박스 선택 후 팔로워 입력하면 타 회사 직원이 함께 조회됩니다.\n아직 서버 반영은 잠시 후 이루어집니다.', NULL, NULL, 2, '2016-01-14 17:59:21', 0, 0, NULL, '2016-01-14 17:59:21', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(66, 'GENERAL', 'dsadfvasffsa', NULL, NULL, 1, '2016-01-14 18:24:29', 0, 0, NULL, '2016-01-14 18:24:29', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(67, 'GENERAL', '정상적으로 화면이 조회되지 않으면 \n마우스 우클릭 새로고침 해주세요', NULL, NULL, 1, '2016-01-14 18:37:43', 0, 0, NULL, '2016-01-14 18:37:43', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(68, 'COMMENT', '정상적으로 화면이 조회되지 않으면 \n마우스 우클릭 새로고침 해주세요', NULL, NULL, 117, '2016-01-14 18:38:10', 57, 0, NULL, '2016-01-14 18:43:21', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 2, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(69, 'COMMENT', '다 좋은데, 아무나 내 이름으로 로그인이 가능하네요.. 비번 설정 가능한가요?', NULL, NULL, 104, '2016-01-15 09:45:22', 56, 0, NULL, '2016-01-15 00:20:06', 3, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(70, 'COMMENT', '현재 로그인 기능은 없습니다.\n로그인 기능을 구현해야 합니다.', NULL, NULL, 2, '2016-01-15 09:45:22', 56, 104, NULL, '2016-01-15 09:43:26', 2, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(71, 'COMMENT', '처리됨', NULL, NULL, 2, '2016-01-15 09:38:35', 61, 0, NULL, '2016-01-15 09:43:46', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(72, 'COMMENT', '빨리 반영할 수 있도록 해보겠습니다.', NULL, NULL, 2, '2016-01-15 09:40:10', 56, 2, NULL, '2016-01-15 09:45:22', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(73, 'COMMENT', '일정을 완료처리 했습니다.', NULL, NULL, 115, '2016-01-19 15:21:53', 63, 0, NULL, '2016-01-19 15:27:06', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(74, 'COMMENT', '일정을 완료처리 했습니다.', NULL, NULL, 115, '2016-01-19 15:22:03', 62, 0, NULL, '2016-01-19 15:27:16', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(75, 'GENERAL', 'AWS South Korea Business Registration Number Request\n받은편지함\nx \n\n\'Amazon Web Services, Inc.\' via 영업\n11:32 (2시간 전)\n\nCloudine에게 \nGreetings from Amazon Web Services,\n\nIn early December 2015, we wrote to notify you that Amazon Web Services, Inc. would charge 10% VAT on web services supplied to South Korean customers from January 1, 2016. The South Korean authorities have since updated tax law to exclude sales to business customers from this VAT.\n\nIf you are a registered business and use our web services for business purposes, please enter your business registration number on our tax settings page (https://console.aws.amazon.com/billing/home#/tax ) for each of your AWS accounts. Please enter your business registration number by January 31, 2016 to avoid VAT being charged on your bill for January 2016, and subsequent, service usage. If you are not able to submit your business registration number by January 31, please do so at your earliest convenience. Provided we have received a valid business registration number by the last day of a month, Amazon Web Services, Inc. will not apply VAT on the cloud computing service usage during that month and any future usage under the relevant AWS account. You may request a refund of prior VAT paid on that account through Customer Support at https://aws.amazon.com/support.\n\nThank you for using Amazon Web Services.\n\nSincerely,\n\nAmazon Web Services, Inc.\n\n아마존웹서비스에서 인사드립니다.\n\n아마존웹서비스에서는 2016년 1월 1일부터 대한민국 고객들에게 제공되는 웹서비스들에 대해 10%의 부가가치세를 부과한다고 2015년 12월 초에 공지해 드린 바 있습니다. 이후 대한민국 당국은 세법을 개정하여 대한민국 기업 고객들에 대한 매출분에 대해서는 이런 부가가치세 과세를 제외하도록 하였습니다.\n\n귀하(귀사)가 사업자등록을 한 기업이고 또한 사업 목적으로 저희의 웹서비스를 이용하신다면, 귀하(귀사)의 각 AWS 계정 별로 아마존의 세금 설정 페이지(https://console.aws.amazon.com/billing/home#/tax) 에서 귀하(귀사)의 사업자 등록 번호를 입력해주시기 바랍니다. 2016년 1월 서비스 이용분과 그 이후의 서비스 이용분에 대해 부가가치세가 부과되지 않도록 하려면 2016년 1월 31일까지 귀하(귀사)의 사업자 등록 번호를 입력해주십시오. 만일 1월 31일까지 귀하(귀사)의 사업자 등록 번호를 제출하지 못할 경우에는 가능한 한 빠른 시일 내에 제출해 주시기 바랍니다. 해당 월의 말일까지 귀하(귀사)의 올바른 사업자등록번호를 받기만 한다면, 아마존웹서비스는 해당 AWS 계정에 대해 그 달 동안에 사용하였고 또한 그 이후에 사용할 클라우드 컴퓨팅 서비스와 관련하여 부가가치세를 적용하지 않을 것입니다. 귀하(귀사)가 해당 AWS계정을 통해 과거에 납부한 부가가치세가 있다면 이에 대해서는 고객 지원부서(https://aws.amazon.com/support) 를 통해 환급을 받을 수 있습니다.\n\n아마존웹서비스를 이용해 주셔서 대단히 감사드립니다.\n\n감사합니다.\n\nAmazon Web Services, Inc. is a subsidiary of Amazon.com, Inc. Amazon.com is a registered trademark of Amazon.com, Inc. This message was produced and distributed by Amazon Web Services Inc., 410 Terry Ave. North, Seattle, WA 98109-5210', NULL, NULL, 115, '2016-01-20 13:49:21', 0, 0, NULL, '2016-01-20 13:42:55', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 1, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(76, 'POLL', '만족도 조사', NULL, NULL, 2, '2016-01-20 17:15:31', 0, 0, NULL, '2016-01-20 17:15:31', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(77, 'GENERAL', '매핑표 기입 부탁드릴게요.', NULL, NULL, 115, '2016-01-21 16:52:57', 0, 0, 81, '2016-01-21 16:47:44', 0, '', NULL, '', NULL, NULL, NULL, 3, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(78, 'GENERAL', '사원찾기가 안되요~ 1시 방향\n\n', NULL, NULL, 112, '2016-01-27 16:18:43', 0, 0, 79, '2016-01-27 15:44:24', 0, '', NULL, '', NULL, NULL, 1, 2, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(79, 'COMMENT', '사진에 재생버튼이 보여요~ ', NULL, NULL, 112, '2016-01-27 15:49:39', 78, 0, NULL, '2016-01-20 17:58:48', 2, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(80, 'COMMENT', '매핑표 기입한 파일입니다.', NULL, NULL, 116, '2016-01-21 16:52:57', 77, 0, NULL, '2016-01-20 18:01:33', 3, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(81, 'COMMENT', '', NULL, NULL, 116, '2016-01-21 16:52:57', 77, 0, NULL, '2016-01-21 16:52:03', 2, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(82, 'COMMENT', 'ㅁㄴㅇㄹ', NULL, NULL, 116, '2016-01-21 16:47:44', 77, 0, NULL, '2016-01-21 16:52:57', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(83, 'GENERAL', '엔키소프트 이성한 입니다.\n첫 접속입니다. 잘 사용하겠습니다.\n', NULL, NULL, 15, '2016-01-22 09:01:10', 0, 0, NULL, '2016-01-22 09:01:10', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 2, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(84, 'GENERAL', '사용자정보 수정( 비밀번호 변경) 하는 부분이 어디에 있는나요?', NULL, NULL, 15, '2016-01-25 12:08:51', 0, 0, 88, '2016-01-25 12:03:37', 0, '', NULL, '', NULL, NULL, NULL, 1, NULL, 0, NULL, 2, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(85, 'GENERAL', '환경설정 탭 이동시 간혈적으로 에러가 나타납니다.', NULL, NULL, 59, '2016-01-25 12:09:56', 0, 0, 89, '2016-01-25 12:04:42', 0, '', NULL, '', NULL, NULL, NULL, 1, NULL, 0, NULL, 2, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(86, 'GENERAL', 'SNS 통해 양사가 많은 정보 교환이 있었으면 합니다.', NULL, NULL, 7, '2016-01-22 17:22:42', 0, 0, NULL, '2016-01-22 17:22:42', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 2, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(87, 'GENERAL', '새로운 국내 공개 WAS "NAWAS"(http://www.nawas.co.kr)에 개발에 참여하실 분을 모십니다. NAWAS는 Tomact, JBoss등 해외 공개 WAS와 차별화된 국내 공개 WAS로의 새로운 지평을 열어갈 것입니다.', NULL, NULL, 7, '2016-01-24 11:42:34', 0, 0, NULL, '2016-01-24 11:42:34', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 2, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(88, 'COMMENT', '사용자 정보 변경 기능은 없습니다.\n기존에 그룹웨어 연동하던것을 현재 로그인만 가능하도록 처리해 둔 것입니다.', NULL, NULL, 2, '2016-01-25 12:03:37', 84, 0, NULL, '2016-01-25 12:08:51', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(89, 'COMMENT', '3번째 탭인 외부연동 목록 탭에서 발생하는 것으로 사용하지 않는 탭입니다.', NULL, NULL, 2, '2016-01-25 12:04:42', 85, 0, NULL, '2016-01-25 12:09:56', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(90, 'GENERAL', 'fsdafsafa', NULL, NULL, 2, '2016-01-25 16:29:49', 0, 0, NULL, '2016-01-25 16:29:49', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(91, 'GENERAL', '안녕하세요- 눈이 오네요, 이제는 눈이 이뻐보이지만은 아닌 나이가 됬네요- ^^;\n오늘부터 날씨가 풀린다고 했지만 여전히 춥습니다. 다들 건강유의하시길 빌께요.\n\n그나저나 건물 화장실을 언제 쯤 사용할 수 있을까요? 화장실 많이 갈까봐 정수기도 안 되는거겠지요? ㅎㅎㅎㅎ\n\n', NULL, NULL, 62, '2016-01-26 10:11:15', 0, 0, 92, '2016-01-26 10:06:00', 0, '', NULL, '', NULL, NULL, 1, 1, NULL, 0, NULL, 2, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(92, 'COMMENT', '이것은 test 입니다. \n자료는 픽셀아이콘 디자인입니다.', NULL, NULL, 62, '2016-01-26 10:11:36', 91, 0, NULL, '2016-01-26 10:11:15', 1, '', NULL, NULL, NULL, NULL, 1, NULL, NULL, 0, NULL, 2, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(93, 'GENERAL', '알파매핑 파일 입니다.', NULL, NULL, 116, '2016-01-26 18:38:40', 0, 0, 94, '2016-01-26 18:33:25', 0, '', NULL, '', NULL, NULL, NULL, 1, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(94, 'COMMENT', '', NULL, NULL, 116, '2016-01-26 18:33:25', 93, 0, NULL, '2016-01-26 18:38:40', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(95, 'COMMENT', '사원찾기 기능은 한화 그룹웨어 기능으로 삭제\n재생버튼은 이미지 자동 슬라이드 기능임.', NULL, NULL, 2, '2016-01-27 15:44:24', 78, 0, NULL, '2016-01-27 15:49:39', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(96, 'GENERAL', '@[신비인](111) 주임님, OOO 업무에 대해 질문있습니다.\nOOO 는 어떻게 처리해야 하는지 상세히 알려주셨으면 합니다.', NULL, NULL, 2, '2016-02-04 11:46:17', 0, 0, 98, '2016-02-04 11:41:00', 0, '', NULL, '', NULL, NULL, NULL, 3, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(97, 'COMMENT', 'http://www.uengine.org/web/guest/63\n참고하시기 바랍니다.', NULL, NULL, 111, '2016-02-04 11:46:17', 96, 0, NULL, '2016-01-29 17:27:18', 3, '{"LINK":{"title":"BPMS, JMS, 전자결재 - OpenSource BPMS uengine.org","url":"http://www.uengine.org/web/guest/63","image":"","description":null}}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(98, 'COMMENT', '답변 감사합니다.', NULL, NULL, 2, '2016-02-04 11:46:17', 96, 111, NULL, '2016-01-29 17:50:37', 2, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(99, 'COMMENT', '모바일에서 글적기', NULL, NULL, 115, '2016-02-04 11:41:00', 96, 0, NULL, '2016-02-04 11:46:17', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(100, 'GENERAL', '모바일에서 글등록', NULL, NULL, 115, '2016-02-04 11:41:37', 0, 0, NULL, '2016-02-04 11:41:37', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(101, 'GENERAL', '사진 미리보기', NULL, NULL, 2, '2016-02-11 10:22:26', 0, 0, NULL, '2016-02-11 10:17:00', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 1, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(102, 'GENERAL', '', NULL, NULL, 2, '2016-02-11 10:17:31', 0, 0, NULL, '2016-02-11 10:17:31', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(103, 'GENERAL', 'http://www.samsungsem.com/kr/index.jsp ', NULL, NULL, 2, '2016-02-11 10:24:31', 0, 0, NULL, '2016-02-11 10:18:46', 0, '{"LINK":{"title":"SAMSUNG ELECTRO-MECHANICS","url":"http://www.samsungsem.com","image":"http://www.samsungsem.com/images/samsungsem_logo.jpg","description":"SAMSUNG ELECTRO-MECHANICS"}}', NULL, '', NULL, NULL, NULL, NULL, NULL, 1, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(104, 'GENERAL', '@[김성종](4) 차장님 확인하세요\n', NULL, NULL, 2, '2016-02-11 10:30:11', 0, 0, NULL, '2016-02-11 10:30:11', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(105, 'GENERAL', ' ① 개발방법론\n가. 개발방법론\n1) 기본 개발 방법론은 Agile 기법 중에 하나인 Scrum을 적용하고 Scrum은 2주 단위로 Sprint를 구성하며 이슈 관리 도구를 통해 Epic, Story를 정의하여 정의한 Story를 2주 단위의 Sprint에 배정하여 개발을 수행\n\n그림  ‘V-모델 + Agile 기반’ 개발방법론\n', NULL, NULL, 115, '2016-02-12 16:43:28', 0, 0, NULL, '2016-02-12 16:43:28', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(106, 'GENERAL', '@[금득규](5) 이사님, 명절은 잘 보내셨나요?', NULL, NULL, 4, '2016-02-15 18:50:04', 0, 0, NULL, '2016-02-15 18:50:04', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(107, 'GENERAL', '올 한해 즐거운 일만 가득하시기를 바랍니다.', NULL, NULL, 4, '2016-02-15 18:57:42', 0, 0, 108, '2016-02-15 18:52:22', 0, '', NULL, '', NULL, NULL, NULL, 1, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(108, 'COMMENT', '고맙습니다.\n차장님도 좋은일만 가득하시길 바랍니다.', NULL, NULL, 2, '2016-02-15 18:52:22', 107, 0, NULL, '2016-02-15 18:57:42', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(109, 'GENERAL', 'SK하이닉스 페이스북\nhttps://www.facebook.com/SKhynix ', NULL, NULL, 2, '2016-02-16 18:06:31', 0, 0, 110, '2016-02-16 18:01:10', 0, '{"LINK":{"title":"SK하이닉스 (SK hynix)","url":"http://www.facebook.com/SKhynix","image":"","description":"SK하이닉스 (SK hynix). 좋아하는 사람 118,210명 · 이야기하고 있는 사람들 5,252명. 안녕하세요. SK하이닉스 공식 페이스북입니다!\\r\\n우리 모두의 행복한 하루를 공유하는 공간이 되었으면 합니다~\\r\\n만나서 반가워요~ ^^"}}', NULL, '', NULL, NULL, NULL, 2, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(110, 'COMMENT', 'www.facebook.com\n', NULL, NULL, 2, '2016-02-16 18:06:31', 109, 0, NULL, '2016-02-16 10:55:07', 2, '{"LINK":{"title":"Facebook에 오신 것을 환영합니다. 로그인, 가입 및 더 알아보기","url":"https://www.facebook.com/","image":"https://www.facebook.com/images/fb_icon_325x325.png","description":"Facebook은 친구, 직장동료, 학교동창 과 지인들을 서로 연결해주는 소셜 네트워크입니다. 사람들은 Facebook을 통해 친구들과 연락하고, 사진을 무제한으로 업로드하고, 링크와 동영상을 게시하면서 친목을 도모할 수 있습니다."}}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(111, 'GENERAL', 'Www.naver.com \n@[김성종](4) ', NULL, NULL, 2, '2016-02-16 14:50:27', 0, 0, NULL, '2016-02-16 14:50:27', 0, '{"LINK":{"title":"네이버 메인","url":"http://www.naver.com/","image":"http://static.naver.net/www/mobile/edit/2015/0429/mobile_20514817711.png","description":"네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요"}}', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(112, 'GENERAL', '#SNS 해시태그 등록\n', NULL, NULL, 2, '2016-02-16 18:00:35', 0, 0, NULL, '2016-02-16 18:00:35', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(113, 'COMMENT', '#SK하이닉스 데모', NULL, NULL, 2, '2016-02-16 18:01:10', 109, 0, NULL, '2016-02-16 18:06:31', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(114, 'GENERAL', 'SNS 국내 동향 자료 조사', NULL, NULL, 115, '2016-02-25 11:27:15', 0, 0, 115, '2016-02-25 11:21:52', 0, '', NULL, '20160218', NULL, NULL, NULL, 1, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(115, 'COMMENT', 'SNS 국내 동향 자료 조사', NULL, NULL, 111, '2016-02-25 11:21:52', 114, 0, NULL, '2016-02-25 11:27:15', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(116, 'GENERAL', 'ㅅㅅㅅㅅㅅㅅㅅ', NULL, NULL, 109, '2016-05-03 10:11:36', 0, 0, 117, '2016-05-03 10:13:09', 0, '', NULL, '', NULL, NULL, NULL, 1, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(117, 'COMMENT', '#ㅅㄷㄴ', NULL, NULL, 109, '2016-05-03 10:13:09', 116, 0, NULL, '2016-05-03 10:11:36', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(118, 'GENERAL', 'testtesttest', NULL, NULL, 109, '2016-05-04 15:07:19', 0, 0, 119, '2016-05-04 15:08:51', 0, '', NULL, '', NULL, NULL, NULL, 1, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(119, 'COMMENT', '@[한원석](112) 이야야야야야 #test dddd', NULL, NULL, 109, '2016-05-04 15:08:51', 118, 0, NULL, '2016-05-04 15:07:19', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(120, 'GENERAL', 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ', NULL, NULL, 109, '2016-05-04 15:08:52', 0, 0, 121, '2016-05-04 15:10:25', 0, '', NULL, '', NULL, NULL, NULL, 1, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(121, 'COMMENT', '@[한원석](112) 석', NULL, NULL, 109, '2016-05-04 15:10:25', 120, 0, NULL, '2016-05-04 15:08:52', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(122, 'GENERAL', 'ㅇㅇㅇㅇㅇㅇ', NULL, NULL, 112, '2016-05-04 15:21:50', 0, 0, NULL, '2016-05-04 15:11:57', 0, '', NULL, '', NULL, NULL, NULL, NULL, 1, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(123, 'GENERAL', '김용훈 ㅇㅇㅇㅇㅇㅇ 한원석 ㅇㅇㅇ석', NULL, NULL, 109, '2016-05-04 15:16:16', 0, 0, NULL, '2016-05-04 15:16:16', 0, '', NULL, '20160506', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(124, 'POLL', 'ddddd', NULL, NULL, 109, '2016-05-04 15:17:32', 0, 0, NULL, '2016-05-04 15:17:32', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(125, 'GENERAL', 'ddddd', NULL, NULL, 109, '2016-05-04 15:17:48', 0, 0, 126, '2016-05-04 15:19:21', 0, '', NULL, '', NULL, NULL, NULL, 1, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(126, 'COMMENT', 'www.naver.com\ndddddd\n', NULL, NULL, 109, '2016-05-04 15:19:21', 125, 0, NULL, '2016-05-04 15:17:48', 1, '{"LINK":{"title":"네이버 메인","url":"http://www.naver.com/","image":"http://static.naver.net/www/mobile/edit/2016/0407/mobile_17004159045.png","description":"네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요"}}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(127, 'GENERAL', 'testesss', NULL, NULL, 109, '2016-05-04 15:21:05', 0, 0, 130, '2016-05-04 15:22:15', 0, '', NULL, '', NULL, NULL, NULL, 4, 1, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(128, 'COMMENT', '@[윤병선](109) ', NULL, NULL, 112, '2016-05-04 15:20:42', 127, 0, NULL, '2016-05-04 15:20:10', 4, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(129, 'COMMENT', 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇ', NULL, NULL, 109, '2016-05-04 15:20:42', 127, 0, NULL, '2016-05-04 15:20:30', 3, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(130, 'COMMENT', 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ', NULL, NULL, 109, '2016-05-04 15:20:42', 127, 0, NULL, '2016-05-04 15:20:36', 2, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(131, 'COMMENT', 'ㅇㅇㅇㅇㅇㅇㅇ', NULL, NULL, 109, '2016-05-04 15:22:15', 127, 112, NULL, '2016-05-04 15:20:42', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(132, 'SHARE', '테스트!!!!!!!!!!!!!!!!!!!!!!!!1', NULL, NULL, 109, '2016-05-04 15:22:38', 127, 0, NULL, '2016-05-04 15:22:38', 0, '{"LINK":{"description":"","image":"/sns/members/imgs?memberId=109","title":"testesss","url":"/sns/feeds/127"}}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(133, 'SHARE', 'ㅇㅇㅇㅇㅇ', NULL, NULL, 109, '2016-05-04 15:23:23', 122, 0, NULL, '2016-05-04 15:23:23', 0, '{"LINK":{"description":"","image":"/sns/members/imgs?memberId=112","title":"ㅇㅇㅇㅇㅇㅇ","url":"/sns/feeds/122"}}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(134, 'GENERAL', 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ', NULL, NULL, 109, '2017-02-14 15:25:57', 0, 0, 135, '2016-05-04 15:27:38', 0, '', NULL, '20160512', NULL, NULL, NULL, 1, NULL, 1, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(135, 'COMMENT', 'ㅇㅇㅇㅇㅇ', NULL, NULL, 109, '2016-05-04 15:27:38', 134, 0, NULL, '2016-05-04 15:26:05', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(136, 'GENERAL', 'sadf', NULL, NULL, 115, '2016-11-10 17:29:49', 0, 0, NULL, '2016-11-10 17:29:49', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(137, 'GENERAL', 'asdf', NULL, NULL, 115, '2016-11-10 17:29:53', 0, 0, NULL, '2016-11-10 17:29:53', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(138, 'GENERAL', 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ', NULL, NULL, 109, '2017-02-14 15:25:48', 0, 0, 139, '2017-02-14 15:20:26', 0, '', NULL, '20170213', '20170214', 109, NULL, 1, NULL, 1, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(139, 'COMMENT', '일정을 완료처리 했습니다.', NULL, NULL, 109, '2017-02-14 15:20:26', 138, 0, NULL, '2017-02-14 15:20:26', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(140, 'GENERAL', 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ', NULL, NULL, 109, '2017-02-14 15:23:16', 0, 0, NULL, '2017-02-14 15:23:16', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(141, 'GENERAL', '', NULL, NULL, 109, '2017-02-14 15:28:10', 0, 0, NULL, '2017-02-14 15:28:10', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(142, 'GENERAL', 'test ok', NULL, NULL, 109, '2017-02-14 17:05:31', 0, 0, NULL, '2017-02-14 17:05:31', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(143, 'GENERAL', 'test ok', NULL, NULL, 109, '2017-02-14 17:07:37', 0, 0, NULL, '2017-02-14 17:07:37', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(144, 'GENERAL', 'ㅅㄷㄴㅅ11111', NULL, NULL, 109, '2017-02-14 17:35:33', 0, 0, NULL, '2017-02-14 17:35:33', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(145, 'GENERAL', 'test ok', NULL, NULL, 109, '2017-02-14 17:46:10', 0, 0, NULL, '2017-02-14 17:46:10', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(146, 'GENERAL', 'test ok', NULL, NULL, 109, '2017-02-14 17:47:48', 0, 0, NULL, '2017-02-14 17:47:48', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(147, 'GENERAL', 'test ok', NULL, NULL, 109, '2017-02-14 17:48:37', 0, 0, NULL, '2017-02-14 17:48:37', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(148, 'GENERAL', 'ㄴㄹㄴㄻㄴㄹㄴㅁㄹㄴㅇ', NULL, NULL, 109, '2017-02-14 17:50:49', 0, 0, NULL, '2017-02-14 17:50:49', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(149, 'GENERAL', 'ㅁㄴㄻㄴㄻㄴㄹ', NULL, NULL, 108, '2017-02-14 17:53:52', 0, 0, NULL, '2017-02-14 17:53:52', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(150, 'GENERAL', 'ㅇㄹㄴㅁㄻㄴㄹㄴㄹㄴㄹ', NULL, NULL, 108, '2017-02-14 17:55:17', 0, 0, NULL, '2017-02-14 17:55:17', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(151, 'GENERAL', 'test ok', NULL, NULL, 109, '2017-02-16 17:50:05', 0, 0, 161, '2017-02-16 17:50:06', 0, NULL, NULL, NULL, NULL, NULL, NULL, 6, NULL, 0, NULL, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(152, 'GENERAL', 'ㄴㅁㅇㄻㄴㅇㄻㄴㅇㄹ111', NULL, NULL, 108, '2017-02-14 18:02:17', 0, 0, NULL, '2017-02-14 18:02:17', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(153, 'GENERAL', 'ㅋㅋㅋㅋㅋ', NULL, NULL, 108, '2017-02-14 18:07:35', 0, 0, NULL, '2017-02-14 18:07:35', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(154, 'GENERAL', '1111233', NULL, NULL, 108, '2017-02-16 12:00:22', 0, 0, NULL, '2017-02-14 18:14:32', 0, '', NULL, '', NULL, NULL, 0, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(155, 'GENERAL', 'ㄴㅇㅁㄹㄴㅁㄹㄴㅇㅁㄹ', NULL, NULL, 107, '2017-02-16 16:10:57', 0, 0, 159, '2017-02-16 16:10:58', 0, '', NULL, '', NULL, NULL, NULL, 1, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(156, 'COMMENT', 'ㄴㅇㅁㄹㄴㅁㄴㅇㅁㄹㄴㅇㅁ', NULL, NULL, 109, '2017-02-16 17:50:05', 151, 0, NULL, '2017-02-16 16:05:30', 6, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(157, 'COMMENT', 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ', NULL, NULL, 109, '2017-02-16 17:50:05', 151, 0, NULL, '2017-02-16 16:06:14', 5, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(158, 'COMMENT', 'ㅋㅋㅋㅇ', NULL, NULL, 109, '2017-02-16 17:50:05', 151, 0, NULL, '2017-02-16 16:09:12', 4, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(159, 'COMMENT', '@[윤병선](109) ㅇㅁㄹㄴㅁㄹ', NULL, NULL, 107, '2017-02-16 16:10:58', 155, 0, NULL, '2017-02-16 16:10:57', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(160, 'COMMENT', '@[박승필](108) 오키', NULL, NULL, 109, '2017-02-16 17:50:05', 151, 0, NULL, '2017-02-16 16:13:04', 3, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(161, 'COMMENT', 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ', NULL, NULL, 107, '2017-02-16 17:50:05', 151, 0, NULL, '2017-02-16 16:19:06', 2, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(162, 'COMMENT', 'zzz', NULL, NULL, 109, '2017-02-16 17:50:06', 151, 107, NULL, '2017-02-16 17:50:05', 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(163, 'GENERAL', '11111', NULL, NULL, 109, '2017-03-24 12:36:47', 0, 0, NULL, '2017-03-24 12:36:47', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(164, 'GENERAL', '2222', NULL, NULL, 109, '2017-03-24 12:37:00', 0, 0, NULL, '2017-03-24 12:37:00', 0, '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `ung_feed` ENABLE KEYS */;

-- 테이블 usns.ung_feed_history 구조 내보내기
DROP TABLE IF EXISTS `ung_feed_history`;
CREATE TABLE IF NOT EXISTS `ung_feed_history` (
  `FEED_ID` bigint(20) NOT NULL,
  `SEQ` int(2) NOT NULL,
  `FEED_TITLE` varchar(4000) DEFAULT NULL,
  `MODIFY_DTTM` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `MODIFY_MEMBER_ID` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`FEED_ID`,`SEQ`),
  CONSTRAINT `ung_feed_history_ibfk_1` FOREIGN KEY (`FEED_ID`) REFERENCES `ung_feed` (`FEED_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_feed_history:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_feed_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `ung_feed_history` ENABLE KEYS */;

-- 테이블 usns.ung_follower 구조 내보내기
DROP TABLE IF EXISTS `ung_follower`;
CREATE TABLE IF NOT EXISTS `ung_follower` (
  `ITEM_ID` bigint(20) NOT NULL COMMENT '아이템(피드) ID',
  `FOLLOWER_ID` bigint(20) NOT NULL,
  `ITEM_TYPE` varchar(10) NOT NULL COMMENT '아이템 종류 (피드)',
  `FOLLOWER_TYPE` varchar(10) NOT NULL COMMENT '팔로워 종류(그룹, 멤버, 조직도 팀)',
  `REGDTTM` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `REG_MEMBER_ID` bigint(20) DEFAULT NULL,
  `ISREAD` int(1) DEFAULT NULL,
  PRIMARY KEY (`ITEM_ID`,`FOLLOWER_ID`,`ITEM_TYPE`,`FOLLOWER_TYPE`),
  UNIQUE KEY `UNG_FOLLOWER_IDX` (`ITEM_TYPE`,`FOLLOWER_TYPE`,`FOLLOWER_ID`,`ITEM_ID`),
  UNIQUE KEY `UNG_FOLLOWER_IDX01` (`FOLLOWER_ID`,`ITEM_TYPE`,`FOLLOWER_TYPE`,`ITEM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_follower:~195 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_follower` DISABLE KEYS */;
INSERT INTO `ung_follower` (`ITEM_ID`, `FOLLOWER_ID`, `ITEM_TYPE`, `FOLLOWER_TYPE`, `REGDTTM`, `REG_MEMBER_ID`, `ISREAD`) VALUES
	(5, 1, 'FEED', 'MEMBER', '2016-01-11 16:21:00', 1, NULL),
	(6, 1, 'FEED', 'MEMBER', '2016-01-11 16:49:08', 1, NULL),
	(7, 1, 'FEED', 'MEMBER', '2016-01-11 16:52:02', 1, NULL),
	(9, 1, 'FEED', 'MEMBER', '2016-01-11 17:10:49', 1, NULL),
	(10, 1, 'FEED', 'MEMBER', '2016-01-11 17:10:52', 1, NULL),
	(11, 1, 'FEED', 'MEMBER', '2016-01-11 17:10:52', 1, NULL),
	(12, 1, 'FEED', 'MEMBER', '2016-01-11 17:10:53', 1, NULL),
	(13, 1, 'FEED', 'MEMBER', '2016-01-11 17:10:53', 1, NULL),
	(14, 1, 'FEED', 'MEMBER', '2016-01-11 17:10:53', 1, NULL),
	(15, 1, 'FEED', 'MEMBER', '2016-01-11 17:22:03', 1, NULL),
	(16, 1, 'FEED', 'MEMBER', '2016-01-11 17:55:09', 2, NULL),
	(16, 2, 'FEED', 'MEMBER', '2016-01-11 17:55:09', 2, NULL),
	(17, 1, 'FEED', 'MEMBER', '2016-01-11 18:08:57', 3, NULL),
	(17, 2, 'FEED', 'MEMBER', '2016-01-11 18:08:57', 3, NULL),
	(17, 3, 'FEED', 'MEMBER', '2016-01-11 18:08:57', 3, NULL),
	(18, 2, 'FEED', 'MEMBER', '2016-01-11 18:11:22', 2, NULL),
	(18, 3, 'FEED', 'MEMBER', '2016-01-11 18:11:22', 2, NULL),
	(19, 2, 'FEED', 'MEMBER', '2016-01-11 18:16:10', 2, NULL),
	(20, 2, 'FEED', 'MEMBER', '2016-01-12 11:39:12', 2, NULL),
	(20, 3, 'FEED', 'GROUP', '2016-01-12 11:39:12', 2, NULL),
	(21, 2, 'FEED', 'MEMBER', '2016-01-12 11:39:50', 2, NULL),
	(22, 2, 'FEED', 'MEMBER', '2016-01-12 11:40:17', 2, NULL),
	(22, 3, 'FEED', 'GROUP', '2016-01-12 11:40:17', 2, NULL),
	(23, 2, 'FEED', 'MEMBER', '2016-01-12 12:07:06', 2, NULL),
	(24, 2, 'FEED', 'MEMBER', '2016-01-12 12:20:14', 2, NULL),
	(24, 3, 'FEED', 'GROUP', '2016-01-12 12:20:14', 2, NULL),
	(25, 1, 'FEED', 'GROUP', '2016-01-12 14:40:00', 2, NULL),
	(25, 2, 'FEED', 'MEMBER', '2016-01-12 14:40:00', 2, NULL),
	(26, 1, 'FEED', 'MEMBER', '2016-01-12 16:32:38', 1, NULL),
	(26, 3, 'FEED', 'MEMBER', '2016-01-12 16:32:38', 1, NULL),
	(28, 1, 'FEED', 'MEMBER', '2016-01-12 16:34:23', 1, NULL),
	(29, 2, 'FEED', 'MEMBER', '2016-01-12 16:35:25', 2, NULL),
	(30, 1, 'FEED', 'MEMBER', '2016-01-12 16:37:30', 1, NULL),
	(30, 2, 'FEED', 'MEMBER', '2016-01-12 16:59:36', 3, NULL),
	(30, 3, 'FEED', 'MEMBER', '2016-01-12 16:39:36', 1, NULL),
	(34, 1, 'FEED', 'MEMBER', '2016-01-12 16:40:41', 1, NULL),
	(37, 1, 'FEED', 'MEMBER', '2016-01-12 16:50:04', 2, NULL),
	(37, 2, 'FEED', 'MEMBER', '2016-01-12 16:50:04', 2, NULL),
	(39, 2, 'FEED', 'MEMBER', '2016-01-12 16:57:24', 3, NULL),
	(39, 3, 'FEED', 'MEMBER', '2016-01-12 16:57:24', 3, NULL),
	(41, 1, 'FEED', 'MEMBER', '2016-01-12 17:35:08', 1, NULL),
	(43, 2, 'FEED', 'MEMBER', '2016-01-12 17:43:43', 2, NULL),
	(43, 3, 'FEED', 'MEMBER', '2016-01-12 17:44:06', 2, NULL),
	(43, 4, 'FEED', 'MEMBER', '2016-01-12 17:43:43', 2, NULL),
	(45, 1, 'FEED', 'MEMBER', '2016-01-12 17:52:00', 2, NULL),
	(45, 2, 'FEED', 'MEMBER', '2016-01-12 17:52:00', 2, NULL),
	(45, 3, 'FEED', 'MEMBER', '2016-01-12 17:52:00', 2, NULL),
	(45, 4, 'FEED', 'MEMBER', '2016-01-12 17:52:00', 2, NULL),
	(45, 5, 'FEED', 'MEMBER', '2016-01-12 17:52:00', 2, NULL),
	(47, 1, 'FEED', 'MEMBER', '2016-01-14 13:06:54', 2, NULL),
	(47, 2, 'FEED', 'MEMBER', '2016-01-14 13:06:54', 2, NULL),
	(48, 2, 'FEED', 'MEMBER', '2016-01-14 13:08:26', 2, NULL),
	(48, 3, 'FEED', 'GROUP', '2016-01-14 13:08:26', 2, NULL),
	(49, 2, 'FEED', 'MEMBER', '2016-01-14 13:08:44', 2, NULL),
	(50, 2, 'FEED', 'MEMBER', '2016-01-14 13:12:09', 2, NULL),
	(50, 3, 'FEED', 'GROUP', '2016-01-14 13:12:09', 2, NULL),
	(51, 2, 'FEED', 'MEMBER', '2016-01-14 13:14:20', 4, NULL),
	(51, 4, 'FEED', 'MEMBER', '2016-01-14 13:14:20', 4, NULL),
	(53, 2, 'FEED', 'MEMBER', '2016-01-14 13:59:17', 2, NULL),
	(54, 2, 'FEED', 'MEMBER', '2016-01-14 16:30:59', 2, NULL),
	(55, 2, 'FEED', 'MEMBER', '2016-01-14 16:31:45', 2, NULL),
	(55, 3, 'FEED', 'GROUP', '2016-01-14 16:31:45', 2, NULL),
	(56, 2, 'FEED', 'MEMBER', '2016-01-14 16:40:33', 2, NULL),
	(56, 6, 'FEED', 'GROUP', '2016-01-14 16:40:33', 2, NULL),
	(56, 104, 'FEED', 'MEMBER', '2016-01-15 00:14:55', 104, NULL),
	(57, 7, 'FEED', 'GROUP', '2016-01-14 16:52:39', 117, NULL),
	(57, 117, 'FEED', 'MEMBER', '2016-01-14 16:52:39', 117, NULL),
	(58, 115, 'FEED', 'MEMBER', '2016-01-14 17:15:07', 115, NULL),
	(58, 116, 'FEED', 'MEMBER', '2016-01-14 17:15:07', 115, NULL),
	(60, 115, 'FEED', 'MEMBER', '2016-01-14 17:25:16', 115, NULL),
	(61, 2, 'FEED', 'MEMBER', '2016-01-15 09:38:35', 2, NULL),
	(61, 9, 'FEED', 'GROUP', '2016-01-14 17:31:29', 115, NULL),
	(61, 115, 'FEED', 'MEMBER', '2016-01-14 17:31:29', 115, NULL),
	(62, 5, 'FEED', 'MEMBER', '2016-01-14 17:33:11', 115, NULL),
	(62, 8, 'FEED', 'GROUP', '2016-01-14 17:33:11', 115, NULL),
	(62, 113, 'FEED', 'MEMBER', '2016-01-14 17:33:11', 115, NULL),
	(62, 115, 'FEED', 'MEMBER', '2016-01-14 17:33:11', 115, NULL),
	(62, 116, 'FEED', 'MEMBER', '2016-01-14 17:33:11', 115, NULL),
	(63, 8, 'FEED', 'GROUP', '2016-01-14 17:34:25', 115, NULL),
	(63, 115, 'FEED', 'MEMBER', '2016-01-14 17:34:25', 115, NULL),
	(64, 115, 'FEED', 'MEMBER', '2016-01-14 17:35:18', 115, NULL),
	(65, 2, 'FEED', 'MEMBER', '2016-01-14 17:59:21', 2, NULL),
	(65, 5, 'FEED', 'MEMBER', '2016-01-14 17:59:21', 2, NULL),
	(65, 7, 'FEED', 'MEMBER', '2016-01-14 17:59:21', 2, NULL),
	(65, 15, 'FEED', 'MEMBER', '2016-01-14 17:59:21', 2, NULL),
	(65, 104, 'FEED', 'MEMBER', '2016-01-14 17:59:21', 2, NULL),
	(66, 1, 'FEED', 'MEMBER', '2016-01-14 18:24:29', 1, NULL),
	(67, 1, 'FEED', 'MEMBER', '2016-01-14 18:37:43', 1, NULL),
	(67, 6, 'FEED', 'GROUP', '2016-01-14 18:37:43', 1, NULL),
	(75, 115, 'FEED', 'MEMBER', '2016-01-20 13:42:55', 115, NULL),
	(76, 2, 'FEED', 'MEMBER', '2016-01-20 17:15:31', 2, NULL),
	(76, 8, 'FEED', 'GROUP', '2016-01-20 17:15:31', 2, NULL),
	(77, 113, 'FEED', 'MEMBER', '2016-01-21 16:47:44', 116, NULL),
	(77, 115, 'FEED', 'MEMBER', '2016-01-20 17:25:03', 115, NULL),
	(77, 116, 'FEED', 'MEMBER', '2016-01-20 17:25:03', 115, NULL),
	(78, 2, 'FEED', 'MEMBER', '2016-01-27 15:44:24', 2, NULL),
	(78, 9, 'FEED', 'GROUP', '2016-01-20 17:53:07', 112, NULL),
	(78, 112, 'FEED', 'MEMBER', '2016-01-20 17:53:07', 112, NULL),
	(83, 15, 'FEED', 'MEMBER', '2016-01-22 09:01:10', 15, NULL),
	(84, 2, 'FEED', 'MEMBER', '2016-01-25 12:03:37', 2, NULL),
	(84, 9, 'FEED', 'GROUP', '2016-01-22 09:12:58', 15, NULL),
	(84, 15, 'FEED', 'MEMBER', '2016-01-22 09:12:58', 15, NULL),
	(85, 2, 'FEED', 'MEMBER', '2016-01-25 12:04:42', 2, NULL),
	(85, 9, 'FEED', 'GROUP', '2016-01-22 11:16:04', 59, NULL),
	(85, 59, 'FEED', 'MEMBER', '2016-01-22 11:16:04', 59, NULL),
	(86, 7, 'FEED', 'MEMBER', '2016-01-22 17:22:42', 7, NULL),
	(87, 7, 'FEED', 'MEMBER', '2016-01-24 11:42:34', 7, NULL),
	(90, 2, 'FEED', 'MEMBER', '2016-01-25 16:29:49', 2, NULL),
	(91, 7, 'FEED', 'GROUP', '2016-01-26 09:59:00', 62, NULL),
	(91, 11, 'FEED', 'MEMBER', '2016-01-26 10:06:01', 62, NULL),
	(91, 40, 'FEED', 'MEMBER', '2016-01-26 10:06:01', 62, NULL),
	(91, 49, 'FEED', 'MEMBER', '2016-01-26 10:06:01', 62, NULL),
	(91, 51, 'FEED', 'MEMBER', '2016-01-26 10:06:01', 62, NULL),
	(91, 62, 'FEED', 'MEMBER', '2016-01-26 09:59:00', 62, NULL),
	(91, 69, 'FEED', 'MEMBER', '2016-01-26 10:06:01', 62, NULL),
	(93, 113, 'FEED', 'MEMBER', '2016-01-26 14:25:54', 116, NULL),
	(93, 115, 'FEED', 'MEMBER', '2016-01-26 14:25:54', 116, NULL),
	(93, 116, 'FEED', 'MEMBER', '2016-01-26 14:25:54', 116, NULL),
	(96, 2, 'FEED', 'GROUP', '2016-01-29 17:16:48', 2, NULL),
	(96, 111, 'FEED', 'MEMBER', '2016-01-29 17:16:48', 2, NULL),
	(96, 115, 'FEED', 'MEMBER', '2016-01-29 17:16:48', 2, NULL),
	(100, 115, 'FEED', 'MEMBER', '2016-02-04 11:41:37', 115, NULL),
	(101, 2, 'FEED', 'MEMBER', '2016-02-11 10:17:00', 2, NULL),
	(102, 2, 'FEED', 'MEMBER', '2016-02-11 10:17:31', 2, NULL),
	(103, 2, 'FEED', 'MEMBER', '2016-02-11 10:18:50', 2, NULL),
	(103, 4, 'FEED', 'MEMBER', '2016-02-11 10:18:50', 2, NULL),
	(103, 5, 'FEED', 'MEMBER', '2016-02-11 10:18:50', 2, NULL),
	(103, 111, 'FEED', 'MEMBER', '2016-02-11 10:18:47', 2, NULL),
	(103, 115, 'FEED', 'MEMBER', '2016-02-11 10:18:48', 2, NULL),
	(104, 2, 'FEED', 'MEMBER', '2016-02-11 10:30:11', 2, NULL),
	(104, 4, 'FEED', 'MEMBER', '2016-02-11 10:30:11', 2, NULL),
	(104, 5, 'FEED', 'MEMBER', '2016-02-11 10:30:11', 2, NULL),
	(104, 111, 'FEED', 'MEMBER', '2016-02-11 10:30:11', 2, NULL),
	(105, 115, 'FEED', 'MEMBER', '2016-02-12 16:43:28', 115, NULL),
	(106, 4, 'FEED', 'MEMBER', '2016-02-15 18:50:04', 4, NULL),
	(106, 5, 'FEED', 'MEMBER', '2016-02-15 18:50:04', 4, NULL),
	(107, 2, 'FEED', 'MEMBER', '2016-02-15 18:52:22', 2, NULL),
	(107, 4, 'FEED', 'MEMBER', '2016-02-15 18:50:38', 4, NULL),
	(107, 6, 'FEED', 'GROUP', '2016-02-15 18:50:38', 4, NULL),
	(109, 2, 'FEED', 'MEMBER', '2016-02-16 10:48:35', 2, NULL),
	(109, 4, 'FEED', 'MEMBER', '2016-02-16 10:48:35', 2, NULL),
	(109, 5, 'FEED', 'MEMBER', '2016-02-16 10:48:35', 2, NULL),
	(109, 104, 'FEED', 'MEMBER', '2016-02-16 10:48:35', 2, NULL),
	(111, 2, 'FEED', 'MEMBER', '2016-02-16 14:50:27', 2, NULL),
	(111, 4, 'FEED', 'MEMBER', '2016-02-16 14:50:27', 2, NULL),
	(111, 6, 'FEED', 'GROUP', '2016-02-16 14:50:27', 2, NULL),
	(112, 2, 'FEED', 'MEMBER', '2016-02-16 18:00:35', 2, NULL),
	(112, 4, 'FEED', 'MEMBER', '2016-02-16 18:00:35', 2, NULL),
	(114, 4, 'FEED', 'MEMBER', '2016-02-18 10:48:07', 115, NULL),
	(114, 111, 'FEED', 'MEMBER', '2016-02-25 11:23:14', 115, NULL),
	(114, 115, 'FEED', 'MEMBER', '2016-02-18 10:48:07', 115, NULL),
	(114, 116, 'FEED', 'MEMBER', '2016-02-18 10:48:07', 115, NULL),
	(116, 10, 'FEED', 'GROUP', '2016-05-03 10:10:44', 109, NULL),
	(116, 109, 'FEED', 'MEMBER', '2016-05-03 10:10:45', 109, NULL),
	(116, 112, 'FEED', 'MEMBER', '2016-05-03 10:10:44', 109, NULL),
	(118, 109, 'FEED', 'MEMBER', '2016-05-04 15:07:23', 109, NULL),
	(118, 112, 'FEED', 'MEMBER', '2016-05-04 15:08:52', 109, NULL),
	(120, 12, 'FEED', 'GROUP', '2016-05-04 15:10:01', 109, NULL),
	(120, 109, 'FEED', 'MEMBER', '2016-05-04 15:10:01', 109, NULL),
	(120, 112, 'FEED', 'MEMBER', '2016-05-04 15:10:25', 109, NULL),
	(122, 109, 'FEED', 'MEMBER', '2016-05-04 15:11:57', 112, NULL),
	(122, 112, 'FEED', 'MEMBER', '2016-05-04 15:11:57', 112, NULL),
	(123, 2, 'FEED', 'MEMBER', '2016-05-04 15:16:16', 109, NULL),
	(123, 109, 'FEED', 'MEMBER', '2016-05-04 15:16:16', 109, NULL),
	(123, 112, 'FEED', 'MEMBER', '2016-05-04 15:16:16', 109, NULL),
	(124, 109, 'FEED', 'MEMBER', '2016-05-04 15:17:32', 109, NULL),
	(127, 109, 'FEED', 'MEMBER', '2016-05-04 15:21:43', 112, NULL),
	(127, 112, 'FEED', 'MEMBER', '2016-05-04 15:21:00', 109, NULL),
	(132, 109, 'FEED', 'MEMBER', '2016-05-04 15:22:38', 109, NULL),
	(133, 12, 'FEED', 'GROUP', '2016-05-04 15:23:23', 109, NULL),
	(133, 112, 'FEED', 'MEMBER', '2016-05-04 15:23:23', 109, NULL),
	(134, 109, 'FEED', 'MEMBER', '2016-05-04 15:26:56', 109, NULL),
	(136, 115, 'FEED', 'MEMBER', '2016-11-10 17:29:49', 115, NULL),
	(137, 115, 'FEED', 'MEMBER', '2016-11-10 17:29:53', 115, NULL),
	(138, 109, 'FEED', 'MEMBER', '2017-02-14 15:19:47', 109, NULL),
	(140, 109, 'FEED', 'MEMBER', '2017-02-14 15:23:16', 109, NULL),
	(141, 109, 'FEED', 'MEMBER', '2017-02-14 15:28:10', 109, NULL),
	(142, 107, 'FEED', 'MEMBER', '2017-02-14 17:05:33', 109, NULL),
	(142, 108, 'FEED', 'MEMBER', '2017-02-14 17:05:34', 109, NULL),
	(143, 107, 'FEED', 'MEMBER', '2017-02-14 17:07:37', 109, NULL),
	(143, 108, 'FEED', 'MEMBER', '2017-02-14 17:07:37', 109, NULL),
	(143, 109, 'FEED', 'MEMBER', '2017-02-14 17:07:37', 109, NULL),
	(144, 109, 'FEED', 'MEMBER', '2017-02-14 17:35:39', 109, NULL),
	(145, 107, 'FEED', 'MEMBER', '2017-02-14 17:46:12', 109, NULL),
	(145, 108, 'FEED', 'MEMBER', '2017-02-14 17:46:12', 109, NULL),
	(145, 109, 'FEED', 'MEMBER', '2017-02-14 17:46:12', 109, NULL),
	(146, 107, 'FEED', 'MEMBER', '2017-02-14 17:47:52', 109, NULL),
	(146, 108, 'FEED', 'MEMBER', '2017-02-14 17:47:52', 109, NULL),
	(146, 109, 'FEED', 'MEMBER', '2017-02-14 17:47:52', 109, NULL),
	(147, 107, 'FEED', 'MEMBER', '2017-02-14 17:48:37', 109, NULL),
	(147, 108, 'FEED', 'MEMBER', '2017-02-14 17:48:37', 109, NULL),
	(147, 109, 'FEED', 'MEMBER', '2017-02-14 17:48:37', 109, NULL),
	(148, 109, 'FEED', 'MEMBER', '2017-02-14 17:50:54', 109, NULL),
	(149, 108, 'FEED', 'MEMBER', '2017-02-14 17:53:52', 108, NULL),
	(150, 108, 'FEED', 'MEMBER', '2017-02-14 17:55:17', 108, NULL),
	(151, 107, 'FEED', 'MEMBER', '2017-02-14 17:58:30', 109, NULL),
	(151, 108, 'FEED', 'MEMBER', '2017-02-14 17:58:30', 109, NULL),
	(151, 109, 'FEED', 'MEMBER', '2017-02-14 17:58:30', 109, NULL),
	(152, 108, 'FEED', 'MEMBER', '2017-02-14 18:02:17', 108, NULL),
	(153, 108, 'FEED', 'MEMBER', '2017-02-14 18:07:36', 108, NULL),
	(154, 108, 'FEED', 'MEMBER', '2017-02-14 18:14:32', 108, NULL),
	(155, 107, 'FEED', 'MEMBER', '2017-02-16 13:33:42', 107, NULL),
	(155, 109, 'FEED', 'MEMBER', '2017-02-16 16:10:58', 107, NULL),
	(163, 109, 'FEED', 'MEMBER', '2017-03-24 12:36:47', 109, NULL),
	(164, 60, 'FEED', 'MEMBER', '2017-03-24 12:37:00', 109, NULL),
	(164, 109, 'FEED', 'MEMBER', '2017-03-24 12:37:00', 109, NULL);
/*!40000 ALTER TABLE `ung_follower` ENABLE KEYS */;

-- 테이블 usns.ung_group 구조 내보내기
DROP TABLE IF EXISTS `ung_group`;
CREATE TABLE IF NOT EXISTS `ung_group` (
  `GROUP_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `GROUP_NAME` varchar(150) DEFAULT NULL,
  `GROUP_IMG_URL` varchar(255) DEFAULT NULL,
  `P_GROUP_ID` bigint(20) DEFAULT NULL,
  `DESCRIPTION` varchar(4000) DEFAULT NULL,
  `GROUP_TYPE` varchar(20) NOT NULL COMMENT '내부(0), FEDERATION 그룹(FEDERATION), 조직도(ORGANIZATION),  쉐어포인트연동(SHAREDPOINT), 전문가연동(EXPERT), HR연동(EMPLOYEE)',
  `ISPUBLIC` int(1) DEFAULT NULL COMMENT '비공개, 공개',
  `ISAUTOJOIN` int(1) DEFAULT NULL,
  `FILE_REPO_ID` varchar(100) DEFAULT NULL COMMENT '쉐어포인트 연동 폴더 아이디',
  `ISDELETED` int(1) DEFAULT NULL,
  `TARGET_ID` varchar(255) DEFAULT NULL COMMENT '쉐어포인트인 경우 사이트 아이디',
  `TARGET_TYPE` varchar(20) DEFAULT NULL COMMENT '조직도(DEPT), 쉐어포인트(SHAREPOINT)',
  `TENANT_ID` bigint(20) NOT NULL,
  `TENANT_GROUP_ID` bigint(20) DEFAULT NULL,
  `REGDTTM` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `REG_MEMBER_ID` bigint(20) DEFAULT NULL,
  `ISHIDE` int(1) DEFAULT '0',
  `MODIFY_DTTM` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`GROUP_ID`),
  KEY `TENANT_ID` (`TENANT_ID`),
  KEY `UNG_GROUP_IDX` (`GROUP_TYPE`,`TARGET_ID`,`GROUP_ID`),
  KEY `UNG_GROUP_IDX01` (`TARGET_ID`,`GROUP_TYPE`,`GROUP_ID`),
  KEY `UNG_GROUP_IDX02` (`GROUP_TYPE`,`ISPUBLIC`,`ISHIDE`,`ISDELETED`,`GROUP_ID`),
  CONSTRAINT `ung_group_ibfk_1` FOREIGN KEY (`TENANT_ID`) REFERENCES `ung_tenant` (`TENANT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_group:~13 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_group` DISABLE KEYS */;
INSERT INTO `ung_group` (`GROUP_ID`, `GROUP_NAME`, `GROUP_IMG_URL`, `P_GROUP_ID`, `DESCRIPTION`, `GROUP_TYPE`, `ISPUBLIC`, `ISAUTOJOIN`, `FILE_REPO_ID`, `ISDELETED`, `TARGET_ID`, `TARGET_TYPE`, `TENANT_ID`, `TENANT_GROUP_ID`, `REGDTTM`, `REG_MEMBER_ID`, `ISHIDE`, `MODIFY_DTTM`) VALUES
	(1, 'test', '2016\\1\\12\\450ba969-43b3-4148-a1d1-b5b0a50d1156.jpg', 0, 'test', '0', 0, 0, '', 0, '', '', 1, NULL, '2016-01-12 14:39:13', 1, 0, '2016-01-12 14:39:13'),
	(2, '테스트 그룹', '2016\\1\\11\\40cc3101-3abf-4af4-a7c6-c5775a3ba071.jpg', 0, '', '0', 1, 0, NULL, 0, NULL, NULL, 1, NULL, '2016-01-11 18:27:51', 2, 0, '0000-00-00 00:00:00'),
	(3, '공개방', '2016\\1\\11\\c4242522-bea9-476c-b52c-95de6742ab90.jpg', 0, '', '0', 1, 0, NULL, 0, NULL, NULL, 1, NULL, '2016-01-11 18:31:09', 2, 0, '0000-00-00 00:00:00'),
	(4, '테스트 유엔진', '2016\\1\\12\\31bd9a72-5fcf-4b28-82a5-26312e72d152.png', 0, '테스트 중', '0', 1, 1, '', 0, '', '', 1, NULL, '2016-01-29 17:23:07', 1, 0, '2016-01-29 17:23:07'),
	(5, '테스트 그룹', '2016\\1\\14\\ab0c9632-1c27-438f-9f62-2f54c846e4b8.jpg', 0, '', '0', 1, 0, NULL, 0, NULL, NULL, 1, NULL, '2016-01-14 13:09:36', 2, 0, '0000-00-00 00:00:00'),
	(6, '유엔진솔루션즈', '', 0, '회사', 'ORGANIZATION', 1, 0, NULL, 0, '1000', 'DEPT', 1, NULL, '2016-01-14 16:56:40', 2, 1, '0000-00-00 00:00:00'),
	(7, '엔키소프트', '', 0, '회사', 'ORGANIZATION', 1, 0, NULL, 0, '2000', 'DEPT', 2, NULL, '2016-01-14 16:56:44', 2, 1, '0000-00-00 00:00:00'),
	(8, '에센스 샘플 메소드 구현', '', 0, '에센스 샘플 메소드 구현을 위한 단기 그룹', '0', 1, 0, NULL, 0, NULL, NULL, 1, NULL, '2016-01-14 17:28:26', 115, 0, '0000-00-00 00:00:00'),
	(9, '오류 등록', '', 0, 'SNS 사용 후 발생하는 오류 등록', '0', 1, 0, NULL, 0, NULL, NULL, 1, NULL, '2016-01-14 17:29:49', 115, 0, '0000-00-00 00:00:00'),
	(10, 'test1114', '2016\\1\\27\\26125022-b944-4990-9a11-01846bf86ab8.jpeg', 0, '1111', '0', 0, 0, NULL, 0, NULL, NULL, 1, NULL, '2016-01-27 16:06:05', 109, 0, '0000-00-00 00:00:00'),
	(11, '3333', '2016\\1\\27\\26125022-b944-4990-9a11-01846bf86ab8.jpeg', 0, '33333333', '0', 0, 0, NULL, 0, NULL, NULL, 1, NULL, '2016-01-27 16:06:12', 109, 0, '0000-00-00 00:00:00'),
	(12, '4444444', '2016\\1\\27\\26125022-b944-4990-9a11-01846bf86ab8.jpeg', 0, '44444444', '0', 0, 0, NULL, 0, NULL, NULL, 1, NULL, '2016-01-27 16:06:16', 109, 0, '0000-00-00 00:00:00'),
	(13, '5555555', '2016\\1\\27\\26125022-b944-4990-9a11-01846bf86ab8.jpeg', 0, '5555555', '0', 0, 0, NULL, 0, NULL, NULL, 1, NULL, '2016-01-27 16:06:20', 109, 0, '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `ung_group` ENABLE KEYS */;

-- 테이블 usns.ung_grpfwl 구조 내보내기
DROP TABLE IF EXISTS `ung_grpfwl`;
CREATE TABLE IF NOT EXISTS `ung_grpfwl` (
  `GROUP_ID` bigint(20) NOT NULL,
  `NEW_FEEDCNT` int(11) DEFAULT NULL,
  `ISGROUPMNG` int(1) DEFAULT NULL,
  `ISINVITE` int(1) DEFAULT NULL COMMENT '팔로잉, 초대 구분',
  `INVITOR_ID` bigint(20) DEFAULT NULL,
  `JOIN_STATUS` varchar(20) DEFAULT NULL COMMENT '신청(NULL), 완료(COMPLETE), 거절(REJECT)',
  `MEMBER_ID` bigint(20) NOT NULL,
  `REGDTTM` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LST_ACCESS_DTTM` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  KEY `UNG_GRPFWL_IDX` (`GROUP_ID`,`MEMBER_ID`),
  KEY `UNG_GRPFWL_IDX1` (`MEMBER_ID`,`GROUP_ID`,`JOIN_STATUS`),
  KEY `UNG_GRPFWL_IDX2` (`GROUP_ID`,`JOIN_STATUS`,`MEMBER_ID`),
  CONSTRAINT `ung_grpfwl_ibfk_1` FOREIGN KEY (`GROUP_ID`) REFERENCES `ung_group` (`GROUP_ID`),
  CONSTRAINT `ung_grpfwl_ibfk_2` FOREIGN KEY (`MEMBER_ID`) REFERENCES `ung_member` (`MEMBER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_grpfwl:~30 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_grpfwl` DISABLE KEYS */;
INSERT INTO `ung_grpfwl` (`GROUP_ID`, `NEW_FEEDCNT`, `ISGROUPMNG`, `ISINVITE`, `INVITOR_ID`, `JOIN_STATUS`, `MEMBER_ID`, `REGDTTM`, `LST_ACCESS_DTTM`) VALUES
	(3, 0, 0, NULL, 0, 'COMPLETE', 3, '2016-01-11 18:36:28', '2016-01-19 14:04:32'),
	(3, 0, 1, NULL, 0, 'COMPLETE', 2, '2016-01-11 18:36:28', '2016-02-15 15:43:37'),
	(3, 0, 0, 0, 0, 'COMPLETE', 1, '2016-01-12 14:38:02', '2016-01-14 16:14:58'),
	(1, 0, 1, 0, 0, 'COMPLETE', 3, '2016-01-12 14:38:24', '2016-01-19 13:55:35'),
	(2, 0, 1, 0, 0, 'COMPLETE', 3, '2016-01-12 14:43:57', '2016-01-19 14:04:23'),
	(1, 0, 1, 0, 0, 'COMPLETE', 2, '2016-01-12 14:44:38', '2016-02-15 15:43:49'),
	(2, 0, 0, NULL, 0, 'COMPLETE', 2, '2016-01-12 14:45:31', '2016-02-16 10:48:07'),
	(4, 0, 1, NULL, 0, 'COMPLETE', 1, '2016-01-12 16:41:36', '2016-01-14 16:14:57'),
	(3, 0, 0, NULL, 0, 'COMPLETE', 6, '2016-01-13 16:08:57', '2016-01-13 16:08:57'),
	(5, 0, 0, NULL, 0, 'COMPLETE', 1, '2016-01-14 13:14:47', '2016-01-14 16:15:00'),
	(5, 0, 1, NULL, 0, 'COMPLETE', 2, '2016-01-14 13:14:47', '2016-02-16 10:48:12'),
	(5, 0, 0, 0, 0, 'COMPLETE', 3, '2016-01-14 13:15:26', '2016-01-19 13:59:31'),
	(4, 0, 0, NULL, 0, 'COMPLETE', 2, '2016-01-14 13:18:05', '2016-02-16 10:48:09'),
	(3, 0, 1, 0, 0, 'COMPLETE', 115, '2016-01-14 16:37:25', '2016-02-12 17:17:59'),
	(6, 0, 0, NULL, 0, 'REJECT', 2, '2016-01-14 16:59:13', '2016-01-14 16:59:13'),
	(4, 0, 0, NULL, 0, 'COMPLETE', 115, '2016-01-14 17:23:55', '2016-02-19 12:32:18'),
	(3, 0, 0, 0, 0, 'COMPLETE', 116, '2016-01-14 17:31:58', '2016-01-14 17:31:58'),
	(8, 0, 1, NULL, 0, 'COMPLETE', 115, '2016-01-14 17:33:37', '2016-02-19 12:32:11'),
	(8, 0, 0, 0, 0, 'COMPLETE', 113, '2016-01-14 17:34:08', '2016-01-21 16:51:38'),
	(8, 0, 0, 0, 0, 'COMPLETE', 116, '2016-01-14 17:34:15', '2016-01-14 17:34:15'),
	(8, 0, 0, 0, 0, 'COMPLETE', 5, '2016-01-14 17:34:21', '2016-01-14 17:34:21'),
	(9, 0, 1, NULL, 0, 'COMPLETE', 115, '2016-01-14 17:35:00', '2016-02-12 17:18:00'),
	(9, 0, 0, 0, 0, 'COMPLETE', 2, '2016-01-14 17:37:26', '2016-02-16 10:49:42'),
	(9, 0, 0, NULL, 0, NULL, 15, '2016-01-22 09:16:07', '2016-01-22 09:16:07'),
	(10, 0, 1, NULL, 0, 'COMPLETE', 109, '2016-01-27 16:11:20', '2017-02-14 15:26:05'),
	(11, 0, 1, NULL, 0, 'COMPLETE', 109, '2016-01-27 16:11:27', '2016-11-25 14:08:21'),
	(12, 0, 1, NULL, 0, 'COMPLETE', 109, '2016-01-27 16:11:31', '2016-05-04 15:24:15'),
	(13, 0, 1, NULL, 0, 'COMPLETE', 109, '2016-01-27 16:11:35', '2016-05-04 14:44:27'),
	(4, 0, 0, NULL, 0, 'COMPLETE', 111, '2016-01-29 17:22:37', '2016-01-29 17:22:37'),
	(10, 0, 0, 0, 0, 'COMPLETE', 112, '2016-05-03 10:08:42', '2016-05-03 10:08:42');
/*!40000 ALTER TABLE `ung_grpfwl` ENABLE KEYS */;

-- 테이블 usns.ung_knwldg 구조 내보내기
DROP TABLE IF EXISTS `ung_knwldg`;
CREATE TABLE IF NOT EXISTS `ung_knwldg` (
  `FEED_ID` bigint(20) DEFAULT NULL,
  `GROUP_ID` bigint(20) NOT NULL,
  `ISAPPROVAL` int(1) DEFAULT NULL,
  `REG_MEMBER_ID` bigint(20) DEFAULT NULL,
  `REGDTTM` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `UNG_KNWLDG_IDX` (`GROUP_ID`,`FEED_ID`),
  CONSTRAINT `ung_knwldg_ibfk_1` FOREIGN KEY (`GROUP_ID`) REFERENCES `ung_group` (`GROUP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_knwldg:~4 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_knwldg` DISABLE KEYS */;
INSERT INTO `ung_knwldg` (`FEED_ID`, `GROUP_ID`, `ISAPPROVAL`, `REG_MEMBER_ID`, `REGDTTM`) VALUES
	(48, 3, 1, 2, '2016-01-14 13:16:44'),
	(50, 3, 1, 115, '2016-01-14 17:28:17'),
	(24, 3, 1, 115, '2016-01-14 17:28:31'),
	(78, 9, 1, 2, '2016-02-15 17:22:17');
/*!40000 ALTER TABLE `ung_knwldg` ENABLE KEYS */;

-- 테이블 usns.ung_likeit 구조 내보내기
DROP TABLE IF EXISTS `ung_likeit`;
CREATE TABLE IF NOT EXISTS `ung_likeit` (
  `REG_MEMBER_ID` bigint(20) DEFAULT NULL,
  `REGDTTM` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `FEED_ID` bigint(20) NOT NULL,
  KEY `UNG_LIKEIT_IDX` (`FEED_ID`,`REG_MEMBER_ID`),
  CONSTRAINT `ung_likeit_ibfk_1` FOREIGN KEY (`FEED_ID`) REFERENCES `ung_feed` (`FEED_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_likeit:~5 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_likeit` DISABLE KEYS */;
INSERT INTO `ung_likeit` (`REG_MEMBER_ID`, `REGDTTM`, `FEED_ID`) VALUES
	(1, '2016-01-12 16:33:42', 26),
	(1, '2016-01-12 17:35:26', 17),
	(62, '2016-01-26 10:02:44', 91),
	(62, '2016-01-26 10:06:22', 92),
	(109, '2016-01-27 16:13:28', 78);
/*!40000 ALTER TABLE `ung_likeit` ENABLE KEYS */;

-- 테이블 usns.ung_member 구조 내보내기
DROP TABLE IF EXISTS `ung_member`;
CREATE TABLE IF NOT EXISTS `ung_member` (
  `MEMBER_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `MEMBER_NAME` varchar(150) NOT NULL,
  `MEMBER_NAME_EN` varchar(150) DEFAULT NULL,
  `MEMBER_THUMB_URL` varchar(200) DEFAULT NULL,
  `MEMBER_PIC_URL` varchar(200) DEFAULT NULL,
  `AUTH_HOST` varchar(10) NOT NULL COMMENT 'LOCAL, EXTERNAL, FEDERATION 등',
  `TENANT_ID` bigint(20) NOT NULL,
  `ISSYSADMIN` int(1) DEFAULT NULL,
  `INVITE_AUTH_KEY` varchar(255) DEFAULT NULL,
  `ISENTER` int(1) DEFAULT NULL,
  `LANG_SET` varchar(20) DEFAULT NULL COMMENT '한국어(ko), 영어(en), 중국어(zh)',
  `TIMEZONE` varchar(50) DEFAULT NULL,
  `ISDELETED` int(1) DEFAULT '0',
  `SYNC_KEY` varchar(30) DEFAULT NULL,
  `LST_SYNC_DTTM` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ISHIDE` int(1) DEFAULT NULL,
  `ISPUBLIC` int(1) DEFAULT NULL,
  `REGDTTM` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`MEMBER_ID`),
  UNIQUE KEY `SYNC_KEY` (`SYNC_KEY`),
  KEY `UNG_MEMBER_IDX` (`SYNC_KEY`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_member:~94 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_member` DISABLE KEYS */;
INSERT INTO `ung_member` (`MEMBER_ID`, `MEMBER_NAME`, `MEMBER_NAME_EN`, `MEMBER_THUMB_URL`, `MEMBER_PIC_URL`, `AUTH_HOST`, `TENANT_ID`, `ISSYSADMIN`, `INVITE_AUTH_KEY`, `ISENTER`, `LANG_SET`, `TIMEZONE`, `ISDELETED`, `SYNC_KEY`, `LST_SYNC_DTTM`, `ISHIDE`, `ISPUBLIC`, `REGDTTM`) VALUES
	(1, '테스터', 'tester', NULL, NULL, 'LOCAL', 1, 0, NULL, NULL, NULL, NULL, 0, '001', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(2, '김용훈', 'YongHoon', NULL, NULL, 'LOCAL', 1, 1, NULL, 0, NULL, NULL, 0, '002', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(3, '홍재원', 'HONG', NULL, NULL, 'LOCAL', 1, 0, NULL, NULL, NULL, NULL, 0, '003', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(4, '김성종', 'S.J.KIM', NULL, NULL, 'LOCAL', 1, 0, NULL, NULL, NULL, NULL, 0, '004', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(5, '금득규', 'dkkum', NULL, NULL, 'LOCAL', 1, 0, NULL, NULL, NULL, NULL, 0, '005', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(6, '허재형', 'maythe4ceb', NULL, NULL, 'LOCAL', 1, 0, NULL, NULL, NULL, NULL, 0, '006', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(7, '정경현', '정경현', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI001', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(8, '이재열', '이재열', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI002', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(9, '김경수', '김경수', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI003', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(10, '박용주', '박용주', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI004', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(11, '최용훈', '최용훈', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI005', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(12, '이경철', '이경철', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI006', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(13, '최동욱', '최동욱', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI007', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(14, '조남철', '조남철', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI008', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(15, '이성한', '이성한', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI009', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(16, '지대원', '지대원', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI010', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(17, '윤효석', '윤효석', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI011', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(18, '성노범', '성노범', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI012', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(19, '최운경', '최운경', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI013', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(20, '조남현', '조남현', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI014', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(21, '노찬호', '노찬호', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI015', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(22, '유지관', '유지관', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI016', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(23, '한명순', '한명순', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI017', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(24, '권성기', '권성기', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI018', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(25, '박재수', '박재수', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI019', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(26, '김연천', '김연천', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI020', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(27, '이수형', '이수형', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI021', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(28, '배서진', '배서진', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI022', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(29, '이인상', '이인상', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI023', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(30, '양성필', '양성필', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI024', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(31, '민종진', '민종진', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI025', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(32, '임경호', '임경호', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI026', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(33, '김정일', '김정일', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI027', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(34, '김태현', '김태현', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI028', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(35, '우승균', '우승균', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI029', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(36, '강서구', '강서구', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI030', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(37, '김준우', '김준우', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI031', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(38, '정종우', '정종우', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI032', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(39, '김상균', '김상균', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI033', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(40, '김현준', '김현준', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI034', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(41, '이한찬', '이한찬', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI035', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(42, '문희식', '문희식', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI036', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(43, '박정민', '박정민', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI037', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(44, '김종철', '김종철', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI038', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(45, '최철영', '최철영', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI039', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(46, '최민성', '최민성', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI040', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(47, '이세진', '이세진', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI041', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(48, '이수진', '이수진', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI042', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(49, '변의영', '변의영', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI043', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(50, '노재원', '노재원', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI044', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(51, '강연주', '강연주', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI045', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(52, '홍윤미', '홍윤미', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI046', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(53, '이용찬', '이용찬', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI047', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(54, '이미옥', '이미옥', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI048', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(55, '좌은진', '좌은진', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI049', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(56, '정명재', '정명재', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI050', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(57, '양교훈', '양교훈', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI051', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(58, '백경환', '백경환', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI052', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(59, '김병욱', '김병욱', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI053', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(60, '양태욱', '양태욱', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI054', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(61, '김은정', '김은정', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI055', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(62, '이주현', '이주현', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI056', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(63, '이은규', '이은규', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI057', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(64, '이재현', '이재현', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI058', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(65, '손창우', '손창우', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI059', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(66, '최준영', '최준영', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI060', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(67, '박다영', '박다영', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI061', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(68, '이수지', '이수지', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI062', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(69, '이원지', '이원지', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI063', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(70, '조남규', '조남규', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI064', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(71, '한아라', '한아라', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI065', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(72, '신기식', '신기식', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI066', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(73, '왕정민', '왕정민', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI067', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(74, '신호석', '신호석', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI068', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(75, '김명준', '김명준', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI069', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(76, '이종창', '이종창', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI070', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(77, '조창현', '조창현', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI071', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(78, '이성준', '이성준', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI072', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(79, '이준범', '이준범', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI073', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(80, '조영민', '조영민', NULL, NULL, 'LOCAL', 2, 0, NULL, NULL, NULL, NULL, 0, 'ENKI074', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(81, 'kofia', 'kofia', NULL, NULL, 'LOCAL', 2, 1, NULL, NULL, NULL, NULL, 0, 'kofia', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(104, '장진영', '장진영', NULL, NULL, 'LOCAL', 1, 0, NULL, NULL, NULL, NULL, 0, '007', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(105, '김강필', '김강필', NULL, NULL, 'LOCAL', 1, 0, NULL, NULL, NULL, NULL, 0, '008', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(106, '복명균', '복명균', NULL, NULL, 'LOCAL', 1, 0, NULL, NULL, NULL, NULL, 0, '009', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(107, '가영근', '가영근', NULL, NULL, 'LOCAL', 1, 0, NULL, NULL, NULL, NULL, 0, '010', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(108, '박승필', '박승필', NULL, NULL, 'LOCAL', 1, 0, NULL, NULL, NULL, NULL, 0, '011', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(109, '윤병선', '윤병선', NULL, NULL, 'LOCAL', 1, 0, NULL, NULL, NULL, NULL, 0, '012', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(110, '안병성', '안병성', NULL, NULL, 'LOCAL', 1, 0, NULL, NULL, NULL, NULL, 0, '013', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(111, '신비인', '신비인', NULL, NULL, 'LOCAL', 1, 0, NULL, NULL, NULL, NULL, 0, '014', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(112, '한원석', '한원석', NULL, NULL, 'LOCAL', 1, 0, NULL, NULL, NULL, NULL, 0, '015', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(113, '최형윤', '최형윤', NULL, NULL, 'LOCAL', 1, 0, NULL, NULL, NULL, NULL, 0, '016', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(114, '박종훈', '박종훈', NULL, NULL, 'LOCAL', 1, 0, NULL, NULL, NULL, NULL, 0, '017', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(115, '김영재', '김영재', NULL, NULL, 'LOCAL', 1, 0, NULL, NULL, NULL, NULL, 0, '018', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(116, '김상훈', '김상훈', NULL, NULL, 'LOCAL', 1, 0, NULL, NULL, NULL, NULL, 0, '019', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25'),
	(117, '관리자 계정', 'ADMIN', NULL, NULL, 'LOCAL', 2, 1, NULL, NULL, NULL, NULL, 0, 'ENKI000', '2016-01-15 12:31:25', NULL, NULL, '2016-01-15 12:31:25');
/*!40000 ALTER TABLE `ung_member` ENABLE KEYS */;

-- 테이블 usns.ung_mobileinfo 구조 내보내기
DROP TABLE IF EXISTS `ung_mobileinfo`;
CREATE TABLE IF NOT EXISTS `ung_mobileinfo` (
  `JID` varchar(255) NOT NULL,
  `DEVICE_ID` varchar(255) NOT NULL,
  `MEMBER_ID` bigint(20) NOT NULL,
  `PNS_TOKEN` varchar(255) DEFAULT NULL,
  `PLATFORM_CODE` varchar(255) DEFAULT NULL,
  `PLATFORM_VER` varchar(10) DEFAULT NULL,
  `DEVICE_TYPE` varchar(10) DEFAULT NULL,
  `DEVICE_MODEL` varchar(100) DEFAULT NULL,
  `LANG_SET` varchar(20) DEFAULT NULL COMMENT '한국어(ko), 영어(en), 중국어(zh)',
  PRIMARY KEY (`JID`,`DEVICE_ID`),
  KEY `MEMBER_ID` (`MEMBER_ID`),
  CONSTRAINT `ung_mobileinfo_ibfk_1` FOREIGN KEY (`MEMBER_ID`) REFERENCES `ung_member` (`MEMBER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_mobileinfo:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_mobileinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `ung_mobileinfo` ENABLE KEYS */;

-- 테이블 usns.ung_noti 구조 내보내기
DROP TABLE IF EXISTS `ung_noti`;
CREATE TABLE IF NOT EXISTS `ung_noti` (
  `NOTI_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ITEM_TYPE` varchar(10) NOT NULL COMMENT '아이템 종류 (피드)',
  `ITEM_ID` bigint(20) NOT NULL COMMENT '아이템(피드) ID',
  `ITEM_TITLE` varchar(4000) DEFAULT NULL COMMENT '피드 제목, 그룹 명',
  `NOTI_CONTENT` varchar(4000) DEFAULT NULL,
  `NOTI_CONTENT_KO` varchar(1000) DEFAULT NULL,
  `NOTI_CONTENT_EN` varchar(1000) DEFAULT NULL,
  `NOTI_CONTENT_ZH` varchar(1000) DEFAULT NULL,
  `ACT_TYPE` varchar(50) DEFAULT NULL COMMENT 'CRUD, 태그, 좋아요, 댓글, 태그 등',
  `REGDTTM` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ISREAD` int(1) DEFAULT NULL,
  `TO_MEMBER_ID` bigint(20) DEFAULT NULL,
  `FROM_MEMBER_ID` bigint(20) DEFAULT NULL,
  `FOLLOWER_TYPE` varchar(10) DEFAULT NULL COMMENT '팔로워 종류(그룹, 멤버, 조직도 팀)',
  `FOLLOWER_ID` bigint(20) DEFAULT NULL,
  `ISDELETED` int(1) DEFAULT '0',
  PRIMARY KEY (`NOTI_ID`),
  KEY `UNG_NOTI_IDX` (`TO_MEMBER_ID`,`NOTI_ID`),
  KEY `UNG_NOTI_IDX1` (`REGDTTM`,`ISREAD`,`TO_MEMBER_ID`),
  KEY `UNG_NOTI_IDX2` (`NOTI_ID`,`FOLLOWER_TYPE`,`FOLLOWER_ID`,`ISDELETED`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_noti:~38 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_noti` DISABLE KEYS */;
INSERT INTO `ung_noti` (`NOTI_ID`, `ITEM_TYPE`, `ITEM_ID`, `ITEM_TITLE`, `NOTI_CONTENT`, `NOTI_CONTENT_KO`, `NOTI_CONTENT_EN`, `NOTI_CONTENT_ZH`, `ACT_TYPE`, `REGDTTM`, `ISREAD`, `TO_MEMBER_ID`, `FROM_MEMBER_ID`, `FOLLOWER_TYPE`, `FOLLOWER_ID`, `ISDELETED`) VALUES
	(1, 'FEED', 138, NULL, '윤병선 대리 님이 [ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ] 할 일을 20170213 일자로 등록하였습니다.', '윤병선 대리 님이 [ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ] 할 일을 20170213 일자로 등록하였습니다.', '윤병선 대리 님이 [ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ] 할 일을 20170213 일자로 등록하였습니다.', '윤병선 대리 님이 [ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ] 할 일을 20170213 일자로 등록하였습니다.', 'TODO_REG', '2017-02-14 15:19:47', 1, 109, 109, '', 0, 0),
	(2, 'FEED', 138, NULL, '윤병선 대리 님이 ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ 할 일을 마감하였습니다.', '윤병선 대리 님이 ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ 할 일을 마감하였습니다.', '윤병선 대리 님이 ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ 할 일을 마감하였습니다.', '윤병선 대리 님이 ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ 할 일을 마감하였습니다.', 'TODO_COMPLETE', '2017-02-14 15:20:27', 1, 109, 109, '', 0, 0),
	(3, 'FEED', 122, NULL, '윤병선 대리 님이 한원석 님의 글(할일)에 팔로우하였습니다.', '윤병선 대리 님이 한원석 님의 글(할일)에 팔로우하였습니다.', '윤병선 대리 님이 한원석 님의 글(할일)에 팔로우하였습니다.', '윤병선 대리 님이 한원석 님의 글(할일)에 팔로우하였습니다.', 'FEED_FOLLOWER_REG', '2017-02-14 15:21:02', 1, 109, 109, '', 0, 0),
	(4, 'FEED', 122, NULL, '윤병선 대리 님이 한원석 님의 글(할일)에 팔로우하였습니다.', '윤병선 대리 님이 한원석 님의 글(할일)에 팔로우하였습니다.', '윤병선 대리 님이 한원석 님의 글(할일)에 팔로우하였습니다.', '윤병선 대리 님이 한원석 님의 글(할일)에 팔로우하였습니다.', 'FEED_FOLLOWER_REG', '2017-02-14 15:21:02', 0, 112, 109, '', 0, 0),
	(5, 'FEED', 138, NULL, '윤병선 대리 님이 윤병선 님의 글(할일)에 팔로우하였습니다.', '윤병선 대리 님이 윤병선 님의 글(할일)에 팔로우하였습니다.', '윤병선 대리 님이 윤병선 님의 글(할일)에 팔로우하였습니다.', '윤병선 대리 님이 윤병선 님의 글(할일)에 팔로우하였습니다.', 'FEED_FOLLOWER_REG', '2017-02-14 15:21:14', 1, 109, 109, '', 0, 0),
	(6, 'FEED', 140, NULL, '윤병선 대리 님의 [ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ] 글이 등록되었습니다.', '윤병선 대리 님의 [ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ] 글이 등록되었습니다.', '윤병선 대리 user [ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ] feed update.', '윤병선 대리 人 [ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ] feed update.', 'FEED_REG', '2017-02-14 15:23:16', 1, 109, 109, '', 0, 0),
	(7, 'FEED', 138, NULL, '윤병선 대리 님의 [ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ]할일이 삭제되었습니다.', '윤병선 대리 님의 [ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ]할일이 삭제되었습니다.', '윤병선 대리 님의 [ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ]할일이 삭제되었습니다.', '윤병선 대리 님의 [ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ]할일이 삭제되었습니다.', 'TODO_DEL', '2017-02-14 15:25:48', 1, 109, 109, '', 0, 0),
	(8, 'FEED', 134, NULL, '윤병선 대리 님의 [ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ]할일이 삭제되었습니다.', '윤병선 대리 님의 [ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ]할일이 삭제되었습니다.', '윤병선 대리 님의 [ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ]할일이 삭제되었습니다.', '윤병선 대리 님의 [ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ]할일이 삭제되었습니다.', 'TODO_DEL', '2017-02-14 15:25:57', 1, 109, 109, '', 0, 0),
	(9, 'FEED', 141, NULL, '윤병선 대리 님의 [] 글이 등록되었습니다.', '윤병선 대리 님의 [] 글이 등록되었습니다.', '윤병선 대리 user [] feed update.', '윤병선 대리 人 [] feed update.', 'FEED_REG', '2017-02-14 15:28:10', 1, 109, 109, '', 0, 0),
	(10, 'FEED', 144, NULL, '윤병선 대리 님의 [ㅅㄷㄴㅅ11111] 글이 등록되었습니다.', '윤병선 대리 님의 [ㅅㄷㄴㅅ11111] 글이 등록되었습니다.', '윤병선 대리 user [ㅅㄷㄴㅅ11111] feed update.', '윤병선 대리 人 [ㅅㄷㄴㅅ11111] feed update.', 'FEED_REG', '2017-02-14 17:36:04', 1, 109, 109, '', 0, 0),
	(11, 'FEED', 148, NULL, '윤병선 대리 님의 [ㄴㄹㄴㄻㄴㄹㄴㅁㄹㄴㅇ] 글이 등록되었습니다.', '윤병선 대리 님의 [ㄴㄹㄴㄻㄴㄹㄴㅁㄹㄴㅇ] 글이 등록되었습니다.', '윤병선 대리 user [ㄴㄹㄴㄻㄴㄹㄴㅁㄹㄴㅇ] feed update.', '윤병선 대리 人 [ㄴㄹㄴㄻㄴㄹㄴㅁㄹㄴㅇ] feed update.', 'FEED_REG', '2017-02-14 17:51:26', 1, 109, 109, '', 0, 0),
	(12, 'FEED', 149, NULL, '박승필 과장 님의 [ㅁㄴㄻㄴㄻㄴㄹ] 글이 등록되었습니다.', '박승필 과장 님의 [ㅁㄴㄻㄴㄻㄴㄹ] 글이 등록되었습니다.', '박승필 과장 user [ㅁㄴㄻㄴㄻㄴㄹ] feed update.', '박승필 과장 人 [ㅁㄴㄻㄴㄻㄴㄹ] feed update.', 'FEED_REG', '2017-02-14 17:53:53', 1, 108, 108, '', 0, 0),
	(13, 'FEED', 150, NULL, '박승필 과장 님의 [ㅇㄹㄴㅁㄻㄴㄹㄴㄹㄴㄹ] 글이 등록되었습니다.', '박승필 과장 님의 [ㅇㄹㄴㅁㄻㄴㄹㄴㄹㄴㄹ] 글이 등록되었습니다.', '박승필 과장 user [ㅇㄹㄴㅁㄻㄴㄹㄴㄹㄴㄹ] feed update.', '박승필 과장 人 [ㅇㄹㄴㅁㄻㄴㄹㄴㄹㄴㄹ] feed update.', 'FEED_REG', '2017-02-14 17:55:20', 1, 108, 108, '', 0, 0),
	(14, 'FEED', 152, NULL, '박승필 과장 님의 [ㄴㅁㅇㄻㄴㅇㄻㄴㅇㄹ111] 글이 등록되었습니다.', '박승필 과장 님의 [ㄴㅁㅇㄻㄴㅇㄻㄴㅇㄹ111] 글이 등록되었습니다.', '박승필 과장 user [ㄴㅁㅇㄻㄴㅇㄻㄴㅇㄹ111] feed update.', '박승필 과장 人 [ㄴㅁㅇㄻㄴㅇㄻㄴㅇㄹ111] feed update.', 'FEED_REG', '2017-02-14 18:02:17', 1, 108, 108, '', 0, 0),
	(15, 'FEED', 153, NULL, '박승필 과장 님의 [ㅋㅋㅋㅋㅋ] 글이 등록되었습니다.', '박승필 과장 님의 [ㅋㅋㅋㅋㅋ] 글이 등록되었습니다.', '박승필 과장 user [ㅋㅋㅋㅋㅋ] feed update.', '박승필 과장 人 [ㅋㅋㅋㅋㅋ] feed update.', 'FEED_REG', '2017-02-14 18:07:36', 1, 108, 108, '', 0, 0),
	(16, 'FEED', 154, NULL, '박승필 과장 님의 [1111233] 글이 등록되었습니다.', '박승필 과장 님의 [1111233] 글이 등록되었습니다.', '박승필 과장 user [1111233] feed update.', '박승필 과장 人 [1111233] feed update.', 'FEED_REG', '2017-02-14 18:15:56', 1, 108, 108, '', 0, 0),
	(17, 'FEED', 154, NULL, '박승필 과장 님이 [1111233] 글(할일)에 "좋아요" 하였습니다.', '박승필 과장 님이 [1111233] 글(할일)에 "좋아요" 하였습니다.', '박승필 과장 님이 [1111233] 글(할일)에 "좋아요" 하였습니다.', '박승필 과장 님이 [1111233] 글(할일)에 "좋아요" 하였습니다.', 'OFW_LIKEIT_REG', '2017-02-16 12:00:21', 1, 108, 108, '', 0, 0),
	(18, 'FEED', 155, NULL, '가영근 차장 님의 [ㄴㅇㅁㄹㄴㅁㄹㄴㅇㅁㄹ] 글이 등록되었습니다.', '가영근 차장 님의 [ㄴㅇㅁㄹㄴㅁㄹㄴㅇㅁㄹ] 글이 등록되었습니다.', '가영근 차장 user [ㄴㅇㅁㄹㄴㅁㄹㄴㅇㅁㄹ] feed update.', '가영근 차장 人 [ㄴㅇㅁㄹㄴㅁㄹㄴㅇㅁㄹ] feed update.', 'FEED_REG', '2017-02-16 13:33:42', 1, 107, 107, '', 0, 0),
	(19, 'FEED', 151, NULL, '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 user [test ok] comment update.', '윤병선 대리 人 [test ok] comment update.', 'FEED_COMMENT_REG', '2017-02-16 17:50:53', 1, 107, 109, '', 0, 0),
	(20, 'FEED', 151, NULL, '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 user [test ok] comment update.', '윤병선 대리 人 [test ok] comment update.', 'FEED_COMMENT_REG', '2017-02-16 16:05:31', 0, 108, 109, '', 0, 0),
	(21, 'FEED', 151, NULL, '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 user [test ok] comment update.', '윤병선 대리 人 [test ok] comment update.', 'FEED_COMMENT_REG', '2017-02-16 16:05:31', 1, 109, 109, '', 0, 0),
	(22, 'FEED', 151, NULL, '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 user [test ok] comment update.', '윤병선 대리 人 [test ok] comment update.', 'FEED_COMMENT_REG', '2017-02-16 17:50:53', 1, 107, 109, '', 0, 0),
	(23, 'FEED', 151, NULL, '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 user [test ok] comment update.', '윤병선 대리 人 [test ok] comment update.', 'FEED_COMMENT_REG', '2017-02-16 16:06:15', 0, 108, 109, '', 0, 0),
	(24, 'FEED', 151, NULL, '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 user [test ok] comment update.', '윤병선 대리 人 [test ok] comment update.', 'FEED_COMMENT_REG', '2017-02-16 16:06:15', 1, 109, 109, '', 0, 0),
	(25, 'FEED', 151, NULL, '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 user [test ok] comment update.', '윤병선 대리 人 [test ok] comment update.', 'FEED_COMMENT_REG', '2017-02-16 17:50:53', 1, 107, 109, '', 0, 0),
	(26, 'FEED', 151, NULL, '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 user [test ok] comment update.', '윤병선 대리 人 [test ok] comment update.', 'FEED_COMMENT_REG', '2017-02-16 16:09:13', 0, 108, 109, '', 0, 0),
	(27, 'FEED', 151, NULL, '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 user [test ok] comment update.', '윤병선 대리 人 [test ok] comment update.', 'FEED_COMMENT_REG', '2017-02-16 16:09:13', 1, 109, 109, '', 0, 0),
	(28, 'FEED', 155, NULL, '가영근 차장 님이 [ㄴㅇㅁㄹㄴㅁㄹㄴㅇㅁㄹ] 글에 댓글을 등록하였습니다.', '가영근 차장 님이 [ㄴㅇㅁㄹㄴㅁㄹㄴㅇㅁㄹ] 글에 댓글을 등록하였습니다.', '가영근 차장 user [ㄴㅇㅁㄹㄴㅁㄹㄴㅇㅁㄹ] comment update.', '가영근 차장 人 [ㄴㅇㅁㄹㄴㅁㄹㄴㅇㅁㄹ] comment update.', 'FEED_COMMENT_REG', '2017-02-16 16:10:58', 1, 107, 107, '', 0, 0),
	(29, 'FEED', 155, NULL, '가영근 차장 님이 [ㄴㅇㅁㄹㄴㅁㄹㄴㅇㅁㄹ] 글에 댓글을 등록하였습니다.', '가영근 차장 님이 [ㄴㅇㅁㄹㄴㅁㄹㄴㅇㅁㄹ] 글에 댓글을 등록하였습니다.', '가영근 차장 user [ㄴㅇㅁㄹㄴㅁㄹㄴㅇㅁㄹ] comment update.', '가영근 차장 人 [ㄴㅇㅁㄹㄴㅁㄹㄴㅇㅁㄹ] comment update.', 'FEED_COMMENT_REG', '2017-02-16 17:53:53', 1, 109, 107, '', 0, 0),
	(30, 'FEED', 151, NULL, '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 user [test ok] comment update.', '윤병선 대리 人 [test ok] comment update.', 'FEED_COMMENT_REG', '2017-02-16 17:50:53', 1, 107, 109, '', 0, 0),
	(31, 'FEED', 151, NULL, '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 user [test ok] comment update.', '윤병선 대리 人 [test ok] comment update.', 'FEED_COMMENT_REG', '2017-02-16 16:13:04', 0, 108, 109, '', 0, 0),
	(32, 'FEED', 151, NULL, '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 user [test ok] comment update.', '윤병선 대리 人 [test ok] comment update.', 'FEED_COMMENT_REG', '2017-02-16 16:13:04', 1, 109, 109, '', 0, 0),
	(33, 'FEED', 151, NULL, '가영근 차장 님이 [test ok] 글에 댓글을 등록하였습니다.', '가영근 차장 님이 [test ok] 글에 댓글을 등록하였습니다.', '가영근 차장 user [test ok] comment update.', '가영근 차장 人 [test ok] comment update.', 'FEED_COMMENT_REG', '2017-02-16 16:19:06', 1, 107, 107, '', 0, 0),
	(34, 'FEED', 151, NULL, '가영근 차장 님이 [test ok] 글에 댓글을 등록하였습니다.', '가영근 차장 님이 [test ok] 글에 댓글을 등록하였습니다.', '가영근 차장 user [test ok] comment update.', '가영근 차장 人 [test ok] comment update.', 'FEED_COMMENT_REG', '2017-02-16 16:19:06', 0, 108, 107, '', 0, 0),
	(35, 'FEED', 151, NULL, '가영근 차장 님이 [test ok] 글에 댓글을 등록하였습니다.', '가영근 차장 님이 [test ok] 글에 댓글을 등록하였습니다.', '가영근 차장 user [test ok] comment update.', '가영근 차장 人 [test ok] comment update.', 'FEED_COMMENT_REG', '2017-02-16 17:53:53', 1, 109, 107, '', 0, 0),
	(36, 'FEED', 151, NULL, '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 user [test ok] comment update.', '윤병선 대리 人 [test ok] comment update.', 'FEED_COMMENT_REG', '2017-02-16 17:50:53', 1, 107, 109, '', 0, 0),
	(37, 'FEED', 151, NULL, '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 user [test ok] comment update.', '윤병선 대리 人 [test ok] comment update.', 'FEED_COMMENT_REG', '2017-02-16 17:50:06', 0, 108, 109, '', 0, 0),
	(38, 'FEED', 151, NULL, '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 님이 [test ok] 글에 댓글을 등록하였습니다.', '윤병선 대리 user [test ok] comment update.', '윤병선 대리 人 [test ok] comment update.', 'FEED_COMMENT_REG', '2017-02-16 17:50:06', 1, 109, 109, '', 0, 0),
	(39, 'FEED', 163, NULL, '윤병선 대리 님의 [11111] 글이 등록되었습니다.', '윤병선 대리 님의 [11111] 글이 등록되었습니다.', '윤병선 대리 user [11111] feed update.', '윤병선 대리 人 [11111] feed update.', 'FEED_REG', '2017-03-24 12:36:47', 1, 109, 109, '', 0, 0),
	(40, 'FEED', 164, NULL, '윤병선 대리 님의 [2222] 글이 등록되었습니다.', '윤병선 대리 님의 [2222] 글이 등록되었습니다.', '윤병선 대리 user [2222] feed update.', '윤병선 대리 人 [2222] feed update.', 'FEED_REG', '2017-03-24 12:37:01', 0, 60, 109, '', 0, 0),
	(41, 'FEED', 164, NULL, '윤병선 대리 님의 [2222] 글이 등록되었습니다.', '윤병선 대리 님의 [2222] 글이 등록되었습니다.', '윤병선 대리 user [2222] feed update.', '윤병선 대리 人 [2222] feed update.', 'FEED_REG', '2017-03-24 12:37:01', 1, 109, 109, '', 0, 0);
/*!40000 ALTER TABLE `ung_noti` ENABLE KEYS */;

-- 테이블 usns.ung_noticonfig 구조 내보내기
DROP TABLE IF EXISTS `ung_noticonfig`;
CREATE TABLE IF NOT EXISTS `ung_noticonfig` (
  `MEMBER_ID` bigint(20) NOT NULL,
  `ISGROUPACT` int(1) DEFAULT '1' COMMENT '그룹의 구성원변경 수신여부',
  `ISGROUPNEWFEED` int(1) DEFAULT '1' COMMENT '주제 추가/삭제에 대한 알림 여부',
  `ISGROUPKNWDGE` int(1) DEFAULT NULL,
  `ISFEEDFOLLOW` int(1) DEFAULT '1' COMMENT '내 피드에 타인이 팔로우',
  `ISFEEDFOLLOWED` int(1) DEFAULT '1',
  `ISFEEDCOMMENT` int(1) DEFAULT '1' COMMENT '인스턴스에 대한 댓글을 단 경우',
  `ISFEEDLIKEIT` int(1) DEFAULT '1',
  `ISTODOCOMING` int(1) DEFAULT '1' COMMENT '할일 도래 알림',
  `ISTODOSETDUEDATE` int(1) DEFAULT NULL,
  `ISTODOCOMPLETE` int(1) DEFAULT NULL,
  `ISAPPROVAL` int(1) DEFAULT '1',
  PRIMARY KEY (`MEMBER_ID`),
  CONSTRAINT `ung_noticonfig_ibfk_1` FOREIGN KEY (`MEMBER_ID`) REFERENCES `ung_member` (`MEMBER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_noticonfig:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_noticonfig` DISABLE KEYS */;
INSERT INTO `ung_noticonfig` (`MEMBER_ID`, `ISGROUPACT`, `ISGROUPNEWFEED`, `ISGROUPKNWDGE`, `ISFEEDFOLLOW`, `ISFEEDFOLLOWED`, `ISFEEDCOMMENT`, `ISFEEDLIKEIT`, `ISTODOCOMING`, `ISTODOSETDUEDATE`, `ISTODOCOMPLETE`, `ISAPPROVAL`) VALUES
	(2, 1, 1, NULL, 1, 1, 1, 1, 1, NULL, NULL, 0);
/*!40000 ALTER TABLE `ung_noticonfig` ENABLE KEYS */;

-- 테이블 usns.ung_poll 구조 내보내기
DROP TABLE IF EXISTS `ung_poll`;
CREATE TABLE IF NOT EXISTS `ung_poll` (
  `FEED_ID` bigint(20) NOT NULL,
  `SEQ` int(2) NOT NULL,
  `CHOICE` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`FEED_ID`,`SEQ`),
  CONSTRAINT `ung_poll_ibfk_1` FOREIGN KEY (`FEED_ID`) REFERENCES `ung_feed` (`FEED_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_poll:~11 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_poll` DISABLE KEYS */;
INSERT INTO `ung_poll` (`FEED_ID`, `SEQ`, `CHOICE`) VALUES
	(49, 0, 'ㄹㅇㄴ'),
	(49, 1, 'ㄹㄴㅁㄹ'),
	(76, 0, '나쁘다.'),
	(76, 1, '조금 나쁘다.'),
	(76, 2, '보통이다.'),
	(76, 3, '좋다.'),
	(76, 4, '아주 좋다.'),
	(124, 0, '1'),
	(124, 1, '2'),
	(124, 2, '3'),
	(124, 3, '4');
/*!40000 ALTER TABLE `ung_poll` ENABLE KEYS */;

-- 테이블 usns.ung_pollresult 구조 내보내기
DROP TABLE IF EXISTS `ung_pollresult`;
CREATE TABLE IF NOT EXISTS `ung_pollresult` (
  `MEMBER_ID` bigint(20) DEFAULT NULL,
  `FEED_ID` bigint(20) NOT NULL,
  `SEQ` int(2) NOT NULL,
  KEY `FEED_ID` (`FEED_ID`,`SEQ`),
  CONSTRAINT `ung_pollresult_ibfk_1` FOREIGN KEY (`FEED_ID`, `SEQ`) REFERENCES `ung_poll` (`FEED_ID`, `SEQ`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_pollresult:~3 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_pollresult` DISABLE KEYS */;
INSERT INTO `ung_pollresult` (`MEMBER_ID`, `FEED_ID`, `SEQ`) VALUES
	(116, 76, 4),
	(109, 124, 1),
	(109, 76, 4);
/*!40000 ALTER TABLE `ung_pollresult` ENABLE KEYS */;

-- 테이블 usns.ung_tag 구조 내보내기
DROP TABLE IF EXISTS `ung_tag`;
CREATE TABLE IF NOT EXISTS `ung_tag` (
  `TAG_NAME` varchar(100) NOT NULL,
  `FEED_ID` bigint(20) NOT NULL,
  `REG_MEMBER_ID` bigint(20) NOT NULL,
  `REGDTTM` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`TAG_NAME`,`FEED_ID`),
  KEY `UNG_TAG_IDX1` (`REG_MEMBER_ID`,`FEED_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_tag:~20 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_tag` DISABLE KEYS */;
INSERT INTO `ung_tag` (`TAG_NAME`, `FEED_ID`, `REG_MEMBER_ID`, `REGDTTM`) VALUES
	('/tax', 75, 115, '2016-01-20 13:48:08'),
	('/tax)', 75, 115, '2016-01-20 13:48:08'),
	('SK하이닉스', 109, 2, '2016-02-16 18:06:31'),
	('SNS', 24, 2, '2016-01-12 12:25:32'),
	('SNS', 112, 2, '2016-02-16 18:05:55'),
	('sns이거좋네요', 91, 62, '2016-01-26 10:04:15'),
	('test', 118, 109, '2016-05-04 15:07:19'),
	('ㅅㄷㄴ', 116, 109, '2016-05-03 10:11:36'),
	('감기따윈안드로메다', 91, 62, '2016-01-26 10:04:15'),
	('건강유의', 91, 62, '2016-01-26 10:04:15'),
	('눈', 91, 62, '2016-01-26 10:04:15'),
	('디자인굿', 91, 62, '2016-01-26 10:04:15'),
	('유엔진', 24, 2, '2016-01-12 12:25:32'),
	('이거만드신분 굿', 91, 62, '2016-01-26 10:04:15'),
	('정수기', 91, 62, '2016-01-26 10:04:15'),
	('춥다', 91, 62, '2016-01-26 10:04:15'),
	('테스트', 24, 2, '2016-01-12 12:25:32'),
	('해시태그', 47, 2, '2016-01-14 13:12:05'),
	('화장실', 91, 62, '2016-01-26 10:04:15'),
	('힘듦', 91, 62, '2016-01-26 10:04:15');
/*!40000 ALTER TABLE `ung_tag` ENABLE KEYS */;

-- 테이블 usns.ung_tenant 구조 내보내기
DROP TABLE IF EXISTS `ung_tenant`;
CREATE TABLE IF NOT EXISTS `ung_tenant` (
  `TENANT_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `TENANT_NAME` varchar(100) NOT NULL,
  `TENANT_DOMAIN` varchar(100) NOT NULL,
  `DESCRIPTION` varchar(4000) DEFAULT NULL,
  `LOGO_URL` varchar(200) DEFAULT NULL,
  `MOBILE_DOMAIN` varchar(255) DEFAULT NULL,
  `ISNETWORK` decimal(1,0) DEFAULT NULL,
  `NETWORK_API_URL` varchar(255) DEFAULT NULL COMMENT 'http://{도메인}/{ContextRoot}',
  `NETWORK_AUTH_IP` varchar(100) DEFAULT NULL,
  `NETWORK_AUTH_TOKEN` varchar(255) DEFAULT NULL,
  `COMPANY_ID` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`TENANT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_tenant:~2 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_tenant` DISABLE KEYS */;
INSERT INTO `ung_tenant` (`TENANT_ID`, `TENANT_NAME`, `TENANT_DOMAIN`, `DESCRIPTION`, `LOGO_URL`, `MOBILE_DOMAIN`, `ISNETWORK`, `NETWORK_API_URL`, `NETWORK_AUTH_IP`, `NETWORK_AUTH_TOKEN`, `COMPANY_ID`) VALUES
	(1, '유엔진솔루션즈', '', NULL, NULL, NULL, 0, NULL, NULL, NULL, '0'),
	(2, '엔키소프트', '', NULL, NULL, NULL, 0, NULL, NULL, NULL, '1');
/*!40000 ALTER TABLE `ung_tenant` ENABLE KEYS */;

-- 테이블 usns.ung_userinfo 구조 내보내기
DROP TABLE IF EXISTS `ung_userinfo`;
CREATE TABLE IF NOT EXISTS `ung_userinfo` (
  `USER_ID` varchar(50) NOT NULL COMMENT 'MEMBER 테이블의 SYNC_KYE 와 매핑',
  `LOGIN_ID` varchar(30) DEFAULT NULL,
  `LOGIN_PASSWORD` varchar(256) DEFAULT NULL,
  `ENCRYPT_SALT` varchar(50) DEFAULT NULL,
  `EMAIL_ADDR` varchar(150) DEFAULT NULL,
  `HANDPHONE` varchar(20) DEFAULT NULL,
  `OUT_EMAIL_ADDR` varchar(150) DEFAULT NULL,
  `PHONE` varchar(20) DEFAULT NULL,
  `DEPT_ID` varchar(50) DEFAULT NULL,
  `DEPT_NAME` varchar(100) DEFAULT NULL,
  `DEPT_NAME_EN` varchar(100) DEFAULT NULL,
  `FULL_DEPT_NAME` varchar(500) DEFAULT NULL COMMENT '최상위 부서부터 소속 부서까지의 전체 이름',
  `FULL_DEPT_NAME_EN` varchar(500) DEFAULT NULL,
  `POSITION_NAME` varchar(100) DEFAULT NULL,
  `POSITION_NAME_EN` varchar(100) DEFAULT NULL,
  `DUTY_NAME` varchar(100) DEFAULT NULL,
  `DUTY_NAME_EN` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `UNG_USERINFO_IDX` (`LOGIN_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 usns.ung_userinfo:~94 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ung_userinfo` DISABLE KEYS */;
INSERT INTO `ung_userinfo` (`USER_ID`, `LOGIN_ID`, `LOGIN_PASSWORD`, `ENCRYPT_SALT`, `EMAIL_ADDR`, `HANDPHONE`, `OUT_EMAIL_ADDR`, `PHONE`, `DEPT_ID`, `DEPT_NAME`, `DEPT_NAME_EN`, `FULL_DEPT_NAME`, `FULL_DEPT_NAME_EN`, `POSITION_NAME`, `POSITION_NAME_EN`, `DUTY_NAME`, `DUTY_NAME_EN`) VALUES
	('001', '테스터', 'ef74a698ca24d515db04ec81e28ad0cc1ddf1fc846cf8e6cbdfcb2377baba760', '001', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '테스터', NULL, NULL, NULL),
	('002', '김용훈', '3b8bafb2b0c494834ed37cfb6b8dbf4b0c89740b11b746676fce124f9a611400', '002', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('003', '홍재원', 'fb3ee6a4accb221581c213f00cee2145dd7b94189bf14bc39ce488863f523f5e', '003', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('004', '김성종', '8c5b045d48cf5436d49a22f61aaa3eac67031183187954ede53ab42572f56891', '004', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('005', '금득규', '17f07d94e2e80a027fee138b932cd16f3e874d223d64f74448976f623849f8d8', '005', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('006', '허재형', '26c0998797af7a9109038478de740a67c1cb99990632118e9429bff763edce0d', '006', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('007', '장진영', 'cb16b5750288a62c63db705c33f769273fcaf666340884fbbf38918703458cff', '007', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '대표이사', NULL, NULL, NULL),
	('008', '김강필', '6ccf65e814515a71b45de4be054b9c879ca25ee00ce076f4feaefd80b708a29d', '008', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('009', '복명균', 'be502ff749a94157457d5d1059da426f4d01e44d6c51f5b00b54f8b352a2a4d1', '009', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('010', '가영근', '29c34b2f9dcd353a98771552edce31e1222fd897c8193edc372338510b31c9fc', '010', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('011', '박승필', '88ee679e7d37d1bd361caa4177db17b7636a9b26ef1a55fd1db97418410f7cce', '011', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('012', '윤병선', '0893a3c15b05f74052a9b2458c2d5e315a64026377616db9f42b32c503636c26', '012', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('013', '안병성', 'c1b0d2048c82ec213763e2ba1531656b5e86bb83440365619d2eb3255c7b1fa7', '013', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('014', '신비인', '16aae78eff51647583ae1d94a32dbe35e614ddbd0c89247dad7b6654254b121a', '014', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('015', '한원석', 'db986f924c34af4e4104ab59487b3243daa17c54ede460ff7639f2bdbe60336c', '015', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('016', '최형윤', '37913a286f23f818eb848c727a924088499dd52e4d6e90a048003715a122c680', '016', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('017', '박종훈', 'ab950302768c60f8c6365512920c7ae80d6e3a3412da49857779116112d7e0e3', '017', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('018', '김영재', '19c77e381a322c19d7e4e826ac07811a83b477b7e01a8264097876b3997a59c2', '018', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('019', '김상훈', '505b82555ac2e6cca77320cddb7a14b5fc1fa9f3a7877d3e96e0b58c783b1620', '019', NULL, NULL, NULL, NULL, '1000', '유엔진 > 연구소', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI000', '관리자 계정', 'bdfa046f7af19ddfe97f09b848bfd41357f380f099755cd322b6ba3f5f566c15', 'ENKI000', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '관리자', NULL, NULL, NULL),
	('ENKI001', '정경현', 'cc0449eaf6eb9f532201193c2b01b9b6cc6c7e23d44e9ba57d516e280f3a2de7', 'ENKI001', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '대표이사', NULL, NULL, NULL),
	('ENKI002', '이재열', 'ad6c889e999fe2ac92b7e76a41fd5a8817c8cedf664cf799f94863c7126dc9b3', 'ENKI002', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI003', '김경수', 'e5bcbc6b6e8cba9d82030064dde270394dfc9dfa275053b761ae2ab5fed988eb', 'ENKI003', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI004', '박용주', 'a001005485e93b42b96f8313752d286237e38be3057f67a482fb800b3f8eca81', 'ENKI004', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI005', '최용훈', '8f07ea5166cd2c66045e87cb30a1312c23f3f60b31cce0e752b4320e1ec4f4b3', 'ENKI005', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI006', '이경철', '1ace9aef730f2c1217fd150a3344bdcc0463435d0e7b99e5fbddd35a1d1fe953', 'ENKI006', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI007', '최동욱', '27e57e80631cdec450f8f7b2a28944dd076c033fb17c15a66098c5dbfd07ddc5', 'ENKI007', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI008', '조남철', 'eb7527bd56599d3c409478e7c8b1d848c2a87da40df00fcbea09cb1d7b40d803', 'ENKI008', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI009', '이성한', 'be1a702a49e2068fe0c2623e4a92313ca305924f269dd2b635dafd82876b0035', 'ENKI009', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI010', '지대원', 'db7d2f3f12c00c37a6023b6da2d9e69c498198d342ccced736505e409bf9a62e', 'ENKI010', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI011', '윤효석', 'e98cc60bd2645efcc285e6cad64d58c7d9a7b3a7967c446afc08e110ce3e83be', 'ENKI011', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI012', '성노범', '18e08be97babdc460f2fab8c455aa43d73065d0ed1565117dd79a18a884edae3', 'ENKI012', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI013', '최운경', 'a54ae79d074772d0daa19d037f52513acba8afa95c4d477a41f4409afe8c7c13', 'ENKI013', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI014', '조남현', '611303546b91ac14a48994b6d75b2a92967381d1cb9626cd09d6ca42bbf01d15', 'ENKI014', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI015', '노찬호', '6aba79cd9db5ec271e02cda779a84296a15f16641c0edd8e1d42cdb03255b466', 'ENKI015', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI016', '유지관', 'd231b654e4a9f9a1f895ba3cab843576002eb4de5477c32baaab98cb733ceaf9', 'ENKI016', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI017', '한명순', 'b0b4b799fa9a405389bdefdd2f4e3e1d5cd067a15e2353fd1e52c1b542e9525d', 'ENKI017', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI018', '권성기', '6380f4290587e2d6de528765c2dfd9670884bb0a6715d3d958240cc44354e5ea', 'ENKI018', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI019', '박재수', '20446192a2b6b1ecedce33e6b1959da7e402218f24e0b220fcf7d6b2e5e39ff9', 'ENKI019', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI020', '김연천', '6d1b8ee8873e9caf27261ae1cd5b39101e6e5077085aacad7e1e23e860581581', 'ENKI020', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI021', '이수형', 'bd9f2166c964324ceab739b2b398f7218db2f2936d4ad814b29f65c44105d5be', 'ENKI021', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI022', '배서진', '7d815f45e0e5a7a4eee689ce702561c95855a41fa38d8ffc14a9362d9ca94091', 'ENKI022', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI023', '이인상', '95ece4d919f3889ce4e4a8b2d1a6028bd55a06d5316cd9eee3e71b9fae591bcc', 'ENKI023', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI024', '양성필', 'da6a1606246c3d1179b7e0148b52c16d67d6fcbb4a77040ba574f644a7362c3c', 'ENKI024', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI025', '민종진', 'a62b220d7adeaf317758b36fa62e56313f6325b1c25739030163d29afbb2c48a', 'ENKI025', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI026', '임경호', '70485a1a9a7446aea74b45d32bc11b286f3ab167d30374056345bb3bcd371d62', 'ENKI026', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI027', '김정일', '0fcae37bb2b40e72066cdb39dc516d9147107d3ee46733a19c62cd048e7eb34d', 'ENKI027', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI028', '김태현', 'ef464aefb3a38183ec13076765607a3be9562b6bf085bf0de60b34d1e5021871', 'ENKI028', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI029', '우승균', 'eeb988e885a43addf2bf23add840bcdce7c3a5c966e537aa796a8250b711a86f', 'ENKI029', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI030', '강서구', '6d6ea81d42ae1c090ca710b2ae0c25d6924df926b03d1b1d6d9a35284a740d5f', 'ENKI030', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI031', '김준우', '081660bcb4c068a0ccc40eb567ed8498bf07a06064d9fcb79a32e93a462927bb', 'ENKI031', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI032', '정종우', '8bd36cbb9b64f8b5262b9cabd847ec2d001f11b4555f1c59c65dcae3e24f0a26', 'ENKI032', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI033', '김상균', '8e0a707df506e7b562761afacb6e1e20708acd98c25a13bb5feec01a820ed83a', 'ENKI033', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI034', '김현준', '952e457f7fc326464461e340a31a5d549d9c0122414b74514c9381e1b4b84f33', 'ENKI034', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI035', '이한찬', 'a21be1b29b021c785a116520302edfd6b199775a144139762144d4157aff3390', 'ENKI035', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI036', '문희식', '1609e33a4de6091b448e280eb63aa8aa00b1a6ae747ab73b35f55e958211cb1d', 'ENKI036', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI037', '박정민', 'f3c26ce687404382b3d96551b36c6f575f501d897878144a74a9b6fb551c89a2', 'ENKI037', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI038', '김종철', 'fdd8e8d01aba818412378f56f7c262ddc96f55d53d67ff9602b3a59b26d34efd', 'ENKI038', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI039', '최철영', '8aa39382c813896ef7929cb4f174108a571c48ecb4759db5fe4300c21a07537e', 'ENKI039', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI040', '최민성', 'f88b6ecb353f072b4d52910b2de7386c34d9a10de4b592cda57238470492bbcf', 'ENKI040', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI041', '이세진', 'b4add8fe8b6954e26ba2e5e705391c3c1ea1c3d5176ada1f944ea3e0acb20edc', 'ENKI041', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI042', '이수진', '5ea851e1fd602203e276408b8e9359866612852c1b44cd2e01ae9b8ede5611e7', 'ENKI042', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI043', '변의영', '73b25ebc95737c209dfa4cff5b791832d7ad697ddfc58c5b7e70edfc2a257d8e', 'ENKI043', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI044', '노재원', 'ef1ac52dfde5efa98d1c26b57eefe1bdd36d4070fb358f1ee48d41ca163b5ef7', 'ENKI044', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI045', '강연주', 'f2ab7b6d9e766e5a8e46597fd9f65b59e028721a3afd254854f20fee298294b8', 'ENKI045', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI046', '홍윤미', '428a27a8987139af3813556cf9b067c3bca0acac71cfed31780caf8d1b18bdcd', 'ENKI046', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI047', '이용찬', '734124d2669fb87c6bfcb785ee0b4c339aa01f7c9bbe4d3be7491899931b015c', 'ENKI047', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI048', '이미옥', '90c8bb43fcb68a598c3a5c5b35c9f4ee30da18137acda78687ab41e44d958a94', 'ENKI048', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI049', '좌은진', '18dd7fa75a481be5925e923fa83e2117b3eca046bb9fb5a62d1a7e8a348c7e48', 'ENKI049', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI050', '정명재', '9cbec8350f49ad13a6f0c71e0d8bedaa28619ca6a29c69070e9dbf8ac2d5c446', 'ENKI050', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI051', '양교훈', '4252c772fa569620e39f09d62bee2278d67f1bfefe681bcb145284cf28b952c8', 'ENKI051', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI052', '백경환', '19246aae54476d212ddcc875bee297f8d908325265a361d768d6efb7a7eaaed2', 'ENKI052', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI053', '김병욱', 'b69d9df197b8a727b12710d5f933fb49ebd4d3d396615df20b1842873962d010', 'ENKI053', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI054', '양태욱', '38d6261a1b34a2beb8aa71e061816bf937d8b200c887525ed8ea2316844e76f5', 'ENKI054', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI055', '김은정', '64af736742e0e78f0a73b89705533f1575890c5be41128c5d3040e3c4287699a', 'ENKI055', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI056', '이주현', '72ea857ba9ab816659d8c9c252a7b7a99169f243511a7502183252b8fc6893b4', 'ENKI056', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI057', '이은규', 'ac0a6b382694b93bc8bb9eb50860455d6e03ccdf0647ce2362256b4c335ac490', 'ENKI057', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI058', '이재현', '2c8ecc8107c62d10e08a33ecb5f1bec5d0e6b0bd99ca2be22a8c2fd58f970390', 'ENKI058', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI059', '손창우', '3a6b29866da6ef430bf0e8f057e2ae0dca4d9fa5d68368c2a3d0a5c4bc2b26fd', 'ENKI059', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI060', '최준영', '4177c09a0fd2738e63ed45aa868dfab167d3c43aa1f5fe59a129137c2dcf2e4d', 'ENKI060', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI061', '박다영', 'a4a21b458332d838d457ee83f4ebae6af0b102d4453299ffa3ec43d786757c44', 'ENKI061', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI062', '이수지', 'dc7e4b88786121fda0c52a0e07f993ab21747a48154724d08ef29679eb42ad56', 'ENKI062', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI063', '이원지', 'ee682e1dd4cefc52f083bedfcf6621c009b5b9acf52ca46bb3606818444e64e8', 'ENKI063', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI064', '조남규', 'aaceb1182cc65604511470d71e251c38be71d85f93e53f34432aa75f7adc2b2d', 'ENKI064', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI065', '한아라', '704776b17d4f1ed7268335883c22e66295d23f7076d123348d2f1fea2c8e2a51', 'ENKI065', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI066', '신기식', '65809998cfa8fe78324f1fbabce65b971a10e88809d38eee37a06cef1018ce35', 'ENKI066', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI067', '왕정민', '982b60444a2a3a78821a57f4a06b262c82847c7dc58939498d4f3cffd8cb64ae', 'ENKI067', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI068', '신호석', 'c09c7def933d881d8ca0f93e0453e3501e58a85493fce14d85fb1742739b6114', 'ENKI068', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI069', '김명준', '5cd649490a1c3ccaaf3082d2d9d4801f580d0a44f7a124ed416a027b2c063b16', 'ENKI069', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI070', '이종창', '5f472c40e5f4313992015481bc3f496f92d83a9c5223daf98f716973e4cc472f', 'ENKI070', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI071', '조창현', '3f5c669c5e13a68a16bc1e07121a34dc55312bc18caa3de54499e27ed09dcaab', 'ENKI071', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI072', '이성준', 'bf1c07cab7724fd0ec2dfd3ef4b8b4406053496df8df31201ad11704f566b9f0', 'ENKI072', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI073', '이준범', 'f9f0bd32c01c3ca2d10b7748e22a6fc904cfdfb3fd98290b4e1725917df7680c', 'ENKI073', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('ENKI074', '조영민', 'c667a6c6ae0f5709bde21b4103fabadfe0423268b96b4d8772d03fd47d6ff834', 'ENKI074', NULL, NULL, NULL, NULL, '2000', '엔키소프트 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL),
	('kofia', 'kofia', 'a718baac5710f9cc7d2f5e98231384c7ed0f89c30667a9f23293c8926c225ca5', 'kofia', NULL, NULL, NULL, NULL, '2000', '금융투자협회 > 사업부', NULL, NULL, NULL, '매니저', NULL, NULL, NULL);
/*!40000 ALTER TABLE `ung_userinfo` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

-- 테이블 uchat.ung_chatting_follower 구조 내보내기
DROP TABLE IF EXISTS `ung_chat_follower`;
CREATE TABLE IF NOT EXISTS `ung_chat_follower` (
  `ROOM_ID` bigint(20) NOT NULL COMMENT '채팅방 ID',
  `FOLLOWER_ID` varchar(150) NOT NULL COMMENT '참여자 ID',
  `FOLLOWER_NAME` varchar(150) NOT NULL COMMENT '참여자 이름',
  `REGDTTM` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '참여 일시',
  PRIMARY KEY (`ROOM_ID`,`FOLLOWER_ID`),
  UNIQUE KEY `UNG_CHATTING_FOLLOWER_IDX` (`ROOM_ID`,`FOLLOWER_ID`),
  UNIQUE KEY `UNG_CHATTING_FOLLOWER_IDX01` (`FOLLOWER_ID`,`ROOM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 uchat.ung_chatting_message 구조 내보내기
DROP TABLE IF EXISTS `ung_chat_message`;
CREATE TABLE IF NOT EXISTS `ung_chat_message` (
  `MESSAGE_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `ROOM_ID` bigint(20) NOT NULL COMMENT '채팅방 ID',
  `USER_ID` varchar(150) DEFAULT NULL COMMENT '사용자 아이디',
  `USER_NAME` varchar(150) DEFAULT NULL COMMENT '사용자 이름',
  `MESSAGE_TYPE` varchar(150) DEFAULT NULL COMMENT '메세지 타입',
  `MESSAGE` text,
  `WHISPER_ID` varchar(150) DEFAULT NULL COMMENT '귓속말 대상 아이디',
  `WHISPER_NAME` varchar(150) DEFAULT NULL COMMENT '귓속말 대상 이름',
  `REGDTTM` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '사용자 등록일',
  PRIMARY KEY (`MESSAGE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8;

-- 테이블 uchat.ung_chatting_read 구조 내보내기
DROP TABLE IF EXISTS `ung_chat_read`;
CREATE TABLE IF NOT EXISTS `ung_chat_read` (
  `ROOM_ID` bigint(20) NOT NULL COMMENT '채팅방 ID',
  `USER_ID` varchar(150) NOT NULL COMMENT '사용자 아이디',
  `MESSAGE_COUNT` bigint(20) NOT NULL DEFAULT '1' COMMENT '메세지 카운트',
  `REGDTTM` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
  `MODDTTM` timestamp NOT NULL COMMENT '갱신일시',
  PRIMARY KEY (`ROOM_ID`,`USER_ID`),
  UNIQUE KEY `UNG_CHAT_READ_IDX` (`ROOM_ID`,`USER_ID`),
  UNIQUE KEY `UNG_CHAT_READ_IDX01` (`USER_ID`,`ROOM_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8;

-- 테이블 uchat.ung_chatting_room 구조 내보내기
DROP TABLE IF EXISTS `ung_chat_room`;
CREATE TABLE IF NOT EXISTS `ung_chat_room` (
  `ROOM_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '채팅방 ID',
  `ROOM_TITLE` varchar(255) NOT NULL COMMENT '채팅방 타이틀',
  `ESTABLISHER_ID` varchar(150) DEFAULT NULL COMMENT '방 개설자 ID',
  `ESTABLISHER_NAME` varchar(150) DEFAULT NULL COMMENT '방 개설자 이름',
  `ROOM_FLAG` varchar(150) DEFAULT NULL COMMENT '개설자의 룸 플래그',
  `STATUS` varchar(50) DEFAULT NULL COMMENT '협상중, 협상성공, 협상결렬',
  `REGDTTM` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '개설 일자',
  `LAST_MESSAGE` text DEFAULT NULL COMMENT '마지막 메세지',
  `LASTDTTM` timestamp NOT NULL COMMENT '마지막 메세지 등록일자',
  PRIMARY KEY (`ROOM_ID`),
  UNIQUE KEY `USER_ID` (`ROOM_ID`),
  KEY `CHATTING_ROOM_IDX` (`ROOM_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8;

-- 테이블 uchat.ung_notice 구조 내보내기
DROP TABLE IF EXISTS `ung_chat_notice`;
CREATE TABLE IF NOT EXISTS `ung_chat_notice` (
  `NOTICE_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `ITEM_TYPE` varchar(150) DEFAULT NULL COMMENT '아이템 타입',
  `ITEM_ID` bigint(20) NOT NULL COMMENT '아이템 ID',
  `ITEM_TITLE` varchar(255) NOT NULL COMMENT '아이템 타이틀',
  `ITEM_CONTENT` text,
  `TO_FOLLOWER_ID` varchar(150) DEFAULT NULL COMMENT '보낸 유저 ID',
  `TO_FOLLOWER_NAME` varchar(150) DEFAULT NULL COMMENT '보낸 유저 명',
  `FROM_FOLLOWER_ID` varchar(150) DEFAULT NULL COMMENT '받을 유저 ID',
  `FROM_FOLLOWER_NAME` varchar(150) DEFAULT NULL COMMENT '받을 유저 명',
  `ISREAD` int(1) DEFAULT 0 COMMENT '확인 여부',
  `REGDTTM` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '알림 등록일',
  PRIMARY KEY (`NOTICE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8;