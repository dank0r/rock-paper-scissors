import React, { useState, useEffect, useRef } from 'react';
import style from './index.module.css';
import rock from '../../img/rock.png';
import paper from '../../img/paper.png';
import scissors from '../../img/scissors.png';

function moveToImg(move) {
    const o = {
        'r': rock,
        'p': paper,
        's': scissors
    };
    return o[move];
}

function keyToMove(key) {
    const o = {
        'q': 'r',
        'w': 'p',
        'e': 's'
    };
    return o[key];
}

function Main() {
    const isFirstMove = useRef(true);
    const isInitialRender = useRef(true);
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [player1, setPlayer1] = useState('r');
    const [player2, setPlayer2] = useState('p');
    const [player2State, setPlayer2State] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    const [keyInfo, setKeyInfo] = useState({ key: 'q', isPressed: false });

    useEffect(() => {
        const keydownHandler = event => ['q', 'w', 'e'].some(k => k === event.key) ? setKeyInfo({key: event.key, isPressed: true}) : null;
        const keyupHandler = event => ['q', 'w', 'e'].some(k => k === event.key) ? setKeyInfo({key: event.key, isPressed: false}) : null;
        document.addEventListener('keydown', keydownHandler);
        document.addEventListener('keyup', keyupHandler);
        return () => {
            document.removeEventListener('keydown', keydownHandler);
            document.removeEventListener('keyup', keyupHandler);
        }
    }, []);

    useEffect(() => {
        if(!isInitialRender.current) {
            if (!keyInfo.isPressed) {
                // current move
                let p1 = keyToMove(keyInfo.key);
                let p2 = null;
                // prev move
                const p1Prev = player1;

                const o = {
                    'r': 0,
                    'p': 1,
                    's': 2
                };
                if (!isFirstMove.current) {
                    const prediction = player2State[o[p1Prev]].indexOf(Math.max(...player2State[o[p1Prev]]));
                    const move_i = (prediction + 1) % 3;
                    const move = ['r', 'p', 's'][move_i];
                    p2 = move;

                    // deep copy
                    let newState = JSON.parse(JSON.stringify(player2State));
                    newState[o[p1Prev]][o[p1]] += 1;
                    setPlayer2State(newState);

                } else {
                    isFirstMove.current = false;
                    p2 = ['r', 'p', 's'][Math.floor(Math.random() * 3)];
                }

                /* atomic async assignment of player1, player2, score1, score2 */
                setPlayer1(p1);
                setPlayer2(p2);
                switch (p1 + p2) {
                    case 'rr':
                        break;
                    case 'pp':
                        break;
                    case 'ss':
                        break;
                    case 'rp':
                        setScore2(score2 + 1);
                        break;
                    case 'rs':
                        setScore1(score1 + 1);
                        break;
                    case 'pr':
                        setScore1(score1 + 1);
                        break;
                    case 'ps':
                        setScore2(score2 + 1);
                        break;
                    case 'sr':
                        setScore2(score2 + 1);
                        break;
                    case 'sp':
                        setScore1(score1 + 1);

                }
            }
        } else {
            isInitialRender.current = false;
        }
    }, [keyInfo]);

    useEffect(() => {
        console.log(player2State);
    }, [player2State]);

    return (
        <div>
            <div className={style.wrapper}>
                <div className={style.player}>
                    <div className={style.username}>You: {score1}</div>
                    <div className={style.imgWrapper}><img src={moveToImg(player1)} className={style.icon} alt={''}></img></div>
                    <div className={style.keys}>
                        <div className={style.keyWrapper}>
                            <img src={rock} className={style.smallIcon} alt={''}></img>
                            <div className={style.key}>Q</div>
                        </div>
                        <div className={style.keyWrapper}>
                            <img src={paper} className={style.smallIcon} alt={''}></img>
                            <div className={style.key}>W</div>
                        </div>
                        <div className={style.keyWrapper}>
                            <img src={scissors} className={style.smallIcon} alt={''}></img>
                            <div className={style.key}>E</div>
                        </div>
                    </div>
                </div>
                <div className={style.vs}>vs.</div>
                <div className={style.player}><div className={style.username}>Computer: {score2}</div>
                    <div className={style.imgWrapper}><img src={moveToImg(player2)} className={style.icon} alt={''}></img></div>
                </div>
            </div>
            <div className={style.start} style={{opacity: isInitialRender.current ? 1 : 0}}>Choose your move to start.</div>
        </div>
    );
}

export default Main;