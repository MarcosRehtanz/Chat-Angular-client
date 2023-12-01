import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from './Services/web-socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Socket';

  socket = inject(WebSocketService)
  inputMessage = ''
  chat = this.socket.chat

  changeInputMessage(event: any) {

    if (event.code === "Enter") this.sendMessage()
    else this.inputMessage = event.target.value;
  }

  sendMessage() {
    this.socket.sendMessage({
      message: this.inputMessage,
      author: `${this.socket.ioSocket.id}`,
    })
    this.inputMessage = ''
  }

  socketHi() {
    this.socket.emit('hi')
  }

  ngOnInit() {
    this.socket.socketOn()
  }

}
