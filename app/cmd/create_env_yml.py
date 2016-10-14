#!/usr/bin/env python

import conda_api as conda
import json
import sys
import re


def main(prefix, yml):

	# Set prefix
	conda.set_root_prefix(prefix = prefix)

	# Verify the env name does already exist (TODO)
	#txt = open("/Users/tbattaglia/environment.yml")
	#yml_name = txt.readline().replace("name: ", "")

	# Create new environment
	conda.create_yml(yml = yml)

if __name__=='__main__':
	main(prefix = sys.argv[1],
		 yml = sys.argv[2])