import dotenv from 'dotenv';
const AssistantV1 = require('ibm-watson/assistant/v1');

dotenv.config();

const assistant = new AssistantV1({
  authenticator: new IamAuthenticator({ apikey: '{apikey}' }),
  version: '2020-04-01',
});

const messageAsync = function (question, context) {
  const payload = {
    workspaceId: process.env.WORKSPACE_ID,
    input: {
      text: question,
    },
    context: context,
  };
  return assistant.message(payload);
};

const answer = async (question) => {
  const assistant = new AssistantV1({
    authenticator: new IamAuthenticator({ apikey: '{apikey}' }),
    version: '2020-04-01',
  });

  /**
   * Calls the assistant message api.
   * returns a promise
   */

  messageAsync(question, undefined)
    .then(response => {
      console.log(JSON.stringify(response.result, null, 2), '\n--------');
      return JSON.stringify(response.result, null, 2)
    })

    .catch(error => {
      console.error(JSON.stringify(error, null, 2));
    });
};

export default answer;