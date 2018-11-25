import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import logo from '../../logo.png'
import { withStyles } from '@material-ui/core/styles';

import { isEqual } from 'lodash';
import ReactHighcharts from 'react-highcharts';
import baseChartConfig from './chart-config';

const styles = ({ spacing }) => ({
  header: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 500,
    width: '100%',
    marginBottom: spacing.unit * 6,
  },
  hide: {
    display: 'none',
  }
});

class Home extends Component {
  state = {
    totalProposals: 0,
    proposals: {},
  };

  componentDidMount() {
    const val = Object.values(this.props.Ballot.getAllProposal)[0];
    this.setProposals();
  }

  setProposals() {
    const val = Object.values(this.props.Ballot.getAllProposal);
    console.log('val:',val);
    var proposals = [], total = 0;
    val[0] && val[0].value.forEach((v, idx) => {
      proposals[idx] = parseInt(v[0], 10);
      total += proposals[idx]
    })
    this.setState({
      totalProposals: total,
      proposals
    })
    console.log('setProposals', val, this.state.proposals);
  }

  componentDidUpdate(prevProps) {
    const val = Object.values(this.props.Ballot.getAllProposal)[0];
    //val && this.setProposals();
    if (!isEqual(
      prevProps.Ballot.getAllProposal,
      this.props.Ballot.getAllProposal)
    ) {
      this.setProposals();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextState, this.state) || !isEqual(nextProps, this.props);
  }

  render() {
    console.log(this.props);
    const data = this.state.proposals;
    const chartTitle = 'All Proposals';

    const chartConfig = {
      ...baseChartConfig,
      chart: {
        type: 'column'
      },
      xAxis: {
        categories: ['Proposal#0', 'Proposal#1', 'Proposal#2'],
      },
      title: {
        text: chartTitle
      },
      series: [{
        data: [{
          name: 'Proposal#0',
          color: '#8DC5BF',
          y: data[0],
        }, {
          name: 'Proposal#1',
          color: '#BA96BE',
          y: data[1],
        }, {
          name: 'Proposal#2',
          color: '#F0B168',
          y: data[2],
        }]
      }]
    }

    const numbers = [0, 1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
      <li><ContractData contract="Ballot" method="votersAddr" methodArgs={[number]}/></li>
    );
    const numbers2 = [0, 1, 2];
    const listItemsProposals = numbers2.map((number) =>
      <p>Proposal#{number}: <ContractData contract="Ballot" method="getAProposal" methodArgs={[number]}/></p>
    );
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <ReactHighcharts config={chartConfig} />

            <h2>Ballot</h2>
            <ContractForm contract="Ballot" method="vote" />
            <br/>

            <p><strong>all proposals</strong>:<ContractData contract="Ballot" method="getAllProposal"/></p>
            {listItemsProposals}
            <br/>

            <p><strong>chairperson</strong>: <ContractData contract="Ballot" method="chairperson" /></p>
            <p><strong>voter addr</strong>: <ContractData contract="Ballot" method="votersAddr" methodArgs={[0]}/></p>
            {listItems}
            <br/>
            <ContractForm contract="Ballot" method="giveRightToVote" />
            <br/>



            <br/>

          <br/>
          </div>



            <div className="pure-u-1-1">
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />
            <AccountData accountIndex="1" units="ether" precision="6" />
            <AccountData accountIndex="2" units="ether" precision="2" />
            <br/><br/>
          </div>

        </div>
      </main>
    )
  }
}

export default withStyles(styles)(Home)

/*
<div className="pure-u-1-1">
  <h2>SimpleStorage</h2>
  <p>This shows a simple ContractData component with no arguments, along with a form to set its value.</p>
  <p><strong>Stored Value</strong>: <ContractData contract="SimpleStorage" method="storedData" /></p>
  <ContractForm contract="SimpleStorage" method="set" />

  <br/><br/>
</div>


<div className="pure-u-1-1 header">
            <img src={logo} alt="drizzle-logo" />
            <h1>Drizzle Examples</h1>
            <p>Examples of how to get started with Drizzle in various situations.</p>

            <br/><br/>
          </div>

  <div className="pure-u-1-1">
            <h2>TutorialToken</h2>
            <p>Here we have a form with custom, friendly labels. Also note the token symbol will not display a loading indicator. We've suppressed it with the <code>hideIndicator</code> prop because we know this variable is constant.</p>
            <p><strong>Total Supply</strong>: <ContractData contract="TutorialToken" method="totalSupply" methodArgs={[{from: this.props.accounts[0]}]} /> <ContractData contract="TutorialToken" method="symbol" hideIndicator /></p>
            <p><strong>My Balance</strong>: <ContractData contract="TutorialToken" method="balanceOf" methodArgs={[this.props.accounts[0]]} /></p>
            <h3>Send Tokens</h3>
            <ContractForm contract="TutorialToken" method="transfer" labels={['To Address', 'Amount to Send']} />

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>ComplexStorage</h2>
            <p>Finally this contract shows data types with additional considerations. Note in the code the strings below are converted from bytes to UTF-8 strings and the device data struct is iterated as a list.</p>
            <p><strong>String 1</strong>: <ContractData contract="ComplexStorage" method="string1" toUtf8 /></p>
            <p><strong>String 2</strong>: <ContractData contract="ComplexStorage" method="string2" toUtf8 /></p>
            <strong>Single Device Data</strong>: <ContractData contract="ComplexStorage" method="singleDD" />

            <br/><br/>
          </div>
*/
