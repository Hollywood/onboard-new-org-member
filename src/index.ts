import { Application } from 'probot' // eslint-disable-line no-unused-vars

export = (app: Application) => {
  app.on('organization.member_added', async (context) => {
    context.log("event received")
    const res = await context.github.repos.getContents({
      owner: context.payload.organization.login,
      repo: 'org-settings',
      path: '.github/onboard-new-org-member.yml'
    })

    const content = Buffer.from(res.data.content, 'base64').toString('utf8')

    const yaml = require('js-yaml')
    const config = yaml.safeLoad(content)

    const response = await context.github.query(`query ($login: String!, $team: String!) {
      organization (login: $login) {
        team (slug: $team) {
          id
        }
      }
    }`, { login:config.orgName, team:config.defaultTeam })

    // The `Team` GraphQL type doesn't include the databaseId
    // so we can hack around it by decoding the node id.
    // See https://github.com/github/ecosystem-api/issues/1576

    const decoded = Buffer.from(response.organization.team.id, 'base64').toString()
    const split = decoded.split('Team')
    const id = parseInt(split[split.length - 1], 10)

   
    const teamParams = Object.assign({}, {
      team_id: id || 0,
      username: context.payload.membership.user.login || ''
    } || {})

    await context.github.teams.addOrUpdateMembership(teamParams).catch((e) => console.log(e))


    const body = await context.github.query(`query ($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        object(expression: "master:.github/templates/on-board-template.md") {
          ... on Blob {
            text
          }
        }
      }
    }`, { owner: config.orgName, repo:config.settingsRepo})

    var issueBody = body.repository.object.text
    issueBody = issueBody.replace(new RegExp(`${config.replacePhrase}`, 'g'), `@${context.payload.membership.user.login}`)
    issueBody += (config.ccList) ? `\n\n<h6>/cc ${config.ccList}</h6>` : ''


    const issueParams = {
      owner: config.orgName,
      repo: config.onboardRepo,
      title:  `${context.payload.membership.user.login} On-boarding`,
      body: issueBody
    }

    const createIssueParams = Object.assign({}, config.onboardRepo, issueParams || {})
    context.github.issues.create(createIssueParams)

  })



}
