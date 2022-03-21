import React, { useEffect, useState } from 'react';
import * as api from '../../Firebase/home';
import MenuItem from './MenuItem';
import styles from './menu.module.scss';

const Menu = () => {
  const [menuList, setMenuList] = useState([]);

  const getMenuList = async () => {
    const menus = await api.getPublicMenuList();
    setMenuList(menus);
  };

  const getMainMenu = () => {
    return menuList.filter(menu => menu.type.name === 'Main');
  };

  const getSideMenu = () => {
    return menuList.filter(menu => menu.type.name === 'Side');
  };

  const getDrinkMenu = () => {
    return menuList.filter(menu => menu.type.name === 'Drink');
  };

  const getSoup = () => {
    return menuList.filter(menu => menu.type.name === 'Soup');
  };

  useEffect(() => {
    getMenuList();
  }, []);

  return (
    <div className={styles.menuListRoot}>
      <div className={styles.title}>Menu</div>
      <div className={styles.menuListWrapper}>
        <div className={styles.category}>
          <div className={styles.sectionTitle}>Main</div>
          {menuList && getMainMenu().map(item => 
            <MenuItem key={item.id} item={item}/>)}
        </div>
        <div className={styles.category}>
          <div className={styles.sectionTitle}>Side</div>
          {menuList && getSideMenu().map(item => 
            <MenuItem key={item.id} item={item}/>)}
        </div>
        <div className={styles.category}>
          <div className={styles.sectionTitle}>Soup</div>
          {menuList && getSoup().map(item => 
            <MenuItem key={item.id} item={item}/>)}
        </div>
        <div className={styles.category}>
          <div className={styles.sectionTitle}>Drink</div>
          {menuList && getDrinkMenu().map(item => 
            <MenuItem key={item.id} item={item}/>)}
        </div>
      </div>
    </div>
  );
};

export default Menu;