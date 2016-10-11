#!/usr/bin/env python

import conda_api as conda
import json
import sys

class SetEncoder(json.JSONEncoder):
	def default(self, obj):
		if isinstance(obj, set):
			return list(obj)
		return json.JSONEncoder.default(self, obj)

def main(prefix, name):

	# Set prefix
	conda.set_root_prefix(prefix = prefix)

	# Remove environment
	conda.remove_environment(name = name)

if __name__=='__main__':
	#main(prefix = "/Users/tbattaglia/anaconda2", name = "yesssss")
	main(prefix = sys.argv[1], name = sys.argv[2])
