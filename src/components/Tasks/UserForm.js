import React, { useState, useEffect } from 'react';

// reactstrap components
import { FormGroup, Form, Input, Container, Col, Label, Alert } from "reactstrap";

import NumberFormat from 'react-number-format';

import * as constant from '../../helpers/constants';

import "./style.css";

const DEBUG = (process.env.REACT_APP_DEBUG_LOG === "true") ? true : false;

export default function UserForm(props) {
  const defaultForm = {
    sex: constant.TEXT_EMPTY,//default selected sex
    age: 0,
    yearsEduc: 0,
    levelEduc: constant.FORM_LEVEL_EDUC_DEFAULT, //default selected 
    profession: constant.TEXT_EMPTY
  }
  const defaultError = {
    showError: false,
    textError: constant.TEXT_EMPTY
  }

  const [formData, setFormData] = useState(defaultForm);
  const [error, setError] = useState(defaultError);

  useEffect(() => {
    const handleKeyDownEvent = event => {
      const { key, keyCode } = event;
      if (keyCode === constant.ENTER_KEY_CODE) { //Transition between screens
        console.log(`Key: ${key}; keyCode: ${keyCode}`)
        let error = {
          showError: false,
          textError: constant.TEXT_EMPTY
        }
        // CONTROL OF EMPTY_TEXT
        if (formData.age === 0) {
          error.textError = constant.ERROR_5;
          error.showError = true;
        } else if (formData.profession === constant.TEXT_EMPTY) {
          error.textError = constant.ERROR_7;
          error.showError = true;
        } else if (formData.levelEduc === constant.FORM_LEVEL_EDUC_DEFAULT) {
          error.textError = constant.ERROR_11;
          error.showError = true;
        } else if (formData.yearsEduc === 0) {
          error.textError = constant.ERROR_6;
          error.showError = true;
        } else if (formData.sex === constant.TEXT_EMPTY) {
          error.textError = constant.ERROR_14;
          error.showError = true;
        }

        if (error.showError) {
          setError(error);
        } else {
          props.action(formData)
        }
      }
    }

    document.addEventListener(constant.EVENT_KEY_DOWN, handleKeyDownEvent);
    return () => {
      document.removeEventListener(constant.EVENT_KEY_DOWN, handleKeyDownEvent);
    };
  });

  const validateInputForm = evt => {
    const formId = evt.target.id;
    const formInputValue = evt.target.value;

    let formDataResult = { ...formData } //Copy Value
    if (DEBUG) console.log(formId)
    if (DEBUG) console.log(formInputValue)

    //We save all fields from form data 
    if (formId === constant.FORM_SEX) {
      if (formInputValue === constant.MALE_VALUE || formInputValue === constant.FEMALE_VALUE) {
        formDataResult.sex = formInputValue
      } else {
        formDataResult.sex = constant.TEXT_EMPTY
      }
    } else if (formId === constant.FORM_AGE) {
      if (isNaN(formInputValue) || formInputValue === constant.TEXT_EMPTY || formInputValue < 0) {
        formDataResult.age = 0
      } else {
        formDataResult.age = parseInt(formInputValue)
      }
    } else if (formId === constant.FORM_PROFESSION) {
      formDataResult.profession = formInputValue
    } else if (formId === constant.FORM_YEARS_EDUC) {
      if (isNaN(formInputValue) || formInputValue === constant.TEXT_EMPTY || formInputValue < 0) {
        formDataResult.yearsEduc = 0
      } else {
        formDataResult.yearsEduc = parseInt(formInputValue)
      }
    } else if (formId === constant.FORM_LEVEL_EDUC) {
      if (formInputValue === constant.FORM_LEVEL_EDUC_DEFAULT || formInputValue === constant.FORM_LEVEL_EDUC_INITIAL
        || formInputValue === constant.FORM_LEVEL_EDUC_MIDDLE || formInputValue === constant.FORM_LEVEL_EDUC_SUPERIOR) {
        formDataResult.levelEduc = formInputValue
      } else {
        formDataResult.levelEduc = constant.FORM_LEVEL_EDUC_DEFAULT
      }
    }

    setError(defaultError);
    setFormData(formDataResult)
  }

  const validateNumberFormat = (id, numberFormat) => {
    let e = { target: { id: id, value: numberFormat.formattedValue } }
    validateInputForm(e)
  }

  return (
    <Container className="justify-content-center">
      <div className="text-center mt-2"><h3>Twoje dane</h3></div>
      <Alert style={{ fontSize: "1.0rem" }} color="warning" isOpen={error.showError}>
        <span className="alert-inner--text ml-1">
          {error.textError}
        </span>
      </Alert>
      <Form role="form" style={{ marginTop: '40px' }}>
        <FormGroup className="mb-3">
          <div className="d-flex align-items-left">
            <h5>Wiek</h5>
          </div>
          <NumberFormat className="form-control"
            id={constant.FORM_AGE}
            placeholder={constant.TEXT_EMPTY}
            autoFocus={true}
            onValueChange={validateNumberFormat.bind(this, constant.FORM_AGE)}
            decimalScale={0} />
        </FormGroup>
        <FormGroup className="mb-3">
          <div className="d-flex align-items-left">
            <h5>Zawód</h5>
          </div>
          <Input id={constant.FORM_PROFESSION}
            placeholder={constant.TEXT_EMPTY}
            onChange={evt => validateInputForm(evt)}
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <div className="d-flex align-items-left">
            <h5>Poziom wykształcenia</h5>
          </div>
          <Input type="select" name="select" id={constant.FORM_LEVEL_EDUC} onChange={evt => validateInputForm(evt)}>
            <option value={constant.FORM_LEVEL_EDUC_DEFAULT}>Wybierz...</option>
            <option value={constant.FORM_LEVEL_EDUC_INITIAL}>podstawowe</option>
            <option value={constant.FORM_LEVEL_EDUC_MIDDLE}>średnie</option>
            <option value={constant.FORM_LEVEL_EDUC_SUPERIOR}>wyższe</option>
          </Input>
        </FormGroup>
        <FormGroup className="mb-3">
          <div className="d-flex align-items-left">
            <h5>Lata formalnej edukacji <small><i>(tylko etapy kończące się formalnym świadectwem: podstawowe, średnie, wyższe: np 8 lat szkoły podstawowej + 4 lata liceum = 12 lat)</i></small></h5>
          </div>
          <NumberFormat className="form-control"
            id={constant.FORM_YEARS_EDUC}
            placeholder={constant.TEXT_EMPTY}
            onValueChange={validateNumberFormat.bind(this, constant.FORM_YEARS_EDUC)}
            decimalScale={0} />
        </FormGroup>
        <FormGroup tag="fieldset" className="mb-3">
          <div className="d-flex align-items-left">
            <h5>Płeć</h5>
          </div>
          <div style={{ display: "inline-flex" }} >
            <Col lg="auto">
              <FormGroup>
                <Label check>
                  <Input type="radio"
                    id={constant.FORM_SEX}
                    name={constant.FORM_SEX + "_F"}
                    value={constant.FEMALE_VALUE}
                    onChange={validateInputForm}
                    checked={formData.sex === constant.FEMALE_VALUE} />{' '}
                    Kobieta
                  </Label>
              </FormGroup>
            </Col>
            <Col lg="auto">
              <FormGroup>
                <Label check>
                  <Input type="radio"
                    id={constant.FORM_SEX}
                    name={constant.FORM_SEX + "_M"}
                    value={constant.MALE_VALUE}
                    onChange={validateInputForm}
                    checked={formData.sex === constant.MALE_VALUE} />{' '}
                    Mężczyzna
                    </Label>
              </FormGroup>
            </Col>
          </div>
        </FormGroup>
      </Form>
    </Container>
  );
}
