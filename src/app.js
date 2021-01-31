/** App Script */
;(function () {
  /** --- Elements DOM --- */
  const table = document.querySelector('.table')
  const selection = document.querySelector('.selection')
  const firstNumbers = document.querySelectorAll('.first-number')
  const inputs = document.querySelectorAll("input[type='number']")
  const resultsInfo = document.querySelectorAll('.table__results > ul > li')
  const buttonsCorrect = document.querySelectorAll('.correct-btn')
  const hitsEl = document.querySelector('.hits')
  const hitsSpan = document.querySelector('.hits > span')
  const layer = document.querySelector('.layer')
  const correctAllBtn = document.querySelector('.correct-all')
  /** -------------------- */

  /** --- Variables --- */
  let selectedNumber = null
  let hits = 0
  const results = [
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
  /** -------------------- */

  /** --- Functions --- */
  const resetTable = () => {
    addValuesToInputs(null)
    addValuesToResultsInfo(`<i class="icon-emo-sleep"></i>`)
    hits = 0
    hitsSpan.innerHTML = hits
  }

  const resetData = () => {
    resetTable()
  }

  const addValuesToInputs = (value) => {
    inputs.forEach(function (input) {
      input.value = value
    })
  }

  const addValuesToResultsInfo = (value) => {
    resultsInfo.forEach(function (res) {
      res.innerHTML = value
    })
  }

  const addValuesToRows = (value) => {
    firstNumbers.forEach((spanNumber) => {
      spanNumber.innerHTML = value
    })
  }

  const showElements = () => {
    table.classList.add('show')
    hitsEl.classList.add('show')
    correctAllBtn.classList.add('show')
  }

  const hideElements = () => {
    table.classList.remove('show')
    hitsEl.classList.remove('show')
    correctAllBtn.classList.remove('show')
  }

  const checkOperation = (id) => {
    const inputValue = parseInt(inputs[id - 1].value)
    const resultValue = results[selectedNumber - 1][id - 1]
    resultsInfo[id - 1].innerHTML =
      inputValue !== resultValue
        ? `<i class="icon-emo-unhappy"></i>`
        : `<i class="icon-emo-wink2"></i>`
  }

  const checkHits = () => {
    hits = 0
    resultsInfo.forEach((res) => {
      if (res.innerHTML === `<i class="icon-emo-wink2"></i>`) hits++
    })
    hitsSpan.innerHTML = hits
  }

  const showCongratulation = () => {
    if (hits === 10) {
      setTimeout(() => {
        layer.classList.add('show')
        setTimeout(() => {
          resetData()
          layer.classList.remove('show')
        }, 2000)
      }, 200)
    }
  }
  /** -------------------- */

  /** --- Events --- */
  selection.addEventListener('change', function () {
    selectedNumber = this.value
    resetTable()

    if (selectedNumber) {
      showElements()
      addValuesToRows(selectedNumber)
    } else {
      hideElements()
    }
  })

  buttonsCorrect.forEach((button) => {
    button.addEventListener('click', (event) => {
      const id = parseInt(event.target.id.split('-')[1])

      checkOperation(id)
      checkHits()
      showCongratulation()
    })
  })

  correctAllBtn.addEventListener('click', () => {
    for (let i = 1; i <= 10; i++) {
      checkOperation(i)
    }
    checkHits()
    showCongratulation()
  })
  /** -------------------- */
})()
