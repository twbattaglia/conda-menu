#!/usr/bin/env python

import conda_api as conda
import json
import sys
import re


def main(prefix, newEnv, cloneEnv):

	# Set prefix
	conda.set_root_prefix(prefix = prefix)

	# Fix naming (if needed)
	name_new = ''.join(e for e in newEnv if e.isalnum() or e in "_.")

	# Create new environment
	conda.clone_environment(name = name_new, clone = cloneEnv)

if __name__=='__main__':
	main(prefix = sys.argv[1],
		 newEnv = sys.argv[2],
		 cloneEnv = sys.argv[3])
