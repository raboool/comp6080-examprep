import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Typography from '@mui/material/Typography';

const useStyles = styled(() => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      position: 'relative',
      minHeight: '100vh',
    },
    main: {
        flexGrow: 1,
        paddingBottom: '50px',
        paddingTop: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    heading1: {
        color: 'red',
        fontSize: '2em',
    },
    link: {
        fontSize: '12pt',
    },
  }));

function Dashboard() {
    const classes = useStyles();
    const [count, setCount] = React.useState(0);

    useEffect(() => {
        if (localStorage.getItem('won')) {
            setCount(localStorage.getItem('won'));
        } else {
            resetWins();
        }
    }, []);

    const resetWins = () => {
        console.log("reset wins");
    };

    return(
        <div className={classes.root}>
            <Header />
            <main className={classes.main}>
                <Typography className={classes.heading1}>Please choose an option from the navbar.</Typography>
                <Typography className={classes.heading2}>
                    Games won: {count}
                    <Link component="button" className={classes.link} onClick={resetWins} color="inherit">(reset)</Link>
                </Typography>
            </main>
            <Footer />
        </div>
    );
}

export default Dashboard;
