export interface QueryParams {
  [key: string]: string | number;
}

export class WindowHistoryService {

  private queryParams: QueryParams = {};

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

  setQueryParam(key: string, val: string | number) {
    this.queryParams[key] = val;
    
    return this;
  }

  setQueryParams(params: QueryParams) {
    this.queryParams = params;

    return this;
  }

  updateQueryParams(params: QueryParams) {
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

  getPath(): string {
    return document.location.pathname;
  }
}
