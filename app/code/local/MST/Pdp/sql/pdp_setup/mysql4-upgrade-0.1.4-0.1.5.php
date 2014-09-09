<?php
$installer = $this;
$installer->startSetup();
$installer->run("
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_design_color_images')} (
		id int(11) unsigned NOT NULL AUTO_INCREMENT,
		inlay_id int(11) unsigned NOT NULL,
		color_name varchar(500) NOT NULL DEFAULT '',
		filename varchar(500) NOT NULL,
		base_filename varchar(500) NOT NULL,
		status smallint(2) NOT NULL DEFAULT 1,
		position int(11) NOT NULL DEFAULT 0,
		PRIMARY KEY (id)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
");
$installer->endSetup(); 