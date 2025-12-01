import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { strs } from '../data/blanko';

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
    gameContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 20,
    },
    box: {
        height: 50,
        width: 50,
        border: '1pt solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
  }));

function BlankoPage() {
    const classes = useStyles();
    const [word, setWord] = useState("");
    const [missing, setMissing] = useState([]);

    useEffect(() => {
        resetGame();
    }, []);

    const resetForm = () => {
        missing.forEach((idx) => {
            document.getElementById(`box-${idx}`).value = '';
        });
    };

    const resetGame = () => {
        resetForm();
        const randomInt = Math.floor(Math.random() * strs.length);
        const chosenWord = strs[randomInt];
        const blankIndices = [];

        for(let i = 0; i < 3; i++) {
            let random = Math.floor(Math.random() * 12);
            while(chosenWord[random] === ' ' || chosenWord[random] === '_' || blankIndices.includes(random)) {
                random = Math.floor(Math.random() * 12);
            }
            blankIndices.push(random);
        }

        setWord(chosenWord);
        setMissing(blankIndices);
    };

    const handleInput = () => {
        if (document.getElementById(`box-${missing[0]}`).value == word[missing[0]] &&
            document.getElementById(`box-${missing[1]}`).value == word[missing[1]] &&
            document.getElementById(`box-${missing[2]}`).value == word[missing[2]]) {
                alert('Correct!');
                localStorage.setItem('won', parseInt(localStorage.getItem('won')) + 1);
                resetGame();
        }
    }

    return(
        <div className={classes.root}>
            <Header />
            <main className={classes.main}>
                <div className={classes.gameContainer}>
                    { word.split('').map((letter, idx) => {
                        if (missing.includes(idx)) {
                            return (
                                <div key={idx} className={classes.box}>
                                    <TextField 
                                        id={`box-${idx}`}
                                        inputProps={{ maxLength: 1, style: { textAlign: 'center' }}}
                                        onChange={handleInput}
                                    />
                                </div>
                            )
                        } else {
                            return <div key={idx} className={classes.box}>{letter}</div>
                        }
                    })}
                </div>
                <Button color="primary" variant="contained" onClick={resetGame}>Reset</Button>
            </main>
            <Footer />
        </div>
    );
}

export default BlankoPage;
