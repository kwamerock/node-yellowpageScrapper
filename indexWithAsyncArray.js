// const $ = require ('jquery');
const _ = require('lodash');
const rp = require('request-promise');
const otcsv = require('objects-to-csv');
const cheerio = require('cheerio');




const baseURL = 'https://www.yellowpages.com';
const searchURL = '/search?search_terms=Medical%20Ambulance&geo_location_terms=Los%20Angeles%2C%20CA&page=3';

// Function
const getCompanies = async () => {
  console.log(' calling getCompanies'); 
  const html = await rp(baseURL + searchURL);

  const $ = cheerio.load(html);

  const businessMap = cheerio('a.business-name', html).map(async (i, e) => {

    const link = baseURL + e.attribs.href;
    const innerHtml = await rp(link);


    const emailAddress = cheerio('a.email-business', innerHtml).prop('href');
    const name = e.children[0].data;
    const phone = cheerio('p.phone', innerHtml).text();



    return {
      emailAddress,
      link,
      phone,
    }
  })
  .get();
  return Promise.all(businessMap);
};


// Function
const getStreetAddress = async () => {
  console.log(' calling getStreetAddress'); 
  const html = await rp(baseURL + searchURL);
  let businessMap = cheerio('div.street-address', html).map(async (i, e) => {

    // console.log('15-stree-address =', e.children[0].parent.children[0].data );
    // const streetAddress = e.children[0].parent.children[0].data;

  // console.log('before returning getStreetAddress');

    // console.log('60--streetAddress =', streetAddress ); 

    // const streetAddress = e.children[0].parent.children[0].data || 'No Street Address Provided';

    const streetAddress =  e.children[0].parent.children[0].data || "???"

    
  //     console.log('68-i=', i); 
  //   console.log('69-It exists!  streetAddress.length=', streetAddress.length);
  // } else {
  //   console.log('70-Does not exist')
  // }


    return {
      streetAddress,
    }

  })
  .get();

  // businessMap = streetAddress || 'No Street Address Provided';

  return Promise.all(businessMap);
};



const getCompanyName = async () => {
  const html = await rp(baseURL + searchURL);
  const businessMap = cheerio('a.business-name', html).map(async (i, e) => {

    // console.log('e.children[0] =', e.children[0].children[0].data ); 

    const link = baseURL + e.attribs.href;
    const innerHtml = await rp(link);

    const CompanyName = cheerio('h1', innerHtml).text(); 

    if ( CompanyName === ''  ){
        CompanyName =  '-'; 
    }

    return {
      CompanyName,
    }
  }).get();
  return Promise.all(businessMap);
};



const getCityState = async () => {
  console.log(' calling getCityState'); 
  const html = await rp(baseURL + searchURL);
  const businessMap = cheerio('div.locality', html).map(async (i, e) => {

   console.log('15-stree-address =', );

   const City = e.children[0].parent.children[0].data; 

    return {
        City,
    }
  }).get();
  return Promise.all(businessMap);
};


// COMBINING ONE AFTER ANOTHER CALL 

function getExample() {
    let a = getCompanies();
    let b = a.then(function(resultA) {
        // some processing
        return getStreetAddress();
    });
    let c = b.then(function(resultB) {
        // some processing
        return getCompanyName();
    });

    let d = c.then(function(resultC) {
        // some processing
        return getCityState();
    });
    return Promise.all([a, b,c,d ]).then(function([resultA, resultB, resultC, resultD]) {
        // more processing
        console.log(' resultB=', resultB);
        console.log(' resultA=', resultA);
        console.log(' resultC=', resultC);
        console.log(' resultD=', resultD);


    let output = _.merge(resultA, resultB, resultC, resultD);

      console.log('110-  output =', output );
        
        return output;  
   
    });
}


getExample().then(result => {

    const transformed = new otcsv(result);
    return transformed.toDisk('./output_LosAng_page3.csv');
  })
  .then(() => console.log('SUCCESSFULLY COMPLETED THE WEB SCRAPING SAMPLE'));




















// sonole.log 