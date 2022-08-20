// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

contract Lock {
    uint public unlockTime;
    uint public lockedAmount;
    address payable public owner;

    constructor(uint until) payable {
        require(msg.value > 0 ether, "You must send some funds");
        unlockTime = until;
        lockedAmount = msg.value;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        require(block.timestamp >= unlockTime, "Can't withdraw just yet");
        require(msg.sender == owner, "You are not the owner");
        owner.transfer(address(this).balance);
    }
}
