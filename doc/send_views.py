import json
from urllib import request, parse
from data_loader import *
import copy

def convert_obj_to_json(obj):
    return json.dumps(obj.__dict__)


def send_data(cars, cross, roads, stime):
    request_url = "http://10.21.17.138:9999/index/putData"


    tmp_cars = []
    for i in cars:
        tmp_cars.append(copy.deepcopy(cars[i]))
    cars = tmp_cars

    tmp_cross = []
    for i in cross:
        tmp_cross.append(copy.deepcopy(cross[i]))
    cross = tmp_cross

    tmp_roads = []
    for i in roads:
        tmp_roads.append(copy.deepcopy(roads[i]))
    roads = tmp_roads

    for i, j in enumerate(cars):
        cars[i] = j.__dict__
    for i, j in enumerate(cross):
        cross[i] = j.__dict__
    for i, j in enumerate(roads):
        # transform np.array to list
        # j.status=j.status.tolist()
        roads[i] = j.__dict__
    data = [("cars", cars), ("cross", cross), ("roads", roads)]
    params = parse.urlencode(data).encode("utf-8")
    # with open("test.file","w") as f:
    #     f.write(str(data))
    req = request.Request(url=request_url, data=params)
    req.add_header('Content-Type', 'application/x-www-form-urlencoded')
    response = request.urlopen(req)
    content = response.read()
    data_json = json.loads(content.decode('utf-8'))
    # print(data_json)
    if (data_json["errno"] == 0):
        print("Send Data Finished!")
    else:
        print(data_json["errmsg"])


if __name__ == "__main__":
    from data_loader import readData

    cars, cross, roads = readData()
    send_data(cars, cross, roads)
