import store from "./store";

export function post(path, body) {
	let state = store.getState();
	let token = "";
	if (state.session && state.session.token) {
		token = state.session.token;
	}
  return fetch("/ajax" + path, {
    method: "post",
    credentials: "same-origin",
    headers: new Headers({
      "x-csrf-token": window.csrf_token,
      "content-type": "application/json; charset=UTF-8",
      accept: "application/json",
      "x-auth": token
    }),
    body: JSON.stringify(body)
  }).then(resp => resp.json());
}

export function get(path) {
  let state = store.getState();
  let token = "";
	if (state.session && state.session.token) {
		token = state.session.token;
	}
  return fetch("/ajax" + path, {
    method: "get",
    credentials: "same-origin",
    headers: new Headers({
      "x-csrf-token": window.csrf_token,
      "content-type": "application/json; charset=UTF-8",
      accept: "application/json",
      "x-auth": token
    })
  }).then(resp => resp.json());
}

export function submit_login(form) {
  let state = store.getState();
	let data = state.forms.login;

  post("/sessions", data).then(resp => {
    if (resp && resp.token) {
      localStorage.setItem("session", JSON.stringify(resp));
      store.dispatch({
        type: "LOG_IN",
        data: resp
			});
			if (resp.user_type === 'worker') {
				form.redirect("/worker/home");
			} else if (resp.user_type === 'manager') {
				form.redirect("/manager/home");
			}
    } else {
      store.dispatch({
        type: "CHANGE_LOGIN",
        data: { errors: JSON.stringify(resp.errors) }
      });
    }
  });
}

export function getWorkers(id) {
  get(`/managers/${id}`).then(resp => {
    store.dispatch({
      type: 'GET_WORKERS',
      data: resp.data
    })
  })
}

export function getJobs() {
  get('/jobs').then(resp => {
    store.dispatch({
      type: 'GET_JOBS',
      data: resp.data
    })
  })
}

export function newJob() {
	let state = store.getState();
	let data = state.forms.new_job;

  post("/jobs", {job: data}).then(resp => {
    if (resp && resp.data) {
      store.dispatch({
        type: "NEW_JOB",
        data: resp.data
			});
			if (resp.user_type === 'manager') {
				form.redirect("/manager/jobs");
			}
    } else {
      store.dispatch({
        type: "CHANGE_NEW_JOB",
        data: { errors: JSON.stringify(resp.errors) }
      });
    }
  });
}

export function newTimesheet() {
	let state = store.getState();
	let data = state.forms.new_timesheet;

  post("/timesheets", {timesheet: data}).then(resp => {
    if (resp && resp.data) {
      store.dispatch({
        type: "NEW_TIMESHEET",
        data: resp.data
			});
			if (resp.user_type === 'manager') {
				form.redirect("/worker/home");
			}
    } else {
      store.dispatch({
        type: "CHANGE_NEW_TIMESHEET",
        data: { errors: JSON.stringify(resp.errors) }
      });
    }
  });
}

