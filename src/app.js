;(function () {
  var table = document.querySelector('.table')
  var selection = document.querySelector('.selection')
  var spanNumbers = document.querySelectorAll(
    '.table > .table__left > ul > li > span'
  )
  var inputs = document.querySelectorAll("input[type='number']")
  var resultsInfo = document.querySelectorAll('.results > ul > li')
  var buttonsOk = document.querySelectorAll('button')
  var hitsEl = document.querySelector('.hits')
  var hitsSpan = document.querySelector('.hits > span')
  var layer = document.querySelector('.layer')
  var correctAllBtn = document.querySelector('.correct-all')
  var selectedNumber = null
  var hits = 0
  var results = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
    [3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
    [4, 8, 12, 16, 20, 24, 28, 32, 36, 40],
    [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
    [6, 12, 18, 24, 30, 36, 42, 48, 54, 60],
    [7, 14, 21, 28, 35, 42, 49, 56, 63, 70],
    [8, 16, 24, 32, 40, 48, 56, 64, 72, 80],
    [9, 18, 27, 36, 45, 54, 63, 72, 81, 90],
    [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  ]

  selection.addEventListener('change', function () {
    inputs.forEach(function (input) {
      input.value = null
    })

    resultsInfo.forEach(function (res) {
      res.innerHTML = '🤔'
    })

    hits = 0
    hits.innerHTML = hits
    selectedNumber = this.value

    if (selectedNumber) {
      table.classList.add('show')
      hitsEl.classList.add('show')
      correctAllBtn.classList.add('show')

      spanNumbers.forEach(function (spanNumero) {
        spanNumero.innerHTML = selectedNumber
      })
    } else {
      table.classList.remove('show')
      hitsEl.classList.remove('show')
      correctAllBtn.classList.remove('show')

      spanNumbers.forEach(function (spanNumero) {
        spanNumero.innerHTML = '-'
      })
    }
  })

  buttonsOk.forEach(function (button) {
    button.addEventListener('click', function (event) {
      var id = parseInt(event.target.id.split('-')[1])
      var inputValue = parseInt(inputs[id - 1].value)
      var resultValue = results[selectedNumber - 1][id - 1]

      if (inputValue !== resultValue) {
        resultsInfo[id - 1].innerHTML = '❌'
      } else {
        resultsInfo[id - 1].innerHTML = '✅'
      }

      hits = 0
      resultsInfo.forEach(function (res) {
        if (res.innerHTML === '✅') hits++
      })
      hitsSpan.innerHTML = hits

      if (hits === 10) {
        setTimeout(function () {
          layer.style.display = 'block'
          setTimeout(function () {
            location.reload()
          }, 2000)
        }, 200)
      }
    })
  })
})()
