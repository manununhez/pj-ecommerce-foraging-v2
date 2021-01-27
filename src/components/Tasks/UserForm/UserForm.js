import React, { useState } from 'react';

// reactstrap components
import { FormGroup, Form, Input, Container, Col, Label, Alert } from "reactstrap";

import NumberFormat from 'react-number-format';

import {
  FORM_SEX, FORM_AGE, FORM_PROFESSION, FORM_YEARS_EDUC, FORM_LEVEL_EDUC,
  FORM_LEVEL_EDUC_INITIAL, FORM_LEVEL_EDUC_MIDDLE, FORM_LEVEL_EDUC_SUPERIOR,
  FORM_LEVEL_EDUC_DEFAULT, FEMALE_VALUE, MALE_VALUE, TEXT_EMPTY
} from '../../../helpers/constants';

import "./UserForm.css";

const DEBUG = (process.env.REACT_APP_DEBUG_LOG === "true") ? true : false;

interface UserInfo {
  sex: String;
  age: Number;
  yearsEduc: Number;
  profession: String;
  levelEduc: String;
}

export default function UserForm(props) {
  let defaultUserInfo: UserInfo = {
    sex: TEXT_EMPTY,//default selected sex
    age: 0,
    yearsEduc: 0,
    levelEduc: FORM_LEVEL_EDUC_DEFAULT, //default selected 
    profession: TEXT_EMPTY
  }

  const [userInfo, setUserInfo] = useState(defaultUserInfo);

  function validateInputForm(evt) {
    console.log(evt)
    const { id, value } = evt.target;

    if (DEBUG) console.log(id)
    if (DEBUG) console.log(value)

    //We save all fields from form data
    switch (id) {
      case FORM_SEX:
        if (value === MALE_VALUE || value === FEMALE_VALUE) {
          userInfo.sex = value
        } else {
          userInfo.sex = TEXT_EMPTY
        }
        break;
      case FORM_AGE:
        if (isNaN(value) || value === TEXT_EMPTY || value < 0) {
          userInfo.age = 0
        } else {
          userInfo.age = parseInt(value)
        }
        break;
      case FORM_PROFESSION:
        userInfo.profession = value
        break;
      case FORM_YEARS_EDUC:
        userInfo.yearsEduc = value
        break;
      case FORM_LEVEL_EDUC:
        if (value === FORM_LEVEL_EDUC_DEFAULT || value === FORM_LEVEL_EDUC_INITIAL
          || value === FORM_LEVEL_EDUC_MIDDLE || value === FORM_LEVEL_EDUC_SUPERIOR) {
          userInfo.levelEduc = value
        } else {
          userInfo.levelEduc = FORM_LEVEL_EDUC_DEFAULT
        }
        break;
      default:
        break;
    }

    setUserInfo(userInfo)
    props.action(userInfo) //return results to parent
  }

  function validateNumberFormat(numberFormat, id) {
    if (DEBUG) console.log(`${id} - ${numberFormat}`)
    let e = { target: { id: id, value: numberFormat.formattedValue } }
    validateInputForm(e)
  }

  return (
    <Container className="justify-content-center">
      <div className="text-center mt-2"><h3>Twoje dane</h3></div>
      <Alert style={{ fontSize: "1.0rem" }} color="warning" isOpen={props.error.showError}>
        <span className="alert-inner--text ml-1">
          {props.error.textError}
        </span>
      </Alert>
      <Form role="form" style={{ marginTop: '40px' }}>
        <FormGroup className="mb-3">
          <div className="d-flex align-items-left">
            <h5>Wiek</h5>
          </div>
          <NumberFormat className="form-control"
            id={FORM_AGE}
            placeholder=""
            autoFocus={true}
            onValueChange={numberFormat => validateNumberFormat(numberFormat, FORM_AGE)}
            decimalScale={0} />
        </FormGroup>
        <FormGroup className="mb-3">
          <div className="d-flex align-items-left">
            <h5>Zawód</h5>
          </div>
          <Input id={FORM_PROFESSION}
            placeholder=""
            onChange={e => validateInputForm(e)}
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <div className="d-flex align-items-left">
            <h5>Poziom wykształcenia</h5>
          </div>
          <Input type="select" name="select" id={FORM_LEVEL_EDUC} onChange={e => validateInputForm(e)}>
            <option value={FORM_LEVEL_EDUC_DEFAULT}>Wybierz...</option>
            <option value={FORM_LEVEL_EDUC_INITIAL}>podstawowe</option>
            <option value={FORM_LEVEL_EDUC_MIDDLE}>średnie</option>
            <option value={FORM_LEVEL_EDUC_SUPERIOR}>wyższe</option>
          </Input>
        </FormGroup>
        <FormGroup className="mb-3">
          <div className="d-flex align-items-left">
            <h5>Lata formalnej edukacji <small><i>(tylko etapy kończące się formalnym świadectwem: podstawowe, średnie, wyższe: np 8 lat szkoły podstawowej + 4 lata liceum = 12 lat)</i></small></h5>
          </div>
          <NumberFormat className="form-control"
            id={FORM_YEARS_EDUC}
            placeholder=""
            onValueChange={numberFormat => validateNumberFormat(numberFormat, FORM_YEARS_EDUC)}
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
                    id={FORM_SEX}
                    name={FORM_SEX + "_F"}
                    value={FEMALE_VALUE}
                    onChange={e => validateInputForm(e)}
                    checked={userInfo.sex === FEMALE_VALUE} />{' '}
                    Kobieta
                  </Label>
              </FormGroup>
            </Col>
            <Col lg="auto">
              <FormGroup>
                <Label check>
                  <Input type="radio"
                    id={FORM_SEX}
                    name={FORM_SEX + "_M"}
                    value={MALE_VALUE}
                    onChange={e => validateInputForm(e)}
                    checked={userInfo.sex === MALE_VALUE} />{' '}
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