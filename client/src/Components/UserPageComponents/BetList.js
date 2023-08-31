import { useState, useEffect } from "react";
import BetCard from "./BetCard";
import Button from "react-bootstrap/Button";
import AddNewBetForm from "./AddNewBetForm";

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
}) {
  const [betList, setBetList] = useState([]);

  useEffect(() => {
    fetch(`/api/${id}/current-weekly-bets`)
      .then((resp) => resp.json())
      .then((data) => setBetList(data));
  }, [id]);

  return (
    <>
      <h1>Weekly Bets</h1>
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
        />
      ) : null}
      <Button onClick={() => setShowAddBet(true)}>Make New Bet</Button>
    </>
  );
}

export default BetList;
