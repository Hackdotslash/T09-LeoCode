import os
from subprocess import call
import sys

def run_command(command):	
	try:
		output = os.popen(command).read().expandtabs(4).split('\n')
	except:
		output = "wrong or incomplete command"
	return output

def change_dir(command):
	try:
		os.chdir(command)
	except:
		pass
	return "platypus"

def CWD():
	return os.getcwd()