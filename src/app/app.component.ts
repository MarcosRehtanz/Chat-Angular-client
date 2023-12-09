import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { RoomComponent } from './components/room/room.component';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addRoom, joinToRoom } from './store/rooms/rooms.action';
import { ChatRoom, Message, Room } from './models';
import { useRoom } from './store/chat/chat.action';
import { v4 } from 'uuid';

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
  chatLenghts = 0
  constructor(private store: Store<{ rooms: ChatRoom[], chat: ChatRoom }>) {
    this.rooms$ = store.select('rooms')
  }

  ngOnInit() {
    this.rooms$.subscribe(s => {
      this.chatLenghts = s.length
    })
  }

  addRoom() {
    const propName = prompt('Coloquele un nombre a la Sala (opcional)')
    const nameRoom = propName || `Sala ${this.chatLenghts}`
    const idRoom = v4()
    this.store.dispatch(useRoom({
      room: {
        chat: [],
        name: nameRoom.toUpperCase(),
        room: idRoom.toUpperCase(),
        id: idRoom.toUpperCase(),
      }
    }))
    this.store.dispatch(joinToRoom({ idRoom, nameRoom }))
  }
  joinToRoom() {
    const propName = prompt('Coloquele un nombre a la Sala (opcional)')
    const nameRoom = propName || `Sala ${this.chatLenghts}`
    const idRoom = prompt('Id de la sala *')
    if (idRoom) {
      this.store.dispatch(useRoom({
        room: {
          chat: [],
          name: nameRoom,
          room: idRoom,
          id: idRoom,
        }
      }))
      this.store.dispatch(joinToRoom({ idRoom, nameRoom }))
    }
  }
}
