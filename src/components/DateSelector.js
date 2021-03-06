import { addDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { DatePicker } from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import moment from 'moment';

const useStyles = makeStyles({
  date: { width: '120px', fontSize: 'small' }
});
export default function DateSelector(data) {
    const classes = useStyles();
    const previousDay = () => {
        data.onChange(addDays(data.value, -1));
    };
    const nextDay = () => {
        data.onChange(addDays(data.value, 1));
    };
    return (<div className="dateSelector">
            <Button onClick={previousDay}>&laquo;</Button>
            <DatePicker value={data.value} format="yyyy-MM-dd" onChange={data.onChange} className={classes.date}/>
            <Button onClick={nextDay}>&raquo;</Button>
            <Button component={Link} to={'/day/' + moment(data.value).format('YYYY-MM-DD')}>Go</Button>
          </div>);
}

