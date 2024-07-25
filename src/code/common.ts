/* eslint no-unused-vars: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */
import FormContext = Xrm.FormContext;
import Control = Xrm.Controls.Control;
import UiCanSetDisabledElement = Xrm.Controls.UiCanSetDisabledElement;
import StandardControlType = XrmEnum.StandardControlType;

export const ROLES = {
    systemAdmin: 'System Administrator',
    customerServiceRep: 'Customer Service Representitive',
    salesRep: 'Sales Representitive',
};

export function addPreSearch(formContext: FormContext, attributeName: string, method: Xrm.Events.ContextSensitiveHandler) {
    const attribute = formContext.getAttribute<Xrm.Attributes.LookupAttribute>(attributeName);
    attribute.controls.forEach((control) => {
        control.addPreSearch(method)
    });
}

export function lookupValueEquals(lookupValue: Xrm.LookupValue[], guid: string) {
    let results = false;
    if (lookupValue && lookupValue.length > 0) {
        results = areGuidsEqual(lookupValue[0].id, guid);
    }
    return results;
}

export function areGuidsEqual(left, right) {
    const separators = /[\{\-\}]/g;
    const txtLeft = left.replace(separators, '').toLowerCase();
    const txtRight = right.replace(separators, '').toLowerCase();
    return txtLeft === txtRight;
}

export function getNextBusinessDay(): Date {
    const date = new Date();

    date.setDate(date.getDate() + 1);
    if (date.getDay() === 6) {
        date.setDate(date.getDate() + 2)
    }
    else if (date.getDay() === 0) {
        date.setDate(date.getDate() + 1)
    }
    return date;
}

export function getValue(formContext: FormContext, attributeName: string, warnIfEmpty: boolean): any {
    const attribute = formContext.getAttribute(attributeName);
    if (!attribute) {
        displayAlert("Error", `'${attributeName}'' is missing from the form.  Please contact the help desk to get this issue resolved`, 'Ok');
    }
    const value = attribute.getValue();
    if (value === null && warnIfEmpty) {
        const label = attribute.controls.get()[0].getLabel();
        displayAlert("Warning", `'${label}'' has not been set yet.`, 'Ok');
    }
    return value;
}
export function displayAlert(titleText, bodyText, buttonText) {
    const alertStrings = { confirmButtonLabel: buttonText, text: bodyText, title: titleText };
    const alertOptions = { height: 350, width: 625 };

    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
        function success(result) {
            console.log("Alert dialog closed");
        },
        function (error) {
            console.log(error.message);
        }
    );
}

export function showHideAttribute(formContext: Xrm.FormContext, attributeName: string, isVisible: boolean) {
    const attr = formContext.getAttribute(attributeName);
    if (attr) {
        attr.controls.forEach((control: any) => {
            if (control.setVisible) {
                control.setVisible(isVisible)
            }
        });
    }
}
export function requireAttribute(formContext: FormContext, attributeName: string, isRequired: boolean) {
    const attr = formContext.getAttribute(attributeName);
    if (attr) {
        const requirementLevel = isRequired ? "required" : "none"
        attr.setRequiredLevel(requirementLevel);
    }
}
export function showHideCreateNewSection(formContext: Xrm.FormContext, isCreateForm: boolean) {

    formContext.ui.tabs.forEach((tab) => {
        if (tab.getName() === 'tab_createnew') {
            tab.setVisible(isCreateForm);
        }
        else {
            tab.setVisible(!isCreateForm);
            if (tab.getName() === 'tab_hidden') {
                tab.setVisible(false);
            }
        }
    });
}
export function refreshGrid(formContext: FormContext, gridName: string) {
    const grid = formContext.getControl<Xrm.Controls.GridControl>(gridName);
    if (grid) {
        grid.refresh();
    } else {
        displayAlert("Warning", `Grid '${gridName}'' is missing from the form.  Please contact the help desk to get this issue resolved`, 'Ok');
    }
}
export function hasRole(roleName: string): boolean {
    const roles = Xrm.Utility.getGlobalContext().userSettings.roles;
    const role = roles.get(x => x.name.toUpperCase() === roleName.toUpperCase());
    const result = role.length > 0;
    return result;
}

export function setFieldEnabled(formContext: Xrm.FormContext, fieldName: string, enabled: boolean) {
    const attribute = formContext.getAttribute(fieldName);
    const disableableControlTypes: string[] = [
        StandardControlType.Standard,
        StandardControlType.Lookup,
        StandardControlType.OptionSet,
        StandardControlType.SubGrid
    ]

    if (attribute) {
        attribute.controls.forEach((control: Control) => {
            if (disableableControlTypes.includes(control.getControlType())) {
                const canDisable = control as unknown as UiCanSetDisabledElement;
                canDisable.setDisabled(!enabled);
            }
        });
    }
}

export function enableFieldsForUserRoles(formContext: Xrm.FormContext, requiredRoles: string[], fieldNames: string[]): void {
    const canEdit = requiredRoles.some(hasRole);
    fieldNames.forEach(fieldNames => setFieldEnabled(formContext, fieldNames, canEdit));
}

export function disableFormFields(formContext: FormContext, shouldDisable: boolean) {
    formContext.ui.controls.forEach((control: any) => {
        if (control.setDisabled) {
            control.setDisabled(shouldDisable);
        }
    });
}

export function setDisabled(formContext: Xrm.FormContext, fieldName, isDisabled: boolean) {
    const attribute = formContext.getAttribute(fieldName);
    if (attribute) {
        attribute.controls.forEach((control: any) => {
            if (control.setDisabled) {
                control.setDisabled(isDisabled);
            }
        });
    }
}