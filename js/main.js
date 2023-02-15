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
    let buttonCell
    const sidebarSizes = '<button class="sidebar-size-button"></button>'

    sizeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.classList.contains('is-active') && !button.classList.contains('selected')) {
                button.classList.add('selected')
                sizeNumbers += 1
                buttonCell = button.outerHTML
                buttonCell.className = 'alert'
                sizeMass.push(button.outerHTML)
            }
        })
    })

    const sidebarSizeButtons = document.querySelector('.sidebar-size-buttons')
    const workspace = document.querySelector('.workspace')
    const addButton = '<div class="workspace-button-add flex"><button> <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0 15H30.5" stroke="#092F63" stroke-width="1.5"/> <path d="M15.5 0V30" stroke="#092F63" stroke-width="1.5"/> </svg><span>добавить фото</span> </button></div>'

    selectButton.addEventListener('click', () => {
        console.log('pirate')
        sizeWindow.classList.toggle('is-active')
        sidebarSizeButtons.classList.add('is-active')
        let numbersSizeButtons = sidebarSizeButtons.childNodes.length
        if((sizeNumbers > 0) && (!sidebarButton.classList.contains('is-inactive'))) {
            sidebarButton.classList.toggle('is-inactive')
            workspace.insertAdjacentHTML('beforeend', addButton)
            console.log(sizeNumbers)
        }

        function appendButtons() {
            for(let i = 0, numbers = sizeNumbers; i < numbers; i++) {
                sidebarSizeButtons.insertAdjacentHTML('afterbegin', sizeMass[i])
            }
        }

        const cleanStack = async () => {
            await appendButtons()
            sizeNumbers = 0
            sizeMass = []
            console.log(sizeNumbers, "djsdkuku")
        }

        cleanStack()

    })

})