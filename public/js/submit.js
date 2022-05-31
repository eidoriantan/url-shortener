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

$(document).ready(function () {
  $('#form-submit').submit(function (event) {
    event.preventDefault()

    const action = $(this).attr('action')
    const method = $(this).attr('method')
    const data = $(this).serialize()

    $.ajax(action, {
      method: method,
      data: data,
      dataType: 'json',
      success: function (res, status, xhr) {
        const text = res.success ? res.short.short_url : res.message
        $('#submit-result').text(text)
      },
      error: function (xhr, status, error) {
        const res = JSON.parse(xhr.responseText)
        $('#submit-result').text(res.message)
      }
    })
  })
})
