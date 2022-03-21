import React from 'react';
import styles from './about.module.scss';

const About = () => {
  return (
    <div className={styles.aboutRoot}>
      <div className={styles.title}>About</div>
      <div className={styles.content}>
        <div className={styles.description}>
         I want to spread the appeal of Tokachi
        </div>
        <div className={styles.descriptionDetails}>
          I was born and raised in Tokachi, Hokkaido, Japan, a region known as a treasure trove of food with a self-sufficiency rate of over 1,300 percent. Tokachi is one of the top gastronomic regions in Japan. I founded the company with the hope of spreading the culture of food that I had cultivated there to the Bay Area.
          I feel that onigiri is such a wonderful way to fuse Japanese and American cultures.
          I have a strong desire to convey happiness through food to everyone.
        </div>
      </div>
    </div>

  );
};

export default About;