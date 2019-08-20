
docker build -t verbalinc/chat-api:$(cat package.json | jq -r .version) .
docker push verbalinc/chat-api:$(cat package.json | jq -r .version)
