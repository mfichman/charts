import bottle
import threading
import psutil
import time
import json
import time

data = []

@bottle.get('/stats')
def stats():
    return json.dumps(data)

@bottle.get('/kill')
def kill():
    os._exit(0)

@bottle.get('/<path:path>')
def static(path):
    return bottle.static_file(path, root='.')

def main():
    bottle.run(port=8080, debug=True)

def collect():
    while True:
        data.append({
            'time': time.time(),
            'system': {
                'cpu': psutil.cpu_times().__dict__,
                'memory': psutil.virtual_memory().__dict__,
                'disk': psutil.disk_usage('C:').__dict__,
                'network': psutil.net_io_counters().__dict__,
            }
        }) 
        time.sleep(1)

if __name__ == '__main__':
    th = threading.Thread(target=collect)
    th.daemon = True
    th.start()
    main()
