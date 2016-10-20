#!/usr/bin/env python

import conda_api as conda
import json
import sys
import re


def main(prefix, name, version, pkgs):

	# Set prefix
	conda.set_root_prefix(prefix = prefix)

	# Remove special characters from environment name
	print(name)
	name_new = ''.join(e for e in name if e.isalnum() or e in "_.")
	print(name_new)

	# Split list into string
	pkgsplit = pkgs.split(",")
	pythonversion = "python=" + str(version)
	final = pkgsplit + [pythonversion]

	# Create new environment
	conda.create(name = name_new, pkgs = final)

if __name__=='__main__':
	main(prefix = sys.argv[1],
		 name = sys.argv[2],
		 version = sys.argv[3],
		 pkgs = sys.argv[4])
