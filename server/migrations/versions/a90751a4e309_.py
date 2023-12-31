"""empty message

Revision ID: a90751a4e309
Revises: b5482f9c0af9
Create Date: 2023-08-03 23:13:47.728525

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a90751a4e309'
down_revision = 'b5482f9c0af9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('password', sa.String(), nullable=True),
    sa.Column('money', sa.Integer(), nullable=True),
    sa.Column('weekly_money', sa.Integer(), nullable=True),
    sa.Column('futures_money', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('bet_name', sa.String(), nullable=True),
    sa.Column('bet_type', sa.String(), nullable=True),
    sa.Column('amount', sa.Integer(), nullable=True),
    sa.Column('odds', sa.Integer(), nullable=True),
    sa.Column('winnings', sa.Integer(), nullable=True),
    sa.Column('hit', sa.String(), nullable=True),
    sa.Column('week', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_bets_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('bets')
    op.drop_table('users')
    # ### end Alembic commands ###
