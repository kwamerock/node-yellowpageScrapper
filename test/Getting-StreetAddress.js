
const rp = require('request-promise');
const otcsv = require('objects-to-csv');
const cheerio = require('cheerio');


const baseURL = 'https://www.yellowpages.com';
const searchURL = '/search?search_terms=Medical%20Ambulance&geo_location_terms=Los%20Angeles%2C%20CA&page=2';


const getCompanies = async () => {
  const html = await rp(baseURL + searchURL);
  const businessMap = cheerio('div.street-address', html).map(async (i, e) => {

    // console.log('15-businessMap =', cheerio('a.business-name', html) ); // original

    console.log('15-stree-address =', e.children[0].parent.children[0].data );

        // e.children[0].data || cheerio('h1', innerHtml).text();
        // cheerio('div', innerHtml).text();

    // console.log('16-businessMap =', e.children ); 
    // console.log('16-businessMap =', e.parent ); 

    // console.log('19-e.children[0] =', e.parent ); 

    // const link = baseURL + e.attribs.href;
    // const innerHtml = await rp(link);


    // const emailAddress = cheerio('a.email-business', innerHtml).prop('href');
    // const name = e.children[0].data;
    // const phone = cheerio('div.street-address', innerHtml).text();

    // const address = cheerio('a.adr', innerHtml).text();
    // console.log('address =', address ); 

    // const address2 = cheerio('a.adr', innerHtml).text();
    console.log('phone =', phone ); 

    // const name2 = cheerio('h1', innerHtml).text(); 
        // const name2 = cheerio('h1', innerHtml).text(); 
    // console.log('36- name2 = ', name2); 


    // const bizName= link.substr(link.lastIndexOf('/') + 1);
    // const companyName= bizName.substring(0, bizName.length - 10);

    return {
      // emailAddress,
      // link,
      // name,
      phone,
      // companyName,
      // address,
    }
  }).get();
  return Promise.all(businessMap);
};

getCompanies()
  .then(result => {
    const transformed = new otcsv(result);
    return transformed.toDisk('./output3.csv');
  })
  .then(() => console.log('SUCCESSFULLY COMPLETED THE WEB SCRAPING SAMPLE'));




