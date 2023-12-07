import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { RoomComponent } from './components/room/room.component';
import { Room } from './models/room.model';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addRoom} from './store/rooms/rooms.action';

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
  
  rooms$: Observable<Room[]>
  constructor(private store: Store<{ rooms: Room[] }>) {
    this.rooms$ = store.select('rooms')
  }

  addRoom() {
    this.store.dispatch(addRoom())
  }
}
