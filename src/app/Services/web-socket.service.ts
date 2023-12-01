import { EventEmitter, Injectable, NgModule, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {

  @Output() outEven: EventEmitter<any> = new EventEmitter();
  constructor() {
    super({
      url: 'http://localhost:3000',
      options: {}
    })
    this.disconnect()
  }

  sendMessage(msg: any){
    this.emit('message', msg)
  }

}
