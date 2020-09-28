
const rp = require('request-promise');
const otcsv = require('objects-to-csv');
const cheerio = require('cheerio');


const baseURL = 'https://www.yellowpages.com';
const searchURL = '/search?search_terms=Medical%20Ambulance&geo_location_terms=Los%20Angeles%2C%20CA&page=2';

// Function
const getCompanies = async () => {
  const html = await rp(baseURL + searchURL);
  const businessMap = cheerio('a.business-name', html).map(async (i, e) => {

    const link = baseURL + e.attribs.href;
    const innerHtml = await rp(link);


    const emailAddress = cheerio('a.email-business', innerHtml).prop('href');
    const name = e.children[0].data;
    const phone = cheerio('p.phone', innerHtml).text();


    const name2 = cheerio('h1', innerHtml).text();  //do it the right way 
    console.log('36- name2 = ', name2); 


    const bizName= link.substr(link.lastIndexOf('/') + 1);
    const companyName= bizName.substring(0, bizName.length - 10);


    return {
      emailAddress,
      link,
      name,
      phone,
      companyName,
    }
  })
  .get();
  return Promise.all(businessMap);
};


// Function
const getStreetAddress = async () => {
  const html = await rp(baseURL + searchURL);
  const businessMap = cheerio('div.street-address', html).map(async (i, e) => {

    console.log('15-stree-address =', e.children[0].parent.children[0].data );
    const streetAddress = e.children[0].parent.children[0].data;

    return {
      streetAddress,
    }

  }).get();
  return Promise.all(getStreetAddress);
};



// CALLING EACH FUNCTIONS 
getCompanies()
  .then(result => {
    // result from first 
    console.log('first result =', result); 

    // combine the results here // add to the object. 
    //

    // const transformed = new otcsv(result);
    // return transformed.toDisk('./output4.csv');
  }). then(
  getStreetAddress()
  .then(result => {
    // result from first 
    console.log('getStreetAddress result =', result); 

    // combine the results here // add to the object. 

    const transformed = new otcsv(result);
    return transformed.toDisk('./output4.csv');
  }))
  .then(() => console.log('SUCCESSFULLY COMPLETED THE WEB SCRAPING SAMPLE'));




















// sonole.log 