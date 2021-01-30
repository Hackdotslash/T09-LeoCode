from flask import Flask, request, make_response, jsonify, send_file, send_from_directory, safe_join, abort, render_template, redirect, request
from flask_cors import CORS
import time
import getpass
import sys
import json, os, getpass, psutil, signal
import process, shell

app = Flask(__name__) 
CORS(app)

username = getpass.getuser()

p = process.process()
@app.route('/all_processes', methods = ['GET'])
def all_processes_fun():
    l = p.all_processes()
    return render_template('all_processes.html', res = l)

@app.route('/close_process', methods = ['POST'])
def close_process():
    if request.method == 'POST':
        data = json.loads(request.data)
        print(data['pid'])
        os.kill(int(data['pid']), signal.SIGKILL)
        return jsonify(1)
       
def findProcessIdByName(processName):
    listOfProcessObjects = []
    for proc in psutil.process_iter():
       try:
           pinfo = proc.as_dict(attrs=['pid', 'name', 'create_time'])
           # Check if process name contains the given name string.
           if processName.lower() in pinfo['name'].lower() :
               listOfProcessObjects.append(pinfo)
       except (psutil.NoSuchProcess, psutil.AccessDenied , psutil.ZombieProcess) :
           pass
    return listOfProcessObjects;

@app.route('/all_internet_processes', methods = ['GET'])
def all_internet_processes():
    output = os.popen('echo %s|sudo -S %s' % ('admin@123', 'sudo nethogs -c 5')).read().split('\n')
    f = open('file.txt', 'w+')
    f.write(str(output))
    f.close()

    f = open('file.txt', 'r')
    s = f.read()
    f.close()
    l = []
    l = s.split(username)
    output = []
    for i in range(1, len(l)):
        ss = l[i - 1].lstrip()
        ss = ss.rstrip()
        ss1 = l[i].lstrip()
        ss1 = ss1.rstrip()

        ll = l[i - 1].split(' ')
        names = ss1.split(' ')
        pids = ss.split(' ')

        pidd = pids[len(pids) - 1].split(';')
        pidd = pidd[len(pidd) - 1]
        pidd = pids[len(pids) - 1].split('H')
        pidd = pidd[len(pidd) - 1]
        output.append({"name" : names[0], "pid" : pidd})
    return render_template('all_processes.html', res = output)


@app.route('/', methods = ['GET'])
def fun():
    return jsonify(1)

if __name__ == '__main__': 
	app.run(debug = True) 
