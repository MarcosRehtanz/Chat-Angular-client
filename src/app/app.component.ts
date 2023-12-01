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

  socketConnect() {
    this.socket.connect()
  }
  socketDisconnect() {
    this.socket.disconnect()
  }
  socketEmit() {
    this.socket.sendMessage({
      message: "Hola"
    })
  }
  socketHi(){
    this.socket.emit('hi')
  }

}
