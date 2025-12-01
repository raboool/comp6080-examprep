import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import Header from '../components/Header';
import Footer from '../components/Footer';

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
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        margin: '20px',
        marginBottom: '100px',
        width: 'calc(100% - 40px)',
    },
    cell: {
        width: 'calc(10% - 2px)',
        height: 40,
        border: '1px solid #333333',
    },
    cellActive: {
        width: 'calc(10% - 2px)',
        height: 40,
        border: '1px solid #333333',
        backgroundColor: '#db1d59',
    },
    resetButton: {
        margin: 15,
    },
  }));

function TetroPage() {
    const classes = useStyles();
    const [objCount, setObjCount] = useState(1);
    const [grid, setGrid] = useState(new Array(120).fill(0));
    const [active, setActive] = useState(false);
    const [currentBlock, setCurrentBlock] = useState(false);
    const [checkForLoss, setCheckForLoss] = useState(false);

    const activateGame = () => {
        setActive(true);
    };

    const resetGame = () => {
        setActive(false);
        setGrid(new Array(120).fill(0));
        setCurrentBlock(false);
        setObjCount(1);
        setCheckForLoss(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (active) {
                if (checkForLoss) {
                    for (let col = 0; col < 10; col++) {
                        if (grid[10 + col] > 0) {
                            alert('Failed');
                            window.location.reload();
                        }
                    }
                    setCheckForLoss(false);
                }
                if (!currentBlock) {
                    // Create new block
                    const newGrid = grid.slice();
                    const randomInt = Math.floor(Math.random() * 3);
                    if (randomInt === 0) {
                        // 2 x 2 
                        newGrid[0] = objCount;
                        newGrid[1] = objCount;
                        newGrid[10] = objCount;
                        newGrid[11] = objCount;
                    } else if (randomInt === 1) {
                        // 2 h x 1w
                        newGrid[0] = objCount;
                        newGrid[10] = objCount;
                    } else if (randomInt === 2) {
                        // 1 x 1
                        newGrid[0] = objCount;
                    }
                    setCurrentBlock(true);
                    setGrid(newGrid);
                    setObjCount(objCount + 1);
                    setCheckForLoss(false);
                } else {
                    // Shift board down
                    const newGrid = grid.slice();
                    let moved = false;
                    for(let row = 11; row > 0; row--) {
                        for (let col = 0; col < 10; col++) { 
                            if (newGrid[row * 10 + col] === 0 && newGrid[(row - 1) * 10 + col] > 1) {
                                if (col + 1 < 10 && newGrid[(row - 1) * 10 + col] === newGrid[(row - 1) * 10 + col + 1]) {
                                    // 2x2 block - neighbour right
                                    if (newGrid[row * 10 + col + 1] === 0) {
                                        newGrid[row * 10 + col] = newGrid[(row - 1) * 10 + col];
                                        newGrid[row * 10 + col + 1] = newGrid[(row - 1) * 10 + col + 1];
                                        newGrid[(row - 1) * 10 + col] = 0;
                                        newGrid[(row - 1) * 10 + col + 1] = 0;
                                        moved = true;
                                    } 
                                } else if (col - 1 >= 0 && newGrid[(row - 1) * 10 + col] === newGrid[(row - 1) * 10 + col - 1]) {
                                    // nothing
                                } else {
                                    // 1 x 1 block
                                    newGrid[row * 10 + col] = newGrid[(row - 1) * 10 + col];
                                    newGrid[(row - 1) * 10 + col] = 0;
                                    moved = true;
                                }
                            }
                        }
                    }
                    setGrid(newGrid);
                    if (moved === false) setCurrentBlock(false);
                    setCheckForLoss(moved);
                }
                
            }
        }, 200);
      
        return () => clearInterval(interval);
    }, [active, grid, currentBlock, setCurrentBlock]);

    return(
        <div className={classes.root}>
            <Header />
            <main className={classes.main}>
                <div className={classes.grid} onClick={activateGame}>
                    { grid.map((cell, index) => {
                        if (cell > 0) {
                            return <div className={classes.cellActive} key={index}></div>
                        } else {
                            return <div className={classes.cell} key={index}></div>
                        }
                    })}
                    <Button className={classes.resetButton} color="secondary" variant="contained" onClick={resetGame}>Reset</Button>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default TetroPage;
