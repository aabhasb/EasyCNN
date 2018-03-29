import React, {Component} from "react";
import {
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardFooter,
  CardBlock,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from "reactstrap";


import {Badge, TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap";
import classnames from "classnames";

import FileUpload from '../FileUpload/FileUpload.js';



class Easy_Tabbed_Forms extends Component {

    constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="60">
            <Card className="card-accent-primary"> 
              <CardHeader>
              Submit a new CNN job request  <i className="fa fa-plus-circle fa-lg mt-4"></i>
              </CardHeader>
              <CardBlock className="card-body">
             <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1'})}
                  onClick={() => {
                                 this.toggle('1');

                                  }}
                >
                  Automatic
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2'  })}
                  onClick={() => { this.toggle('2'); }}
                >
                 Manual
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  Pre-trained
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              
              <TabPane tabId="1">
               <Form action="" method="post" className="form_1">
                <FormGroup>
                  <Label htmlFor="layer_count_1">No. of layers</Label>
                  <Input type="text" id="layer_count_1" placeholder="Enter the number of layers for CNN model"/>
                </FormGroup>

                <FileUpload/>
                </Form>

              </TabPane>
              <TabPane tabId="2" >
                  <FormGroup>
                    <Label htmlFor="layer_count_2"></Label>No. of layers
                    <Input type="text" id="layer_count_2" placeholder="Enter the number of layers for CNN model"/>
                  </FormGroup>
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="dimensions_X">Dimensions</Label>
                      <Input type="text" id="dimensions_X" placeholder="0"/>
                    </FormGroup>
                  </Col>
                  <Col xs="8">
                    <FormGroup>
                    <Input type="text" id="dimensions_Y" placeholder="0"/>
                    </FormGroup>
                  </Col>
                    <FormGroup>
                      <Label htmlFor="model_choose">Model Selection</Label>
                      <Input type="select" name="model_choose" id="model_choose">
                        <option value="1">Xception</option>
                        <option value="2">Inceptionv3</option>
                        <option value="3">InceptionResNetv2</option>
                        <option value="4">DenseNet121</option>
                        <option value="5">DenseNet169</option>
                        <option value="6">DenseNet201</option>
                      </Input>
                    </FormGroup>
                    <FileUpload/>

              </TabPane>
              <TabPane tabId="3">

                <FormGroup row>
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="city">City</Label>
                      <Input type="text" id="city" placeholder="Enter your city"/>
                    </FormGroup>
                  </Col>
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="postal-code">Postal Code</Label>
                      <Input type="text" id="postal-code" placeholder="Postal Code"/>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FileUpload/>
              </TabPane>
            </TabContent>

              </CardBlock>
              <CardFooter>
                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Easy_Tabbed_Forms;
