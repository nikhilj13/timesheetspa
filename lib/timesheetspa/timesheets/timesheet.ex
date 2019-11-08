defmodule Timesheetspa.Timesheets.Timesheet do
  use Ecto.Schema
  import Ecto.Changeset

  schema "timesheets" do
    field :date, :string
    field :hours1, :float
    field :hours2, :float
    field :hours3, :float
    field :hours4, :float
    field :hours5, :float
    field :hours6, :float
    field :hours7, :float
    field :hours8, :float
    field :job1, :string
    field :job2, :string
    field :job3, :string
    field :job4, :string
    field :job5, :string
    field :job6, :string
    field :job7, :string
    field :job8, :string
    field :approved, :boolean, default: false

    belongs_to :worker, Timesheetspa.Workers.Worker

    timestamps()
  end

  @doc false
  def changeset(timesheet, attrs) do
    timesheet
    |> cast(attrs, [:job1, :hours1, :job2, :hours2, :job3, :hours3, :job4, :hours4, :job5, :hours5, :job6, :hours6, :job7, :hours7, :job8, :hours8, :date, :approved, :worker_id])
    |> validate_required([:job1, :hours1, :date, :approved, :worker_id])
  end
end
