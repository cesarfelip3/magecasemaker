<?php
$installer = $this;
$installer->startSetup();
$installer->run("
	DROP TABLE IF EXISTS {$this->getTable('mst_pdp_images')};
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_images')} (
		`image_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
		`image_type` varchar(255) NOT NULL DEFAULT '',
		`filename` varchar(500) NOT NULL DEFAULT '',
		`category` varchar(500) NOT NULL DEFAULT '',
		`color` text NOT NULL,
		`position` int(11) NOT NULL DEFAULT '0',
		PRIMARY KEY (`image_id`)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
	DROP TABLE IF EXISTS {$this->getTable('mst_pdp_fonts')};
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_fonts')} (
	  `font_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	  `name` varchar(255) NOT NULL DEFAULT '',
	  `ext` varchar(500) NOT NULL DEFAULT '',
	  PRIMARY KEY (`font_id`)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
	DROP TABLE IF EXISTS {$this->getTable('mst_pdp_printarea')};
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_printarea')} (
	  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	  `title` varchar(500) NOT NULL,
	  `price` varchar(50) NOT NULL,
	  `canvas_w` varchar(255) NOT NULL,
	  `canvas_h` varchar(255) NOT NULL,
	  `canvas_t` varchar(255) NOT NULL,
	  `canvas_l` varchar(255) NOT NULL,
	  `status` smallint(2) NOT NULL DEFAULT '1',
	  `filename` varchar(500) NOT NULL,
	  `position` int(11) NOT NULL DEFAULT '0',
	  PRIMARY KEY (`id`)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
	DROP TABLE IF EXISTS {$this->getTable('mst_pdp_design')};
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_design')} (
	  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	  `title` varchar(500) NOT NULL,
	  `price` varchar(50) NOT NULL,
	  `product_id` int(11) NOT NULL,
	  `status` smallint(2) NOT NULL DEFAULT '1',
	  `filename` varchar(500) NOT NULL,
	  `filename_back` varchar(500) NOT NULL,
	  `options` text NOT NULL,
	  `pdpgroup` int(11) unsigned NOT NULL,
	  `position` int(11) NOT NULL DEFAULT '0',
	  PRIMARY KEY (`id`)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
	DROP TABLE IF EXISTS {$this->getTable('mst_pdp_image_color')};
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_image_color')} (
	  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	  `image_id` int(11) unsigned NOT NULL,
	  `filename` varchar(500) NOT NULL DEFAULT '',
	  `color` varchar(500) NOT NULL DEFAULT '',
	  `filename_back` varchar(500) NOT NULL DEFAULT '',
	  PRIMARY KEY (`id`),
	  KEY `image_id` (`image_id`)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
	DROP TABLE IF EXISTS {$this->getTable('mst_pdp_design_color')};
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_design_color')} (
	  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	  `design_id` int(11) unsigned NOT NULL,
	  `color_name` varchar(500) NOT NULL,
	  `hexcode` varchar(50) NOT NULL,
	  `filename` varchar(255) NOT NULL,
	  `sort` int(11) NOT NULL DEFAULT '0',
	  `status` smallint(6) NOT NULL DEFAULT '0',
	  `filename_back` varchar(500) NOT NULL,
	  `price` varchar(500) NOT NULL DEFAULT '',
	  `style_image` varchar(500) NOT NULL,
	  PRIMARY KEY (`id`)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
	DROP TABLE IF EXISTS {$this->getTable('mst_pdp_artwork_category')};
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_artwork_category')} (
	  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	  `title` varchar(500) NOT NULL,
	  `status` smallint(2) NOT NULL DEFAULT '1',
	  `position` int(11) NOT NULL DEFAULT '0',
	  PRIMARY KEY (`id`)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
	DROP TABLE IF EXISTS {$this->getTable('mst_pdp_group')};
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_group')} (
		id int(11) unsigned NOT NULL AUTO_INCREMENT,
		title varchar(500) NOT NULL,
		status smallint(2) NOT NULL DEFAULT 1,
		sort int NOT NULL DEFAULT 0,
		description TEXT,
		PRIMARY KEY (id)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;
	DROP TABLE IF EXISTS {$this->getTable('mst_pdp_options')};
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_options')} (
		id int(11) unsigned NOT NULL AUTO_INCREMENT,
		design_id int(11) unsigned NOT NULL,
		option_label varchar(500) NOT NULL,
		price varchar(50) NOT NULL,
		sort int NOT NULL DEFAULT 0,
		PRIMARY KEY (id)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;
	DROP TABLE IF EXISTS {$this->getTable('mst_pdp_template')};
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_template')} (
		id int(11) unsigned NOT NULL AUTO_INCREMENT,
		customer_id int NOT NULL,
		pdp_design text NOT NULL,
		status smallint(6) NOT NULL DEFAULT '1',
		created_time datetime DEFAULT NULL,
		update_time datetime DEFAULT NULL,
		PRIMARY KEY (id)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
	DROP TABLE IF EXISTS {$this->getTable('mst_pdp_act')};
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_act')} (
		act_id int(11) NOT NULL AUTO_INCREMENT,
		domain_count varchar(255) NOT NULL,
		domain_list varchar(255) NOT NULL,
		path varchar(255) NOT NULL,
		extension_code varchar(255) NOT NULL,
		act_key varchar(255) NOT NULL,
		created_time date NOT NULL,
		domains varchar(255) NOT NULL,
		is_valid tinyint(1) NOT NULL DEFAULT '0',
		PRIMARY KEY (act_id)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
	DROP TABLE IF EXISTS {$this->getTable('mst_pdp_admin_template')};
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_admin_template')} (
	  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	  `product_id` int(11) NOT NULL,
	  `pdp_design` text NOT NULL,
	  `status` smallint(6) NOT NULL DEFAULT '1',
	  `created_time` datetime DEFAULT NULL,
	  `update_time` datetime DEFAULT NULL,
	  PRIMARY KEY (`id`)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
");
$installer->endSetup(); 
