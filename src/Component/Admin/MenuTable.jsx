import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as api from '../../Firebase/home';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import ReplayIcon from '@mui/icons-material/Replay';
import EditIcon from '@mui/icons-material/Edit';
import EditMenuModal from './EditMenuModal';
import AddMenuModal from './AddMenuModal';
import styles from './menu-table.module.scss';

const MenuTable = () => {
  const [menuList, setMenuList] = useState([]);
  const [menuTypeList, setMenuTypeList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogItem, setDialogItem] = useState({});
  const [addMenuDialogOpen, setAddMenuDialogOpen] = useState(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'subTitle', headerName: 'Sub Title', width: 200 },
    { field: 'type', valueGetter: (params) => params.row.type.name, headerName: 'Type', width: 80 },
    { field: 'price', headerName: 'Price', width: 70 },
    { field: 'description', headerName: 'Description', width: 350 },
    { field: 'isPublic', headerName: 'Public', width: 70 },
    { field: 'isAvailable', headerName: 'Available', width: 80 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          setDialogItem(params.row);
          handleDialogOpen();
        };
        return (
          <Tooltip title="edit">
            <IconButton aria-label="edit" onClick={onClick} color="primary">
              <EditIcon />
            </IconButton>
          </Tooltip>
        );
      },
    }
  ];

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const getMenuList = async () => {
    const menus = await api.getMenuList();
    setMenuList(menus);
  };

  const getMenuTypeList = async () => {
    const menuTypes = await api.getMenuTypeList();
    setMenuTypeList(menuTypes);
  };

  useEffect(() => {
    getMenuList();
    getMenuTypeList();
  }, []);

  const handleAddMenuClick = () => {
    setAddMenuDialogOpen(true);
  };

  const handleAddMenuDialogClose = () => {
    setAddMenuDialogOpen(false);
  };

  return (
    <div className={styles.menuTableRoot}>
      <div className={styles.commands}>
        <Button onClick={handleAddMenuClick} variant="outlined" >Add menu</Button>
        <Button onClick={getMenuList} variant="outlined" startIcon={<ReplayIcon />}>Update</Button>
      </div>
      <DataGrid
        rows={menuList}
        columns={columns}
      />
      <EditMenuModal item={dialogItem} open={dialogOpen} onClose={handleDialogClose} callback={getMenuList} menuTypeList={menuTypeList}/>
      <AddMenuModal open={addMenuDialogOpen} onClose={handleAddMenuDialogClose} callback={getMenuList} menuTypeList={menuTypeList}/>
    </div>
  );
};

export default MenuTable;