$(document).ready(function () {
    // Variables
    let panel = '0'
    let withOperation = false

    // Init
    function init(button) {
        // Clean and Remove
        if (button === 'C')
            clear()
        else if (button === '<')
            remove()
        // Operations
        else if (button === '%')
            addOperation(button)
        else if (button === '/')
            addOperation(button)
        else if (button === 'x')
            addOperation(button)
        else if (button === '+')
            addOperation(button)
        else if (button === '-')
            addOperation(button)
        // Result
        else if (button === '=') {
            if (!withOperation) {
                alert('ERRO: Nenhum operador aritmético foi definido, portanto, zeramos o visor!')
            } else {
                calculate()
            }
        } else {
            if (isAnotherKey(button)) return

            panel === '0' && button != '.' ? panel = button : panel += button
        }
        
        $('#panel').empty()
        $('#panel').append(panel)
    }

    // Clear panel
    function clear() {
        panel = '0'
        withOperation = false

        $('#panel').empty()
        $('#panel').append(panel)
    }

    // Remove the last caracter
    function remove() {
        if (panel.length > 1)
            panel = panel.substring(0, panel.length - 1)
        else
            panel = '0'
    }

    // Adding operation to panel
    function addOperation(op) {
        if (withOperation) {
            alert('ERRO: Adicione apenas uma operação por vez!')
        } else {
            withOperation = true
            panel += ' ' + op + ' '
        }
    }

    // Calculating result
    function calculate() {
        let result = panel.split(' ')

        let operation = result[1]
        let num1 = parseFloat(result[0])
        let num2 = parseFloat(result[2])
        
        if (operation == '+')
            result = num1 + num2
        else if (operation == '-')
            result = num1 - num2
        else if (operation == 'x')
            result = num1 * num2
        else if (operation == '/')
            result = num1 / num2
        else if (operation == '%')
            result = (num1 * num2) / 100

        withOperation = false
        panel = result.toString()
    }

    // Verify if key exist
    function isAnotherKey(value) {
        if (
            value === '0' || 
            value === '1' || 
            value === '2' ||
            value === '3' ||
            value === '4' ||
            value === '5' ||
            value === '6' ||
            value === '7' ||
            value === '8' ||
            value === '9' ||
            value === '.'
        )
            return false
        else
            return true
    }

    // Get key
    function getKey(key) {
        if (key === 'Enter') key = '='
        else if (key === '*') key = 'x'
        else if (key === 'c') key = 'C'
        else if (key === 'd') key = '<'
        else if (key === ',') key = '.'
        else if (key === 'x') key = ''

        init(key)
    }

    // Click event
    $('#calculator .row div').click(function () {        
        init($(this).text())
    })

    // Key press event
    $(document).keypress(function (e) {
        getKey(e.key)
    })
})