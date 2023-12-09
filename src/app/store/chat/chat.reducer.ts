import { createReducer, on } from "@ngrx/store";
import { ChatRoom } from "../../models";
import { useRoom } from "./chat.action";

export const initialState: ChatRoom = {
    chat: [],
    name: 'Chat Grupal',
    room: 'Angular',
    id: '',
}

export const chatReducer = createReducer(
    initialState,
    on(useRoom, (state, { room }) => {
        if (room) return room
        return initialState
    })
)