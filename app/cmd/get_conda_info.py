#!/usr/bin/env python

import conda_api as conda
import json
import sys

class SetEncoder(json.JSONEncoder):
	def default(self, obj):
		if isinstance(obj, set):
			return list(obj)
		return json.JSONEncoder.default(self, obj)

def main(prefix):

	# Set prefix
	conda.set_root_prefix(prefix = prefix)

	# print general conda info
	print(json.dumps(conda.info(), cls=SetEncoder))

if __name__=='__main__':
	#main("/Users/tbattaglia/anaconda")
	main(sys.argv[1])
