import React, { useRef, useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { Button } from '@mui/material';
import { useRefContext } from '../../Provider/RefProvider';
import * as homeApi from '../../Firebase/home';
import Schedule from '../../Component/Schedule/Schedule';
import Menu from '../../Component/Menu/Menu';
import About from '../../Component/About/About';
import styles from './home-page.module.scss';

const HomePage = () => {
  const { addRefs, modifyDisplayedItemList } = useRefContext();
  const [backgroundImage, setBackgroundImage] = useState();
  const homeRef = useRef();
  const menuRef = useRef();
  const aboutRef = useRef();
  useEffect(() => {
    const refList = [{ key: 'home', ref: homeRef } , { key: 'menu', ref: menuRef }, {key: 'about', ref: aboutRef }];
    addRefs(refList);
  }, []);

  const getBackgroundImage = async () => {
    const image = await homeApi.getImageRef('main_background.jpeg');
    setBackgroundImage(image);
  };

  useEffect(() => {
    getBackgroundImage();
  }, []);

  return (
    <div className={styles.homeRoot} style={{ scrollMarginTop: 280, scrollPaddingTop: 280}}>         
      <div 
        style={{ 
          backgroundImage: `url(${backgroundImage})`
        }} 
        className={styles.home} name='home'
      >   
        <InView
          as="div"
          onChange={(inView) => modifyDisplayedItemList('home', inView)}
        >
          <div ref={homeRef} className={styles.homeContent}>
            <div className={styles.title}>Tokachi Bowl</div>
            <div className={styles.subTitle}>- Japanese rice ball and bowl -</div>
            <Button>Coming soon...</Button>
            <Schedule/>
          </div>
        </InView>
      </div>  
      <InView
        as="div"
        onChange={(inView) => modifyDisplayedItemList('menu', inView)}
      >
        <div className={styles.menu} ref={menuRef} name="menu">
          <Menu />
        </div>
      </InView>
      <InView
        as="div"
        onChange={(inView) => modifyDisplayedItemList('about', inView)}
      >
        <div className={styles.about} ref={aboutRef} name="about">
          <About />
        </div>
      </InView> 
      <div className={styles.footer}>
        <div className={styles.copyright}>
        &copy; Copyright <strong>Tokachi Bowl</strong> All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default HomePage;