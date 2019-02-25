import { Application } from 'probot' // eslint-disable-line no-unused-vars

export = (app: Application) => {
  app.on('organization.member_added', async (context) => {
    
    const response = await context.github.query(`query ($login: String!, $team: String!) {
      organization (login: $login) {
        team (slug: $team) {
          id
        }
      }
    }`, { login: "Albatoss", team: "Albatoss_Admin" })

    // The `Team` GraphQL type doesn't include the databaseId
    // so we can hack around it by decoding the node id.
    // See https://github.com/github/ecosystem-api/issues/1576
    const decoded = Buffer.from(response.organization.team.id, 'base64').toString()
    const split = decoded.split('Team')
    const id = parseInt(split[split.length - 1], 10)

    const teamParams = Object.assign({}, {
      team_id: id,
      username: context.payload.login
    } || {})

    await context.github.teams.addOrUpdateMembership(teamParams).catch((e) => console.log(e))

  })



}
