#!/usr/bin/env python

import conda_api as conda
import json
import sys
import re


def main(prefix, yml, name):

	# Set prefix
	conda.set_root_prefix(prefix = prefix)

	# Create new environment
	conda.export_yml(yml = yml, name = name)

if __name__=='__main__':
	main(prefix = sys.argv[1],
		 yml = sys.argv[2],
		 name = sys.argv[3])