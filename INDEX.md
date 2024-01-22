# Table of Contents

```dataviewjs
let areas = dv.pages("").file.folder.groupBy(g=>g.split("/")[0]);
const rows = []
let totalNotes = 0;
for (let area = 0; area < areas.length; area++) {
	const row = []
	row.push(`${areas[area].key=="" ? "**Vault**" : `**\\>${areas[area].key}**`} (${areas[area].rows.length})`);
	let categories = areas[area].rows.groupBy(g=>g.split("/")[1]); 
	let category_names = []; 
	for (let i = 0; i < categories.length; i++){ 
		totalNotes = totalNotes + categories[i].rows.length
		if (categories[i].key){ 
			category_names.push(`${categories[i].key} (${categories[i].rows.length} notes)`) 
			} else {
			category_names.push(`Uncategorized: (${categories[i].rows.length} notes)`)
			}
		} 
	row.push(dv.array(category_names))
	rows.push(row)
}
dv.table(["Categories", `Notes (${totalNotes})`], rows)
```

# Recently Modified

```dataview
TABLE dateformat(file.mtime, "dd.MM.yyyy - HH:mm") AS "Last modified"
FROM ""
SORT file.mtime DESC
LIMIT 25
```
