
const _ = require('lodash');


let big = [{ emailAddress: undefined,
    link:
     'https://www.yellowpages.com/huntington-park-ca/mip/care-ambulance-12764896',
    name: undefined,
    phone: '(323) 582-9277',
    companyName: 'care-ambulanc' },
  { emailAddress: undefined,
    link:
     'https://www.yellowpages.com/glendale-ca/mip/trans-aid-ambulance-transportation-14502454',
    name: undefined,
    phone: '(323) 204-6921',
    companyName: 'trans-aid-ambulance-transportatio' }]; 


    let small = [
     { streetAddress: '1626 S Central Ave' },
  { streetAddress: '2931 W Valley Blvd' }]; 

let output = _.merge(big, small);

// console.log(' big =', big); 
console.log(' output =', output); 