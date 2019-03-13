# Onboard New Org Member

> A GitHub App built with [Probot](https://github.com/probot/probot) that will automatically add new members of an organization to a team as well as post an on-boarding issue for the member in a specified repository. 

## Features

- Adds user to a default team specified in the config file.
- Creates an on-boarding issue for the user using the specified markdown template in the specified repository contained in the config file.

## Get Started

1. [Configure the GitHub App](https://github.com/apps/onboard-new-org-member)
2. Create a repo named `org-settings` and in it a file `.github/onboard-new-org-member.yml` as described in the [How it Works](#How-it-Works) section to configure settings (and override defaults)
3. It will then add any members new to your organization to the specified team as well as create an on-boarding issue for the user.

## How it Works

By default when a member accepts an Org invite, they will be added to a default team specified in the config file. Aside from that, an Issue will be created from a specified template in an on-boarding repository giving the new member action items to complete. 


```yml
# Configuration for onboard-new-org-member

# Org to run the bot on
orgName: DEFAULT_ORG

# Settings repo
settingsRepo: org-settings

# Name of team to add new members to
defaultTeam: DEFAULT_TEAM

# Repo to add Onboard Issue to
onboardRepo: on-boarding

# Phrase/Word to replace with the new member's handle
replacePhrase: NEW_USER

# Path to Issue template
issuePath: .github/templates/on-board-template.md

# Users/Groups that should be cc'ed on the issue. Should be users/groups separated by a space.
ccList: '@user123 @user456'
```

When setting up this Probot App you can also set a number of Environment Variables

## Deployment

See [docs/deploy.md](docs/deploy.md) if you would like to run your own instance of this app.

Possible Environment Variables:

- FILE_NAME [default: '.github/onboard-new-org-member.yml'] - Sets the location/file name of the config yml file
- ORG_WIDE_REPO_NAME [default: 'org-settings'] - Set the repo where to find the config yml file


## Contributing

If you have suggestions for how onboard-new-org-member could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

## Future Enhancements

- Allow member to be assigned to multiple teams.
- Depending on the teams they're assigned to, create the on-boarding issue in a repository that is more suitable to their role.
- Change name of app to reflect more of an on-boarding experience.

## License

[ISC](LICENSE) © 2019 Jon Cardona <hollywood@github.com>
