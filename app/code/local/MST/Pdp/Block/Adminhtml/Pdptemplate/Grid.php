<?php
class MST_Pdp_Block_Adminhtml_Pdptemplate_Grid extends Mage_Adminhtml_Block_Widget_Grid {
	public function __construct() {
		parent::__construct ();
		$this->setId ( 'pdptemplateGrid' );
		$this->setDefaultSort ( 'update_time' );
		$this->setDefaultDir ( 'DESC' );
		$this->setSaveParametersInSession ( true );
	}
	protected function _prepareCollection() {
		$collection = Mage::getModel ( 'pdp/pdptemplate' )->getCollection ();
		$customerTableName = Mage::getSingleton('core/resource')->getTableName('customer/entity');
		$collection->getSelect()->join(array('t2' => $customerTableName),'main_table.customer_id = t2.entity_id', array('t2.email'));
		//echo count($collection);
		$this->setCollection ( $collection );
		return parent::_prepareCollection ();
	}
	protected function _prepareColumns() {
		$this->addColumn ( 'id', array (
				'header' => Mage::helper ( 'pdp' )->__ ( 'ID' ),
				'align' => 'left',
				'width' => '50px',
				'index' => 'id' 
		) );
		$this->addColumn ( 'email', array (
				'header' => Mage::helper ( 'pdp' )->__ ( 'Customer' ),
				'align' => 'left',
				'index' => 'email'
		) );
		$this->addColumn ( 'email', array (
				'header' => Mage::helper ( 'pdp' )->__ ( 'Customer Email' ),
				'align' => 'left',
				'index' => 'email'
		) );
		$this->addColumn ( 'created_time', array (
				'header' => Mage::helper ( 'pdp' )->__ ( 'Created Time' ),
				'align' => 'left',
				'index' => 'created_time'
		) );
		$this->addColumn ( 'update_time', array (
				'header' => Mage::helper ( 'pdp' )->__ ( 'Update Time' ),
				'align' => 'left',
				'index' => 'update_time'
		) );
		$this->addColumn ( 'status', array (
				'header' => Mage::helper ( 'pdp' )->__ ( 'Status' ),
				'align' => 'left',
				'width' => '80px',
				'index' => 'status',
				'type' => 'options',
				'options' => array (
						1 => 'Public',
						2 => 'Private' 
				) 
		) );
		
		$this->addColumn ( 'action', array (
				'header' => Mage::helper ( 'pdp' )->__ ( 'Action' ),
				'width' => '100',
				'type' => 'action',
				'getter' => 'getId',
				'actions' => array (
						array (
								'caption' => Mage::helper ( 'pdp' )->__ ( 'View' ),
								'url' => array (
									'base' => '*/*/view' 
								),
								'field' => 'id' 
						) 
				),
				'filter' => false,
				'sortable' => false,
				'index' => 'stores',
				'is_system' => true 
		) );
		
		$this->addExportType ( '*/*/exportCsv', Mage::helper ( 'pdp' )->__ ( 'CSV' ) );
		$this->addExportType ( '*/*/exportXml', Mage::helper ( 'pdp' )->__ ( 'XML' ) );
		
		return parent::_prepareColumns ();
	}
	protected function _prepareMassaction() {
		$this->setMassactionIdField ( 'id' );
		$this->getMassactionBlock ()->setFormFieldName ( 'pdptemplate' );
		
		$this->getMassactionBlock ()->addItem ( 'delete', array (
				'label' => Mage::helper ( 'pdp' )->__ ( 'Delete' ),
				'url' => $this->getUrl ( '*/*/massDelete' ),
				'confirm' => Mage::helper ( 'pdp' )->__ ( 'Are you sure?' ) 
		) );
		return $this;
	}
	public function getRowUrl($row) {
		return $this->getUrl ( '*/*/view', array (
				'id' => $row->getId () 
		) );
	}
}