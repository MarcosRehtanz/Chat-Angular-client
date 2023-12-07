import { createAction, props } from "@ngrx/store";
import { Room } from "../../models/room.model";

export const useRoom = createAction('[UseRoom Component] UseRoom', props<{room?: Room}>())