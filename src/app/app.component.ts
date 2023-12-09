import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { RoomComponent } from './components/room/room.component';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { joinToRoom } from './store/rooms/rooms.action';
import { ChatRoom, Room } from './models';
import { useRoom } from './store/chat/chat.action';
import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';

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
  constructor(private store: Store<{ rooms: ChatRoom[]}>) {
    this.rooms$ = store.select('rooms')
  }


  joinToRoom() {
    const propName = prompt('Coloquele un nombre a la Sala (opcional)')
    const nameSelectRoom = propName || faker.animal.rabbit()
    const nameRoom = nameSelectRoom.toUpperCase()
    const propId = prompt('Id de la sala')
    const idSelectRoom = propId || v4()
    const idRoom = idSelectRoom.toUpperCase()
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
