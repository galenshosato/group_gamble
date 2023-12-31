from server.extensions import db
from datetime import datetime


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)
    money = db.Column(db.Integer)
    weekly_money = db.Column(db.Integer)
    futures_money = db.Column(db.Integer)
    week = db.Column(db.Integer)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow().replace(microsecond=0)
    )
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow().replace(microsecond=0)
    )
    bets = db.relationship("Bet", backref="user")

    def __repr__(self):
        return f"<User name={self.name} weekly_money={self.weekly_money} bets = {self.bets.current_bets}>"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "money": self.money,
            "weekly_money": self.weekly_money,
            "futures_money": self.futures_money,
            "week": self.week,
            "bets": {
                "current_bets": [
                    current_bet.to_dict()
                    for current_bet in self.bets
                    if current_bet.bet_type != "futures"
                    and current_bet.updated_at == current_bet.created_at
                ],
                "past_bets": [
                    past_bet.to_dict()
                    for past_bet in self.bets
                    if past_bet.updated_at != past_bet.created_at
                ],
                "futures_bets": [
                    future_bet.to_dict()
                    for future_bet in self.bets
                    if future_bet.bet_type == "futures"
                ],
            },
        }


class Bet(db.Model):
    __tablename__ = "bets"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    bet_name = db.Column(db.String)
    bet_type = db.Column(db.String)
    amount = db.Column(db.Integer)
    odds = db.Column(db.Integer)
    winnings = db.Column(db.Integer)
    hit = db.Column(db.String)
    week = db.Column(db.String)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow().replace(microsecond=0)
    )
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow().replace(microsecond=0)
    )

    def to_dict(self):
        user_name = self.user.name if self.user else None
        return {
            "id": self.id,
            "user_id": self.user_id,
            "user_name": user_name,
            "bet_name": self.bet_name,
            "bet_type": self.bet_type,
            "amount": self.amount,
            "odds": self.odds,
            "winnings": self.winnings,
            "hit": self.hit,
            "week": self.week,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    def __repr__(self):
        return f"<User bet_name={self.bet_name} bet_type={self.bet_type} amount = {self.amount} winnings={self.winnings}>"
