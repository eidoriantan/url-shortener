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

router.get('/:id', async (req, res) => {
  const client = res.locals.client
  const shortId = req.params.id
  const query = 'SELECT * FROM shorts WHERE short_id=$1 LIMIT 1'
  const updateQuery = 'UPDATE shorts SET visits=$2 WHERE short_id=$1'

  try {
    const result = await client.query(query, [shortId])
    const short = result.rows[0]

    await client.query(updateQuery, [shortId, short.visits + 1])
    res.redirect(short.url)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

module.exports = router