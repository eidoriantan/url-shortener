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

router.post('/create', async (req, res) => {
  const client = res.locals.client
  const url = req.body.url
  const shortUrl = process.env.SHORT_URL
  const query = 'INSERT INTO shorts(url) VALUES($1) RETURNING *'

  try {
    const result = await client.query(query, [url])
    const short = result.rows[0]
    res.json({
      success: true,
      message: 'Success',
      short: {
        short_id: short.short_id,
        short_url: shortUrl + '/r/' + short.short_id,
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
