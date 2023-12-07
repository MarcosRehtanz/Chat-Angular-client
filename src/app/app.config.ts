import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { WebSocketService } from './Services/web-socket.service';
import { provideStore } from '@ngrx/store';
import { roomsReducer } from './store/rooms/rooms.reducer';
import { chatReducer } from './store/chat/chat.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    WebSocketService,
    provideStore({
      rooms: roomsReducer,
      chat: chatReducer,
    })
  ]
};
