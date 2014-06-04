<?php
$installer = $this;
$installer->startSetup();
$installer->run("
	DROP TABLE IF EXISTS {$this->getTable('mst_pdp_texts')};
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_texts')} (
		`text_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
		`text` varchar(255) NOT NULL DEFAULT '',
		`tags` TEXT NOT NULL DEFAULT '',
		`is_popular` smallint(11) NOT NULL DEFAULT '2',
		`status` smallint(11) NOT NULL DEFAULT '1',
		`position` int(11) NOT NULL DEFAULT '0',
		PRIMARY KEY (`text_id`)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
");
$installer->endSetup(); 
