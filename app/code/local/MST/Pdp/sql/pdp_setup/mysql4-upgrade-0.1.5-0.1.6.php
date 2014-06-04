<?php
$installer = $this;
$installer->startSetup();
$installer->run("
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_product_status')} (
		id int(11) unsigned NOT NULL AUTO_INCREMENT,
		product_id int(11) unsigned NOT NULL,
		note varchar(500) NOT NULL,
		status smallint(2) NOT NULL DEFAULT 1,
		PRIMARY KEY (id)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
");
$installer->endSetup(); 