from flask import Flask, request, make_response, jsonify, send_file, send_from_directory, safe_join, abort, render_template, redirect, request
from flask_cors import CORS
import time
import getpass
import sys
import json, os, getpass, psutil, signal, shutil
import process, shell

from zipfile import ZipFile 
import zipfile

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

@app.route('/hed_process', methods = ['GET'])
def hed_process():
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
        namee = names[0].split('\\')
        output.append({"name" : namee[0], "pid" : pidd})
        # output.append({"name" : names[0], "pid" : pidd})
    return render_template('all_processes.html', res = output)



@app.route('/products', methods = ['GET'])
def products():
    return render_template('products.html')


@app.route('/', methods = ['GET'])
def default():
    return render_template('products.html')



def get_all_file_paths(directory): 
    # initializing empty file paths list 
    file_paths = [] 
  
    # crawling through directory and subdirectories 
    for root, directories, files in os.walk(directory): 
        for filename in files: 
            # join the two strings in order to form the full filepath. 
            filepath = os.path.join(root, filename) 
            file_paths.append(filepath) 
  
    # returning all file paths 
    return file_paths       

def compress(dir_name, filename): 
    # path to folder which needs to be zipped 
    directory = dir_name
  
    # calling function to get all file paths in the directory 
    file_paths = get_all_file_paths(directory) 
  
    # printing the list of all files to be zipped 
    print('Following files will be zipped:') 
    for file_name in file_paths: 
        print(file_name) 
  
    # writing files to a zipfile 
    with ZipFile(filename + '.zip','w') as zip: 
        # writing each file one by one 
        for file in file_paths: 
            zip.write(file, compress_type=zipfile.ZIP_DEFLATED) 
  
    print('All files zipped successfully!')         
  
  

@app.route('/getFile', methods=['POST'])
def getFileFun(): 
    try:
        l = request.json['path'].split('/')
        pat = ''
        for x in range(0, len(l) - 1):
            pat = pat + l[x] + '/'
        print(pat + l[len(l) - 1])
        return send_from_directory(pat, filename = l[len(l) - 1], as_attachment=True)
    except FileNotFoundError:
        abort(404)

# put a file
@app.route('/putFile', methods = ['POST'])  
def putFileFun():  
    f = request.files['file']
    f.save(f.filename)
    # try:    
    shutil.rmtree('files')
    # except:
    #     pass
    os.mkdir('files')
    shutil.move(f.filename, "files/" + f.filename)
    compress('files', f.filename)
    return send_from_directory("./", filename = f.filename + '.zip', as_attachment=True)
    # os.rmdir('files')
    # return jsonify({'message' : 'File uploaded succesfully'})


# move a file to desired location
@app.route('/moveFiles', methods = ['POST'])  
def moveFilesFun():  
    try:
        moveFiles.movefiles(request.json['source'], request.json['destination'])
        return jsonify({"message" : "Success"})  
    except:
        abort(404)


@app.route('/hed_compress', methods = ['GET'])
def hed_compress():
    return render_template('file_compressor.html')


if __name__ == '__main__': 
	app.run(debug = True, host = "0.0.0.0") 
