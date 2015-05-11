import bottle
import threading
import calendar
import psutil
import time
import json
import time

data = []

@bottle.get('/stats')
def stats():
    return json.dumps(data)

@bottle.get('/<path:path>')
def static(path):
    return bottle.static_file(path, root='.')

@bottle.get('/')
def index():
    return bottle.template('views/index.html')

def main():
    bottle.run(port=8080, debug=True)

def collect():
    psutil.cpu_times_percent()
    net = psutil.net_io_counters()
    bytes_recv = net.bytes_recv
    bytes_sent = net.bytes_sent
    while True:
        time.sleep(1)
        net = psutil.net_io_counters()
        data.append({
            'time': time.time(),
            'system': {
                'cpu': psutil.cpu_times_percent()._asdict(),
                'memory': psutil.virtual_memory()._asdict(),
                'disk': psutil.disk_usage('/')._asdict(),
                'network': {
                    'bytes_sent': net.bytes_recv-bytes_recv,
                    'bytes_recv': net.bytes_sent-bytes_sent,
                }
            }
        }) 
        bytes_recv = net.bytes_recv
        bytes_sent = net.bytes_sent

if __name__ == '__main__':
    th = threading.Thread(target=collect)
    th.daemon = True
    th.start()
    main()
