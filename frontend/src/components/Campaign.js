'use strict';

import React, {Component} from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Row, Col, Table, Button, Container, Input, FormGroup, Label, Form} from 'reactstrap';
import { fetchCampaign, donateCampaign, withdrawCampaign } from '../actions/campaignActions'
import Header from './Header'
import * as _ from 'lodash'
class Campaign extends Component {

    constructor(props) {
        super(props);


        this.state = {   
            tag: '',
            campaign: null,
            name: '',
            goalAmount: '',
            weiLimitPerBlock: '',
            deadline: '',
            eAddr: '',
            cAddr: '',
            balance: '',
        }

        this.handleDonate = this.handleDonate.bind(this)
        this.handleWithdraw = this.handleWithdraw.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }

    componentWillMount () {
        //this.props.fetchCampaign(this.props.match.params.id)
        let campaignArr = JSON.parse(sessionStorage.getItem('campaigns'))
        let cCampaign = _.find(campaignArr.campaigns, {cAddr: this.props.match.params.id})
        if (!cCampaign) {
            console.log("this aint supposed 2 happen boo!")
            //this.props.navigateToLanding()
        } else {
            console.log(cCampaign)
            this.setState({
                name: cCampaign.name,
                goalAmount: cCampaign.goalAmount,
                weiLimitPerBlock: cCampaign.weiLimitPerBlock,
                deadline: cCampaign.deadline,
                eAddr: cCampaign.eAddr,
                cAddr: cCampaign.cAddr,
                balance: cCampaign.balance,
            }, ()=>{
                console.log(this.state)
            })
        }

    }
    handleSelect = (e) => {
        e.preventDefault()
        console.log(this.tag.value)
        this.setState({
            tag: this.tag.value.toLowerCase(),
        })
    }

    handleDonate (e) {
        e.preventDefault()
       // this.props.donateCampaign(this.props.campaign.address)
    }

    handleWithdraw (e) {
        e.preventDefault()
       // this.props.withdrawCampaign(this.props.campaign.address)
    }

    render() {
        let campaignArr = JSON.parse(sessionStorage.getItem('campaigns')).campaigns
        

        const DonateButton = () => (
            <div>
                <Form>
                    <FormGroup row>
                        <Label for="amount" sm={3}>Amount (wei):</Label>
                        <Col sm={4}>
                        <Input 
                            getRef={(input)=>this.amount= input}
                            type="text"
                            placeholder="wei"
                        />
                        </Col>
                    </FormGroup>
                <FormGroup row>
                    <Label for="tag" sm={3}>Tag</Label>
                    <Col sm={4}>
                    <Input type="select" name="select" 
                    id="exampleSelect" 
                    getRef={(input)=>this.tag = input}
                    onChange={this.handleSelect}>
                    <option>Medical</option>
                    <option>Construction</option>
                    <option>Education</option>
                    <option>Food</option>
                    <option>Sanitation</option>
                    </Input>
                    </Col>
                </FormGroup>
                <Row>
                    <Col sm={2}>
                        <Button onClick={this.handleDonate}>Contribute Funds!</Button>
                    </Col>
                </Row> 
                </Form>
            </div>
        )

        const WithdrawButton = () => (
            <div>
                <Form>
                    <FormGroup row>
                        <Label for="address" sm={3}>Address:</Label>
                        <Col sm={4}>
                        <Input 
                            getRef={(input)=>this.address= input}
                            type="text"
                            placeholder="0x339FDb91708eDD47D92E847206aEd92f1C275699"
                        />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="amount" sm={3}>Amount (wei):</Label>
                        <Col sm={4}>
                        <Input 
                            getRef={(input)=>this.amount= input}
                            type="text"
                            placeholder="wei"
                        />
                        </Col>
                    </FormGroup>
                    <Row>
                        <Col sm={2}>
                            <Button onClick={this.handleWithdraw}>Withdraw Funds!</Button>
                        </Col>
                    </Row> 
                    </Form>
            </div>
        )
        //we will have to use phillip's shitty implementation until we figure it out lol
        return (
            <Container>
                <Row>
                    <Col xs={3} >
                        <p><b> Address: </b></p>
                        <p><b> Campaigner: </b></p>
                        <p><b> Cumulative Balance: </b></p>
                        <p><b> Current Balance: </b></p>
                        <p><b> Deadline: </b></p>
                    </Col>
                    <Col xs={4}>
                        <p>{this.state.cAddr}</p>
                        <p>{this.state.eAddr}</p>
                        <p>{this.state.balance}</p>
                        <p>{this.state.balance}</p>
                        <p>{this.state.deadline}</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={10}>
                    </Col>
                </Row>
            </Container>
        )
    }
}
const mapStatetoProps = (state) => {
  return {
    user: state.user.user,
    campaign: state.campaign.campaign,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampaign: (address) => dispatch(fetchCampaign(address)),
    donateCampaign: (donate) => dispatch(donateCampaign(donate)),
    withdrawCampaign: (withdraw) => dispatch(donateCampaign(withdraw)),
    navigateToLanding: () => dispatch(push("/"))
  } 
}

export default connect(mapStatetoProps, mapDispatchToProps)(Campaign)
