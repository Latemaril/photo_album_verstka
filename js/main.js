document.addEventListener('DOMContentLoaded', function () {

    const sizeWindow = document.getElementById('size-window')
    const sizeToggle = document.querySelectorAll('.js-size-toggle')
    const sizeButtons = document.querySelector('.js-size-btns').childNodes
    const selectButton = document.querySelector('.js-size-btn-choose')
    const sidebarButton = document.querySelector('.js-sidebar-btn')
    const sidebarSizeButtons = document.querySelector('.js-sidebar-size-btns')
    const sizeButtonsActive = document.querySelectorAll('.js-size')
    const sizeCloseButtons= document.querySelectorAll('.js-size-close')
    let sizeNumbers = 0
    let sizeMass = []
    let dataSize = []

    sizeToggle.forEach((button) => {
        button.addEventListener('click', () => {
            sizeWindow.classList.toggle('is-active')
        })
    })


    sizeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            button.classList.toggle('is-active')
        })
    })

    sizeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.classList.contains('is-active') && !button.classList.contains('js-selected')) {
                sizeNumbers += 1

                button.classList.add('js-selected')

                // sizeMass.push(button.innerHTML)
                dataSize.push(button.getAttribute('data-size'))
            }
        })
    })


    selectButton.addEventListener('click', () => {


        sizeWindow.classList.toggle('is-active')
        sidebarSizeButtons.classList.add('is-active')

        if ((sizeNumbers > 0) && (!sidebarButton.classList.contains('is-inactive'))) {
            sidebarButton.classList.toggle('is-inactive')
        }

        for (let i = 0; i < sizeNumbers; i++) {
            for (let j = 0; j < sizeButtonsActive.length; j++) {
                if (dataSize[i] === sizeButtonsActive[j].getAttribute('data-size') && sizeButtonsActive[j].classList.contains('is-inactive')) {
                    sizeButtonsActive[j].classList.toggle('is-inactive')
                }
            }
        }

        sizeCloseButtons.forEach((close) => {
            close.addEventListener('click', () => {

            })
        })

        // function appendButtons() {
        //     for (let i = 0, numbers = sizeNumbers; i < numbers; i++) {
        //
        //         function addButton() {
        //             sidebarSizeButtons.insertAdjacentHTML('afterbegin', sizeButtonPattern)
        //         }
        //         const filling = async () => {
        //             await addButton()
        //
        //             sizes.forEach( (size) => {
        //                 if(size.classList.contains('js-cash')) {
        //
        //                 }
        //                 size.setAttribute('data-size', dataSize[i])
        //                 size.textContent = sizeMass[i]
        //             })
        //         }
        //
        //         filling().then(() => {
        //             console.log('completed')
        //         })
        //
        //         let sizes = document.querySelectorAll('.js-size')
        //
        //         sizes.forEach((size) => {
        //             size.addEventListener('click', () => {
        //                 sizes.forEach((n) => {
        //                     n.classList.remove('is-active')
        //                 })
        //                 setTimeout(() => {
        //                     size.classList.add('is-active')
        //                 })
        //             })
        //         })
        //     }
        // }

        // const cleanStack = async () => {
        //     await appendButtons()
        //
        //     sizeNumbers = 0
        //     sizeMass = []
        // }
        //
        // cleanStack().then(() => {
        //     console.log('completed')
        // })

    })

})