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
const router = express.Router()

router.post('/', async (req, res) => {
  const client = res.locals.client
  const url = req.body.url
  const alias = req.body.alias

  const query = alias
    ? 'INSERT INTO shorts(url, short_id) VALUES($1, $2) RETURNING *'
    : 'INSERT INTO shorts(url) VALUES($1) RETURNING *'

  const searchQuery = 'SELECT * FROM shorts WHERE url=$1 LIMIT 1'
  const searchResult = await client.query(searchQuery, [url])
  if (searchResult.rows.length > 0) {
    const short = searchResult.rows[0]
    return res.json({
      success: false,
      message: 'URL was already registered.',
      short: {
        short_id: short.short_id,
        short_url: '/r/' + short.short_id,
        url: short.url,
        created: short.created
      }
    })
  }

  if (alias) {
    const aliasQuery = 'SELECT * FROM shorts WHERE short_id=$1 LIMIT 1'
    const aliasResult = await client.query(aliasQuery, [alias])
    if (aliasResult.rows.length > 0) {
      return res.json({
        success: false,
        message: 'Alias was already taken'
      })
    }
  }

  try {
    const result = await client.query(query, [url, alias])
    const short = result.rows[0]
    res.json({
      success: true,
      message: 'Success',
      short: {
        short_id: short.short_id,
        short_url: '/r/' + short.short_id,
        url: short.url,
        created: short.created
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

module.exports = router
