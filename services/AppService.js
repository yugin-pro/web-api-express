
const fs =  require('node:fs');
const path = require('node:path');

module.exports = class AppService {
    constructor(app) {
      this.name = app;
      this.path = path.join(__dirname, "../../apps/",app,'/dist')
    }
  
    getScriptList() {
        let fileList = fs.readdirSync(path.join(this.path,'/js'))
        let jsFiles  = fileList.filter(fileName => fileName.match(/\.js$/))
        return jsFiles.map(file => path.join('/',this.name,'/js',file))
    }

    getCssList() {
        let fileList = fs.readdirSync(path.join(this.path,'/css'))
        let cssFiles = fileList.filter(fileName => fileName.match(/\.css$/))
        return cssFiles.map(file => path.join('/',this.name,'/css',file))
      }
    getAppPath() {
        fs.readdir(path.join(__dirname, "../../apps/",this.app,'/dist')).then((dirs) => {

            dirs.forEach(dir => {
              appList.push(dir)
              app.use('/' + dir, express.static(path.join(__dirname, "../apps/",dir,"/dist")))
            })
          })
    }  
  };