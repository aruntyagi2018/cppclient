import React, { Component } from 'react';
import { Row, Col, Card, CardBody, FormGroup, Form, Label, Input  } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import {cardRange, cardTypeImages} from "../../config/card/type.js"

class SingleCardBlock extends Component {
  constructor (props) {
      super(props);
      this.state = {
        cardnumber: '',
        fakecardnumber:'',
        cardtype:'',
        expiry: '',
        fullexpiry: '',
        cvv: '',
        cardTypeImage: cardTypeImages[''],
        formErrors: {cardnumberError: '', expiryError: '', cvvError: ''},
        cardnumberValid: false,
        expiryValid: false,
        formValid: false,
        cvvValid: false
      }
    }
    cardValidforPost(e) {
      let cardnum = e.target.value.replace(/\s+/g, '');
      if (cardnum.length >= 15) {
          this.getCardPost(e);
      }
    }

    getCardPost(e)
    {
      let cardnum = e.target.value.replace(/\s+/g, '');
      var data = {
      _eka: cardnum,
        _ekb:'AE',
        _ekc:'AED',
        _ekd:'BRI',
        _eke:'TXN',
        _ekf:'TRAN00000000000000001',
        _ekg:'',
        _ekh:''
      };
      this.props.cardPost(data);
    }

