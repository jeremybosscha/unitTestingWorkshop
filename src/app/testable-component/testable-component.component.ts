import { Component, OnInit } from '@angular/core';
import { FormValue } from '../entities/form-value';
import { Error } from '../entities/error';

@Component({
  selector: 'app-testable-component',
  templateUrl: './testable-component.component.html',
  styleUrls: ['./testable-component.component.css']
})
export class TestableComponentComponent implements OnInit {
  inputEmailObject: FormValue = new FormValue('inputEmailObject', '', true);
  inputPassword: FormValue = new FormValue('inputPassword', '', true);
  inputAddresss: FormValue = new FormValue('inputAddresss', '', true);
  inputAddress2: FormValue = new FormValue('inputAddress2', '', false);
  inputCity: FormValue = new FormValue('inputCity', '', true);
  inputZIP: FormValue = new FormValue('inputZIP', '', true);
  inputTextArea: FormValue = new FormValue('inputTextArea', '', false);

  errorMessages = new Error();
  passwordStrengthClass = '';
  constructor() { }

  ngOnInit() {
  }


  submitForm() {
    const formValues: Array<FormValue> = this.getFormValues();
    const hasNoEmptyRequiredFields: boolean = this.noRequiredFieldsAreEmpty(formValues);
    if (hasNoEmptyRequiredFields) {
      alert('Formulier verzonden!');
    }
  }

  handleEmailValidity(): void {
    if (!this.isValidEmail()) {
      this.setErrorMessage(this.inputEmailObject.getValueName(), 'niet valide', false);
    } else {
      this.errorMessages.email = '';
    }
  }

  handlePasswordStrength(): void {
    const strength: number = this.isPasswordStrongEnough();
    if (strength === 0) {
      this.passwordStrengthClass = 'weak';
    } else if (strength === 1) {
      this.passwordStrengthClass = 'medium';
    } else if (strength === 2) {
      this.passwordStrengthClass = 'strong';
    }
  }

  noRequiredFieldsAreEmpty(formValueList: Array<FormValue>): boolean {
    let success = true;
    const that = this;
    formValueList.forEach(function (formValue) {
      if (formValue.isRequired()) {
        if (formValue.getValue().length === 0) {
          that.setErrorMessage(formValue.getValueName(), 'leeg', false);
          success = false;
        } else {
          that.setErrorMessage(formValue.getValueName(), '', true);
        }
      }
    });
    return success;
  }

  setErrorMessage(valueName: string, errorPart: string, empty: boolean): void {
    switch (valueName) {
      case this.inputEmailObject.getValueName():
        this.errorMessages.email = empty ? '' : 'Email is ' + errorPart;
        break;
      case this.inputPassword.getValueName():
        this.errorMessages.password = empty ? '' : 'Wachtwoord is ' + errorPart;
        break;
      case this.inputAddresss.getValueName():
        this.errorMessages.address = empty ? '' : 'Adres is ' + errorPart;
        break;
      case this.inputCity.getValueName():
        this.errorMessages.city = empty ? '' : 'Stad is ' + errorPart;
        break;
      case this.inputZIP.getValueName():
        this.errorMessages.zip = empty ? '' : 'Postcode is ' + errorPart;
        break;
      case this.inputTextArea.getValueName():
        this.errorMessages.email = empty ? '' : 'Email is ' + errorPart;
        break;
      default:
        break;
    }
  }

  handleZipCodeValidity() {
    let isValid = true;
    const zip = this.inputZIP.getValue();
    const zipParts: Array<string> = zip.split(' ');
    if (zipParts[0].length !== 4 && !isNaN(Number(zipParts[0]))) {
      isValid = false;
    }
    if (zipParts[1]) {
      if (zipParts[1].length !== 2 && isNaN(Number(zipParts[1]))) {
        isValid = false;
      }
    }
    if (!isValid) {
      this.setErrorMessage(this.inputZIP.getValueName(), 'niet valide', false);
    } else {
      this.setErrorMessage(this.inputZIP.getValueName(), '', true);
    }
  }

  getFormValues(): Array<FormValue> {
    const inputList = new Array<FormValue>();
    inputList.push(this.inputEmailObject);
    inputList.push(this.inputPassword);
    inputList.push(this.inputAddresss);
    inputList.push(this.inputAddress2);
    inputList.push(this.inputCity);
    inputList.push(this.inputZIP);
    inputList.push(this.inputTextArea);
    return inputList;
  }

  isValidEmail(): boolean {
    let value = this.inputEmailObject.getValue();
    var regexCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexCheck.test(String(value).toLowerCase());
  }

  isPasswordStrongEnough(): number {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    const value = this.inputPassword.getValue();
    if (value.length < 8) {
      return 0;
    }
    if (strongRegex.test(value)) {
      return 2;
    }
    if (mediumRegex.test(value)) {
      return 1;
    }
  }

}
