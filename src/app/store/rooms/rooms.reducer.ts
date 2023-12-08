import { createReducer, on } from "@ngrx/store";
import { addChat, addRoom, joinToRoom, removeRoom } from "./rooms.action";
import { v4 } from "uuid";
import { ChatRoom } from "../../models";

export const initialState: ChatRoom[] = []

export const roomsReducer = createReducer(
    initialState,
    on(addRoom, (state, { nameRoom }) => {
        const idRoom = v4().toUpperCase()
        return [
            ...state,
            {
                chat: [],
                name: nameRoom,
                room: idRoom,
                id: idRoom
            }
        ]
    }),
    on(joinToRoom, (state, { idRoom }) => {
        return [
            ...state,
            {
                chat: [],
                name: `sala ${state.length}`,
                room: idRoom.toUpperCase(),
                id: idRoom.toUpperCase()
            }
        ]
    }),
    on(removeRoom, (state, { byId }) => state.filter(({ id }) => id !== byId)),
    on(addChat, (state, { chat, byId }) => state.map((chatRoom) => {
        if (chatRoom.id === byId)
            return {
                ...chatRoom,
                chat
            }
        else
            return chatRoom
    }))
)