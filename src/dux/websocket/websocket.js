const createWebsocket = () => new WebSocket('localhost:8080/ws');

export default createWebsocket;
