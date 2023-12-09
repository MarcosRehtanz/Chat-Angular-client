import { createAction, props } from "@ngrx/store";
import { ChatRoom, Room } from "../../models";

export const useRoom = createAction('[UseRoom Component] UseRoom', props<{ room?: ChatRoom }>())