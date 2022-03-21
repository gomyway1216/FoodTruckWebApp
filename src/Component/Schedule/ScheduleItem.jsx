import React from 'react';
import PropTypes from 'prop-types';
import { getWeekDay } from '../../utils/utils';
import styles from './schedule-item.module.scss';

export const ScheduleItem = (props) => {
  return (
    <div className={styles.scheduleItemRoot}>
      <div>{props.startTime.getMonth()+1}/{props.startTime.getDate()}</div>
      <div>{getWeekDay(props.startTime)}</div>
      <div>{props.startTime.getHours()}:{props.startTime.getMinutes()} - {props.endTime.getHours()}:{props.endTime.getMinutes()}</div>
      <div className={styles.location}>{props.location}</div>
    </div>
  );
};

ScheduleItem.propTypes = {
  startTime: PropTypes.instanceOf(Date),
  endTime: PropTypes.instanceOf(Date),
  location: PropTypes.string.isRequired
};

export default ScheduleItem;