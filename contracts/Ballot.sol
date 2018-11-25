pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

contract Ballot {

    struct Voter {
        uint weight;
        bool voted;
        uint8 vote;
        address delegate;
    }
    struct Proposal {
        uint voteCount;
    }

    address public chairperson;
    mapping(address => Voter) voters;
    mapping(address => Voter[]) voterslist;
    Proposal[] proposals;
    address[10] public votersAddr;
    uint numberOfVoter;

    /// Create a new ballot with $(_numProposals) different proposals.
    function Ballot(/*uint8 _numProposals*/) public {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        voterslist[chairperson].push(voters[chairperson]);
        voterslist[chairperson].push(voters[chairperson]);
        numberOfVoter = 1;
        votersAddr[0] = chairperson;
        proposals.length = 3;//_numProposals;
        //console.log('Create Ballo with chairperson='+chairperson);
    }

    function getList() public view returns (Voter[]) {
        return voterslist[chairperson];
    }

    function getChairPersion() public view returns (address) {
        return chairperson;
    }

    function getAllProposal() public view returns (Proposal[]) {
        return proposals;
    }

    function getAProposal(uint8 num) public view returns (Proposal) {
        return proposals[num];
    }

    function getAVoter(address addr) public view returns (Voter) {
        return voters[addr];
    }

    function getVotersListSize() public view returns (uint) {
        return voterslist[chairperson].length;
    }

    function getVotersAddr() public view returns (address[10]) {
        return votersAddr;
    }

    /// Give $(toVoter) the right to vote on this ballot.
    /// May only be called by $(chairperson).
    function giveRightToVote(address toVoter) public {
        if (msg.sender != chairperson || voters[toVoter].voted) return;
        voters[toVoter].weight = 1;
        numberOfVoter = numberOfVoter+1;
        votersAddr[numberOfVoter-1] = toVoter;
    }

    /// Delegate your vote to the voter $(to).
    function delegate(address to) public {
        Voter storage sender = voters[msg.sender]; // assigns reference
        if (sender.voted) return;
        while (voters[to].delegate != address(0) && voters[to].delegate != msg.sender)
            to = voters[to].delegate;
        if (to == msg.sender) return;
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegateTo = voters[to];
        if (delegateTo.voted)
            proposals[delegateTo.vote].voteCount += sender.weight;
        else
            delegateTo.weight += sender.weight;
    }

    /// Give a single vote to proposal $(toProposal).
    function vote(uint8 toProposal) public {
        Voter storage sender = voters[msg.sender];
        //let's allow voters to cast as many vote as they want !
        //if (sender.voted || toProposal >= proposals.length) return;
        sender.voted = true;
        sender.vote = toProposal;
        proposals[toProposal].voteCount += sender.weight;
    }

    function winningProposal() public constant returns (uint8 _winningProposal) {
        uint256 winningVoteCount = 0;
        for (uint8 prop = 0; prop < proposals.length; prop++)
            if (proposals[prop].voteCount > winningVoteCount) {
                winningVoteCount = proposals[prop].voteCount;
                _winningProposal = prop;
            }
    }
}


//Ballot.at("0x7fda22426ad26e792f68436188b37f9b958e04d7").chairperson.call()
