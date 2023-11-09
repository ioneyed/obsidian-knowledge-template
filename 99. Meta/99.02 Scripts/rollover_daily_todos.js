async function getAllUnfinishedTodos(file, tasksHeader) {
    const contents = await this.app.vault.read(file);
    const contentsForDailyTasks = contents.split(tasksHeader)[1] || contents;
    const unfinishedTodosRegex = /\t*- \[ \].*/g
    const unfinishedTodos = Array.from(contentsForDailyTasks.matchAll(unfinishedTodosRegex)).map(([todo]) => todo)
    const fileWithoutTasks = contents.split(/.*\t*- \[ \].*\n?/g).join('')
    await this.app.vault.modify(file,fileWithoutTasks)
    return unfinishedTodos;
  }
  
  
  function getLastDailyNote(folder, format) {
      const { moment } = window
  
      // get all notes in directory that aren't null
      const dailyNoteFiles = this.app.vault.getAllLoadedFiles()
        .filter(file => file.path.startsWith(folder))
        .filter(file => file.basename != null)
  
      // remove notes that are from the future
      const todayMoment = moment()
      let dailyNotesTodayOrEarlier = []
      dailyNoteFiles.forEach(file => {
        if (moment(file.basename.substr(file.basename.length - 10), format).isSameOrBefore(todayMoment, 'day')) {
          dailyNotesTodayOrEarlier.push(file)
        }
      })
  
      // sort by date
      const sorted = dailyNotesTodayOrEarlier.sort((a, b) => moment(b.basename.substr(b.basename.length - 10), format).valueOf() - moment(a.basename.substr(a.basename.length - 10), format).valueOf());
      return sorted[1];
  };
  
  const defaultOptions = {
    folder: "Tasks/Daily", 
    format: "YYYY-MM-DD", 
    tasksHeader: "# Tasks", 
    prefix: '',
    suffix: "❗"
  }
  async function rollover_daily_todos(options) {
      const { folder, format, tasksHeader, prefix, suffix } = { ...defaultOptions, ...options }
      return (await getAllUnfinishedTodos(getLastDailyNote(folder, format), tasksHeader)).map(task => `${prefix}${task}${suffix}`).join('\n');
  }
  
  module.exports = rollover_daily_todos;