# Contributing

Implementing and maintaining a protocol stack is a lot of work, therefore any
help is appreciated, from creating issues, to contributing documentation, fixing
issues and adding new features.

Please follow the best-practice contribution guidelines as mentioned below when
submitting any changes.

### Git

Please, do your changes with the develop branch in your forked repo
and send us your pull request from your own forked repo feature-branches
or fix-branches to the develop branch of our repo!

see [Git-Flow](https://www.atlassian.com/de/git/tutorials/comparing-workflows/gitflow-workflow)

Git-Flow feature brachnes would be great here to seperate and to review changes to get the best integration results for your good work.

### Start

``` sh
npm i -g npm-check-updates
npm install
```

### Conventional Changelog

This module has a changelog which is automatically generated based on Git commit
messages. This mechanism requires that all commit messages comply with the
[Conventional Changelog](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md).
You can check if your commit messages complies with those guidelines by using:

``` sh
npm run changelog
```

### Code Style

This module uses the [Google JavaScript Code-Style](https://google.github.io/styleguide/javascriptguide.xml)
and enforces it using [JSCS](http://jscs.info/) as additional linter beneath
[JSHint](http://jshint.com/). You can test if your changes comply with the code
style by executing:

``` sh
npm run lint
```

### Testing and Coverage

Testing is done using [Mocha](https://mochajs.org/) and is separated into two
sets, `unit` and `integration`. While unit tries to test on function level,
including synthetic decoding and encoding, the integration tests are using real
recorded data and are only mocking the transport layer.

For both sets, the test-coverage is calculated using [Istanbul](https://istanbul.js.org/).
Running the tests and calculating the coverage can be done locally by executing:

``` sh
npm run test
npm run coverage
npm run test:unit
npm run test:integration
```

It is expected that new features or fixes do not negatively impact the test
results or the coverage.

### Compliance Testing

Besides the `unit` and `integration` test-sets, which are ensuring functionality
using synthetical data, the  `compliance` test-set is using a well established
3rd BACNET device emulator to test against. It uses the same test setup with
[Mocha](https://mochajs.org/) and [Istanbul](https://istanbul.js.org/), but runs
inside a Docker container, while using the [BACStack Compliance Docker](https://github.com/fh1ch/bacstack-compliance-docker)
image to test against. Compliance test could also be tested with your device on Id: 1234.
A compliance test will not work without the docker call or a device with Id 1234.

The compliance tests can be executed locally and require Docker and
Docker-Compose. To do so, simply run:

``` sh
npm run docker
```

### Documentation

The API documentation is generated using [JSDoc](http://usejsdoc.org/) and
relies on in-line JSDoc3 syntax. The documentation can also be built locally by
executing:

``` sh
npm run docs
```

It is expected that new features or changes are reflected in the documentation
as well.

### NVM

Use [NVM](https://github.com/nvm-sh/nvm) to manage Node.js versions and to test with different versions in development.


``` sh
nvm install lts
nvm use lts
nvm current
```

### Clean Test

``` sh
./clean.sh
```

### Show Updates for dependencies

``` sh
./npm-update.sh
```
### Upgrade all dependencies

Once
``` sh
npm i -g npm-check-updates
```

Upgrade
``` sh
./npm-upgrade.sh
```
