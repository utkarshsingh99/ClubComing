#!/usr/bin/env python3

# Assignment compiler version 1

import sys, os.path
import subprocess
import argparse

parser = argparse.ArgumentParser()

parser.add_argument("filename", help="Markdown file name")
parser.add_argument("--template", help="Template Latex File", default="template.tex")

args = parser.parse_args()

filename = args.filename

if not os.path.isfile(filename):
    print("Error: file does not exist!")
    sys.exit(1)

json_str = open(filename).read()

template_str = open(args.template).read()

#####################################################


import parse_json

latex_src = parse_json.parse(json_str, template_str)


#####################################################

open("temp.tex","w").write(latex_src)

cmd = ["xelatex","-interaction","batchmode","temp.tex"]
process = subprocess.Popen(cmd, stdout=subprocess.PIPE)
out, err = process.communicate()
out = out.decode()
exit_code = process.wait()

if exit_code != 0:
    print(err)
    print("Error: xelatex failed")
    sys.exit(1)

print("Success: pdf generated.")

subprocess.call(["rm","temp.aux"])
subprocess.call(["rm","temp.tex"])
subprocess.call(["rm","temp.log"])
subprocess.call(["rm","temp.out"])
subprocess.call(["rm",filename])
new_pdf = filename.replace("json","pdf")
subprocess.call(["mv","temp.pdf",new_pdf])
#subprocess.call(["xdg-open",new_pdf])
