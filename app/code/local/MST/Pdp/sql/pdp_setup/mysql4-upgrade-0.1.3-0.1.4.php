<?php
$installer = $this;
$installer->startSetup();
$installer->run("
	DROP TABLE IF EXISTS {$this->getTable('mst_pdp_design_areas')};
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_design_areas')} (
		id int(11) unsigned NOT NULL AUTO_INCREMENT,
		product_id int(11) unsigned NOT NULL,
		label varchar(255) NOT NULL DEFAULT '',
		is_required smallint(2) NOT NULL DEFAULT 2,
		status smallint(2) NOT NULL DEFAULT 1,
		position int(11) NOT NULL DEFAULT 0,
		PRIMARY KEY (id)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
	DROP TABLE IF EXISTS {$this->getTable('mst_pdp_items_design_area')};
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_items_design_area')} (
		id int(11) unsigned NOT NULL AUTO_INCREMENT,
		product_id int(11) unsigned NOT NULL,
		side_id int(11) unsigned NOT NULL,
		inlay_id int(11) unsigned NOT NULL,
		PRIMARY KEY (id)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
");
$installer->endSetup(); 