# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :timesheetspa,
  ecto_repos: [Timesheetspa.Repo]

# Configures the endpoint
config :timesheetspa, TimesheetspaWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "KOppibb0Qn7B5c5yOrV9qdFSoIDMuTVGagGbWCj1pu66h6iFpx22GMb54KDkHHSS",
  render_errors: [view: TimesheetspaWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Timesheetspa.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
