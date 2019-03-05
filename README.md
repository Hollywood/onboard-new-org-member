# add-member-to-team

> A GitHub App built with [Probot](https://github.com/probot/probot) that An application to automatically add new members to an organization to a team or list of teams within the organizaton.

## Setup

You will need to create a configuration file in a repository named `org-settings` called `add-members-to-team.yml`:

```
# Configuration for Add-Member-To-Team

# Org to run the bot on
orgName: ORG_NAME

# Name of team to add new members to
defaultTeam: DEFAULT_TEAM
```

To build the application run the following:

```sh
# Install dependencies
npm install

# Run typescript
npm run build

# Run the bot
npm start
```

## Contributing

If you have suggestions for how add-member-to-team could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2019 Jon Cardona <hollywood@github.com>
