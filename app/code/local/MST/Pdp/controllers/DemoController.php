<?php

/**
 * MST_Pdp_DemoController
 * 
 * @author Santosh Moktan <itmyprofession@gmail.com>
 */
class MST_Pdp_DemoController extends Mage_Core_Controller_Front_Action
{

    public function indexAction()
    {
        echo $this->getLayout()
                ->createBlock('core/template')
                ->setTemplate('pdp/demo/demo.phtml')
                ->toHtml();
    }

}
