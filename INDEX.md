
```dataviewjs
let areas = dv.pages("").file.folder.groupBy(g=>g.split("/")[0]);
for (let area = 0; area < areas.length; area++) { 
	dv.header(3, areas[area].key);
	let categories = areas[area].rows.groupBy(g=>g.split("/")[1]); 
	let category_names = []; 
	for (let i = 0; i < categories.length; i++){ 
		if (categories[i].key) 
			category_names.push(categories[i].key + " (" + categories[i].rows.length + " notes)") 
		} 
		dv.list(dv.array(category_names)) 
	}
```
