defmodule TimesheetspaWeb.SessionController do
	use TimesheetspaWeb, :controller
	
	alias Timesheetspa.Workers

	action_fallback TimesheetspaWeb.FallbackController

	def create(conn, %{"email" => email, "password" => password, "user_type" => type}) do
		user = Workers.authenticate(email, password, type)
		IO.inspect user, label: "User in session controller"
		if user do
			token = Phoenix.Token.sign(conn, "session", user.id)
			resp = %{token: token, user_id: user.id, user_name: user.name, user_type: type}
			conn
			|> put_resp_header("content-type", "application/json; charset=UTF-8")
			|> send_resp(:created, Jason.encode!(resp))
		else
			resp = %{errors: ["Authentication Failed"]}
			conn
			|> put_resp_header("content-type", "application/json; charset=UTF-8")
			|> send_resp(:unauthorized, Jason.encode!(resp))
		end
	end
end