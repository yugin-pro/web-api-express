const path = require('node:path');
const fs =  require('node:fs/promises');
const express = require('express')
const app = express()
const port = 3000


const appList = []
;
fs.readdir(path.join(__dirname, "../apps/")).then((dirs) => {

  dirs.forEach(dir => {
    appList.push(dir)
    app.use('/' + dir, express.static(path.join(__dirname, "../apps/",dir,"/dist")))
  })
})

app.get('/', (req, res) => {
  /*
  нужно получучить название приложения
  найти по названиф файл с приложением
  отправить ответ с страницей приложения
  */
  let output = appList.map(appN => `<a href=${appN}>${appN}</a>`)
  res.send(output.join(' </br> '))
})

app.post('/api/*', (req, res) => {
  try {
    let apiHandler = require(`../apps/${req.params[0]}/api`)
    let result = apiHandler.main()
    res.send(result)
  } catch (error) {
    res.send({error:'no sucn app'})
  }
  
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})