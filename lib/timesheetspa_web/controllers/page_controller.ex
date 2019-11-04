defmodule TimesheetspaWeb.PageController do
  use TimesheetspaWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
