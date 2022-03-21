import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as api from '../../Firebase/home';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, 
  FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import styles from './edit-menu-modal.module.scss';

const defaultItem = {
  id: '',
  title: '',
  subTitle: '',
  type: {
    id: '',
    name: ''
  },
  price: 0,
  description: '',
  isPublic: false,
  isAvailable: false,
  image: ''
};


const AddMenuModal = (props) => {
  const [open, setOpen] = useState(props.open);
  const [dialogItem, setDialogItem] = useState(defaultItem);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const onItemInputChange = (e) => {
    setDialogItem({
      ...dialogItem,
      [e.target.name]: e.target.value
    });
  };

  const onSelectInputChange = (e) => {
    setDialogItem({
      ...dialogItem,
      [e.target.name]: props.menuTypeList.filter(m => m.id === e.target.value)[0]
    });
  };

  const onSwitchChange = (e) => {
    setDialogItem({
      ...dialogItem,
      [e.target.name]: e.target.checked
    });
  };

  const onFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    const downloadURL = await api.getMenuImageRef(selectedFile);
    setDialogItem({
      ...dialogItem,
      'image': downloadURL
    });
  };

  const onSave = async (item) => {
    try {
      item.price = Number(item.price);
      setLoading(true);
      const docId = await api.addMenu(item);
      if (docId) {
        // TODO: creat response handler
        props.onClose();
        setDialogItem(defaultItem);
        props.callback();
      } else {
        console.error('saving the new menu failed.');
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderInputFields = (item) => {
    if (item.includes('is')) {
      return <FormControlLabel
        control={<Switch
          name={item}
          checked={dialogItem[item]}
          onChange={onSwitchChange}
        />}
        label={item}
        labelPlacement="start"
      />;
    } else if (item.includes('type')) {
      return <FormControl>
        <InputLabel id="orderby-select-label">Type</InputLabel>
        <Select
          id="type"
          name="type"
          value={dialogItem[item].id}
          onChange={onSelectInputChange}
          className={styles.type}
          style={{width: 200}}
        >
          {props.menuTypeList.map((type, i) =>
            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
          )}
        </Select>
      </FormControl>;
    } else if (item === 'price') {
      return <TextField id={item} name={item} label={item}
        disabled={item === 'id'}
        fullWidth
        value={dialogItem[item]}
        type="number"
        onChange={onItemInputChange}/>;
    } else {
      return <TextField id={item} name={item} label={item}
        disabled={item === 'id'}
        fullWidth
        value={dialogItem[item]} 
        onChange={onItemInputChange}/>;
    }
  };
  
  return (
    <div>
      <Dialog open={open} onClose={() => props.onClose()} fullWidth>
        <DialogTitle>Modify Menu</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid container item={true} xs={12} sm={12} md={12}>
              <Grid item={true}>
                <DialogContentText>
        Please update the values as you wish. After changes are done, click save to store the latest data.
                </DialogContentText>
                <div className={styles.imageContainer}>
                  <img className={styles.mainImage} src={dialogItem['image']} alt="Main image"/>
                </div>
                <div>
                  <div>Main Image</div>
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={onFileChange}
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span">
          Upload
                    </Button>
                  </label>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid container item={true} spacing={3}>      
            {Object.keys(defaultItem).map((item, i) => (
              <Grid key={item} item={true} xs={12} sm={12} md={12}>
                { renderInputFields(item)}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.onClose()}>Cancel</Button>
          <Button onClick={() => onSave(dialogItem)}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddMenuModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
  menuTypeList: PropTypes.array.isRequired
};

export default AddMenuModal;