defmodule Timesheetspa.Repo.Migrations.CreateTimesheets do
  use Ecto.Migration

  def change do
    create table(:timesheets) do
      add :job1, :string
      add :hours1, :float
      add :job2, :string
      add :hours2, :float
      add :job3, :string
      add :hours3, :float
      add :job4, :string
      add :hours4, :float
      add :job5, :string
      add :hours5, :float
      add :job6, :string
      add :hours6, :float
      add :job7, :string
      add :hours7, :float
      add :job8, :string
      add :hours8, :float
      add :date, :string
      add :approved, :boolean, default: false
      add :worker_id, references(:workers, on_delete: :delete_all)

      timestamps()
    end

    create index(:timesheets, [:worker_id])
  end
end
