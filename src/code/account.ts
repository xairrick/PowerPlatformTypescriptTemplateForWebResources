/* eslint no-unused-vars: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */
import EventContext = Xrm.Events.EventContext;
import FormContext = Xrm.FormContext;
import * as Common from './common';
import {ROLES} from "./common";

const FIELD = {
	relationshipType: 'customertypecode',
}

export function onLoad(context: EventContext) {
	const formContext = context.getFormContext();

	attachEvent(formContext, FIELD.relationshipType, relationshipTypeAttrOnChange)

	// With the ESlint extension installed, you see an warning on Xrm.Page (which has been deprecated)
	const dontUseExampleOfEslint = Xrm.Page.getAttribute(FIELD.relationshipType);
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