    validateUserInput (e) {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value},
                    () => { this.validateField(name, value) });
        switch (name) {
          case "cardnumber":
              this.reMapPlaceholder(e);
              let fakecardnumber = value.replace(/[^0-9]/, '');
              this.props.cardKeyPress({value:fakecardnumber, cardtype:this.props.creditcard.cardtype});
              if (fakecardnumber.length > 0) {
                fakecardnumber = fakecardnumber.replace(/ /g,'').match(/.{1,4}/g).join(" ");
            }
            this.setState({fakecardnumber: fakecardnumber});
            break;
          case "expiry":
                this.reMapPlaceholder(e);
                let fullexpiry = value.replace(/[^0-9 /]/, '');
                switch (fullexpiry.length) {
                  case 1:
                    if(isNaN(fullexpiry)) {
                      fullexpiry = "";
                    }
                    else if (fullexpiry > 1) {
                      fullexpiry = "0" + fullexpiry  + " / ";
                    }
                    break;
                  case 2:
                    if(isNaN(fullexpiry)) {
                      fullexpiry = fullexpiry.replace(/[^0-9]/, '');
                      if(isNaN(fullexpiry)) {
                        fullexpiry = "";
                      }
                      else if (fullexpiry > 1) {
                        fullexpiry = "0" + fullexpiry  + " / ";
                      }
                    }
                    else if (fullexpiry <= 0) {
                      fullexpiry = "0";
                    }
                    else if (fullexpiry <= 1) {
                      fullexpiry = "01 / ";
                    }
                    else if (fullexpiry < 13) {
                      fullexpiry = fullexpiry  + " / ";
                    }
                    else {
                      fullexpiry = ("0" + fullexpiry).match(/.{1,2}/g).join(" / ");
                    }
                    break;
                  case 3:
                      fullexpiry = fullexpiry.match(/.{1,2}/g).join(" / ");
                    break;
                  case 4:
                    fullexpiry = fullexpiry.substring(0, 2);
                  break;
                  default:
                    break;
                }
              this.setState({fullexpiry: fullexpiry});
              break;
          default:

        }
    }
    getCardType(value) {
      let validateLength = value.length;
      let cardtype = this.state.cardtype;
      if (validateLength === 0) {
        cardtype = "";
      }
      else {
        for (var i = 1; i <= validateLength; i++) {
          if (cardRange.hasOwnProperty(i.toString())) {
            let matchvalue = value.toString().substring(0,i);
            if (cardRange[i].hasOwnProperty("match")) {
              for(var ctype in cardRange[i]["match"])
              {
                if(cardRange[i]["match"][ctype].includes(matchvalue)) {
                  cardtype = ctype;
                }
              }
            }
          }
        }
      }
      this.setState({cardtype: cardtype,
                    cardTypeImage: cardTypeImages[cardtype]});
    }

    validateField(fieldName, value) {
          let fieldValidationErrors = this.state.formErrors;
          let cardnumberValid = this.state.cardnumberValid;
          let expiryValid = this.state.expiryValid;
          let cvvValid = this.state.cvvValid;

          switch(fieldName) {
          case 'cardnumber':
              cardnumberValid = false;
              if(value.trim().length < 1) {
                fieldValidationErrors.cardnumberError = 'Required field!';
              }
              else {
                cardnumberValid = true;
                fieldValidationErrors.cardnumberError = '';
              }
              break;
          case 'expiry':
              expiryValid = value.length > 0;
              fieldValidationErrors.expiryError = expiryValid ? '' : 'Required!';
              break;
          case 'cvv':
              cvvValid = value.length > 0;
              fieldValidationErrors.expiryError = cvvValid ? '' : 'Required!';
              break;
          default:
              break;
      }
      this.setState({ formErrors: fieldValidationErrors,
                      cardnumberValid: cardnumberValid,
                      expiryValid: expiryValid,
                      cvvValid: cvvValid
                    }, this.validateForm);
    }

    validateForm() {
      this.setState({formValid: this.state.cardnumberValid && this.state.expiryValid && this.state.cvvValid});
    }

  errorClass(error) {
      return(error.length === 0 ? '' : 'error');
   }

   lookupUser(event) {
      if(this.state.formValid) {
      var data = {cardnumber: this.state.cardnumber, expiry: this.state.expiry};
       this.props.loginUser(data);
      }
   }
   mapPlaceholder(e) {
     var ele = e.target;
     ele.setAttribute('placeholder', ele.getAttribute('setplaceholder'));
   }
   reMapPlaceholder(e) {
     var ele = e.target;
     ele.setAttribute('placeholder', ele.getAttribute('resetplaceholder'));
   }

  render() {
      return (
          <Row id="LoginBlock" className="comp-block">
              <Col md="8" lg="6" className="mr-auto mx-auto">
                <Card>
                  <CardBody>
                      <Form>
                          <FormGroup className={this.errorClass(this.state.formErrors.cardnumberError)}>
                              <Row>
                                <Col lg="6" className="no-pad cardcol">
                                <img width="20px" className="cardLogo small" src={this.props.creditcard.cardTypeImage} alt={this.props.creditcard.cardtype} />
                                <Label for="cardnumber" className="font-italic helper-label">Card Number</Label>
                                  <Input  maxLength="23"
                                  type="text"  name="cardnumber" id="cardnumber" className="form-control custom-input " placeholder="Card Number" resetplaceholder="Card Number" setplaceholder="1234 1234 1234 1234"
                                  onChange={(event) => this.validateUserInput(event)} onFocus={(event) => this.mapPlaceholder(event)} onBlur={(event) => this.cardValidforPost(event) } value={this.state.fakecardnumber}  />
                                </Col>
                                <Col lg="3" className="no-pad">
                                <Label for="expiry" className="font-italic helper-label">Expiry Date</Label>
                                  <Input maxLength="7" type="text" name="expiry" id="expiry" className="form-control custom-input " placeholder="Exp Date" resetplaceholder="Exp Date" setplaceholder="MM/DD"
                                onChange={(event) => this.validateUserInput(event)} onFocus={(event) => this.mapPlaceholder(event)} onBlur={(event) => this.validateUserInput(event)} value={this.state.fullexpiry}  />
                                </Col>
                                <Col lg="3" className="no-pad">
                                <Label for="expiry" className="font-italic helper-label">CVV</Label>
                                  <Input type="text" name="cvv" id="cvv" className="form-control custom-input" placeholder="CVV"
                                  onChange={(event) => this.validateUserInput(event)} onBlur={(event) => this.validateUserInput(event)} value={this.state.cvv}  />
                                </Col>
                              </Row>

                          </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
              </Col>
          </Row>
      );
  }
};

function mapStateToProps({creditcard}) {
    return {creditcard};
}

export default connect(mapStateToProps, actions) (SingleCardBlock);
