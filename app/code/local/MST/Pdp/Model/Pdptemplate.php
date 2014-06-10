<?php

class MST_Pdp_Model_Pdptemplate extends Mage_Core_Model_Abstract
{

    public function _construct()
    {
        parent::_construct();
        $this->_init('pdp/pdptemplate');
    }

    public function savePdpTemplate($data)
    {
        $model = Mage::getModel('pdp/pdptemplate');
        if ($data['id'] != "") {
            $data['update_time'] = now();
            $model->setData($data)->setId($data['id']);
            $model->save();
        }
        else {
            $data['created_time'] = now();
            $data['update_time'] = now();
            $model->setData($data)->setId(NULL);
            $model->save();
        }
    }

}
