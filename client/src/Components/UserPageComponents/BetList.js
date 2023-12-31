import { useState, useEffect } from "react";
import BetCard from "./BetCard";
import Button from "react-bootstrap/Button";
import AddNewBetForm from "./AddNewBetForm";
import "../../css/userPage.css";

function BetList({
  week,
  id,
  weekly_money,
  futures_money,
  setUserWeeklyMoney,
  setUserFuturesMoney,
  futuresList,
  setFuturesList,
  showAddBet,
  setShowAddBet,
  currentUser,
}) {
  const [betList, setBetList] = useState([]);

  useEffect(() => {
    fetch(
      `https://group-gamble-d231ef097ad5.herokuapp.com/api/${id}/current-weekly-bets`
    )
      .then((resp) => resp.json())
      .then((data) => setBetList(data));
  }, [id]);

  return (
    <>
      <h1 className="text-color">Weekly Bets</h1>
      <br />
      {betList.map((bet) => {
        return (
          <BetCard
            key={bet.id}
            bet={bet}
            week={week}
            betList={betList}
            setBetList={setBetList}
            weekly_money={weekly_money}
            futures_money={futures_money}
            setUserWeeklyMoney={setUserWeeklyMoney}
            setUserFuturesMoney={setUserFuturesMoney}
            currentUser={currentUser}
          />
        );
      })}
      {showAddBet ? (
        <AddNewBetForm
          betList={betList}
          setBetList={setBetList}
          week={week}
          id={id}
          weekly_money={weekly_money}
          futures_money={futures_money}
          setUserWeeklyMoney={setUserWeeklyMoney}
          setUserFuturesMoney={setUserFuturesMoney}
          setShowAddBet={setShowAddBet}
          futuresList={futuresList}
          setFuturesList={setFuturesList}
          currentUser={currentUser}
        />
      ) : null}
      <Button onClick={() => setShowAddBet(true)}>Make New Bet</Button>
    </>
  );
}

export default BetList;
