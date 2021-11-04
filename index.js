const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
    const myToken = core.getInput('token');
    const title = core.getInput('title')
    const body = core.getInput('body')
    const assignees = core.getInput('assignees')

    const octokit = github.getOctokit(myToken)

    const response = await octokit.rest.issues.create({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        title: title,
        body: body,
        assignees: assignees ? assignees.split('\n') : undefined
    });

    core.setOutput('issue', JSON.stringify(response.data))
}

run();