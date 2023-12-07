import { createReducer, on } from "@ngrx/store";
import { addRoom, removeRoom } from "./rooms.action";
import { Room } from "../../models/room.model";
import { v4 } from "uuid";

export const initialState: Room[] = []

export const roomsReducer = createReducer(
    initialState,
    on(addRoom, (state) => {
        return [
            ...state,
            {
                name: `sala ${state.length}`,
                room: `${state.length}`,
                id: v4()
            }
        ]
    }),
    on(removeRoom, (state, { byId }) => state.filter(({ id }) => id !== byId))
)