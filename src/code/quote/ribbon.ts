/* eslint no-unused-vars: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */
import EventContext = Xrm.Events.EventContext;
import FormContext = Xrm.FormContext;
import * as Common from '../common';
import {ROLES} from "../common";


export function onClick(context: EventContext) {
	console.log("Ribbon button clicked");
}