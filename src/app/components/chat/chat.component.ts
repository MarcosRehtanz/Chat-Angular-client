import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../../Services/web-socket.service';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MessageComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  fullName = faker.person.fullName();

  socket = inject(WebSocketService)
  inputMessage = ''

  changeInputMessage(event: any) {
    if (event.code === "Enter" && this.inputMessage.trim() !== '') this.sendMessage()
    else this.inputMessage = event.target.value;
  }

  sendMessage() {
    this.socket.sendMessage({
      message: this.inputMessage,
      author: `${this.fullName}`,
    })
    this.inputMessage = ''
    
  }

  socketHi() {
    this.socket.emit('hi')
  }

  @ViewChild('messages') messagesContent!: ElementRef<any>;
  
  ngAfterViewInit(){

    this.socket.socketOn();
    // this.socket.socketOn((id:number)=>{
    //   this.messagesContent.nativeElement.scroll
    // })
  }

}
