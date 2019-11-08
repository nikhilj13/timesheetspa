# Timesheetspa

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix

## Design Decisions
The database structure is as follows:
A worker belongs to a manager and a manager can have many workers. A manager owns many jobs and is allowed to create new jobs. A Timesheet belongs to a worker.

Whenever a user logs into the system, their user information is store in the browser. Based on the user type, they are navigated to different pages after login. The same user information is also used when a user submits a new job or timesheet, their user id is retrieved from the session object to add their id with the created job/timesheet.

### Seeded User Data

**Worker**

*Email:* carol@acme.com

*Password:* password

**Manager**

*Email:* alice@acme.com

*Password:* password