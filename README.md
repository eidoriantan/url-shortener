
# URL Shortener
![GitHub](https://img.shields.io/github/license/eidoriantan/url-shortener?style=flat-square)
![Maintenance](https://img.shields.io/maintenance/yes/2023?style=flat-square)

Easily shorten your URLs by using this tool. Reduce the length of long URLs into
more nice and manageable links. You'll also be able to monitor traffic
statistics of your links such as number of visits and referer.

**URL Shortener** is an open-sourced project and was built using
[React.js](https://reactjs.org) and [Express](https://expressjs.com).

## Installation
You can install and run this project on your server.

### Prerequisites
 * PostgreSQL
 * Node and npm

First, you'll have to clone this repository into your own server by running this
command:

```shell
git clone https://github.com/eidoriantan/url-shortener
```

Run the SQL query in `setup/database.sql` on your PostgreSQL server for setting
up the database.

Then, install the Node dependencies by running this command:

```shell
npm install
```

Finally, you can build the UI using [React.js](https://reactjs.org) and run the
website by running this command:

```shell
npm run build
npm run server
```

You should be able to access the website at
[http://localhost:8082](http://localhost:8082)
