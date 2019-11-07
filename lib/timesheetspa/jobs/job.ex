defmodule Timesheetspa.Jobs.Job do
  use Ecto.Schema
  import Ecto.Changeset

  schema "jobs" do
    field :budget, :float
    field :description, :string
    field :job_code, :string
    field :name, :string

    belongs_to :manager, Timesheetspa.Jobs.Job

    timestamps()
  end

  @doc false
  def changeset(job, attrs) do
    job
    |> cast(attrs, [:job_code, :budget, :name, :description])
    |> validate_required([:job_code, :budget, :name, :description])
  end
end
