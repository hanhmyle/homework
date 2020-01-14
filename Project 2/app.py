from flask import Flask, jsonify, render_template
from bson.json_util import dumps
import pandas as pd

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo

# Create an instance of our Flask app.
app = Flask(__name__)

# Create connection variable
# conn = 'mongodb://ds261648.mlab.com:61648'

conn = 'mongodb://uci:Today123!@ds261648.mlab.com:61648/student_loan_db'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.get_default_database()



# Set route
@app.route('/')
def index():

    # Return the template with the teams list passed in
    return render_template('index.html')


    
@app.route("/bysize")
def bysize():
    bysize= db.by_size1.find()
    df3 = pd.DataFrame(bysize)
    df3['Outstanding']=pd.to_numeric(df3['Outstanding'])
    df3['Borrowers']=pd.to_numeric(df3['Borrowers'])
    my_year=list(df3["year"].unique())
    my_range=list(df3["loan_range"].unique())
    datab=[]
    for  range in my_range:
        datab.append({"x":my_year,"y":list(df3.loc[df3["loan_range"]==range]["Borrowers"]),"name":range,"type":"bar"})
    print(datab)

    return jsonify(datab)  

@app.route("/bysizeb")
def bysizeb():
    bysize= db.by_size1.find()
    df3 = pd.DataFrame(bysize)
    df3['Outstanding']=pd.to_numeric(df3['Outstanding'])
    df3['Borrowers']=pd.to_numeric(df3['Borrowers'])
    my_year=list(df3["year"].unique())
    my_range=list(df3["loan_range"].unique())
    datab=[]
    for  range in my_range:
        datab.append({"x":my_year,"y":list(df3.loc[df3["loan_range"]==range]["Outstanding"]),"name":range,"type":"bar"})
    print(datab)

    return jsonify(datab)      

@app.route("/byage")
def byage():
    byage= db.by_age1.find()
    df2 = pd.DataFrame(byage)
    df2["Dollars_Outstanding"] = pd.to_numeric(df2["Dollars_Outstanding"])
    df2["Borrowers "]= pd.to_numeric(df2["Borrowers "])
    my_year=list(df2["year"].unique())
    my_range=list(df2["age_range"].unique())
    datab=[]
    for  range in my_range:
        datab.append({"x":my_year,"y":list(df2.loc[df2["age_range"]==range]["Borrowers "]),"name":range,"type":"bar"})
    print(datab)



    return jsonify(datab) 

@app.route("/byageb")
def byage2():
    byage2= db.by_age1.find()
    df2 = pd.DataFrame(byage2)
    df2["Dollars_Outstanding"] = pd.to_numeric(df2["Dollars_Outstanding"])
    df2["Borrowers "]= pd.to_numeric(df2["Borrowers "])
    my_year=list(df2["year"].unique())
    my_range=list(df2["age_range"].unique())
    datab=[]
    for  range in my_range:
        datab.append({"x":my_year,"y":list(df2.loc[df2["age_range"]==range]["Dollars_Outstanding"]),"name":range,"type":"bar"})
    print(datab)



    return jsonify(datab)  


@app.route("/bylocation")
def bystate():
    bylocation = list(db.by_location1.find())
    
    df=pd.DataFrame(bylocation)
    df["Borrowers"] = pd.to_numeric(df["Borrowers"])
    df["Balance"] = pd.to_numeric(df["Balance"])
    df1=df.sort_values("Borrowers",inplace=False,ascending=False)
    location=list(df1["Location"])
    borrower=list(df1["Borrowers"])



    trace = {
        "x":location ,
        "y": borrower,
        "type": "bar"
    }
    print(trace)
    return (trace)    
   
@app.route("/bylocationb")
def bystate1():
    bylocation = list(db.by_location1.find())
    
    df=pd.DataFrame(bylocation)
    df["Borrowers"] = pd.to_numeric(df["Borrowers"])
    df["Balance"] = pd.to_numeric(df["Balance"])
    df1=df.sort_values("Borrowers",inplace=False,ascending=False)
    location=list(df1["Location"])
    borrower=list(df1["Borrowers"])
    balance=list(df1["Balance"])



    trace = {
        "x":location ,
        "y": balance,
        "type": "bar"
    }
    print(trace)
    return (trace)     
if __name__ == "__main__":
    app.run(debug=True)
