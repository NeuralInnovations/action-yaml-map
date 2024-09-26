const core = require("@actions/core");
const github = require("@actions/github");
const YAML = require("yaml");

try {
  const key = core.getInput("key");
  const map = YAML.parse(core.getInput("map"));
  const fail = core.getInput("fail");

  console.log(`source: ${key}`);
  console.log(`map: ${JSON.stringify(map, null, 2)}`);

  var result = null;
  if (key in map) {
    result = map[key];
  }

  if (result) {
    console.log(`result: ${JSON.stringify(result)}`);

    console.log(`status: ok`);
    core.setOutput("status", "ok");

    if (typeof result === "string") {
      console.log(`setOutput(${key}, ${result})`);
      core.setOutput("value", result);
    } else if (typeof result === "object") {
      for (const key in result) {
        console.log(`setOutput(${key}, ${result[key]})`);
        core.setOutput(key, result[key]);
      }
    } else {
      core.setFailed("invalid result: " + JSON.stringify(result));
    }
  } else {
    console.log("status: fail");
    core.setOutput("status", "fail");
    if (fail === "true" || fail === "yes" || fail === true) {
      core.setFailed("key not found: " + key);
    }
  }
} catch (error) {
  core.setFailed(error.message);
}
