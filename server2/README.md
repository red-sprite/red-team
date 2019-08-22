# 2nd Game Server Attempt

[Flask](http://flask.pocoo.org/) / Python based.

* Make a virtualenv (Python3)
* pip install flask flask-cors
* python server.py

# "Playing"

## Work out who's attacking first

* curl -D - "http://127.0.0.1:5000/rsbs/v1/status/?source=blue"
* curl -D - "http://127.0.0.1:5000/rsbs/v1/status/?source=red"

"status": "A" means that team should attack.

## Attack

* curl -D - "http://127.0.0.1:5000/rsbs/v1/target/" -d '{"source":"red","cell":"A1"}' -H "Content-Type: application/json"

## Defender fetches attack

* curl -D - "http://127.0.0.1:5000/rsbs/v1/status/?source=blue"

## Defender sends result

* curl -D - "http://127.0.0.1:5000/rsbs/v1/status/" -d '{"source":"blue","cell":"A1","status":"M"}' -H "Content-Type: application/json"

## Attacker fetches result

* curl -D - "http://127.0.0.1:5000/rsbs/v1/status/?source=red"

Then start again!

# Status values

* P - Pending, keep polling
* A - Attack, please send an attack
* M - Miss, attack result
* H - Hit, attack result
* S - Hit and Sunk, attack result
* T - Target, see "cell" for targeted location

# Cell values

A1 - J10

# Source values

Source always refers to the team submitting the request and can be either "red" or "blue".

# To-do

Improved data validation.

