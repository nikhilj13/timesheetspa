defmodule Timesheetspa.Repo do
  use Ecto.Repo,
    otp_app: :timesheetspa,
    adapter: Ecto.Adapters.Postgres
end
