from flask import Flask, request, make_response, jsonify, send_file, send_from_directory, safe_join, abort, render_template, redirect, request
from flask_cors import CORS
import time
import getpass
import sys
import json, os, getpass, psutil, signal

app = Flask(__name__) 
CORS(app)

def shutdown():
	ret = 'system will shudown now'
	os.system('''bash -c 'sleep 5 ; shutdown -h now' &''')
	return ret

def computer_sleep(seconds_until_sleep=2, verbose=1):  
    if psutil.OSX:
        os.system("pmset sleepnow")
    else:
        if psutil.LINUX:
            os.system("systemctl suspend")
        else:
            if psutil.WINDOWS:
                sys.exit("computer_sleep Not Implemented for WINDOWS")      
            
@app.route('/shutdown', methods=['POST'])
def shutdown_fun():
	return jsonify(shutdown())


@app.route('/computer_sleep', methods=['POST'])
def computer_sleep_fun():
	return jsonify(computer_sleep())

if __name__ == '__main__': 
	app.run(debug = True, , host = "0.0.0.0") 
