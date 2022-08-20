const { expect } = require('chai');
const hre = require('hardhat');
const { time, loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

describe('Lock', () => {
    async function deployFixture() {
        const lockedAmount = 1_000_000_000;
        const ONE_MINUTE_IN_SECS = 60;

        const unlockTime = (await time.latest()) + ONE_MINUTE_IN_SECS;
        const Lock = await hre.ethers.getContractFactory('Lock');
        const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

        return { lock, unlockTime, lockedAmount };
    }

    it('should set the right unlock time', async () => {
        const { lock, unlockTime } = await loadFixture(deployFixture);
        expect(await lock.unlockTime()).to.equal(unlockTime);
    });

    it('should revert when trying to withdraw before unlockTime', async () => {
        const { lock } = await loadFixture(deployFixture);
        await expect(lock.withdraw()).to.be.revertedWith("Can't withdraw just yet");
    });
});
