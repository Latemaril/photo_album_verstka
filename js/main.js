document.addEventListener('DOMContentLoaded', function () {

    const sizeWindow = document.getElementById('size-window')
    const sizeToggle = document.querySelectorAll('.js-size-toggle')
    const sizeButtons = document.querySelector('.js-size-btns').childNodes
    const selectButton = document.querySelector('.js-size-btn-choose')
    const sidebarButton = document.querySelector('.js-sidebar-btn')
    const sidebarSizeButtons = document.querySelector('.js-sidebar-size-btns')
    const sizeButtonsActive = document.querySelectorAll('.js-size')
    const sizeCloseButtons = document.querySelectorAll('.js-size-close')
    const downloadClose = document.querySelector('.js-download-close')
    const bigButton = document.querySelector('.workspace-button-big')
    const downloadWindow = document.getElementById('download-window')
    const downloadHeaderButtons = document.querySelector('.download-header').childNodes
    let sizeNumbers = 0
    let dataSize = []

    sizeToggle.forEach((button) => {
        button.addEventListener('click', () => {
            sizeWindow.classList.toggle('is-active')
        })
    })


    sizeButtons.forEach((button) => {
        button.addEventListener('click', () => {

        })
    })

    sizeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (!button.classList.contains('is-active')) {
                sizeNumbers += 1

                button.classList.toggle('is-active')
                button.classList.toggle('js-selected')

                dataSize.push(button.getAttribute('data-size'))
            }
            else if (!button.classList.contains('is-froze')) {
                for (let i = 0; i < dataSize.length; i++) {
                    if (button.getAttribute('data-size') === dataSize[i]) {
                        button.classList.toggle('is-active')
                        button.classList.toggle('js-selected')
                        delete dataSize[i]
                    }
                }
            }
        })
    })

    selectButton.addEventListener('click', () => {


        sizeWindow.classList.toggle('is-active')
        sidebarSizeButtons.classList.add('is-active')

        if ((sizeNumbers > 0) && (!sidebarButton.classList.contains('is-inactive'))) {
            sidebarButton.classList.toggle('is-inactive')
        }

        function toggleSizes() {
            let buttonsSizeSelected = document.querySelectorAll('.js-selected')
            buttonsSizeSelected.forEach((selected) => {
                if (!selected.classList.contains('is-froze')) {
                    selected.classList.toggle('is-froze')
                }
            })

            for (let i = 0; i < sizeNumbers; i++) {
                for (let j = 0; j < sizeButtonsActive.length; j++) {
                    if (dataSize[i] === sizeButtonsActive[j].getAttribute('data-size') && sizeButtonsActive[j].classList.contains('is-inactive')) {
                        sizeButtonsActive[j].classList.toggle('is-inactive')
                    }
                }
            }
        }

        const cleanStack = async () => {
            await toggleSizes()
            dataSize = []
        }

        cleanStack().then(() => {
            console.log('completed')
        })

        sizeCloseButtons.forEach((close) => {
            close.addEventListener('click', () => {
                let buttonsSizeSelected = document.querySelectorAll('.js-selected')
                for (let j = 0; j < buttonsSizeSelected.length; j++) {
                    if (close.parentElement.getAttribute('data-size') === buttonsSizeSelected[j].getAttribute('data-size')) {
                        close.parentElement.classList.toggle('is-inactive')
                        buttonsSizeSelected[j].classList.remove( 'js-selected')
                        buttonsSizeSelected[j].classList.toggle('is-froze')
                        buttonsSizeSelected[j].classList.toggle( 'is-active')
                        console.log('cucu')
                    }
                }
            })
        })

        sizeButtonsActive.forEach((select) => {
            select.addEventListener('click', () => {
                if (document.querySelector('.is-selected') && !select.classList.contains('is-selected')) {

                    function tt() {
                        document.querySelector('.is-selected').classList.toggle('is-selected')
                        document.querySelector('.workspace-button-big').classList.toggle('is-active')
                    }
                    const cc = async () => {
                        await tt()
                        select.classList.toggle('is-selected')
                        document.querySelector('.workspace-button-big').classList.toggle('is-active')
                    }

                    cc().then(() => {
                        console.log('completed')
                    })
                    console.log('find')
                }
                else {
                    select.classList.toggle('is-selected')
                    document.querySelector('.workspace-button-big').classList.toggle('is-active')
                }
            })
        })

        bigButton.addEventListener('click', () => {
            downloadWindow.classList.toggle('is-active')
        })

        downloadClose.addEventListener('click', () => {
            downloadWindow.classList.toggle('is-active')
        })

        downloadHeaderButtons.forEach((select) => {
            select.addEventListener('click', () => {
                if (document.querySelector('.js-storage-selected') && !select.classList.contains('js-storage-selected')) {

                    function tt() {
                        document.querySelector('.js-storage-selected').classList.toggle('js-storage-selected')

                        console.log('1')
                    }
                    const cc = async () => {
                        await tt()
                        select.classList.toggle('js-storage-selected')
                        console.log('2')
                    }

                    cc().then(() => {
                        console.log('completed')
                    })
                }
                else {
                    select.classList.toggle('js-storage-selected')
                    console.log('3')
                }
                console.log(downloadHeaderButtons)
            })
        })

    })

})