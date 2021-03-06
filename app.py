import os
import random
import json
from pprint import pprint
import threading
from flask import Flask, render_template, send_from_directory, request, jsonify
from run_notebook import *

app = Flask(__name__)


import logging
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

@app.route('/')
def hello_world():
    return send_from_directory('build','index.html')

@app.route('/<path:path>')
def send_js(path):
    # print( "came here with path ", path )
    return send_from_directory( 'build', path )

@app.route('/ajax_test')
def ajax_test_js():
    print( "came here")
    return ajax_test()

@app.route('/input_test', methods=['POST'])
def input_form_data():
    print("=================================")
    response = request.get_json(force=True)
    pprint (response)
    process_and_write_json_to_file( response )
    return "Successfully submitted CNN job request"

@app.route('/update_chart_data/<mode>')
def update_chart_data( mode ):
    new_data = process_CNN_results( mode )

    # pprint( new_data )
    if new_data is None :
        return jsonify( { } ) 

    extra_data = process_model_info( mode )
    return jsonify( { 'data' : new_data, 'model': extra_data['model'], 'current_loss': extra_data['current_loss'], 'current_accuracy': extra_data['current_accuracy'] } ) 


@app.route('/update_small_chart_data/<chart_type>/<mode>')
def update_small_chart_data( chart_type, mode  ):
    chart_type = chart_type.strip()  #cleanup
    new_data = process_CNN_results( mode, chart_type )
    if new_data is None :
        return jsonify( { } ) 

    return jsonify( { 'data' : new_data } ) 



def process_and_write_json_to_file( json_dict ) :
    json_dict["train_dir"] = "train"
    json_dict["test_dir"] = "test"
    json_dict["img_width"] = 221
    json_dict["img_height"] = 221
    json_dict["loss"] = "categorical_crossentropy"
    json_dict["train_threshold"] = 0
    json_dict["phase1_optimizer"] = "adam" 

    json_dict["dropout_list"] = [ float(x) for x in json_dict["dropout_list"].strip().split(",")]
    json_dict["dense_list"] = [ int(x) for x in json_dict["dense_list"].strip().split(",")]

    with open('params_manual.json', 'w') as outfile:
        json.dump( json_dict, outfile)

    pprint("Launching new thread for CNN")
    threading.Thread(name='jupyter_notebook', target=run_notebook).start()




if __name__ == '__main__':
  app.run(debug=True)

