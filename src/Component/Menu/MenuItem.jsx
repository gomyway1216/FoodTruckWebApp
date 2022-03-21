import React from 'react';
import PropTypes from 'prop-types';
import styles from './menu-item.module.scss';

const MenuItem = (props) => {
  const item = props.item;

  return (
    <div className={styles.menuItemRoot}>
      <div className={styles.imageWrapper}>
        <img className={styles.mainImage} src={item.image} alt="Main image"/>
      </div>
      <div className={styles.menuContent}>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.subTitle}>{item.subTitle}</div>
        <div className={styles.price}>${item.price}</div>
        <div className={styles.description}>{item.description}</div>
        {!item.isAvailable && <div className={styles.isAvailable}>Sold out!</div>}
      </div>
    </div>
  );
};

MenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    type: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }),
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    isAvailable: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired
  })
};

export default MenuItem;