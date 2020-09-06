import React from 'react'
import { Table } from 'antd';

const Etable = (props) => {
	const onRowClick = (record,index)=>{
		let rowSelection = props.rowSelection;
		if (rowSelection === 'checkbox'){
			let selectedRowKeys = props.selectedRowKeys;
			let selectedItem = props.selectedItem;
			let selectedIds = props.selectedIds;
			let setInfo = props.setInfo
				if (selectedIds){
					const i = selectedIds.indexOf(record.id);
					if(i === -1){
						selectedIds.push(record.id);
						selectedRowKeys.push(index);
						selectedItem.push(record);
					}else{
						selectedIds.splice(i,1);
						selectedRowKeys.splice(i, 1);
						selectedItem.splice(i, 1);
					}
				}else{
					selectedIds = [record.id];
					selectedRowKeys = [index];
					selectedItem = [record];
				}
				props.updateSelectedItem(selectedRowKeys, selectedItem, selectedIds, setInfo)
		}else{
			let selectedRowKeys = [index];
			let selectedItem = record;
			let setInfo = props.setInfo;
			props.updateSelectedItem(selectedRowKeys, selectedItem, setInfo)
		}
	}

	const tableInit = () => {
		let row_selection = props.rowSelection;
		let selectedRowKeys = props.selectedRowKeys;
		const rowSelection = {
			type:'radio',
			selectedRowKeys
		}
		if (row_selection === false || row_selection === null){
			row_selection = false;
		} else if (row_selection === 'checkbox'){
			rowSelection.type = 'checkbox';
		} else {
			row_selection = 'radio';
		}
		return <Table
			bordered
			{...props}
			rowSelection={row_selection ? rowSelection:null}
			onRow={(record, index) => {
				return {
					onClick: () => {
						if (!row_selection){
								return;
						}
						onRowClick(record, index);
					}
				};
			}}
		/>
}
		return (
				<div>
					{ tableInit() }	
				</div>
		)
}

export default Etable
