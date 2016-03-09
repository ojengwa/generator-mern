var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var _ = require('lodash');

var pjson = require('../../package.json');


module.exports = generators.Base.extend({
    constructor: function () {
        'use strict';

        // body...
        generators.Base.apply(this, arguments);

        // Add support for outputing version info
        this.option('version', {
            alias: 'v',
            desc: "Display the current version of this generator"
        });

        if (!!this.options.version) {
            this.log(pjson.version);
        }

        this.appname = this.determineAppname() || null;

        this.from = this.templatePath('../../../templates');

        this.sourceRoot(this.from);

        var destJson = this.destinationPath('package.json');
        var dest = this.destinationRoot();


        try {
            this.destJson = require(destJson);
        } catch (e) {
            this.destJson = {};
        }

        this.srcJson = require('../../templates/package.json');
        this.to = dest;


        if (!!!this.appname) {
            this.argument('appname', {
                desc: "Name for this project",
                required: true,
                type: String
            });
            this.appname = _.camelCase(this.appname);
        }

        this.appname = _.camelCase(this.appname);


    },

    prompting: function () {
        'use strict';

        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the ' + chalk.blue('MERN') + chalk.red(' (Mongo, Express, React and NodeJS)') + ' generator!'
        ));

        var prompts = [{
            type: 'checkbox',
            name: 'extras',
            message: 'Which of this meta files would you like to generate?',
            choices: [
                {
                    name: 'all'
                },
                {
                    name: 'package.json'
                },
                {
                    name: 'README.md'
                },
                {
                    name: 'LICENSE.md'
                },
                {
                    name: 'None'
                }
            ],
            default: ['all']
        }];

        // this.prompt(prompts, function (props) {
        //     this.props = props;
        //     // To access props later use this.props.someOption;

        //     done();
        // }.bind(this));

        // Set project root
        var path = [{
            type: 'input',
            name: 'dest',
            message: 'Enter absolute path to project directory:',
            default: this.to
        }];

        this.prompt(path, function (answers) {
            this.to = answers.dest;
            done();
        }.bind(this));

    },

    configuring: function () {
        'use strict';

        this.json = _.merge(this.srcJson, this.destJson);
        this.to = this.destinationPath(this.to)
        this.destinationRoot(this.to);

        this.config.set({
            name: this.appname,
            dest: this.to,
            src: this.from
        });
    },

    writing: function () {
        'use strict';

        this.fs.copy(
          this.from,
          this.to
        );

    },

    install: function () {
        'use strict';

        this.installDependencies();
    },

    end: function () {
        'use strict';
        this.log(yosay("Your awesome app have being set up!\n" + chalk.blue("Good bye!!!")))
    }
});
