# @azamanaza/window-history-service

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
Removes a parameter by key
// localhost?foo=a&baz=b
cosnt service = new WindowHistoryService()
service.removeQueryParam('foo').applyChanges()
// localhost?baz=b