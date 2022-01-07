#!/bin/bash
for f in $i
do
   cat "$f" >> t.txt
   echo >> t.txt
done
