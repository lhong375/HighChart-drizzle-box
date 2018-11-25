var SimpleStorage = artifacts.require("SimpleStorage");
var TutorialToken = artifacts.require("TutorialToken");
var ComplexStorage = artifacts.require("ComplexStorage");
var Ballot = artifacts.require("Ballot");
//var Attribution = artifacts.require("Attribution");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  //deployer.deploy(TutorialToken);
  //deployer.deploy(ComplexStorage);
  deployer.deploy(Ballot);
  //deployer.deploy(Attribution);
};
