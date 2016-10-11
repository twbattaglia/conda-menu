#!/usr/bin/env python

try:
	import pip
	import json
except ImportError:
	raise ImportError('Error: pip not found')

def main():
	pkgs = [{'name': package.project_name,
			 'version': package.version,
			 "source": "pip", "location": package.location} for package in pip.get_installed_distributions()]

	# If location has anaconda, change source name
	for item in pkgs:
		if 'anaconda' in item["location"] or 'miniconda' in item["location"]:
			item["source"] = "conda"
		else:
			pass

	# Return for node/angular process
	print(json.dumps(pkgs))

if __name__=='__main__':
	main()
