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

router.get('/:alias', async (req, res) => {
  const client = res.locals.client
  const alias = req.params.alias
  const referer = req.get('Referer') || 'Unknown'
  const query = 'SELECT * FROM shorts WHERE alias=$1 LIMIT 1'
  const updateQuery = 'UPDATE shorts SET visits=$2 WHERE alias=$1'
  const insertQuery = 'INSERT INTO referrers (alias, referrer) VALUES ($1, $2)'

  try {
    const result = await client.query(query, [alias])
    const short = result.rows[0]

    await client.query(updateQuery, [alias, short.visits + 1])
    await client.query(insertQuery, [alias, referer])
    res.redirect(short.url)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

module.exports = router
