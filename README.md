# Template for node-hapi-typescript-inversify projects

## Prerequisites
```
    Install `docker` and `docker-compose`
```
## Installation
```
docker-compose up
```
## Debugging setup for vscode
```
Run gulp from command line or from vscode by typing run task

Then click DEBUG run on vscode 
```


## Debugging setup for Intellij idea/Webstorm
1. Choose a port for debugging, say 56745. Expose this port in Dockerfile
````
EXPOSE 56745
````
2. Map this port in docker-compose.yml
````
ports:
  - "5000:5000"
  - "56745:56745"
````
3. Change dev-start script in package.json
````
"dev-start": "tsc --watch & npm i && npm run migrate && nodemon --debug=56745 src/index.js",
````
4. Create a Node.js Remote Debug configuration in the IDE. Go to Run, then Edit Configurations, click + button,choose Node.js Remote Debug from the dropdown. Give a name you like, enter host 172.18.0.1 and port 56745.
5. Click on the debug icon. Boom! Debugger is connected.

