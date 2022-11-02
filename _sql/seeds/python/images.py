from azure.storage.blob import BlobServiceClient
import requests
import json
import re

API_URL='http://localhost:3000'

AUTH_URL='http://localhost:3001'
AUTH_KEY='2SXTZPQV2HDY98FA'
AUTH_SECRET='72FzYFGNCbn8TYgYaXK8xDm7JKaGFYjp'
AUTH_TOKEN='' # DECLARED AS CONSTANT BUT IS SET IN THE initAuthToken FUCNTION

BLOB_URL='https://selectorimages.blob.core.windows.net/selectorimages'
BLOB_CONNECTION_STR = "DefaultEndpointsProtocol=https;AccountName=selectorimages;AccountKey=c1O/DDIWCQC+kpxHU9ZGCZ2Ahez5Wm6JP43ybdkJPPrpZ/SvTUwOjHC7YbRUgKOuF4+HK4ll9fcW+AStkLkKtw==;EndpointSuffix=core.windows.net"
BLOB_CONTAINER_NAME = 'selectorimages'


CROPS = {}
UNKNOWNS = []
NO_PARAMS = []
RENAMES = {
    'Alfalfa, Dormant': 'Alfalfa',
    'Rapeseed, Forage': 'Rapeseed',
    'Sorghum-sudangrass': 'Sorghum Sudangrass',
}


def initModels():
    response = requests.get(f'{API_URL}/crops?limit=47')
    body = json.loads(response.content)
    crops = body['data']

    for crop in crops:
        if crop['label'] in RENAMES.keys():
            crop['label'] = RENAMES[crop['label']]
        CROPS[crop['label']] = crop


def initAuthToken():
    global AUTH_TOKEN
    response = requests.get(f'{AUTH_URL}/auth?key={AUTH_KEY}&secret={AUTH_SECRET}')
    body = json.loads(response.content)
    token = body['data']
    AUTH_TOKEN = token


def postImage(crop,payload):
    print('posting',payload)
    cropId = crop['id']
    response = requests.post(f'{API_URL}/crops/{cropId}/images', json=payload ,headers={"Content-Type":"application/json","Authorization":AUTH_TOKEN})
    print(response.content)


def registerImgs():
    try:

        # Create the BlobServiceClient object which will be used to create a container client
        blob_service_client = BlobServiceClient.from_connection_string(BLOB_CONNECTION_STR)

        # Create the container
        container_client = blob_service_client.get_container_client(BLOB_CONTAINER_NAME)

        # List the blobs in the container
        blob_list = container_client.list_blobs()
        for blob in blob_list:
            url = f'{BLOB_URL}/{blob.name}'
            path = blob.name.split('/')
            cropName = path[0]
            if cropName in CROPS.keys():
                print(path)
                # get crop object based on name.
                crop = CROPS[cropName]
                # get file name, and explode into meta data array
                metadata = path[-1].strip().strip('.jpg').strip('.JPG').strip('a').strip('b').split('_')
                # initalize default payload
                payload = {
                    "yearTaken":0,
                    "owner":"unknown",
                    "growthStage":"unknown",
                    "src": url
                }
                # process image meta data array into payload
                if len(metadata) > 3:
                    metadata = metadata[-3:]
                    print('\t','METADATA:',metadata)
                    while(len(metadata) > 0):
                        line = metadata.pop(len(metadata)-1)
                        if re.search("[0-9]", line):
                            payload['yearTaken'] = line
                            continue
                        if len(metadata) == 1:
                            payload['owner'] = line
                            continue
                        if len(metadata) == 0:
                            payload['growthStage'] = line
                            continue
                else:
                    NO_PARAMS.append(path)
                # # UNCOMMENT THIS TO ACTUALLY POST THE IMAGES
                postImage(crop, payload)  
            elif path[0] != 'pdf':
                UNKNOWNS.append(path)

        # print('>>>> unknowns',UNKNOWNS)

    except Exception as ex:
        print('Exception:')
        print(ex)

initModels()
initAuthToken()
registerImgs()