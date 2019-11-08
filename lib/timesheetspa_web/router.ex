defmodule TimesheetspaWeb.Router do
  use TimesheetspaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :ajax do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/ajax", TimesheetspaWeb do
    pipe_through :ajax

    resources "/managers", ManagerController, except: [:new, :edit]
    resources "/workers", WorkerController, except: [:new, :edit]
    resources "/jobs", JobController, except: [:edit]
    resources "/timesheets", TimesheetController, except: [:edit]
    resources "/sessions", SessionController, only: [:create], singleton: true
  end

  scope "/", TimesheetspaWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", TimesheetspaWeb do
  #   pipe_through :api
  # end
end
