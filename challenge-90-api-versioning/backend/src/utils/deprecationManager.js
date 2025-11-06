class DeprecationManager {
  constructor() {
    // Define deprecated versions with deprecation dates
    this.deprecatedVersions = {
      'v1': {
        deprecated: true,
        deprecationDate: '2025-12-31',
        sunsetDate: '2026-06-30'
      },
      'v2': {
        deprecated: false,
        deprecationDate: null,
        sunsetDate: null
      }
    };
  }
  
  isDeprecated(version) {
    const versionInfo = this.deprecatedVersions[version];
    return versionInfo ? versionInfo.deprecated : false;
  }
  
  getDeprecationDate(version) {
    const versionInfo = this.deprecatedVersions[version];
    return versionInfo ? versionInfo.deprecationDate : null;
  }
  
  getSunsetDate(version) {
    const versionInfo = this.deprecatedVersions[version];
    return versionInfo ? versionInfo.sunsetDate : null;
  }
  
  markAsDeprecated(version, deprecationDate, sunsetDate) {
    if (!this.deprecatedVersions[version]) {
      this.deprecatedVersions[version] = {};
    }
    
    this.deprecatedVersions[version].deprecated = true;
    this.deprecatedVersions[version].deprecationDate = deprecationDate;
    this.deprecatedVersions[version].sunsetDate = sunsetDate;
  }
  
  getVersionInfo(version) {
    return this.deprecatedVersions[version] || null;
  }
  
  getAllVersions() {
    return this.deprecatedVersions;
  }
}

module.exports = new DeprecationManager();