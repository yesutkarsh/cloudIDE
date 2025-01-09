var express = require('express');
var router = express.Router();
const fs = require('fs/promises');
const path = require('path');





/* GET home page. */
router.get('/start', function (req, res, next) {
  res.send({title: 'Server Started' });
});







// Getting files heirarchy
router.get('/files', async function (req, res, next) {
  const fileTree = await generateFileTree('./user');
  return res.send(fileTree);

 
});



async function generateFileTree(dir) {
  async function buildTree(dir) {
    let files = await fs.readdir(dir)
    let currentTree = []

    for(let file of files){
    

      const filepath = path.join(dir,file)
      const stat = await fs.stat(filepath)


      // Now two Cases eith Folder or File
      if(stat.isDirectory()){
        currentTree.push({
          "name":file,
          "type":"folder",
          "path":filepath,
          "children": await buildTree(filepath)
        })
      }else{
        currentTree.push({
          "fileName":file,
          "path":filepath,
          "type":"file"
        })
      }



    }
    return currentTree;
    
  }
    return await buildTree(dir)

}



module.exports = router;
