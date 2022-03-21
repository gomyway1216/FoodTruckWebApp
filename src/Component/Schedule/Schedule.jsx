import React, { useEffect, useState } from 'react';
import * as api from '../../Firebase/home';
import ScheduleItem from './ScheduleItem';
import styles from './schedule.module.scss';

export const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  const getSchedule = async () => {
    const sch = await api.getSchedule();
    setSchedule(sch);
  };

  useEffect(() => {
    getSchedule();
  }, []);
  
  return (
    <div className={styles.scheduleRoot}>
      <div className={styles.title}>Schedule for this week</div>
      <div className={styles.schedule}>
        {schedule && schedule.map(item => 
          <ScheduleItem key={item.id} startTime={item.startTime} endTime={item.endTime} location={item.location}/>)}
      </div>
    </div>

  );
};

export default Schedule;