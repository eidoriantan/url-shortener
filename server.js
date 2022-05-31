/**
 *  URL Shortener
 *  Copyright (C) 2022, Adriane Justine Tan
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const express = require('express')
const { Client } = require('pg')

const dbMiddleware = require('./server/database')
const shorts = require('./server/shorts/')
const redirect = require('./server/redirect')

const port = process.env.PORT || 8082
const app = express()
const clientConfig = {
  application_name: 'URL Shortener',
  ssl: { rejectUnauthorized: false }
}

if (typeof process.env.DATABASE_URL === 'string') {
  clientConfig.connectionString = process.env.DATABASE_URL
}

const client = new Client(clientConfig)
client.connect()

app.use(express.urlencoded({ extended: true }))
app.use('/', express.static('public'))
app.use('/api/shorts', dbMiddleware(client), shorts)
app.use('/r/', dbMiddleware(client), redirect)

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

server.on('close', async () => {
  console.log('Server is closing...')
  client.end()
})

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Exiting process...')
    process.exit(0)
  })
})
