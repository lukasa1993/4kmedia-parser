const _          = require('lodash');
const cheerio    = require('cheerio');
const fetch      = require('node-fetch');
const hbTemplate = require('./hbtemp.js');
const crypto     = require('crypto');
const handlebars = require('handlebars');
const fs         = require('fs');

const typeMapping = {
  'HDR':                'HDR',
  'HDR & Doby Vision':  'HDR',
  'HDR & Dolby Vision': 'HDR',
  'Fake':               'Fake',
  'Fake 4K':            'Fake',
  '4K':                 'Real',
  'Real 4k':            'Real',
  'Real 4K':            'Real',
};
const typeClass   = {
  'Fake': 'secondary',
  'HDR':  'warning',
  'Real': 'primary',
};

const logs = [];

function checksum(str, algorithm, encoding) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex');
}

const cache = {};

const result = {};

async function getPage(page) {
  const url    = 'https://4kmedia.org/real-or-fake-4k/' + page;
  const res    = await fetch(url);
  const html   = await res.text();
  const hash   = checksum(html, null, null);
  let cameBack = false;
  _.forEach(cache, checks => {
    if (checks === hash) {
      cameBack = true;
    }
  });
  if (cameBack) {
    return null;
  }
  cache[url] = hash;

  return html;
}

function parseLine(line) {
  line = _.trim(line);
  if (_.isEmpty(line)) {
    return;
  }

  const index = line.lastIndexOf('–');
  if (index === -1) {
    logs.push('Bad Split: ' + line);
    return;
  }
  const rest  = line.substring(0, index + 1);
  const last  = line.substring(index + 1, line.length);
  const name  = _.trim(_.trim(rest, '–'));
  const types = _.trim(_.trim(last, '–'));
  if (_.isEmpty(name) || _.isEmpty(types)) {
    return;
  }
  const typesParsed = types.split(',');
  _.forEach(typesParsed, type => {
    type = _.trim(type);
    if (typeMapping.hasOwnProperty(type)) {
      type = typeMapping[type];
    } else {
      logs.push(type + '| Not Found');
      return;
    }
    if (result.hasOwnProperty(type) === false) {
      result[type] = [];
    }
    result[type].push(name);
  });

}

async function parsePage(html) {
  if (_.isEmpty(html)) {
    return;
  }

  const $  = cheerio.load(html);
  const ps = $('p');

  ps.each((i, val) => {
    const text  = $(val).text();
    const lines = text.split(/\r?\n/);
    _.forEach(lines, line => parseLine(line));
  });
}

async function walkPages() {
  let page = 1;
  let html;
  do {
    html = await getPage(page);
    await parsePage(html);
    page++;
  } while (html !== null);
}

module.exports = (req, res) => {
  walkPages()
    .then(() => {
      let data = {};
      _.forEach(result, (val, key) => {
        _.forEach(val, name => {
          if (data.hasOwnProperty(name) === false) {
            data[name] = {
              name: name,
              tags: {},
            };
          }
          data[name].tags[key] = {
            name:  key,
            class: typeClass[key],
          };
        });
      });
      const template = handlebars.compile(hbTemplate);
      const html     = template({
        data,
        logs: logs.join('\n'),
      });
      res.end(html);
    })
    .catch(e => console.log(e));
};