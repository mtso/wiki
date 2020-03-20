#!/bin/sh

echo "cleaning..."

rm ../page/*

echo "building..."

cc -std=c99 -DDEBUG -Wall -Wpedantic -Wshadow -Wextra -Werror=implicit-int -Werror=incompatible-pointer-types -Werror=int-conversion -g -Og -fsanitize=address -fsanitize=undefined main.c -o main

echo "running..."

./main

echo "finished."

rm ./main
# What does this do?
rm -rf ./main.dSYM

