const index = require('./index');
const fs    = require('fs');

index(null, {
  end: html => {
    fs.writeFileSync('./index.html', html);
  },
});