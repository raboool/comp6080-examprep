import React, { useEffect, useState, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import Header from '../components/Header';
import Footer from '../components/Footer';
import shrek1 from '../data/shrek/1.png';
import shrek2 from '../data/shrek/2.png';
import shrek3 from '../data/shrek/3.png';
import shrek4 from '../data/shrek/4.png';
import shrek5 from '../data/shrek/5.png';
import shrek6 from '../data/shrek/6.png';
import shrek7 from '../data/shrek/7.png';
import shrek8 from '../data/shrek/8.png';

const shrekImages = [
    shrek1, shrek2, shrek3,
    shrek4, shrek5, shrek6,
    shrek7, shrek8, ""
]

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
        flexDirection: 'column',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    cell: {
        height: '150px',
        width: '150px',
        border: '1px solid #333',
        margin: '0px',
    },
    buttonContainer: {
        margin: 15,
        width: '450px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
  }));

function SlidoPage() {
    const classes = useStyles();
    const [grid, setGrid] = useState(new Array(9));
    const [solved, setSolved] = useState(false);
    const [moveMade, setmoveMade] = useState(false);

    const shuffleArray = (array) => {
        for(let i = 0; i < array.length; i++) {
            const r = Math.floor(Math.random() * array.length);
            const temp = array[i];
            array[i] = array[r];
            array[r] = temp;
        }
    };

    const handleCellMove = (index) => {
        const gridCopy = grid.slice();
        // Check move up
        if (index - 3 >= 0 && grid[index - 3] === 8) {
            const temp = gridCopy[index];
            gridCopy[index] = gridCopy[index - 3];
            gridCopy[index - 3] = temp;
            setmoveMade(true);
        // Check move left
        } else if (![0, 3, 6].includes(index) && grid[index - 1] === 8) {
            const temp = gridCopy[index];
            gridCopy[index] = gridCopy[index - 1];
            gridCopy[index - 1] = temp;
            setmoveMade(true);
        // Check move right
        } else if (![2, 5, 8].includes(index) && grid[index + 1] === 8) {
            const temp = gridCopy[index];
            gridCopy[index] = gridCopy[index + 1];
            gridCopy[index + 1] = temp;
            setmoveMade(true);
        // Check move down
        } else if (index + 3 < 9 && grid[index + 3] === 8) {
            const temp = gridCopy[index];
            gridCopy[index] = gridCopy[index + 3];
            gridCopy[index + 3] = temp;
            setmoveMade(true);
        }
        setGrid(gridCopy);
        if (gridCopy.every((item, index) => item === index)) {
            setSolved(true);
            setTimeout(() => {
                alert('Correct!');
                localStorage.setItem('won', parseInt(localStorage.getItem('won')) + 1);
                resetGame();
            }, 500);
        }
    };

    // const moveLeft = ()  => {
    //     console.log(grid);
    //     const blankIndex = grid.indexOf(8);
    //     console.log(blankIndex);
    //     if (![2, 5, 8].includes(blankIndex)) {
    //         const gridCopy = grid.slice();
    //         const temp = gridCopy[blankIndex];
    //         gridCopy[blankIndex] = gridCopy[blankIndex + 1];
    //         gridCopy[blankIndex + 1] = temp;
    //         setGrid(gridCopy);
    //         if (gridCopy.every((item, index) => item === index)) {
    //             setTimeout(() => {
    //                 alert('Correct!');
    //                 localStorage.setItem('won', parseInt(localStorage.getItem('won')) + 1);
    //                 resetGame();
    //             }, 500);
    //         }
    //     }    
    
    // };

    // const handleKeyPress = useCallback((event) => {
    //     switch (event.key) {
    //         case "ArrowUp":
    //             moveUp(grid, setGrid, resetGame);
    //             break;
    //         case "ArrowDown":
    //             console.log('down');
    //             break;
    //         case "ArrowLeft":
    //             moveLeft();
    //             break;
    //         case "ArrowRight":
    //             console.log('right');
    //             break;
    //         default:
    //     }
    
    // }, [grid]);

    useEffect(() => {
        resetGame();

        // document.addEventListener('keydown', handleKeyPress, false);

        // return () => {
        //   document.removeEventListener('keydown', handleKeyPress, false);
        // };

    }, []);

    const resetGame = () => {
        const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        while (array.every((item, index) => item === index)) {
            shuffleArray(array);
        }
        setGrid(array);
        //setGrid([0, 1, 2, 3, 4, 5, 6, 8, 7]);
        setSolved(false);
        setmoveMade(false);
    }

    const Solve = () => {
        setGrid([0, 1, 2, 3, 4, 5, 6, 7, 8]);
        setSolved(true);
        setmoveMade(true);
    };

    return(
        <div className={classes.root}>
            <Header />
            <main className={classes.main}>
                <div className={classes.gameContainer}>
                    <div className={classes.row}>
                        <Cell index={0} grid={grid} handleCellMove={handleCellMove}/>
                        <Cell index={1} grid={grid} handleCellMove={handleCellMove}/>
                        <Cell index={2} grid={grid} handleCellMove={handleCellMove}/>
                    </div>
                    <div className={classes.row}>
                        <Cell index={3} grid={grid} handleCellMove={handleCellMove}/>
                        <Cell index={4} grid={grid} handleCellMove={handleCellMove}/>
                        <Cell index={5} grid={grid} handleCellMove={handleCellMove}/>
                    </div>
                    <div className={classes.row}>
                        <Cell index={6} grid={grid} handleCellMove={handleCellMove}/>
                        <Cell index={7} grid={grid} handleCellMove={handleCellMove}/>
                        <Cell index={8} grid={grid} handleCellMove={handleCellMove}/>
                    </div>
                </div>
                <div className={classes.buttonContainer}>
                    <Button color='primary' variant='contained' disabled={solved} onClick={Solve}>Solve</Button>
                    <Button color='secondary' variant='contained' disabled={!moveMade} onClick={resetGame}>Reset</Button>
                </div>
            </main>
            <Footer />
        </div>
    );
}

function Cell(props) {
    const classes = useStyles();

    if (props.grid[props.index] === 8) {
        return (
            <div className={classes.cell}></div>
        );
    }

    return (
        <img 
            className={classes.cell}
            src={shrekImages[props.grid[props.index]]}
            alt={`cell ${props.index}`}
            onClick={() => props.handleCellMove(props.index)}
        />
    );
}

// function  moveUp (grid, setGrid, resetGame) {
//     console.log(grid);
//     const blankIndex = grid.indexOf(8);
//     if (![6, 7, 8].includes(blankIndex)) {
//         const gridCopy = grid.slice();
//         const temp = gridCopy[blankIndex];
//         gridCopy[blankIndex] = gridCopy[blankIndex - 3];
//         gridCopy[blankIndex - 3] = temp;
//         console.log(blankIndex);
//         setGrid(gridCopy);
//         if (gridCopy.every((item, index) => item === index)) {
//             setTimeout(() => {
//                 alert('Correct!');
//                 localStorage.setItem('won', parseInt(localStorage.getItem('won')) + 1);
//                 resetGame();
//             }, 500);
//         }
//     }
// };

// function moveDown ({ grid, setGrid}) {
    

// };

// function moveRight ({ grid, setGrid}) {
    

// };

export default SlidoPage;
