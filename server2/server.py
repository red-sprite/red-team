from flask import Flask, request, json, Response
from flask_cors import CORS
import random


class BattleServer(Flask):
    def __init__(self, *args, **kwargs):
        setattr(self, 'state', {
            'situation': 'attack-pending',  # attack-pending, attack-forwarding, result-pending, result-forwarding
            'attacker': random.choice(['red', 'blue']),
            'active_attack': None,
            'active_result': None,
        })
        super(BattleServer, self).__init__(*args, **kwargs)


app = BattleServer(__name__)
CORS(app)


def get_state():
    return app.state


@app.route("/rsbs/v1/status/", methods=['GET'])
def status_get():
    team = request.args['source']
    state = get_state()
    print('STATE: {}'.format(state))
    if state['situation'] == 'attack-pending':
        status = {
            'status': 'A' if team == state['attacker'] else 'P',
        }
        return Response(json.dumps(status), status=200, mimetype='application/json')
    elif state['situation'] == 'attack-forwarding' or state['situation'] == 'result-pending':
        if team == state['attacker']:
            status = {
                'status': 'P',
            }
        else:
            print('Attack sent: {} -> {}'.format(state['active_attack']['cell'], team))
            status = {
                'status': 'T',
                'cell': state['active_attack']['cell'],
            }
            state['situation'] = 'result-pending'
        return Response(json.dumps(status), status=200, mimetype='application/json')
    elif state['situation'] == 'result-forwarding':
        if team == state['attacker']:
            status = state['active_result']
            state['active_attack'] = None
            state['active_result'] = None
            state['attacker'] = 'blue' if state['attacker'] == 'red' else 'red'
            state['situation'] = 'attack-pending'
        else:
            status = {
                'status': 'P',
            }
        return Response(json.dumps(status), status=200, mimetype='application/json')
    else:
        # This should be impossible!
        return Response('Oh dear!', status=500, mimetype='application/json')


@app.route("/rsbs/v1/status/", methods=['POST'])
def status_post():
    data = request.json
    team = data['source']
    state = get_state()
    if state['situation'] == 'result-pending':
        if team == state['attacker']:
            return Response('Wrong defender', status=403, mimetype='application/json')
        else:
            if data['cell'] != state['active_attack']['cell']:
                return Response('Confused?  Cheating?  Not allowed!', status=418, mimetype='application/json')

            print('Result received: {} -> {}'.format(data['cell'], data['status']))
            result = {
                'status': data['status'],
                'cell': data['cell'],
            }
            state['active_result'] = result
            state['situation'] = 'result-forwarding'
            return Response('OK', status=200, mimetype='application/json')
    else:
        # This should be impossible!
        return Response('Not now!', status=403, mimetype='application/json')


@app.route("/rsbs/v1/target/", methods=['POST'])
def target():
    data = request.json
    state = get_state()
    if state['situation'] == 'attack-pending':
        if data['source'] == state['attacker']:
            state['active_attack'] = data
            state['situation'] = 'attack-forwarding'
            print('Attack made: {} -> {}'.format(data['source'], data['cell']))
            status = {
                'status': 'P',
                'cell': data['cell'],
            }
            return Response(json.dumps(status), status=200, mimetype='application/json')
        else:
            return Response('{}', status=403, mimetype='application/json')
    else:
        return Response('{}', status=404, mimetype='application/json')


if __name__ == '__main__':
    app.run(host='0.0.0.0')
