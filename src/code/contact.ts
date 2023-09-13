/* eslint no-unused-vars: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */
import EventContext = Xrm.Events.EventContext;
import FormContext = Xrm.FormContext;
import OptionSetAttribute = Xrm.Attributes.OptionSetAttribute;
import StandardControl = Xrm.Controls.StandardControl;
import { setDisabled, displayAlert } from "./common"; 
import {ROLES} from "./common";

const FIELD = {
	firstName: 'firstname',
}

export function onLoad(context: EventContext) {
	const formContext = context.getFormContext();
	setDisabled(formContext, FIELD.firstName, true);
	displayAlert("Hey", "Hello World", "Ok");
}

