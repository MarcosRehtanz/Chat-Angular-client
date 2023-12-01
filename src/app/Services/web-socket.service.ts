import { EventEmitter, Injectable, NgModule, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {

  chat: {
    message: string
    author:string
  }[] = []
  @Output() outEven: EventEmitter<any> = new EventEmitter();
  constructor() {
    super({
      url: 'http://localhost:3000',
      options: {}
    })
  }

  socketOn(){
    this.on('chat', (s: any)=>{
      this.chat = [...this.chat, s]
      console.log(s);
      console.log(this.chat);
      
    })
  }

  sendMessage(msg: any){
    this.emit('message', msg)
  }

}
