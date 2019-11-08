defmodule Timesheetspa.TimesheetsTest do
  use Timesheetspa.DataCase

  alias Timesheetspa.Timesheets

  describe "timesheets" do
    alias Timesheetspa.Timesheets.Timesheet

    @valid_attrs %{date: "some date", hours1: 120.5, hours2: 120.5, hours3: 120.5, hours4: 120.5, hours5: 120.5, hours6: 120.5, hours7: 120.5, hours8: 120.5, job1: "some job1", job2: "some job2", job3: "some job3", job4: "some job4", job5: "some job5", job6: "some job6", job7: "some job7", job8: "some job8"}
    @update_attrs %{date: "some updated date", hours1: 456.7, hours2: 456.7, hours3: 456.7, hours4: 456.7, hours5: 456.7, hours6: 456.7, hours7: 456.7, hours8: 456.7, job1: "some updated job1", job2: "some updated job2", job3: "some updated job3", job4: "some updated job4", job5: "some updated job5", job6: "some updated job6", job7: "some updated job7", job8: "some updated job8"}
    @invalid_attrs %{date: nil, hours1: nil, hours2: nil, hours3: nil, hours4: nil, hours5: nil, hours6: nil, hours7: nil, hours8: nil, job1: nil, job2: nil, job3: nil, job4: nil, job5: nil, job6: nil, job7: nil, job8: nil}

    def timesheet_fixture(attrs \\ %{}) do
      {:ok, timesheet} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Timesheets.create_timesheet()

      timesheet
    end

    test "list_timesheets/0 returns all timesheets" do
      timesheet = timesheet_fixture()
      assert Timesheets.list_timesheets() == [timesheet]
    end

    test "get_timesheet!/1 returns the timesheet with given id" do
      timesheet = timesheet_fixture()
      assert Timesheets.get_timesheet!(timesheet.id) == timesheet
    end

    test "create_timesheet/1 with valid data creates a timesheet" do
      assert {:ok, %Timesheet{} = timesheet} = Timesheets.create_timesheet(@valid_attrs)
      assert timesheet.date == "some date"
      assert timesheet.hours1 == 120.5
      assert timesheet.hours2 == 120.5
      assert timesheet.hours3 == 120.5
      assert timesheet.hours4 == 120.5
      assert timesheet.hours5 == 120.5
      assert timesheet.hours6 == 120.5
      assert timesheet.hours7 == 120.5
      assert timesheet.hours8 == 120.5
      assert timesheet.job1 == "some job1"
      assert timesheet.job2 == "some job2"
      assert timesheet.job3 == "some job3"
      assert timesheet.job4 == "some job4"
      assert timesheet.job5 == "some job5"
      assert timesheet.job6 == "some job6"
      assert timesheet.job7 == "some job7"
      assert timesheet.job8 == "some job8"
    end

    test "create_timesheet/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Timesheets.create_timesheet(@invalid_attrs)
    end

    test "update_timesheet/2 with valid data updates the timesheet" do
      timesheet = timesheet_fixture()
      assert {:ok, %Timesheet{} = timesheet} = Timesheets.update_timesheet(timesheet, @update_attrs)
      assert timesheet.date == "some updated date"
      assert timesheet.hours1 == 456.7
      assert timesheet.hours2 == 456.7
      assert timesheet.hours3 == 456.7
      assert timesheet.hours4 == 456.7
      assert timesheet.hours5 == 456.7
      assert timesheet.hours6 == 456.7
      assert timesheet.hours7 == 456.7
      assert timesheet.hours8 == 456.7
      assert timesheet.job1 == "some updated job1"
      assert timesheet.job2 == "some updated job2"
      assert timesheet.job3 == "some updated job3"
      assert timesheet.job4 == "some updated job4"
      assert timesheet.job5 == "some updated job5"
      assert timesheet.job6 == "some updated job6"
      assert timesheet.job7 == "some updated job7"
      assert timesheet.job8 == "some updated job8"
    end

    test "update_timesheet/2 with invalid data returns error changeset" do
      timesheet = timesheet_fixture()
      assert {:error, %Ecto.Changeset{}} = Timesheets.update_timesheet(timesheet, @invalid_attrs)
      assert timesheet == Timesheets.get_timesheet!(timesheet.id)
    end

    test "delete_timesheet/1 deletes the timesheet" do
      timesheet = timesheet_fixture()
      assert {:ok, %Timesheet{}} = Timesheets.delete_timesheet(timesheet)
      assert_raise Ecto.NoResultsError, fn -> Timesheets.get_timesheet!(timesheet.id) end
    end

    test "change_timesheet/1 returns a timesheet changeset" do
      timesheet = timesheet_fixture()
      assert %Ecto.Changeset{} = Timesheets.change_timesheet(timesheet)
    end
  end
end
