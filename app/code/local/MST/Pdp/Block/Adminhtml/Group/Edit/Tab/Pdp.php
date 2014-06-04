<?php

class MST_Pdp_Block_Adminhtml_Group_Edit_Tab_Pdp extends Mage_Adminhtml_Block_Widget_Grid
{
	public function __construct()
	{
		parent::__construct();
		$this->setId('pdpGrid');
		$this->setUseAjax(true);
		$this->setDefaultSort('pdp_id');
		$this->setDefaultFilter(array('in_products' => 1)); // By default we have added a filter for the rows, that in_products value to be 1
		$this->setSaveParametersInSession(false);  //Dont save paramters in session or else it creates problems
	}
    protected function _prepareCollection()
	{
		$collection = Mage::getModel('pdp/design')->getCollection();
		$this->setCollection($collection);
		return parent::_prepareCollection();
	}

	protected function _addColumnFilterToCollection($column)
	{
		// Set custom filter for in product flag
		//$categoryId = $this->getRequest()->getParam('id');
		if ($column->getId() == 'in_products') {
			$ids = $this->_getSelectedPdp();
			if (empty($ids)) {
				$ids = 0;
			}
			if ($column->getFilter()->getValue()) {
				$this->getCollection()->addFieldToFilter('id', array('in'=>$ids));
			} else {
				if($ids) {
					$this->getCollection()->addFieldToFilter('id', array('nin'=>$ids));
				}
			}
		} else {
			parent::_addColumnFilterToCollection($column);
		}
		return $this;
	}

	protected function _prepareColumns()
	{
		$this->addColumn('in_products', array(
			'header_css_class'  => 'a-center',
			'type'              => 'checkbox',
			//'field_name'        => 'artworks[]',
			'values'            => $this->_getSelectedPdp(),
			'align'             => 'center',
			'index'             => 'id'
		));
		$this->addColumn('pdp_id', array(
			'header'    => Mage::helper('pdp')->__('ID'),
			'width'     => '50px',
			'index'     => 'id',
			'type'  => 'number',
		));
		$this->addColumn('pdptitle', array(
			'header'    => Mage::helper('pdp')->__('Title'),
			'index'     => 'title',
		));
		$this->addColumn('filename', array(
			'header'    => Mage::helper('pdp')->__('Front Preview'),
			'index'     => 'filename',
			'renderer' 	=> 'pdp/adminhtml_template_grid_renderer_image',
		));
		$this->addColumn('filename_back', array(
			'header'    => Mage::helper('pdp')->__('Back Preview'),
			'index'     => 'filename',
			'renderer' 	=> 'pdp/adminhtml_template_grid_renderer_image',
		));
		//$this->addColumn('price', array(
	//	'header'    => Mage::helper('pdp')->__('Price'),
		//	'index'     => 'price',
	//	));
		$this->addColumn('position', array(
            'header'            => Mage::helper('pdp')->__('Position'),
            'name'              => 'position',
            'width'             => 60,
            'type'              => 'number',
            'validate_class'    => 'validate-number',
            'index'             => 'position',
            'editable'          => true,
            'edit_only'         => true
        ));
		return parent::_prepareColumns();
	}
	protected function _getSelectedPdp()   // Used in grid to return selected images values.
	{
		$images = array_keys($this->getSelectedPdp());
		return $images;
	}
	public function getGridUrl()
	{
		return $this->_getData('grid_url') ? $this->_getData('grid_url') : $this->getUrl('*/*/pdpgrid', array('_current'=>true));
	}
	public function getSelectedPdp()
	{
		$tm_id = $this->getRequest()->getParam('id');
		if(!isset($tm_id)) {
			$tm_id = 0;
		}
		$collection = Mage::getModel('pdp/design')->getCollection();
		$collection->addFieldToFilter('pdpgroup',$tm_id);
		$custIds = array();
		foreach($collection as $obj){
			$custIds[$obj->getId()] = array('position' => $obj->getPosition());
		}
		return $custIds;
	}
}