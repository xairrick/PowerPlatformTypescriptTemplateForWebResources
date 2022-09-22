import EventContext = Xrm.Events.EventContext;
import FormContext = Xrm.FormContext;
import OptionSetAttribute = Xrm.Attributes.OptionSetAttribute;
import StandardControl = Xrm.Controls.StandardControl;
import * as Common from './common';
import {ROLES} from "./common";

var FIELD = {
	relationshipType: 'customertypecode',
}


export function onLoad(context: EventContext) {
	var formContext = context.getFormContext();

	attachEvent(formContext, FIELD.relationshipType, relationshipTypeAttrOnChange)
}

function attachEvent(formContext: FormContext, attributeName: string, method: (eventContext: EventContext) => void) {
	const attribute = formContext.getAttribute(attributeName);
	if (attribute) {
		attribute.addOnChange(method);
	}
}


function relationshipTypeAttrOnChange(executionContext: EventContext) {
	if(!Common.hasRole(ROLES.systemAdmin)) {
		Common.displayAlert("Field Changed", "Hey Buddy, you changed a field", "OK");
	}
}

