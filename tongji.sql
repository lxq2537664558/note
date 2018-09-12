E:\www\788799.com\thinkphp\library\think\db\Query.php
paginate

$pageStatFields


总流水 0 元, 收入 0 元, 支出 0 元   当前 流水 0 元, 收入 0 元, 支出 0 元, 




总 0 元,  当前, 总 0 元, 当前, 总 0 元  



	SELECT 
		b.uid as uid,
		b.username as username,
		b.nickname as nickname,
		ifnull(bet_amount,0.00) as bet_amount,
		ifnull(bet_count,0.00) as bet_count,
		ifnull(zj_amount,0.00) as zj_amount,
		ifnull(zj_count,0) as zj_count,
		ifnull(win_amount,0) as win_amount,
		ifnull(backwater_amount,0.00) as backwater_amount,
		ifnull(deposit_amount,0.00) as deposit_amount,
		ifnull(deposit_real_amount,0.00) as deposit_real_amount,
		ifnull(withdraw_amount,0.00) as withdraw_amount,
		ifnull(withdraw_real_amount,0.00) as withdraw_real_amount,
		ifnull(withdraw_debit_amount,0.00) as withdraw_debit_amount,
		ifnull(bonus_amount,0.00) as bonus_amount,
		ifnull(manual_deposit_amount,0.00) as manual_deposit_amount,
		ifnull(manual_withdraw_amount,0.00) as manual_withdraw_amount,
		ifnull(company_amount,0.00) as company_amount 
	FROM 
	(
		SELECT 
			ifnull(sum(mode*beiShu*actionNum),0.00) as bet_amount,
			ifnull(sum(actionNum),0.00) as bet_count,
			ifnull(sum(bonus),0.00) as zj_amount,
			ifnull(sum(zjCount),0.00) as zj_count,
			ifnull(sum(case when lotteryNo !="" then bonus-actionNum*mode*beiShu else 0 end),0.00) as win_amount,
			ifnull(sum(fanDianAmount),0.00) as backwater_amount,
			x.uid as uid,
			`username`,
			`nickname` 
		FROM 
			`gygy_bets` `x` 
			INNER JOIN ( SELECT `uid`,`username`,`nickname` FROM `gygy_members` ) `u` ON `u`.`uid`=`x`.`uid` GROUP BY uid
	) b 
	LEFT JOIN (
		SELECT 
			ifnull(sum(amount),0.00) as deposit_amount,
			x.uid as uid,
			`username`,
			`nickname` 
		FROM `gygy_orders` `x` 
		INNER JOIN ( SELECT `uid`,`username`,`nickname` FROM `gygy_members` ) `u` ON `u`.`uid`=`x`.`uid` 
		GROUP BY uid) d ON `b`.`uid`=`d`.`uid` 
	LEFT JOIN (
		SELECT 
			ifnull(sum(amount),0.00) as deposit_real_amount,
			x.uid as uid,
			`username`,
			`nickname` 
		FROM `gygy_orders` `x` 
		INNER JOIN ( SELECT `uid`,`username`,`nickname` FROM `gygy_members` ) `u` ON `u`.`uid`=`x`.`uid`
		WHERE  `status` = 1 GROUP BY uid
	) dr ON `b`.`uid`=`dr`.`uid` 
	LEFT JOIN (
		SELECT 
			ifnull(sum(amount),0.00) as withdraw_amount,
			ifnull(sum(real_amount),0.00) as withdraw_real_amount,
			ifnull(sum(debit_amount),0.00) as withdraw_debit_amount,
			x.uid as uid,
			`username`,
			`nickname` 
		FROM `gygy_withdraw` `x` 
		INNER JOIN ( SELECT `uid`,`username`,`nickname` FROM `gygy_members` ) `u` ON `u`.`uid`=`x`.`uid` 
		GROUP BY uid
	) w ON `b`.`uid`=`w`.`uid` 
	LEFT JOIN (
		SELECT 
			ifnull(sum(amount),0.00) as bonus_amount,
			x.uid as uid,`username`,
			`nickname` 
		FROM `gygy_bonus_flow` `x` 
		INNER JOIN ( SELECT `uid`,`username`,`nickname` FROM `gygy_members` ) `u` ON `u`.`uid`=`x`.`uid` 
		GROUP BY uid
	) bo ON `b`.`uid`=`bo`.`uid` 
	LEFT JOIN (
		SELECT 
			ifnull(sum(amount),0.00) as manual_withdraw_amount,
			x.uid as uid,`username`,
			`nickname` 
		FROM `gygy_manual_money` `x` 
		INNER JOIN ( SELECT `uid`,`username`,`nickname` FROM `gygy_members` ) `u` ON `u`.`uid`=`x`.`uid` 
		WHERE  `bonus_id` = -1 GROUP BY uid
	) mw ON `b`.`uid`=`mw`.`uid` 
	LEFT JOIN (
		SELECT 
			ifnull(sum(amount),0.00) as manual_deposit_amount,
			x.uid as uid,`username`,`nickname` 
		FROM `gygy_manual_money` `x` 
		INNER JOIN ( SELECT `uid`,`username`,`nickname` FROM `gygy_members` ) `u` ON `u`.`uid`=`x`.`uid` 
		WHERE  `bonus_id` = 0 GROUP BY uid
	) md ON `b`.`uid`=`md`.`uid` 
	LEFT JOIN (
		SELECT 
			ifnull(sum(amount),0.00) as company_amount,
			x.uid as uid,
			`username`,
			`nickname` 
		FROM `gygy_company_money` `x` 
		INNER JOIN ( SELECT `uid`,`username`,`nickname` FROM `gygy_members` ) `u` ON `u`.`uid`=`x`.`uid` 
		GROUP BY uid
	) cm ON `b`.`uid`=`cm`.`uid` 
	ORDER BY `b`.`uid`