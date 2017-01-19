#!/usr/bin/env python

import conda_api as conda
from os import path
import platform
import sys
import json
import subprocess

# If jupyter is not installed, then install
try:
	import jupyter
except ImportError:
	import pip
	print('Error: jupyter not found')
	pip.main(['install', 'jupyter'])

# http://stackoverflow.com/questions/8230315/python-sets-are-not-json-serializable
# Fix sets in JSON encoding
class SetEncoder(json.JSONEncoder):
	def default(self, obj):
		if isinstance(obj, set):
			return list(obj)
		return json.JSONEncoder.default(self, obj)

def get_version(prefix):
	'''prefix + "/bin/python", '-V'''

	# Change python location depending upon OS
	OS = platform.system()
	if(OS == 'Windows'):
		loc = "/python"
	else:
		loc = "/bin/python"
	try:
		proc = subprocess.Popen([prefix + loc, '--version'], stdout = subprocess.PIPE, stderr = subprocess.PIPE)
		stdout, stderr = proc.communicate()
		lines = stderr.decode('utf-8').split()
		splitted = " ".join(lines[0:2])
		return(splitted)
	except:
		return "error"

def get_packages(prefix):
	'''get packages with linked function'''
	linked_packages = conda.linked(prefix)

	pkgs = [{'name': pkg.rsplit('-', 2)[0],
			 'version': pkg.rsplit('-', 2)[1],
			 'build': pkg.rsplit('-', 2)[2]} for pkg in linked_packages]

	return(pkgs)

def sanitize(prefix):
	'''remove . from prefix or collapse will break'''
	sanitized = prefix.replace(".", "_")
	return(sanitized)


def main(prefix):
	# Set root prefix
	conda.set_root_prefix(prefix = prefix)

	# Create a dictionary of Location and Prefix for each env
	env = [{'location': prefix,
			'version' : get_version(prefix),
			'prefix': path.basename(prefix),
			'prefix_sanitized': sanitize(path.basename(prefix)),
			'packages' : get_packages(prefix)} for prefix in conda.get_envs()]

	# Print for nodejs
	print(json.dumps(env, cls = SetEncoder))

if __name__=='__main__':
	main(prefix = sys.argv[1])
