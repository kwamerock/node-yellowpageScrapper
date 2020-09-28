
const rp = require('request-promise');
const otcsv = require('objects-to-csv');
const cheerio = require('cheerio');


const baseURL = 'https://www.yellowpages.com';

const searchURL = '/search?search_terms=Medical%20Ambulance&geo_location_terms=Los%20Angeles%2C%20CA&page=2';


const getCompanies = async () => {
  const html = await rp(baseURL + searchURL);
  const businessMap = cheerio('a.business-name', html).map(async (i, e) => {

    // console.log('15-businessMap =', cheerio('a.business-name', html) ); // original
    // console.log('16-businessMap =', e.children ); 
    // console.log('16-businessMap =', e.parent ); 

    console.log('e.children[0] =', e.children[0].children[0].data ); 

    const link = baseURL + e.attribs.href;
    const innerHtml = await rp(link);


    // const name = e.children[0].data;

    // OR 
    // const name2 = e.children[0].data || cheerio('h1', innerHtml).text(); // original
    const name = cheerio('h1', innerHtml).text(); 
    // console.log('36- name2 = ', name2); 


    // const bizName= link.substr(link.lastIndexOf('/') + 1);
    // const companyName= bizName.substring(0, bizName.length - 10);

    return {
      name,
    }
  }).get();
  return Promise.all(businessMap);
};

getCompanies()
  .then(result => {
    console.log(' 46 result =' , result); 
    const transformed = new otcsv(result);
    return transformed.toDisk('./Nameoutput3.csv');
  })
  .then(() => console.log('SUCCESSFULLY COMPLETED THE WEB SCRAPING SAMPLE'));




