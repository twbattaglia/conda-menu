#!/usr/bin/env python

import conda_api as conda
from os import path
import sys
import json
import subprocess

# http://stackoverflow.com/questions/8230315/python-sets-are-not-json-serializable
# Fix sets in JSON encoding
class SetEncoder(json.JSONEncoder):
	def default(self, obj):
		if isinstance(obj, set):
			return list(obj)
		return json.JSONEncoder.default(self, obj)

def get_version(prefix):
	'''prefix + "/bin/python", '-V'''
	try:
		proc = subprocess.Popen([prefix + "/bin/python", '-V'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
		stdout, stderr = proc.communicate()
		splitted = stderr.split()
		return ' '.join(splitted[0:2])
	except:
		return "error"

def get_packages(prefix):
	'''get packages with linked function'''
	linked_packages = conda.linked(prefix)
	
	pkgs = [{'name': pkg.rsplit('-', 2)[0],
			'version': pkg.rsplit('-', 2)[1],
			'build': pkg.rsplit('-', 2)[2]} for pkg in linked_packages]
			
	return(pkgs)
	


def main(prefix):

	# Set root prefix
	conda.set_root_prefix(prefix = prefix)

	# Create a dictionary of Location and Prefix for each env
	env = [{'location': prefix,
			'version' : get_version(prefix),
			'prefix': path.basename(prefix),
			'packages' : get_packages(prefix)} for prefix in conda.get_envs()]

	# Print for nodejs
	print(json.dumps(env, cls=SetEncoder))

if __name__=='__main__':
	#main(prefix = "/Users/tbattaglia/anaconda2")
	main(prefix = sys.argv[1])
