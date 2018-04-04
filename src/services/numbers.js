// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import _ from 'lodash';

const NUMBER_ENDPOINT = 'http://numbersapi.com';

class NumberService {

  async getFact(number, category) {
    const url = `${NUMBER_ENDPOINT}/${number}/${category}?notfound=floor&json`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`NumberService getFact failed, HTTP status ${response.status}`);
    }
    const data = await response.json();
    console.log(`fact response: ${data}`)
    return data;
  }

}

export default new NumberService();
