export interface QueryParam {
  [key: string]: string | number;
}

export class WindowHistoryService {

  private queryParams: QueryParam = {};

  constructor() {
    this.init();
  }

  init() {
    this.queryParams = this.getCurrentParams();
  }

  getCurrentParams() {
    let queryParams = {};
    try {
      queryParams = window.location.search.substring(1)
      .split('&')
      .reduce((acc: any,  param: string) => {
        const [key, val] = param.split('=');
        acc[key] = decodeURI(val);
        return acc;
      }, {});
    } catch (e) {
      // hush
      console.log(e);
    }
    return queryParams;
  }

  removeQueryParam(key: string) {
    delete this.queryParams[key];
    return this;
  }

  setQueryParam(key: string, val: string) {
    this.queryParams[key] = val;
    
    return this;
  }

  setQueryParams(params: QueryParam) {
    this.queryParams = params;

    return this;
  }

  updateQueryParams(params: QueryParam) {
    this.queryParams = {
      ...this.queryParams,
      ...params
    };

    return this;
  }

  applyChanges() {
    window.history.pushState(this.queryParams, document.title, this.generateUrl());
  }

  generateUrl() {
    const { queryParams } = this;
    const { origin, pathname } = document.location;
    const queryStringParams = Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&');
    return `${origin}${pathname}?${queryStringParams}`
  }

  getUrl(): string {
    return document.location.pathname;
  }
}
