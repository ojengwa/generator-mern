'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generators.Base.extend({
  constructor: function () {
    // body...
    generators.Base.apply(this, arguments);

    // Add support for outputing version info
    this.option('version', {
      alias: 'v',
      desc: "Display the current version of this generator",

    })
  }

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.blue('MERN') + chalk.red(' (Mongo, Express, React and NodeJS)') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));

    this.argument('appname', {
      desc: "Choose a name for this project",
      required: true,
      type: "String",
      defaults: this.store.appname
    });
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
