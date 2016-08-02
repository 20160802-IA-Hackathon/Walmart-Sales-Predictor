import flask
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

#---------- MODEL IN MEMORY ----------------#

weekly_results = list(np.random.randint(1000, 700000, 4))



#---------- CREATING AN API ----------------#
# Initialize the app
app = flask.Flask(__name__)

@app.route('/')
def welcome():
   return '''welcome to the app. Go <a href='/result'> here</a>.'''

@app.route('/result', methods=['POST', 'GET'])
def result():
    result = {'weekly_results': weekly_results}
    return flask.jsonify(result)


if __name__ == '__main__':
    '''Connects to the server'''

    HOST = '127.0.0.1'
    PORT = '4000'

    app.run(HOST, PORT)
