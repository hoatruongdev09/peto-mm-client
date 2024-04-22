import socketIOClient from "socket.io-client";

class SocketHelper {
    constructor() {
        this.socket = null
    }

    connect = (url, options) => {
        this.socket = socketIOClient.connect(url, options)
    }
    disconnect = () => {
        this.socket?.disconnect()
    }
}

export default new SocketHelper()