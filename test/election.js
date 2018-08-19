/**
 * - check constructor work
 * - check init value for each candidate : id, name, voteCount
 * - check vote function:
 *    - check the require that candidate id should smaller or equal to candidate count
 *    - check voter not yet vote
 *    - check update of voters mapping
 *    - check update of candidate's voteCount
 *    - check event happen
 */

 var Election = artifacts.require("./Election.sol");

 contract("Election", function(accounts){

  it("check candidate count is 2", function(){
    return Election.deployed().then(function(instance){
      return instance.candidateCount();
    }).then(function(count){
      assert.equal(count, 2, "contract is init with 2 candidates");
    });
  });

  it("check init value for each candidate", function(){
    return Election.deployed().then(function(instance){
      electionInstance = instance;
      return electionInstance.candidates(1);
    }).then(function(candidate){
      assert.equal(candidate[0], 1, "check id");
      assert.equal(candidate[1], "candidate 1", "check name");
      assert.equal(candidate[2], 0, "check vote count");
      return electionInstance.candidates(2);
    }).then(function(candidate){
      assert.equal(candidate[0], 2, "check id");
      assert.equal(candidate[1], "candidate 2", "check name");
      assert.equal(candidate[2], 0, "check vote count");
    });
  });

  it("candidate id should smaller or equal to candidate count", function(){
    return Election.deployed().then(function(instance){
      return instance.vote(3, {from:accounts[0]});
    }).then(assert.fail).catch(function(error){
      // console.log(error);
      assert(error.message.indexOf("revert") >= 0, "error should contain revert");
    });
  });

  it("voter should not vote before", function(){
    return Election.deployed().then(function(instance){
      instance.vote(1, {from:accounts[0]});
      return instance.vote(1, {from:accounts[0]});
    }).then(assert.fail).catch(function(error){
      // console.log(error);
      assert(error.message.indexOf("revert") >= 0, "error should contain revert");
    });
  });
  
  it("check valide vote", function(){
    return Election.deployed().then(function(instance){
      electionInstance = instance;
      electionInstance.vote(2, {from:accounts[1]});
      return electionInstance.voters(accounts[1]);
    }).then(function(state){
      assert.equal(state, true, "check state after vote");
      return electionInstance.candidates(2);
    }).then(function(candidate){
      assert.equal(candidate[2], 1, "check vote count")
    });
  });

 });

