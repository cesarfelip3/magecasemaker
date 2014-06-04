<?php

$installer = $this;
$installer->startSetup();
$installer->run("
ALTER TABLE {$this->getTable('sales/order_item')}
ADD COLUMN `final_image` varchar(255) NULL default '';

");
$installer->endSetup();
