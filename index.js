'use strict';
// Initialization 
module.change_code = 1;

	var _ = require('lodash');

	var Alexa = require('alexa-app');

	var app = new Alexa.app('denon-alexa-us');

	var DenonCommandHelper = require('./denon_command_helper.js');
	var CommandLanguageMapping = require('./commandLanguageMapping');

	app.launch(function(req, res) {

	            var prompt = 'Please provide me with the command of your Denon receiver.';

	            res.say(prompt).reprompt(prompt).shouldEndSession(false);

	});

app.intent('denon', {

	           'slots': {

	              'COMMAND': 'COMMANDS',
  'PARAMETER' : 'PARAMETERS'

	  },

	            'utterances': ['{|set|configure} {|the} {|receiver|Denon} {-|COMMAND} {|to} {-|PARAMETER}']

	},

  function(req, res) {

	    //get the slot

	                        var command = req.slot('COMMAND');

	                        var parameter  = req.slot('PARAMETER');

	                        var reprompt = 'Please provide me with the command of your Denon receiver.';

	                    if (_.isEmpty(command) || _.isEmpty(parameter) ) {

	                var prompt = 'I did not understand your command, please repeat.';

	                res.say(prompt).reprompt(reprompt).shouldEndSession(false);

	                return true;

	    } else {
  console.log(CommandLanguageMapping(command));
	                var denonCommand = new DenonCommandHelper();
	             denonCommand.requestSendCommand(CommandLanguageMapping(command), parameter).then(function() {

  res.say(command + ' '+ parameter + ' has been executed.').send();

	      }).catch(function(err) {

	                  console.log(err.statusCode);

	                  var prompt = 'Something went wrong.';

	                  res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
});
	                return false;

	    }
	            }

	);
	module.exports = app;