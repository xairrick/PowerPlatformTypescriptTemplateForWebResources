import EventContext = Xrm.Events.EventContext;
import FormContext = Xrm.FormContext;
import OptionSetAttribute = Xrm.Attributes.OptionSetAttribute;
import StandardControl = Xrm.Controls.StandardControl;
import { setDisabled, displayAlert } from "./common"; 
import {ROLES} from "./common";

var FIELD = {
	firstName: 'firstname',
}

export function onLoad(context: EventContext) {
	var formContext = context.getFormContext();
	setDisabled(formContext, FIELD.firstName, true);
	displayAlert("Hey", "Hello World", "Ok");
}

