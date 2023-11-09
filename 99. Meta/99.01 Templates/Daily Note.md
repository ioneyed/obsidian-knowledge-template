---
createdOn: <% tp.file.creation_date() %>
modifiedOn: <% tp.file.last_modified_date() %>
tags:
  - daily
---
<%*
const dv = this.app.plugins.plugins["dataview"].api
const todos = dv.pages('"00. Inbox/00.02. Daily"').file
const count = todos.length > 9 ? todos.length : `0${todos.length}`
const date = tp.file.title;
const today = todos.some(f=>f.name.match(new RegExp(`00\.02\..* ${date}`)));

if(today){
  await app.vault.trash(app.vault.getAbstractFileByPath(`${tp.file.path(true)}`))
  return
} else {
  await tp.file.rename(`00.02.${count} ${date}`)
}
%>

# TODO

<%
  await tp.user.rollover_daily_todos({folder:"00. Inbox/00.02. Daily", tasksHeader: "# TODO"})
%>

<i><sub>Last modified date: <% tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss") %></sub></i>