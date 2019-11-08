defmodule TimesheetspaWeb.ManagerView do
  use TimesheetspaWeb, :view
  alias TimesheetspaWeb.ManagerView
  alias TimesheetspaWeb.WorkerView

  def render("index.json", %{managers: managers}) do
    %{data: render_many(managers, ManagerView, "manager.json")}
  end

  def render("show.json", %{manager: manager}) do
    %{data: render_one(manager, ManagerView, "manager.json")}
  end

  def render("manager.json", %{manager: manager}) do
    %{id: manager.id,
      email: manager.email,
      name: manager.name,
      password_hash: manager.password_hash,
      workers: render_many(manager.workers, WorkerView, "worker.json")}
  end
end
