import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { RoomComponent } from './components/room/room.component';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addRoom, joinToRoom } from './store/rooms/rooms.action';
import { ChatRoom, Room } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChatComponent, RoomComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  generalRoom: Room = {
    name: 'Sala General',
    room: 'angular',
    id: '',
  }

  rooms$: Observable<ChatRoom[]>
  constructor(private store: Store<{ rooms: ChatRoom[], chat: ChatRoom }>) {
    this.rooms$ = store.select('rooms')
  }

  addRoom() {
    const nameRoom = prompt('Coloquele un nombre a la Sala')
    if (nameRoom)
      this.store.dispatch(addRoom({ nameRoom }))
  }
  joinToRoom() {
    const idRoom = prompt('Id de la sala')
    if (idRoom)
      this.store.dispatch(joinToRoom({ idRoom }))
  }
}
