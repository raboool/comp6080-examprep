import React from 'react';
import { styled } from '@mui/material/styles';

const useStyles = styled(() => ({
  footer: {
    backgroundColor: '#999999',
    width: '100%',
    height: '50px',
    position: 'absolute',
    bottom: 0,
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}></footer>
  );
}

export default Footer;