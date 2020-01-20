import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

export class SocketService {
    private url = 'http://127.0.0.1:5001';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message) {
        this.socket.emit('monitor', message);
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('monitor', (message) => {
                observer.next(message);
            });
        });
    }
}

