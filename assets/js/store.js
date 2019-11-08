import { createStore, combineReducers } from "redux";
import deepFreeze from "deep-freeze-strict";

let session0 = localStorage.getItem("session");
let user_id = "";
if (session0) {
	session0 = JSON.parse(session0);
	if (session0.user_id) {
		user_id = session0.user_id;
	}
}

function login(
  st0 = { email: "", password: "", user_type: "worker", errors: null },
  action
) {
  switch (action.type) {
    case "CHANGE_LOGIN":
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function new_job(
  st0 = {
    job_code: "",
    budget: "",
    name: "",
    description: "",
    manager_id: user_id,
    errors: null
  },
  action
) {
  switch (action.type) {
    case "CHANGE_NEW_JOB":
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function new_timesheet(
	st0 = {
		date: "",
		job1: null,
		hours1: null,
		job2: null,
		hours2: null,
		job3: null,
		hours3: null,
		job4: null,
		hours4: null,
		job5: null,
		hours5: null,
		job6: null,
		hours6: null,
		job7: null,
		hours7: null,
		job8: null,
		hours8: null,
		approved: false,
		worker_id: user_id
	},
	action
) {
	switch (action.type) {
    case "CHANGE_NEW_TIMESHEET":
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function forms(st0, action) {
  let reducer = combineReducers({
    login,
		new_job,
		new_timesheet
  });
  return reducer(st0, action);
}

function session(st0 = session0, action) {
  switch (action.type) {
    case "LOG_IN":
      return action.data;
    case "LOG_OUT":
      return null;
    default:
      return st0;
  }
}

function workers(st0 = [], action) {
  switch (action.type) {
    case "GET_WORKERS":
      return action.data.workers;
    default:
      return st0;
  }
}

function jobs(st0 = [], action) {
  switch (action.type) {
    case "GET_JOBS":
      if (action.data) {
        return action.data;
      } else {
        return st0;
      }
    case "NEW_JOB":
      if (action.data) {
        return action.data;
      } else {
        return st0;
      }
    default:
      return st0;
  }
}

function timesheets(st0 = [], action) {
  switch (action.type) {
    case "GET_TIMESHEETS":
      if (action.data) {
        return action.data;
      } else {
        return st0;
      }
    case "NEW_TIMESHEET":
      if (action.data) {
        return action.data;
      } else {
        return st0;
      }
    default:
      return st0;
  }
}

function root_reducer(st0, action) {
  let reducer = combineReducers({
    forms,
    workers,
    session,
		jobs,
		timesheets
  });
  return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;
