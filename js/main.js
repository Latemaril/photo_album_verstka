import {SizeWindow1} from './size-window.js'

document.addEventListener('DOMContentLoaded', function () {


    const sizeWindow = document.getElementById('size-window') //Окно выбора типа коллекций
    const sizeWindowCloseButton = document.querySelectorAll('.js-size-toggle') // Кнопка закрытия окна с выбором коллекций

    // const sizeWindowButtonsSizeSelected = document.querySelector('.js-size-btns').childNodes // Кнопки с типами коллекций
    const sizeWindowButtonSelect = document.querySelector('.js-size-btn-select') //
    const underHeaderButton = document.querySelector('.js-under-header-btn') //
    const underHeaderSizeButtons = document.querySelector('.js-under-header-size-btns') //
    const underHeaderSizeButtonsActive = document.querySelectorAll('.js-size') //
    const underHeaderSizeCloseButtons = document.querySelectorAll('.js-size-close') //
    const downloadClose = document.querySelector('.js-download-close') //
    const workspaceBigButton = document.querySelector('.workspace-button-big') //
    const downloadWindow = document.getElementById('download-window') //
    const downloadHeaderButtons = document.querySelectorAll('.js-storage') //
    const downloadWorkspaceButton = document.querySelector('.js-download-workspace-button') //
    const downloadWorkspacePhotos = document.querySelectorAll('.js-download-workspace-photo') //
    const downloadButtonAdd = document.querySelector('.js-download-add') //
    const workspacePhotosBlocks = document.querySelectorAll('.js-workspace-block') //
    const sizeWindowButtonsSizeSelected = document.querySelector('.js-size-btns').childNodes
    const mainPhotoContainer = '                    <div class="photos-container vertical">\n' +  // Контейнер для фоток
        '                        <div class="photo">\n' +
        '                            <div class="photo-footer"></div>\n' +
        '                        </div>\n' +
        '                    </div>' //
    let dataSizeBlocks = [] //
    let dataPhotos = [] //
    let count = 0 // Счётчик выбранных фото

    // Заполнение массива блоками под фотографии (можно найти по классу workspace-photos)
    for (let i = 0; i < workspacePhotosBlocks.length; i++) {
        dataSizeBlocks.push(workspacePhotosBlocks[i].getAttribute('data-size'))
    }

    // Кнопка закрытия окна выбора размеров
    sizeWindowCloseButton.forEach((button) => {
        button.addEventListener('click', () => {
            sizeWindow.classList.toggle('is-active')
        })
    })

    // Выбор размеров в окне выбора
    sizeWindowButtonsSizeSelected.forEach((button) => {
        button.addEventListener('click', () => {
            SizeWindow1.sizeCollections(button)
        })
    })


    // Кнопка "ВЫБРАТЬ" в оке выбора размеров
    sizeWindowButtonSelect.addEventListener('click', () => {
        SizeWindow1.sizeSelect(sizeWindow, underHeaderSizeButtons, underHeaderButton, underHeaderSizeButtonsActive)
        document.querySelector('.workspace-button-mobile').classList.add('is-inactive')
    })

// Кнопки закрытия кнопок-вкладок внутри кнопок-вкладок (смех)
    underHeaderSizeCloseButtons.forEach((close) => {
        close.addEventListener('click', () => {
            let buttonsSizeSelected = document.querySelectorAll('.js-selected')
            let closeParent = close.parentElement

            // Проверяем есть хоть один активный блок с фотографиями в рабочей области
            if (!document.querySelector('.js-workspace-block.js-active')) {
                // Если нет, то кнопка-вкладка просто закрываается, а соответствующая ей кнопка в оке выбора размеров размораживается
                for (let j = 0; j < buttonsSizeSelected.length; j++) {
                    if (closeParent.getAttribute('data-size') === buttonsSizeSelected[j].getAttribute('data-size')) {
                        closeParent.classList.toggle('is-inactive')
                        if (closeParent.firstElementChild.classList.contains('is-selected')) {
                            closeParent.firstElementChild.classList.toggle('is-selected')
                            workspaceBigButton.classList.toggle('is-active')
                        }
                        buttonsSizeSelected[j].classList.remove( 'js-selected')
                        buttonsSizeSelected[j].classList.toggle('is-froze')
                        buttonsSizeSelected[j].classList.toggle( 'is-active')
                    }
                }
            }
            // Если да, то сперва мы проделываем тот же фокус, что и в первом случаем
            else {
                for (let j = 0; j < buttonsSizeSelected.length; j++) {
                    if (closeParent.getAttribute('data-size') === buttonsSizeSelected[j].getAttribute('data-size')) {
                        closeParent.classList.toggle('is-inactive')
                        if (closeParent.firstElementChild.classList.contains('is-selected')) {
                            closeParent.firstElementChild.classList.toggle('is-selected')
                        }
                        buttonsSizeSelected[j].classList.remove( 'js-selected')
                        buttonsSizeSelected[j].classList.toggle('is-froze')
                        buttonsSizeSelected[j].classList.toggle( 'is-active')

                        // Выключаем блок с фотографиями в рабочей области соответствующий своей кнопке-вкладке (тоесть опять идёт проверка на соответствие data-size)
                        for (let i = 0; i < dataSizeBlocks.length; i++) {
                            if ((closeParent.getAttribute('data-size') === workspacePhotosBlocks[i].getAttribute('data-size')) && close.parentElement.classList.contains('js-filled')) { // На соответствие, а также на то что блок действительно активный и заполненный (за это отвечает класс js-filled)
                                closeParent.classList.remove('js-filled')
                                workspacePhotosBlocks[i].classList.remove('is-active')
                                workspacePhotosBlocks[i].classList.remove('js-active')
                            }
                        }
                    }
                }
            }

            if(workspaceBigButton.classList.contains('is-active') && closeParent.firstElementChild.classList.contains('is-selected')) {
                workspaceBigButton.classList.toggle('is-active')
                console.log('big button close')
            }
        })
    })

    // Включенные на данный момент кнопки-вкладки
    document.querySelectorAll('.js-size span').forEach((select) => {
        select.addEventListener('click', () => {
            // Проверяем включен ли хоть один блок с фотографиями
            if (!document.querySelector('.js-workspace-block.js-active')) { // Если нет, то
                if (document.querySelector('.js-size span.is-selected') && !select.classList.contains('is-selected')) { // В случае если найдётся выбранная на данный момент вкладка и она не является той на которую мы только что нажали

                    function tt() {
                        document.querySelector('.is-selected').classList.toggle('is-selected')  // Текующая выбранная кнопка-вкладка перестаёт быть таковой
                    }
                    const cc = async () => {
                        await tt()
                        select.classList.toggle('is-selected') // Кнопка на которую мы нажали становится выбранной
                    }

                    cc().then(() => {
                    })
                }

                // В остальных случаях (которые соответствуют самому первому выбору кнопки-вкладки) мы просто делаем кнопку-вкладку выбраннной и включаем большую кнопку
                else {
                    select.classList.toggle('is-selected')
                    document.querySelector('.workspace-button-big').classList.toggle('is-active')
                }
            }

            else if (document.querySelector('.js-workspace-block.js-active')) { // Если да, то проводим те же операции но с учётом того что некоторые вкладки имеют активные блоки с фото
                if (!select.parentElement.classList.contains('js-filled') && !document.querySelector('.js-workspace-block.is-active')) { // Если кликнутая вкладка не имеет активного блока с фото
                    if (document.querySelector('.is-selected')){
                        document.querySelector('.is-selected').classList.toggle('is-selected')
                    }
                    select.classList.toggle('is-selected')
                    if (!workspaceBigButton.classList.contains('is-active')) {
                        workspaceBigButton.classList.toggle('is-active')
                    }
                    console.log('beta select hasnt')
                }

                else if (!select.parentElement.classList.contains('js-filled') && document.querySelector('.js-workspace-block.is-active')) {
                    document.querySelector('.is-selected').classList.toggle('is-selected')
                    select.classList.toggle('is-selected')
                    document.querySelector('.js-workspace-block.is-active').classList.toggle('is-active')
                    workspaceBigButton.classList.toggle('is-active')
                    console.log('beta select hasnt 2')
                }

                else if ((select.parentElement.classList.contains('js-filled')) && (!select.classList.contains('is-selected') && (!document.querySelector('.js-size.js-filled span.is-selected')))) { // Если кликнутая вкладка имеет активный блок с фото, но при этом не является выбранной и нет других выбранных вкладок с активным блоком
                    document.querySelector('.js-size span.is-selected').classList.toggle('is-selected')
                    select.classList.toggle('is-selected')
                    for (let i = 0; i < dataSizeBlocks.length; i++) {
                        if (select.parentElement.getAttribute('data-size') === workspacePhotosBlocks[i].getAttribute('data-size')) {
                            workspacePhotosBlocks[i].classList.toggle('is-active')
                        }
                    }
                    workspaceBigButton.classList.toggle('is-active')
                    console.log('beta select has 1')
                }

                else if ((select.parentElement.classList.contains('js-filled')) && (!select.classList.contains('is-selected') && ((document.querySelector('.js-size.js-filled span.is-selected'))))) { // Если кликнутая вкладка имеет активный блок с фото, но при этом не является выбранной и есть другая выбранняа вкладка с активным блоком
                    document.querySelector('.js-size span.is-selected').classList.toggle('is-selected')
                    document.querySelector('.js-workspace-block.is-active').classList.toggle('is-active')
                    select.classList.toggle('is-selected')
                    for (let i = 0; i < dataSizeBlocks.length; i++) {
                        if (select.parentElement.getAttribute('data-size') === workspacePhotosBlocks[i].getAttribute('data-size')) {
                            workspacePhotosBlocks[i].classList.toggle('is-active')
                        }
                    }
                    console.log('beta select has 2')
                }
            }
        })
    })

    // Большая кнопка в рабочей области для вызова окна загрузки фото
    workspaceBigButton.addEventListener('click', () => {
        downloadWindow.classList.toggle('is-active')
    })

    // Кнопка закрытия окна загрузки фото
    downloadClose.addEventListener('click', () => {
        downloadWindow.classList.toggle('is-active')
    })

    // Кнопки выбора источников фотографий (мобила, гугл, яндекс)
    downloadHeaderButtons.forEach((select) => {
        select.addEventListener('click', () => {
            function tt() {
                document.querySelector('.js-storage-selected').classList.toggle('is-active') // Тк по умолчанию первой при открытии окна уже присутствует выбранное хранилище, то при выборе другого мы сперва выключаем текущее
                document.querySelector('.js-storage-selected').classList.toggle('js-storage-selected') // Это просто указатель на выбранное хранилище
            }
            const cc = async () => {
                await tt()
                select.classList.toggle('js-storage-selected')
                select.classList.toggle('is-active')
            }

            cc().then(() => {
            })
        })
    })

    // Кнопка "+ загрузить фотографии" в окне закгрузки (реализайия пока что такова что при нажатии она просто выключается и включается блок с фотками которые я вставил)
    downloadWorkspaceButton.addEventListener('click', () => {
        downloadWorkspaceButton.classList.toggle('is-active')
        document.querySelector('.download-workspace-photos').classList.toggle('is-active')
    })

    downloadWorkspacePhotos.forEach((photo) => {
        photo.addEventListener('click', () => {

            if (!photo.classList.contains('js-selected')) // Если кликнули на не выбранное фото
            {
                photo.classList.toggle('is-selected')
                photo.classList.toggle('js-selected')
                count += 1
            }
            else { // Если кликнули на выбранное фото
                photo.classList.toggle('is-selected')
                photo.classList.toggle('js-selected')
                count -= 1
            }

            if (count === 1) { // Делаем активной кнопку "Добавить фото" если выбрана хотябы одна фотография
                document.querySelector('.js-download-add').classList.add('is-active')
            }
            else if (count === 0) { // Если ни одна не выбрана то деактивируем
                document.querySelector('.js-download-add').classList.remove('is-active')
            }

        })
    })

//______________________________________________________________________________________________________________________


    // Кнопка "Добавить фото" в окне загрузки фотографий
    downloadButtonAdd.addEventListener('click', () => {
        let photos = document.querySelectorAll('.js-photo') // Получаем все контейнеры для фото в окне загрузки


        function first() {
            // Проверяем выбрано ли фото
            for (let i = 0; i < photos.length; i++) {
                if (photos[i].parentElement.classList.contains('js-selected')) { // Если да то заносим в массив
                    dataPhotos.push(photos[i])
                }
            }

            // Проверка на соответсвие выбранной кнопки-вкладки и её блока с фото
            for (let i = 0; i < dataSizeBlocks.length; i++) {
                if (document.querySelector('.js-size span.is-selected').parentElement.getAttribute('data-size') === workspacePhotosBlocks[i].getAttribute('data-size')) { // Если соответствует то
                    workspacePhotosBlocks[i].classList.toggle('is-active') // Включаем блок
                    workspacePhotosBlocks[i].classList.add('js-active') // Указатель того что блок активен
                    workspaceBigButton.classList.toggle('is-active') // Выключаем большую кнопку в рабочем пространстве
                    downloadWindow.classList.toggle('is-active') // Выключаем окно загрузки
                    document.querySelector('.js-size span.is-selected').parentElement.classList.toggle('js-filled') // Присваиваем выбранной-кнопке вкладке указатель заполненности

                    // Цикл для добавления фотографий в блок
                    for (let j = 0; j < dataPhotos.length; j++) {

                        function tt() {
                            workspacePhotosBlocks[i].insertAdjacentHTML('afterbegin', mainPhotoContainer) // Добавляем контейнеры для фото
                        }
                        const cc = async () => {
                            await tt()

                            if (document.querySelector('.js-size span.is-selected').parentElement.getAttribute('data-size') === workspacePhotosBlocks[i].getAttribute('data-size')) {
                                workspacePhotosBlocks[i].getElementsByClassName('photo')[j].insertAdjacentHTML('afterbegin', String(dataPhotos[j].outerHTML)) // Заполняем контейнеры фотографиями
                            }
                        }

                        cc().then(() => {
                        })

                    }
                }
            }
        }
        const second = async () => {
            await first()
            dataPhotos = [] // Очищаем массив с фотографиями для реюза
            for (let i = 0; i < photos.length; i++) {
                // Выключаем класс и указатель для выбранных фото в оке загрузки (убираем обводку для того чтобы их снова можно было выбрать уже в другую коллекцию например)
                photos[i].parentElement.classList.remove('js-selected')
                photos[i].parentElement.classList.remove('is-selected')
            }
        }

        second().then(() => {
        })

    })
})