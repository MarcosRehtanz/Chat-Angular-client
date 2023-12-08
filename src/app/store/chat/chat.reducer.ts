import { createReducer, on } from "@ngrx/store";
import { Room } from "../../models";
import { useRoom } from "./chat.action";

export const initialState: Room = {
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