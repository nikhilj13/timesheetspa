defmodule TimesheetspaWeb.TimesheetView do
  use TimesheetspaWeb, :view
  alias TimesheetspaWeb.TimesheetView

  def render("index.json", %{timesheets: timesheets}) do
    %{data: render_many(timesheets, TimesheetView, "timesheet.json")}
  end

  def render("show.json", %{timesheet: timesheet}) do
    %{data: render_one(timesheet, TimesheetView, "timesheet.json")}
  end

  def render("timesheet.json", %{timesheet: timesheet}) do
    %{id: timesheet.id,
      job1: timesheet.job1,
      hours1: timesheet.hours1,
      job2: timesheet.job2,
      hours2: timesheet.hours2,
      job3: timesheet.job3,
      hours3: timesheet.hours3,
      job4: timesheet.job4,
      hours4: timesheet.hours4,
      job5: timesheet.job5,
      hours5: timesheet.hours5,
      job6: timesheet.job6,
      hours6: timesheet.hours6,
      job7: timesheet.job7,
      hours7: timesheet.hours7,
      job8: timesheet.job8,
      hours8: timesheet.hours8,
      date: timesheet.date,
      approved: timesheet.approved}
  end
end
