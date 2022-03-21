import React, { useEffect, useState } from 'react';
import * as api from '../../Firebase/home';
import MenuTable from '../../Component/Admin/MenuTable';
import styles from './admin-page.module.scss';

const AdminPage = () => {

  return (
    <div className={styles.adminPageRoot}>
      <div className={styles.section}>
        <div className={styles.title}>Menu</div>
        <MenuTable />
      </div>
    </div>
  );
};

export default AdminPage;