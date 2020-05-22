'use strict';

const expect = require('chai').expect;
const utils = require('./utils');

// you need to have this run against the official backstack c
// demo device started as deviceId 1234
// use "npm run docker" to execute this
describe('bacnet - whoIs compliance', () => {
  let bacnetClient;

  beforeEach((done) => {
    bacnetClient = new utils.bacnetClient({apduTimeout: 1000, interface: '0.0.0.0'});
    bacnetClient.on('message', (msg, rinfo) => {
      console.log(msg);
      if (rinfo) console.log(rinfo);
    });
    bacnetClient.on('error', (err) => {
      console.error(err);
      bacnetClient.close();
    });
    bacnetClient.on('listening', () => {
      done();
    });
  });

  afterEach((done) => {
    setTimeout(() => {
      bacnetClient.close();
      done();
    }, 1000); // do not close to fast
  });

  it('should find the device simulator', (next) => {
    bacnetClient.on('iAm', (device) => {
      expect(device.header).to.be.ok;
      expect(device.payload).to.be.ok;
      expect(device.payload.deviceId).to.eql(1234);
      expect(device.payload.maxApdu).to.eql(1476);
      expect(device.payload.segmentation).to.eql(utils.bacnetClient.enum.Segmentation.NO_SEGMENTATION);
      expect(device.payload.vendorId).to.eql(260);
      expect(device.header.sender).to.be.ok;
      expect(device.header.sender).to.be.an('object');
      expect(device.header.sender.address).to.be.an('string');
      expect(device.header.sender.forwardedFrom).to.be.null;
      next();
    });
    bacnetClient.whoIs();
  });

  it('should find the device simulator with provided min device ID', (next) => {
    bacnetClient.on('iAm', (device) => {
      expect(device.payload.deviceId).to.eql(1234);
      next();
    });
    bacnetClient.whoIs({lowLimit: 1233});
  });

  it('should find the device simulator with provided min/max device ID and IP', (next) => {
    bacnetClient.on('iAm', (device) => {
      expect(device.payload.deviceId).to.eql(1234);
      next();
    });
    bacnetClient.whoIs({lowLimit: 1233, highLimit: 1235});
  });

  it('should NOT find any device', (next) => {
    bacnetClient.on('iAm', (device) => {
      expect(device, 'No discovery result to be expected').to.be.not.ok;
      if (notFoundTimeout) {
        clearTimeout(notFoundTimeout);
        notFoundTimeout = null;
      }
      next();
    });
    bacnetClient.whoIs({lowLimit: 1235, highLimit: 1237});
    // ok when no result came in 4s
    let notFoundTimeout = setTimeout(() => {
      notFoundTimeout = null;
      next();
    }, 4000);
  });

  // TODO tests missing for routing cases where "receiver" parameter is used to call whoIs

});
