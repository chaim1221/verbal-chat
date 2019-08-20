set +H

if [ "${BASH_SOURCE[0]}" -ef "$0" ]
then
    echo "Hey, you should source this script, not execute it!"
    exit 1
fi

sudo docker rm -f $VERBAL_MONGO_DOCKER_CONTAINER

if [ $? -ne 0 ]; then
  sudo docker rm -f verbal-mongo
fi

if [[ $(cat /etc/hosts | grep mongodb | wc -l) -eq 0 ]]; then
   echo '127.0.0.1       mongodb' | sudo tee -a /etc/hosts
fi

# PORT 27017 to change -p {port}:27017
export VERBAL_MONGO_DOCKER_CONTAINER=$(docker run --name verbal-mongo -p 27017:27017 -d mongo:4.0.12-xenial)
echo $VERBAL_MONGO_DOCKER_CONTAINER

set -H

