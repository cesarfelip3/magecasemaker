<?php
class MST_Pdp_Block_Adminhtml_Designarea_Grid extends Mage_Adminhtml_Block_Widget_Grid
{
    public function __construct()
    {
        parent::__construct();
        $this->setId('designareaGrid');
		$this->setDefaultSort ( 'id' );
		$this->setDefaultDir ( 'ASC' );
        $this->setSaveParametersInSession(true);
    }
    protected function _prepareCollection() {
		$collection = Mage::getModel ( 'pdp/designarea' )->getCollection ();
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
		$this->addColumn ( 'label', array (
				'header' => Mage::helper ( 'pdp' )->__ ( 'Label' ),
				'align' => 'left',
				'index' => 'label'
		) );
		$this->addColumn ( 'is_required', array (
				'header' => Mage::helper ( 'pdp' )->__ ( 'Is Required' ),
				'align' => 'left',
				'index' => 'is_required',
				'type' => 'options',
				'options' => array (
						1 => 'Yes',
						2 => 'No'
				)
		) );
		$this->addColumn ( 'position', array (
				'header' => Mage::helper ( 'pdp' )->__ ( 'Position' ),
				'align' => 'left',
				'index' => 'position'
		) );
		$this->addColumn ( 'status', array (
				'header' => Mage::helper ( 'pdp' )->__ ( 'Status' ),
				'align' => 'left',
				'index' => 'status',
				'type' => 'options',
				'options' => array (
						1 => 'Enabled',
						2 => 'Disabled' 
				) 
		) );
		
		$this->addColumn ( 'action', array (
				'header' => Mage::helper ( 'pdp' )->__ ( 'Action' ),
				'width' => '100',
				'type' => 'action',
				'getter' => 'getId',
				'actions' => array (
						array (
								'caption' => Mage::helper ( 'pdp' )->__ ( 'Edit' ),
								'url' => array (
										'base' => '*/*/edit' 
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
		$this->getMassactionBlock ()->setFormFieldName ( 'group' );
		
		$this->getMassactionBlock ()->addItem ( 'delete', array (
				'label' => Mage::helper ( 'pdp' )->__ ( 'Delete' ),
				'url' => $this->getUrl ( '*/*/massDelete' ),
				'confirm' => Mage::helper ( 'pdp' )->__ ( 'Are you sure?' ) 
		) );
		$arr_status = array (
				array ('value' => 1, 'label' => Mage::helper ( 'pdp' )->__ ( 'Enabled' ) ),
				array ('value' => 2, 'label' => Mage::helper ( 'pdp' )->__ ( 'Disabled' ) ) 
		);
		array_unshift ( $arr_status, array (
				'label' => '',
				'value' => '' 
		) );
		$this->getMassactionBlock ()->addItem ( 'status', array (
				'label' => Mage::helper ( 'pdp' )->__ ( 'Change status' ),
				'url' => $this->getUrl ( '*/*/massStatus', array (
						'_current' => true 
				) ),
				'additional' => array (
						'visibility' => array (
								'name' => 'status',
								'type' => 'select',
								'class' => 'required-entry',
								'label' => Mage::helper ( 'pdp' )->__ ( 'Status' ),
								'values' => $statuses 
						) 
				) 
		) );
		return $this;
	}
	public function getRowUrl($row) {
		return $this->getUrl ( '*/*/edit', array (
				'id' => $row->getId () 
		) );
	}
}