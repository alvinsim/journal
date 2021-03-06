import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './EntryWall.css';
import groupBy from 'lodash/groupBy';
import EntryItem from './EntryItem.js';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 20,
    '& .photoList': { float: 'right', marginLeft: 5 },
    '& img': { height: 40, margin: 1 },
    '& .MuiIconButton-root': { padding: 0 },
    '& li': { clear: 'both' }
  },
    items: { listStyle: 'none', paddingInlineStart: '10px' },
  category: { fontWeight: 'bold' },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
        marginBottom: 12,
  },
}));

function CategoryTree(data) {
    const classes = useStyles();
    return <li>
             <div className={classes.category}>{data.category}</div>
             <ul className={classes.items}>
               {data.entries.map((entry, key) => {
                   return <li key={key}><EntryItem entry={entry} onClick={data.onClick} onSubmit={data.onSubmit} selected={data.selected} /></li>;
               })}
             </ul>
           </li>;
}

export default function EntryTree(data) {
    const classes = useStyles();
    const [ byCategory, setByCategory ] = useState([]);
    useEffect(() => {
        setByCategory(Object.entries(groupBy(data.entries, e => e.Category || 'Uncategorized')));  
    }, [data, data.entries]);
    if (data.sort === 'category') {
        return <ul className={classes.root}>{byCategory.map((e) => <CategoryTree key={e[0]} selected={data.selected} category={e[0]} entries={e[1]} onSubmit={data.onSubmit} onClick={data.onClick} />)}</ul>;        
    } else {
        if (data.entries) {
            return <ul className={classes.root}>{
                data.entries.map((e, k) => {
                    return <li key={k}><EntryItem entry={e} onClick={data.onClick} onSubmit={data.onSubmit} selected={data.selected} /></li>;
                })}</ul>;
        } else {
            return null;
        }
    }
}
