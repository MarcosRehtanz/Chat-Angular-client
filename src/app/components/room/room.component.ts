import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from '../../models/room.model';
import { Store } from '@ngrx/store';
import { removeRoom } from '../../store/rooms/rooms.action';
import { useRoom } from '../../store/chat/chat.action';
import { Observable } from 'rxjs';
import { ChatRoom } from '../../models';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {
  @Input() room!: ChatRoom

  useId$: Observable<string>
  constructor(
    private store: Store<{ chat: Room }>
  ) {
    this.useId$ = store.select(({ chat }) => chat.id)
  }

  useRoom(room: ChatRoom | undefined) {
    this.store.dispatch(useRoom({ room }))
  }

  removeRoom(byId: string) {
    this.useId$.subscribe(r => {
      if (byId === r)
        this.store.dispatch(useRoom({ room: undefined }))
    })
    this.store.dispatch(removeRoom({ byId }))
  }
}
