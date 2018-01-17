import React,{Component} from 'react';
import { Row, Col, Card, CardBody, FormGroup, Form, Label, Input  } from 'reactstrap';
import {CountryInfo} from "../../config/card/type.js"

class BillingAddress extends Component{
    constructor(props)
    {
        super(props);
        this.state ={
            selected : '',
            Countries: CountryInfo,
            States : [],
            selectedSate:''
        }
        
    }
    getCountryOptions () {
        var options = this.state.Countries;
       // options = options.unshift({"id":51,"Name":"Select","Description":"Select desc"})
      //  options.push({Name : 'Select'});
        return options.map(function (country, i) {
            return <option
                key={country.id}
                value={country.Name}>
                {country.Name}
            </option>
        });
    }
     getStateOptions () {
        var options = this.state.States;
        return options.map(function (state, i) {
            return <option
                key={state.id}
                value={state.Name}>
                {state.Name}
            </option>
        });
    }
    onCountryChange(e)
    {
        let country = this.state.Countries.filter(s => {
         return s.Name.toLowerCase().match( e.target.value.toLowerCase() );
        });
        this.setState({selected : e.target.value,States: country[0].states});
        console.log('state');
        console.log(country[0].states);
        
    }
   render () {

    console.log('Countries ' + this.state.Countries);
    
    const selectedConutry = this.state.selected;
    console.log(selectedConutry);
    var States =   this.state.States.length ?  
                              <Row>
                                <Col lg="10" md="10" sm="10" xs="12">
                                   <Input type="select" name="select" value={this.state.selectedSate}>
                                       {this.getStateOptions()}
                                     </Input>    
                                </Col>
                              </Row>

                         : '';
    return(

               <div>
                       <div  className="font-italic helper-label">Billing Address:</div>
                              <Row>
                                <Col lg="10" md="10" sm="10" xs="12">
                                 
                                   <Input type="select" name="select" value={selectedConutry}  onChange={(event) => this.onCountryChange(event)} >
                                       {this.getCountryOptions()}
                                     </Input>    
                                </Col>
                              </Row>

                           <Row>
                              <Col lg="10">
                                    <Row>
                                        <Col lg="10" className="ml-auto error-message">
                                            <div  className="float-right">''</div>
                                        </Col>
                                    </Row>
                                    <Input type="text" name="address1" id="cvv" className="form-control-lg" placeholder="Address1"
                                     value={this.state.cvv}  />
                              </Col>
                          </Row>
                       {States}
                       <Row>
                              <Col lg="10">
                                    <Row>
                                        <Col lg="10" className="ml-auto error-message">
                                            <div  className="float-right">''</div>
                                        </Col>
                                    </Row>
                                    <Input type="text" name="City" id="city" className="form-control-lg" placeholder="City"
                                     value={this.state.cvv}  />
                              </Col>
                          </Row>
                      </div>    
            
    );
    }
}
export default BillingAddress;