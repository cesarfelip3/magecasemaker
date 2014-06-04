<?php
$installer = $this;
$installer->startSetup ();
$installer->run ( "
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_multisides')} (
		`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
		`product_id` int(11) unsigned NOT NULL,
		`label` varchar(500) NOT NULL,
		`color_id` int(11) unsigned NOT NULL,
		`inlay_w` varchar(255) NOT NULL,
		`inlay_h` varchar(255) NOT NULL,
		`inlay_t` varchar(255) NOT NULL,
		`inlay_l` varchar(255) NOT NULL,
		`filename` varchar(500) NOT NULL,
		`position` int(11) NOT NULL DEFAULT '0',
		`status` smallint(2) NOT NULL DEFAULT '1',
		PRIMARY KEY (`id`)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_multisides_colors')} (
		`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
		`product_id` int(11) unsigned NOT NULL,		`color_id` int(11) unsigned NOT NULL,
		`status` smallint(2) NOT NULL DEFAULT '1',
		`position` int(11) NOT NULL DEFAULT '0',
		PRIMARY KEY (`id`)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_multisides_colors_images')} (
		`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
		`product_color_id` int(11) unsigned NOT NULL,
		`side_id` int(11) unsigned NOT NULL,
		`filename` varchar(500) NOT NULL,
		PRIMARY KEY (`id`)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
" );
$installer->endSetup (); 
