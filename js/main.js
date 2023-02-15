document.addEventListener('DOMContentLoaded', function() {
    const sizeWindow = document.getElementById('size-window')
    const sizeToggle = document.querySelectorAll('.size-toggle')

    sizeToggle.forEach((button) => {
        button.addEventListener('click', () => {
            sizeWindow.classList.toggle('is-active')
        })
    })

    /* SIZE SELECTION */
    const sizeButtons = document.querySelector('.size-buttons').childNodes
    const selectButton = document.querySelector('.size-button-choose')

    // console.log(selectButton)
    sizeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            button.classList.toggle('is-active')
        })
    })

    const sidebarButton = document.querySelector('.sidebar-button')
    let sizeNumbers = 0
    let sizeMass = []
    let hh = 0
    const sidebarSizes = '<button class="sidebar-size-button"></button>'

    sizeButtons.forEach((button) => {
        selectButton.addEventListener('click', () => {
            if (button.classList.contains('is-active') && !button.classList.contains('selected')) {
                button.classList.add('selected')
                sizeNumbers += 1
                hh = button.outerHTML
                hh.className = 'alert'
                sizeMass.push(button.outerHTML)
                console.log(sizeNumbers)
                // console.log(sizeMass)
            }
        })
    })

    const sidebarSizeButtons = document.querySelector('.sidebar-size-buttons')

    selectButton.addEventListener('click', () => {
        sizeWindow.classList.toggle('is-active')
        sidebarSizeButtons.classList.toggle('is-active')
        let numbersSizeButtons = sidebarSizeButtons.childNodes.length
        console.log(numbersSizeButtons)
        if(sizeNumbers > 0 || numbersSizeButtons > 1) {
            sidebarButton.classList.toggle('is-inactive')
            console.log('hug')
        }

        for(let i = 0, numbers = sizeNumbers; i < numbers; i++) {
            sidebarSizeButtons.insertAdjacentHTML('afterbegin', sizeMass[i])
        }
    })

})