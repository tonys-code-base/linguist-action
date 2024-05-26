const core = require('@actions/core');
const github = require('@actions/github');
const linguist = require('linguist-js');

async function run() {
  try {
    const source_root_path = core.getInput('source_root_path', { required: true });
    core.debug(`Will run linguist against source root path: ${source_root_path} ...`);

    const { languages } = await linguist(source_root_path);
    const lang_list = "{" + '"languages": ["' + Object.keys(languages['results']).join('","').toString().toLowerCase() + '"]' + "}";

    core.setOutput("languages", JSON.stringify(lang_list));
    core.setOutput("linguist_result", JSON.stringify(JSON.stringify(languages)));


  } catch (error) {
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}

