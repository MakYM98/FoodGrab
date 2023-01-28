import sqlite3
import pandas as pd

con=sqlite3.connect('./fyp.db')
df = pd.read_excel('./listing.xlsx')
df.to_sql('Listing',con,index=False, if_exists="replace")

user_df = pd.read_excel('./userdata.xlsx')
user_df.to_sql('User',con,index=False, if_exists="replace")

con.close()