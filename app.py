import flask
import numpy as np
import pandas as pd
import pickle

#---------- MODEL IN MEMORY ----------------#

with open('my_model.pkl', 'r') as picklefile:
    PREDICTOR = pickle.load(picklefile)

weekly_results = list(np.random.randint(1000, 700000, 4))



#---------- CREATING AN API ----------------#
# Initialize the app
app = flask.Flask(__name__)

#To deploy on AWS, run this:
# app._static_folder = '/var/www/html/Walmart-Sales-Predictor/'

@app.route('/')
def welcome():
   with open("index.html", 'r') as viz_file:
       return viz_file.read()
 #   return '''welcome to the app. Go <a href='/result'> here</a>.'''

# Parameters come from the URL:
# /result?month=1&size=&temp=&fuel=&cpi=&unemp=&holiday=true
@app.route('/result', methods=['POST', 'GET'])
def result():
    month = float(flask.request.args['month'])
    size = float(flask.request.args['size'])
    temp = float(flask.request.args['temp'])
    fuel = float(flask.request.args['fuel'])
    cpi = float(flask.request.args['cpi'])
    unemp = float(flask.request.args['month'])
    holiday = float(flask.request.args['holiday'])
    year = 2016

    monthly_features = [size, temp, fuel, cpi, unemp, holiday, year, month]

    Xs = []
    for day in [1, 7, 14, 21]:
        item = monthly_features + [day]
        Xs.append(item)

    predicted = PREDICTOR.predict(Xs)


    weekly_results = list(predicted)

    # return str(weekly_results)
    result = {'weekly_results': weekly_results}
    return flask.jsonify(result)


if __name__ == '__main__':
    '''Connects to the server'''
    app.run()
