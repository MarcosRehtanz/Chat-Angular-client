import { createAction, props } from "@ngrx/store";

export const addRoom = createAction('[Room Component] AddRoom');
export const removeRoom = createAction('[Room Component] RemoveRoom', props<{ byId: string }>())