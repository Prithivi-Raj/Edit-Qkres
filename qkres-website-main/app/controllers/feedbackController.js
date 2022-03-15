const path = require('path');

function homePage() {
  return {
    index(req, res) {
      res.render('feedback');
    },
    
  };
}

module.exports = homePage;
