import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faQuestion, faInfo, faTrophy, faComments, faXmark } from "@fortawesome/free-solid-svg-icons";

const MainGame = () => {
    const [idSection, setIdSection] = useState(0);
    const [scoreLeft, setScoreLeft] = useState(0);
    const [scoreRight, setScoreRight] = useState(0);
    const [pLeft, setpLeft] = useState(0)
    const [pRight, setpRight] = useState(0)
    const [timeBet, setTimeBet] = useState(0)
    const [timeRefund, setTimeRefund] = useState(0)
    const [timer, setTimer] = useState(0); // Biến đếm vòng lặp
    const [dice1, setDice1] = useState(1);
    const [dice2, setDice2] = useState(1);
    const [dice3, setDice3] = useState(1);
    const [total, setTotal] = useState(0);
    const [result, setResult] = useState("");

    useEffect(() => {
        let newTotal
        const randomDiceValue = () => Math.floor(Math.random() * 6) + 1;
        const newDice1 = randomDiceValue();
        const newDice2 = randomDiceValue();
        const newDice3 = randomDiceValue();
        setDice1(newDice1);
        setDice2(newDice2);
        setDice3(newDice3);
        setTotal(newTotal);

        newTotal = newDice1 + newDice2 + newDice3;
        if (newTotal < 11) {
            setResult("Xỉu");
        } else {
            setResult("Tài");
        }
    }, [idSection]);

    useEffect(() => {
        if (timer === 0) {
            setIdSection(prevId => prevId + 1)
        }

    }, [timer]);

    useEffect(() => {
        const increaseTimerInterval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer === 30) {
                    return 0; // Đặt lại timer về 0 nếu đạt giá trị 30
                } else {
                    return prevTimer + 1; // Tăng timer lên 1 nếu chưa đạt giá trị 30
                }
            });
        }, 1000); // Mỗi giây

        return () => {
            clearInterval(increaseTimerInterval); // Clear interval khi component bị unmount
        };
    }, []);

    useEffect(() => {
        let increaseScoreInterval
        if (timer === 0) {
            // Nếu timer bằng 0, bắt đầu đếm scoreLeft từ 0
            const increaseScoreInterval = setInterval(() => {
                setScoreLeft(prevSL => Math.floor(prevSL + Math.random() * 10000));
                setScoreRight(prevSR => Math.floor(prevSR + Math.random() * 10000));
                setpLeft(prevPL => Math.floor(prevPL + Math.random() * 100));
                setpRight(prevPR => Math.floor(prevPR + Math.random() * 100));
            }, 1000); // Mỗi giây

            // Sau 20 giây, dừng đếm scoreLeft
            setTimeout(() => {
                clearInterval(increaseScoreInterval);
            }, 20000);
        } else if (timer === 30) {
            // Nếu timer đạt 30, reset lại điểm về 0
            setScoreLeft(0);
            setScoreRight(0);
            setpLeft(0);
            setpRight(0);
        }

        return () => {
            clearInterval(increaseScoreInterval); // Clear interval khi component bị unmount
        };
    }, [timer]);

    useEffect(() => {
        let increaseScoreInterval
        if (timer === 0) {
            // Nếu timer bằng 0, bắt đầu đếm scoreLeft từ 0
            const increaseScoreInterval = setInterval(() => {
                setTimeBet(prevTB => prevTB + 1);
            }, 1000); // Mỗi giây

            // Sau 20 giây, dừng đếm scoreLeft
            setTimeout(() => {
                clearInterval(increaseScoreInterval);
            }, 20000);
        } else if (timer === 30) {
            // Nếu timer đạt 30, reset lại điểm về 0
            setTimeBet(0);
        }
        return () => {
            clearInterval(increaseScoreInterval); // Clear interval khi component bị unmount
        };
    }, [timer]);
    useEffect(() => {
        let increaseScoreInterval

        if (timer === 20) {
            // Nếu timer bằng 20, bắt đầu đếm từ 20
            const increaseScoreInterval = setInterval(() => {
                setTimeRefund(prevTRF => prevTRF + 1);
            }, 1000); // Mỗi giây

            // Sau 20 giây, dừng đếm scoreLeft
            setTimeout(() => {
                clearInterval(increaseScoreInterval);
            }, 5000);
        } else if (timer === 30) {
            // Nếu timer đạt 30, reset lại điểm về 0
            setTimeRefund(0);
        }
        return () => {
            clearInterval(increaseScoreInterval); // Clear interval khi component bị unmount
        };
    }, [timer]);

    return (
        <div className="container">
            <div className="innerBar">
                <span className="me-5">
                    <FontAwesomeIcon icon={faChartLine} />
                    Lịch sử phiên
                </span>
                <span className="me-5">
                    <FontAwesomeIcon icon={faQuestion} />
                    Hướng dẫn
                </span>
                <span className="me-5">
                    <FontAwesomeIcon icon={faInfo} />
                    Lịch sử cược
                </span>
                <span className="me-5">
                    <FontAwesomeIcon icon={faTrophy} />
                    Xếp hạng
                </span>
                <span className="me-5">
                    <FontAwesomeIcon icon={faComments} />
                    Chat
                </span>
                <span className="me-5">
                    <FontAwesomeIcon icon={faXmark} />
                    close
                </span>
            </div>
            {timer}
            <div className="section">
                <span>Phiên: {idSection}</span>
            </div>
            <div className="player">
                <span>player left</span>
                <span>player right</span>
            </div>
            <div className="taixiu">
                <span>Tài</span>
                <span>Xỉu</span>
                <div>{dice1}-{dice2}-{dice3}-{result}</div>
            </div>
            <div className="timeNewSection">Time Refund: {timeRefund}</div>
            <div className="timePlayer">Time Bet:{timeBet}</div>
            <div className="moneyDisplay">money left:{scoreLeft.toLocaleString()},000</div>
            <div className="moneyDisplay">money right:{scoreRight.toLocaleString()},000</div>
            <div className="bet">bet left: {pLeft}</div>
            <div className="bet">bet right:{pRight}</div>
            <div className="sectionTotal">Thống kê phiên</div>
            <div className="handCover">Che xúc xắc</div>
            <div className="betHistory">13</div>
        </div>
    );
};

export default MainGame;
