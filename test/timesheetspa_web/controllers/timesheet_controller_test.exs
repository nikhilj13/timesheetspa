defmodule TimesheetspaWeb.TimesheetControllerTest do
  use TimesheetspaWeb.ConnCase

  alias Timesheetspa.Timesheets
  alias Timesheetspa.Timesheets.Timesheet

  @create_attrs %{
    date: "some date",
    hours1: 120.5,
    hours2: 120.5,
    hours3: 120.5,
    hours4: 120.5,
    hours5: 120.5,
    hours6: 120.5,
    hours7: 120.5,
    hours8: 120.5,
    job1: "some job1",
    job2: "some job2",
    job3: "some job3",
    job4: "some job4",
    job5: "some job5",
    job6: "some job6",
    job7: "some job7",
    job8: "some job8"
  }
  @update_attrs %{
    date: "some updated date",
    hours1: 456.7,
    hours2: 456.7,
    hours3: 456.7,
    hours4: 456.7,
    hours5: 456.7,
    hours6: 456.7,
    hours7: 456.7,
    hours8: 456.7,
    job1: "some updated job1",
    job2: "some updated job2",
    job3: "some updated job3",
    job4: "some updated job4",
    job5: "some updated job5",
    job6: "some updated job6",
    job7: "some updated job7",
    job8: "some updated job8"
  }
  @invalid_attrs %{date: nil, hours1: nil, hours2: nil, hours3: nil, hours4: nil, hours5: nil, hours6: nil, hours7: nil, hours8: nil, job1: nil, job2: nil, job3: nil, job4: nil, job5: nil, job6: nil, job7: nil, job8: nil}

  def fixture(:timesheet) do
    {:ok, timesheet} = Timesheets.create_timesheet(@create_attrs)
    timesheet
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all timesheets", %{conn: conn} do
      conn = get(conn, Routes.timesheet_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create timesheet" do
    test "renders timesheet when data is valid", %{conn: conn} do
      conn = post(conn, Routes.timesheet_path(conn, :create), timesheet: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.timesheet_path(conn, :show, id))

      assert %{
               "id" => id,
               "date" => "some date",
               "hours1" => 120.5,
               "hours2" => 120.5,
               "hours3" => 120.5,
               "hours4" => 120.5,
               "hours5" => 120.5,
               "hours6" => 120.5,
               "hours7" => 120.5,
               "hours8" => 120.5,
               "job1" => "some job1",
               "job2" => "some job2",
               "job3" => "some job3",
               "job4" => "some job4",
               "job5" => "some job5",
               "job6" => "some job6",
               "job7" => "some job7",
               "job8" => "some job8"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.timesheet_path(conn, :create), timesheet: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update timesheet" do
    setup [:create_timesheet]

    test "renders timesheet when data is valid", %{conn: conn, timesheet: %Timesheet{id: id} = timesheet} do
      conn = put(conn, Routes.timesheet_path(conn, :update, timesheet), timesheet: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.timesheet_path(conn, :show, id))

      assert %{
               "id" => id,
               "date" => "some updated date",
               "hours1" => 456.7,
               "hours2" => 456.7,
               "hours3" => 456.7,
               "hours4" => 456.7,
               "hours5" => 456.7,
               "hours6" => 456.7,
               "hours7" => 456.7,
               "hours8" => 456.7,
               "job1" => "some updated job1",
               "job2" => "some updated job2",
               "job3" => "some updated job3",
               "job4" => "some updated job4",
               "job5" => "some updated job5",
               "job6" => "some updated job6",
               "job7" => "some updated job7",
               "job8" => "some updated job8"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, timesheet: timesheet} do
      conn = put(conn, Routes.timesheet_path(conn, :update, timesheet), timesheet: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete timesheet" do
    setup [:create_timesheet]

    test "deletes chosen timesheet", %{conn: conn, timesheet: timesheet} do
      conn = delete(conn, Routes.timesheet_path(conn, :delete, timesheet))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.timesheet_path(conn, :show, timesheet))
      end
    end
  end

  defp create_timesheet(_) do
    timesheet = fixture(:timesheet)
    {:ok, timesheet: timesheet}
  end
end
