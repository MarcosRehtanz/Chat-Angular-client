import { createAction, props } from "@ngrx/store";
import { Message } from "../../models";

export const addRoom = createAction('[Room Component] AddRoom', props<{ nameRoom: string }>());
export const joinToRoom = createAction('[Room Component] JoinToRoom', props<{ idRoom: string }>());
export const removeRoom = createAction('[Room Component] RemoveRoom', props<{ byId: string }>())
export const addChat = createAction('[Room Component] AddChat', props<{ chat: Message[], byId: string }>());