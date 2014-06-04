<?php
class MST_Pdp_Model_Mysql4_Pdpoption extends Mage_Core_Model_Mysql4_Abstract
{
    public function _construct()
    {
        $this->_init('pdp/pdpoption', 'id');
    }
}