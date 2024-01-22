---
createdOn: <% tp.file.creation_date() %>
modifiedOn: <% tp.file.last_modified_date() %>
tags:
  - daily
---
```dataviewjs
	const curFile = dv.current().file.name
	if(curFile.startsWith('00.02.')){
	const dailies = dv.pages(`"00. Inbox/00.02. Daily"`).sort(p=>p.file.name).file
	const crumbs = dailies.filter((daily, idx, arr)=>{
		 if(daily.name == curFile) return true
		 if(idx!=0 && arr[idx-1].name == curFile) return true
		 if(idx+1<arr.length && arr[idx+1].name == curFile) return true
	 })
	
	crumbs.forEach((crumb, idx, arr)=>{
		if(idx==0 && crumb.name!=curFile){
			dv.span(`<< ${dv.fileLink(crumb.path, false, `Prev: ${crumb.name}`)} `)
		}else if(crumb.name!=curFile){
			dv.span(`${arr.length==3 ? " | " : ""}${dv.fileLink(crumb.path, false, `${crumb.name} Next`)} >>`)
		}
	})
	}
``` 


# TODO

```dataviewjs
	dv.taskList(dv.pages(`"00. Inbox/00.02. Daily"`).file.tasks.where(t=>!t.completed));
```

***

<i><sub>Last modified date: <% tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss") %></sub></i>

<%*
const dv = this.app.plugins.plugins["dataview"].api
const todos = dv.pages(`"00. Inbox/00.02. Daily"`).file
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