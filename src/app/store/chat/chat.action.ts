import { createAction, props } from "@ngrx/store";
import { Room } from "../../models";

export const useRoom = createAction('[UseRoom Component] UseRoom', props<{ room?: Room }>())