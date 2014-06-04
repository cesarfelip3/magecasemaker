<?php
$installer = $this;
$installer->startSetup();
$installer->run("
	DROP TABLE IF EXISTS {$this->getTable('mst_pdp_colors')};
	CREATE TABLE IF NOT EXISTS {$this->getTable('mst_pdp_colors')} (
		`color_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
		`color_name` varchar(255) NOT NULL DEFAULT '',
		`color_code` varchar(500) NOT NULL DEFAULT '',
		`status` smallint(11) NOT NULL DEFAULT '1',
		`position` int(11) NOT NULL DEFAULT '0',
		PRIMARY KEY (`color_id`)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
	
	INSERT INTO {$this->getTable('mst_pdp_colors')} (`color_id`, `color_name`, `color_code`, `status`, `position`) VALUES
	(2, 'Aero Blue', 'C9FFE5', 1, 0),
	(3, 'African Violet', 'B284BE', 1, 0),
	(4, 'Air Superiority Blue', '72A0C1', 1, 0),
	(5, 'Alizarin Crimson', 'E32636', 1, 0),
	(6, 'Amazon', '3B7A57', 1, 0),
	(7, 'Android Green', 'A4C639', 1, 0),
	(8, 'Baker Miller Pink', 'FF91AF', 1, 0),
	(9, 'Ball Blue', '21ABCD', 1, 0),
	(10, 'Banana Yellow', 'FFE135', 1, 0),
	(11, 'Barbie Pink', 'E0218A', 1, 0),
	(12, 'Barn Red', '7C0A02', 1, 0),
	(13, 'Beau Blue', 'BCD4E6', 1, 0),
	(14, 'Beige', 'F5F5DC', 1, 0),
	(15, 'Bistre Brown', '967117', 1, 0),
	(16, 'Bitter Lemon', 'CAE00D', 1, 0),
	(17, 'Bittersweet', 'FE6F5E', 1, 0),
	(18, 'Black Olive', '3B3C36', 1, 0),
	(19, 'Blizzard Blue', 'ACE5EE', 1, 0),
	(20, 'Boston University Red', 'CC0000', 1, 0),
	(21, 'Burnt Umber', '8A3324', 1, 0),
	(22, 'Cadmium Orange', 'ED872D', 1, 0),
	(23, 'Camel', 'C19A6B', 1, 0),
	(24, 'Capri', '00BFFF', 1, 0),
	(25, 'Caribbean Green', '00CC99', 1, 0),
	(26, 'Carnation Pink', 'FFA6C9', 1, 0),
	(27, 'Carrot Orange', 'ED9121', 1, 0),
	(28, 'Cherry', 'DE3163', 1, 0),
	(29, 'Daffodil', 'FFFF31', 1, 0),
	(30, 'Dark Lava', '483C32', 1, 0),
	(31, 'Dark Orange', 'FF8C00', 1, 0);
");
$installer->endSetup(); 
