// Fetch wrapper for XML-only API
class XmlClient {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
  }

  async get(endpoint) {
    const response = await fetch(this.baseURL + endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/xml'
      }
    });
    
    const text = await response.text();
    return { response, text };
  }

  async post(endpoint, xmlBody) {
    const response = await fetch(this.baseURL + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml'
      },
      body: xmlBody
    });
    
    const text = await response.text();
    return { response, text };
  }

  async put(endpoint, xmlBody) {
    const response = await fetch(this.baseURL + endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/xml'
      },
      body: xmlBody
    });
    
    const text = await response.text();
    return { response, text };
  }

  async delete(endpoint) {
    const response = await fetch(this.baseURL + endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/xml'
      }
    });
    
    const text = await response.text();
    return { response, text };
  }
}

const xmlClient = new XmlClient('/api');

export default xmlClient;