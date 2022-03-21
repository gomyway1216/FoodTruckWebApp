import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as api from '../../Firebase/home';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, 
  FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import styles from './edit-menu-modal.module.scss';


const EditMenuModal = (props) => {
  const [open, setOpen] = useState(props.open);
  const [dialogItem, setDialogItem] = useState(props.item);
  const { id, title, subTitle, type, price, description, isPublic, isAvailable } = props.item;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOpen(props.open);
    // trick to initialize dialogItem, without the below line, dialogItem is empty
    setDialogItem(props.item);
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
      await api.updateMenu(item);
      setLoading(false);
      props.onClose();
      props.callback();
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

  if (Object.keys(dialogItem).length === 0) {
    return <></>;
  }

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
            {Object.keys(props.item).map((item, i) => (
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

EditMenuModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    type: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    }),
    price: PropTypes.number,
    description: PropTypes.string,
    isPublic: PropTypes.bool,
    isAvailable: PropTypes.bool,
    image: PropTypes.string
  }),
  menuTypeList: PropTypes.array.isRequired
};

export default EditMenuModal;