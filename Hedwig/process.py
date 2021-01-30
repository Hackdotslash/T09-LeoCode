import psutil
class process():
	def all_processes(self):	
		di = []
		# Iterate over all running process
		for proc in psutil.process_iter():
			try:
				# Get process name & pid from process object.
				processName = proc.name()
				processID = proc.pid
				# print(processName , ' ::: ', processID)
				di.append({"name" : processName, "pid" : processID})
			except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
				pass
		return di
	 
	def get_list_of_process_sorted_by_memory(self):
	    '''
	    Get list of running process sorted by Memory Usage
	    '''
	    listOfProcObjects = []
	    # Iterate over the list
	    for proc in psutil.process_iter():
	       try:
	           # Fetch process details as dict
	           pinfo = proc.as_dict(attrs=['pid', 'name', 'username'])
	           pinfo['vms'] = proc.memory_info().vms / (1024 * 1024)
	           # Append dict to list
	           listOfProcObjects.append(pinfo);
	       except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
	           pass
	 
	    # Sort list of dict by key vms i.e. memory usage
	    listOfProcObjects = sorted(listOfProcObjects, key=lambda procObj: procObj['vms'], reverse=True)
	    return listOfProcObjects
