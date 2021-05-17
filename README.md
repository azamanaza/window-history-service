# @azamanaza/window-history-service

## Description
A small service that wraps the window.history object and provides convenience for manipuating the url history without triggering redirection.

## Setup
Run `npm i @azamanaza/window-history-service`

## Usage

### getCurrentParams()
Retrieves the current query params on the address bar.
```
// localhost?foo=a&baz=b

cosnt service = new WindowHistoryService()
service.getCurrentParams() // { foo: "a", baz: "b" }
```

### removeQueryParam(key: string)
Removes a parameter by key.
Note: you need to call `applyChanges()` to trigger the update.
```
// localhost?foo=a&baz=b
cosnt service = new WindowHistoryService()
service.removeQueryParam('foo').applyChanges()
// localhost?baz=b
```

### setQueryParam(key: string, val: string | number)
Adds or updates a parameter to the query
Note: you need to call `applyChanges()` to trigger the update.
```
// localhost?foo=a&baz=b
cosnt service = new WindowHistoryService()
service.setQueryParam('bar', 'c').applyChanges()
// localhost?foo=a&baz=b&bar=c
```

### setQueryParams(param: QueryParams)
Replaces the entire query list
Note: you need to call `applyChanges()` to trigger the update.
```
// localhost?foo=a&baz=b
cosnt service = new WindowHistoryService()
service.setQueryParams({ a: 1, b: "two", c: 3 }).applyChanges()
// localhost?a=1&b=two&c=3
```

### applyChanges()
Applies the changes to the address bar.

### generateUrl()
Assembles the full url along with the query string parameters
```
// localhost?foo=a&baz=b
cosnt service = new WindowHistoryService()
service.generateUrl() // http://localhost?foo=a&baz=b
```

### getPath()
Gets the path part of the url (without host and protocl)
```
// localhost/home
cosnt service = new WindowHistoryService()
service.getPath() // /home
```