# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Timesheetspa.Repo.insert!(%Timesheetspa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Timesheetspa.Repo
alias Timesheetspa.Workers.Worker
alias Timesheetspa.Managers.Manager
alias Timesheetspa.Jobs.Job

pw = Argon2.hash_pwd_salt("password")

Repo.insert!(%Manager{name: "Alice Anderson", email: "alice@acme.com", password_hash: pw})
Repo.insert!(%Manager{name: "Bob Anderson", email: "bob@acme.com", password_hash: pw})

Repo.insert!(%Worker{name: "Carol Anderson", email: "carol@acme.com", password_hash: pw, manager_id: 1})
Repo.insert!(%Worker{name: "Dave Anderson", email: "dave@acme.com", password_hash: pw, manager_id: 1})
Repo.insert!(%Worker{name: "Evan Anderson", email: "evan@acme.com", password_hash: pw, manager_id: 2})
Repo.insert!(%Worker{name: "Florian Anderson", email: "florian@acme.com", password_hash: pw, manager_id: 2})

Repo.insert!(%Job{job_code: "VAOR-01", budget: 10.5, name: "Cyborg Arm", description: "Lorem Ipsum", manager_id: 1})
Repo.insert!(%Job{job_code: "VAOR-02", budget: 13.3, name: "Sobriety Pill", description: "Lorem Ipsum", manager_id: 1})
Repo.insert!(%Job{job_code: "VAOR-03", budget: 11.7, name: "Rat Cancer", description: "Lorem Ipsum", manager_id: 1})
Repo.insert!(%Job{job_code: "VAOR-04", budget: 15.3, name: "Teleportation", description: "Lorem Ipsum", manager_id: 2})
Repo.insert!(%Job{job_code: "VAOR-05", budget: 14.0, name: "Gene Mutation", description: "Lorem Ipsum", manager_id: 2})
Repo.insert!(%Job{job_code: "VAOR-06", budget: 13.0, name: "Weather Forecast", description: "Lorem Ipsum", manager_id: 2})
