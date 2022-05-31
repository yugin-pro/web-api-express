const path = require('node:path');
const fs =  require('node:fs/promises');
const express = require('express')
const ejs = require('ejs');
const appService = require('./services/AppService.js')
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
  // let output = appList.map(appN => `<a href=${appN}>${appN}</a>`)
  // res.send(output.join(' </br> '))
  let data = {
    navText:'welcome to web app store',
    appList:appList
  }
  ejs.renderFile('./views/store.ejs', data, {}, function(err, str){
    // str => Rendered HTML string
    res.send(str)
  });
  
})

app.get('/:appName*//', (req, res) => {

  //res.send( JSON.stringify(req.params) )

  let {appName} = req.params
  let appS = new appService(appName)
  let data = {
    header:{
      scriptUrls:appS.getScriptList(),
      cssUrls: appS.getCssList()
    },
    navText:'welcome to ' + appName,
  }
  ejs.renderFile('./views/app.ejs', data, {}, function(err, str){
    // str => Rendered HTML string
    res.send(str)
  });
});

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