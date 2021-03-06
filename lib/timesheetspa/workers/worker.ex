defmodule Timesheetspa.Workers.Worker do
  use Ecto.Schema
  import Ecto.Changeset

  schema "workers" do
    field :email, :string
    field :name, :string
    field :password_hash, :string

    belongs_to :manager, Timesheetspa.Managers.Manager

    timestamps()
  end

  @doc false
  def changeset(worker, attrs) do
    worker
    |> cast(attrs, [:email, :name, :password_hash, :manager_id])
    |> hash_password()
    |> validate_required([:email, :name, :password_hash, :manager_id])
  end

  def hash_password(cset) do
    pw = get_change(cset, :password)
    change(cset, Argon2.add_hash(pw))
  end
end
