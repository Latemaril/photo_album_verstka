document.addEventListener('DOMContentLoaded', function () {

    const sizeWindow = document.getElementById('size-window')
    const sizeWindowCloseButton = document.querySelectorAll('.js-size-toggle')
    const sizeWindowButtonsSizeSelected = document.querySelector('.js-size-btns').childNodes
    const sizeWindowButtonSelect = document.querySelector('.js-size-btn-select')
    const underHeaderButton = document.querySelector('.js-under-header-btn')
    const underHeaderSizeButtons = document.querySelector('.js-under-header-size-btns')
    const underHeaderSizeButtonsActive = document.querySelectorAll('.js-size')
    const underHeaderSizeCloseButtons = document.querySelectorAll('.js-size-close')
    const downloadClose = document.querySelector('.js-download-close')
    const workspaceBigButton = document.querySelector('.workspace-button-big')
    const downloadWindow = document.getElementById('download-window')
    const downloadHeaderButtons = document.querySelectorAll('.js-storage')
    const downloadWorkspaceButton = document.querySelector('.js-download-workspace-button')
    const downloadWorkspacePhotos = document.querySelectorAll('.js-download-workspace-photo')
    const downloadButtonAdd = document.querySelector('.js-download-add')
    const workspacePhotosBlocks = document.querySelectorAll('.js-workspace-block')
    const mainPhotoContainer = '                    <div class="photos-container vertical">\n' +
        '                        <div class="photo">\n' +
        '                            <div class="photo-footer"></div>\n' +
        '                        </div>\n' +
        '                    </div>'
    let sizeNumbers = 0
    let dataSizeButtons = []
    let dataSizeBlocks = []
    let dataPhotos = []

    for (let i = 0; i < workspacePhotosBlocks.length; i++) {
        dataSizeBlocks.push(workspacePhotosBlocks[i].getAttribute('data-size'))
    }

    sizeWindowCloseButton.forEach((button) => {
        button.addEventListener('click', () => {
            sizeWindow.classList.toggle('is-active')
        })
    })


    sizeWindowButtonsSizeSelected.forEach((button) => {
        button.addEventListener('click', () => {

        })
    })

    sizeWindowButtonsSizeSelected.forEach((button) => {
        button.addEventListener('click', () => {
            if (!button.classList.contains('is-active')) {
                sizeNumbers += 1

                button.classList.toggle('is-active')
                button.classList.toggle('js-selected')

                dataSizeButtons.push(button.getAttribute('data-size'))
            }
            else if (!button.classList.contains('is-froze')) {
                for (let i = 0; i < dataSizeButtons.length; i++) {
                    if (button.getAttribute('data-size') === dataSizeButtons[i]) {
                        button.classList.toggle('is-active')
                        button.classList.toggle('js-selected')
                        delete dataSizeButtons[i]
                    }
                }
            }
        })
    })

    sizeWindowButtonSelect.addEventListener('click', () => {


        sizeWindow.classList.toggle('is-active')
        underHeaderSizeButtons.classList.add('is-active')

        if ((sizeNumbers > 0) && (!underHeaderButton.classList.contains('is-inactive'))) {
            underHeaderButton.classList.toggle('is-inactive')
        }

        function toggleSizes() {
            let buttonsSizeSelected = document.querySelectorAll('.js-selected')
            buttonsSizeSelected.forEach((selected) => {
                if (!selected.classList.contains('is-froze')) {
                    selected.classList.toggle('is-froze')
                }
            })

            for (let i = 0; i < sizeNumbers; i++) {
                for (let j = 0; j < underHeaderSizeButtonsActive.length; j++) {
                    if (dataSizeButtons[i] === underHeaderSizeButtonsActive[j].getAttribute('data-size') && underHeaderSizeButtonsActive[j].classList.contains('is-inactive')) {
                        underHeaderSizeButtonsActive[j].classList.toggle('is-inactive')
                    }
                }
            }
            document.querySelector('.js-workspace-button-select-all').classList.toggle('is-visible')
            document.querySelector('.js-add-photo-mini').classList.toggle('is-active')
        }

        const cleanStack = async () => {
            await toggleSizes()
            dataSizeButtons = []
        }

        cleanStack().then(() => {
        })

    })

    underHeaderSizeCloseButtons.forEach((close) => {
        close.addEventListener('click', () => {
            let buttonsSizeSelected = document.querySelectorAll('.js-selected')
            if (!document.querySelector('.js-workspace-block.js-active')) {
                for (let j = 0; j < buttonsSizeSelected.length; j++) {
                    if (close.parentElement.getAttribute('data-size') === buttonsSizeSelected[j].getAttribute('data-size')) {
                        close.parentElement.classList.toggle('is-inactive')
                        buttonsSizeSelected[j].classList.remove( 'js-selected')
                        buttonsSizeSelected[j].classList.toggle('is-froze')
                        buttonsSizeSelected[j].classList.toggle( 'is-active')
                    }
                }
            }
            else {
                for (let j = 0; j < buttonsSizeSelected.length; j++) {
                    if (close.parentElement.getAttribute('data-size') === buttonsSizeSelected[j].getAttribute('data-size')) {
                        close.parentElement.classList.toggle('is-inactive')
                        buttonsSizeSelected[j].classList.remove( 'js-selected')
                        buttonsSizeSelected[j].classList.toggle('is-froze')
                        buttonsSizeSelected[j].classList.toggle( 'is-active')
                        console.log('MAMA')
                        for (let i = 0; i < dataSizeBlocks.length; i++) {
                            if ((close.parentElement.getAttribute('data-size') === workspacePhotosBlocks[i].getAttribute('data-size')) && close.parentElement.classList.contains('js-filled')) {
                                close.parentElement.classList.remove('js-filled')
                                workspacePhotosBlocks[i].classList.remove('is-active')
                                workspacePhotosBlocks[i].classList.remove('js-active')
                            }
                        }
                    }
                }
            }
        })
    })

    underHeaderSizeButtonsActive.forEach((select) => {
        select.addEventListener('click', () => {
            if (!document.querySelector('.js-workspace-block.js-active')) {
                if (document.querySelector('.js-size.is-selected') && !select.classList.contains('is-selected')) {

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
                    console.log('ban')
                    select.classList.toggle('is-selected')
                    document.querySelector('.workspace-button-big').classList.toggle('is-active')
                }
            }
        })
    })

    workspaceBigButton.addEventListener('click', () => {
        downloadWindow.classList.toggle('is-active')
    })

    downloadClose.addEventListener('click', () => {
        downloadWindow.classList.toggle('is-active')
    })

    downloadHeaderButtons.forEach((select) => {
        select.addEventListener('click', () => {
            if (document.querySelector('.js-storage-selected')) {

                function tt() {
                    document.querySelector('.js-storage-selected').classList.toggle('is-active')
                    document.querySelector('.js-storage-selected').classList.toggle('js-storage-selected')
                }
                const cc = async () => {
                    await tt()
                    select.classList.toggle('js-storage-selected')
                    select.classList.toggle('is-active')
                }

                cc().then(() => {
                })
            }
            // else {
            //     select.classList.toggle('js-storage-selected')
            //     select.classList.toggle('is-active')
            //     console.log('3')
            // }
            // console.log(downloadHeaderButtons)
        })
    })


    // ROW REALISATION!!!!!!!!!!
    downloadWorkspaceButton.addEventListener('click', () => {
        downloadWorkspaceButton.classList.toggle('is-active')
        document.querySelector('.download-workspace-photos').classList.toggle('is-active')
        // document.querySelector('.js-download-add').classList.toggle('is-active')
    })

    let photosMass = []
    let count = 0
    downloadWorkspacePhotos.forEach((photo) => {
        photo.addEventListener('click', () => {
            if (!photo.classList.contains('js-selected'))
            {
                photo.classList.toggle('is-selected')
                photo.classList.toggle('js-selected')
                count += 1
            }
            else {
                photo.classList.toggle('is-selected')
                photo.classList.toggle('js-selected')
                count -= 1
            }

            if (count === 1) {
                document.querySelector('.js-download-add').classList.add('is-active')
            }
            else if (count === 0) {
                document.querySelector('.js-download-add').classList.remove('is-active')
            }

        })
    })

    downloadButtonAdd.addEventListener('click', () => {
        console.log('click')
        let photos = document.querySelectorAll('.js-photo')


        function first() {
            for (let i = 0; i < photos.length; i++) {
                if (photos[i].parentElement.classList.contains('js-selected')) {
                    dataPhotos.push(photos[i])
                }
            }
            console.log(dataPhotos)

            for (let i = 0; i < dataSizeBlocks.length; i++) {
                if (document.querySelector('.js-size.is-selected').getAttribute('data-size') === workspacePhotosBlocks[i].getAttribute('data-size')) {
                    workspacePhotosBlocks[i].classList.toggle('is-active')
                    workspacePhotosBlocks[i].classList.add('js-active')
                    workspaceBigButton.classList.toggle('is-active')
                    downloadWindow.classList.toggle('is-active')
                    document.querySelector('.js-size.is-selected').classList.toggle('js-filled')

                    for (let j = 0; j < dataPhotos.length; j++) {

                        function tt() {
                            workspacePhotosBlocks[i].insertAdjacentHTML('afterbegin', mainPhotoContainer)
                        }
                        const cc = async () => {
                            await tt()

                            for (let g = 0; g < dataSizeBlocks.length; g++) {
                                console.log('Zaebal tvar')
                                if (document.querySelector('.js-size.is-selected').getAttribute('data-size') === workspacePhotosBlocks[i].getAttribute('data-size')) {
                                    workspacePhotosBlocks[i].getElementsByClassName('photo')[g].insertAdjacentHTML('afterbegin', String(dataPhotos[g].outerHTML))
                                    console.log( workspacePhotosBlocks[i].getElementsByClassName('js-photo')[g])
                                }

                            }
                            console.log("vot photo")
                        }

                        cc().then(() => {
                        })

                    }
                }
            }
        }
        const second = async () => {
            await first()
            dataPhotos = []
            for (let i = 0; i < photos.length; i++) {
                photos[i].parentElement.classList.remove('js-selected')
                photos[i].parentElement.classList.remove('is-selected')
            }
        }

        second().then(() => {
        })

    })

    underHeaderSizeButtonsActive.forEach((select) => {
        select.addEventListener('click', () => {
            if (document.querySelector('.js-workspace-block.js-active')) {
                console.log('PARAM')
                if (!select.classList.contains('js-filled')) {
                    document.querySelector('.is-selected').classList.toggle('is-selected')
                    select.classList.toggle('is-selected')
                    document.querySelector('.js-workspace-block.is-active').classList.toggle('is-active')
                    workspaceBigButton.classList.toggle('is-active')
                    console.log('Ledy')
                }
                else if ((select.classList.contains('js-filled')) && (!select.classList.contains('is-selected') && (!document.querySelector('.js-size.is-selected.js-filled')))) {
                    document.querySelector('.js-size.is-selected').classList.toggle('is-selected')
                    select.classList.toggle('is-selected')
                    console.log('Zaebal mraz', dataSizeBlocks.length)
                    for (let i = 0; i < dataSizeBlocks.length; i++) {
                        console.log('Zaebal tvar')
                        if (select.getAttribute('data-size') === workspacePhotosBlocks[i].getAttribute('data-size')) {
                            workspacePhotosBlocks[i].classList.toggle('is-active')
                            console.log('Zaebal gnida')
                        }
                    }
                    workspaceBigButton.classList.toggle('is-active')
                    console.log('Ledy GAGA')
                }

                else if ((select.classList.contains('js-filled')) && (!select.classList.contains('is-selected') && (document.querySelector('.js-size.is-selected.js-filled')))) {
                    document.querySelector('.js-size.is-selected').classList.toggle('is-selected')
                    document.querySelector('.js-workspace-block.is-active').classList.toggle('is-active')
                    select.classList.toggle('is-selected')
                    console.log('Zaebal mraz', dataSizeBlocks.length)
                    for (let i = 0; i < dataSizeBlocks.length; i++) {
                        console.log('Zaebal tvar')
                        if (select.getAttribute('data-size') === workspacePhotosBlocks[i].getAttribute('data-size')) {
                            workspacePhotosBlocks[i].classList.toggle('is-active')
                            console.log('Zaebal gnida')
                        }
                    }
                    console.log('Ledy GAGA')
                }
            }
        })
    })

})