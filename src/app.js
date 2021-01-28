;(function () {
  var seleccion = document.querySelector('#seleccion')
  var spansNumero = document.querySelectorAll('#tabla > #left > ul > li > span')
  var inputs = document.querySelectorAll("input[type='number']")
  var resultadosInfo = document.querySelectorAll('#results > ul > li')
  var buttonsOk = document.querySelectorAll('button')
  var divAciertos = document.querySelector('#aciertos > span')
  var capa = document.querySelector('#capa')
  var numeroSeleccionado = null
  var aciertos = 0
  var resultados = [
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

  seleccion.addEventListener('change', function () {
    inputs.forEach(function (input) {
      input.value = null
    })

    resultadosInfo.forEach(function (res) {
      res.innerHTML = '🤔'
    })

    aciertos = 0
    divAciertos.innerHTML = aciertos
    numeroSeleccionado = this.value

    if (numeroSeleccionado) {
      buttonsOk.forEach(function (button) {
        button.removeAttribute('disabled')
      })

      inputs.forEach(function (input) {
        input.removeAttribute('disabled')
      })

      spansNumero.forEach(function (spanNumero) {
        spanNumero.innerHTML = numeroSeleccionado
      })
    } else {
      buttonsOk.forEach(function (button) {
        button.setAttribute('disabled', 'disabled')
      })

      inputs.forEach(function (input) {
        input.setAttribute('disabled', 'disabled')
      })

      spansNumero.forEach(function (spanNumero) {
        spanNumero.innerHTML = '-'
      })
    }
  })

  buttonsOk.forEach(function (button) {
    button.addEventListener('click', function (event) {
      var id = parseInt(event.target.id.split('-')[1])
      var inputValue = parseInt(inputs[id - 1].value)
      var resultValue = resultados[numeroSeleccionado - 1][id - 1]

      if (inputValue !== resultValue) {
        resultadosInfo[id - 1].innerHTML = '❌'
      } else {
        resultadosInfo[id - 1].innerHTML = '✅'
      }

      aciertos = 0
      resultadosInfo.forEach(function (res) {
        if (res.innerHTML === '✅') aciertos++
      })
      divAciertos.innerHTML = aciertos

      if (aciertos === 10) {
        setTimeout(function () {
          capa.style.display = 'block'
          setTimeout(function () {
            location.reload()
          }, 2000)
        }, 200)
      }
    })
  })
})()
