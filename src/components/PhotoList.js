import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OverflowWrapper from 'react-overflow-wrapper';

const useStyles = makeStyles(theme => ({
  scrollMenu: { position: 'sticky', top: 0, zIndex: 2 },
  delete: { position: 'absolute', right: 0, bottom: 0 },
  selected: { position: 'relative', border: '2px solid blue', height: 100 },
  img: { position: 'relative', border: '2px solid white', height: 100 }}));

function Photo(data) {
  const classes = useStyles();
  const handleClick = (e, p) => {
    if (data.onClick) { data.onClick(e, p); }
  };
    if (typeof data.photo == 'string') {
        return <img onClick={(e) => handleClick(e, data.photo)} alt={data.photo}
                    className={classes[data.isSelected ? 'selected' : 'img']}
                    data-filename={data.photo} src={'/thumbnails/' + data.photo} />;
    } else if (Array.isArray(data.photo)) {
        return <img onClick={(e) => handleClick(e, data.photo[0])} alt={data.photo[0]}
                    className={classes[data.isSelected ? 'selected' : 'img']}
                    data-filename={data.photo[0]} src={'/thumbnails/' + data.photo[0]} />;
    } else {
        return <img onClick={(e) => handleClick(e, data.photo.filename)} alt={data.photo.filename}
                    className={classes[data.isSelected ? 'selected' : 'img']}
                    data-filename={data.photo.filename} src={'/thumbnails/' + data.photo.filename} />;
    }
}

function PhotoList(data) {
  const classes = useStyles();
    if (!data || !data.data) return null;
    const menu = data.data.map((p) => {
        return <Photo key={p.filename || p} isSelected={data.selected && data.selected.includes(p)} onClick={data.onClick} photo={p}/>;
    });
  if (data.scroll) {
    return <div className={classes.scrollMenu}><OverflowWrapper>{menu}</OverflowWrapper></div>;
  } else {
    return <div className="photoList"><div>{menu}</div></div>;
  }
}

export default PhotoList;
