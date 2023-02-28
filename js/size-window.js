export class SizeWindow1 {
    static dataSizeButtons = [] //
    static sizeNumbers = 0

    static sizeCollections(button) {
        if (!button.classList.contains('is-active')) {
            this.sizeNumbers += 1  // счётчик выбранных размеров

            button.classList.add("is-active","js-selected")
            console.log('JS class is working')
            console.log(button.getAttribute('data-size'))
            this.dataSizeButtons.push(button.getAttribute('data-size'))  // Заношу в массив атрибут указатель выбранной кнопки
        }
        else if (!button.classList.contains('is-froze')) {  // Проверяю заморожена ли кнопка
            for (let i = 0; i < this.dataSizeButtons.length; i++) { // Цикл призванный удалить из массива указатель кнопки из массива в случае если пользователь передумал и разоктивировал её
                if (button.getAttribute('data-size') === (this.dataSizeButtons)[i]) {
                    button.classList.toggle('is-active')
                    button.classList.toggle('js-selected')
                    delete (this.dataSizeButtons)[i]
                }
            }
        }
    }

    static sizeSelect(sizeWindow, underHeaderSizeButtons, underHeaderButton, underHeaderSizeButtonsActive) {
        let self = this

        sizeWindow.classList.toggle('is-active')  // Закрываем окно
        underHeaderSizeButtons.classList.add('is-active') // Включаем блок-контейнер кнопок-вкладок размеров

        if ((this.sizeNumbers > 0) && (!underHeaderButton.classList.contains('is-inactive'))) {
            underHeaderButton.classList.toggle('is-inactive')   // Если число выбранных размеров больше 0, то включаем в контейнере кнопку "+ выбрать размер фото"
        }

        function toggleSizes() {

            let buttonsSizeSelected = document.querySelectorAll('.js-selected:not(.is-froze)') // Получаем все выбранные размеры(кнопки) в окне выбора размеров
            buttonsSizeSelected.forEach((selected) => { // Замораживаем их
                !selected.classList.contains('is-froze') ?
                    selected.classList.toggle('is-froze'):
                    console.log(selected)
            })

            // Цикл проверки на соответствие указателей data-size с целью включения кнопок-вкладок только с выбранными размерами
            for (let i = 0; i < self.sizeNumbers; i++) {
                document.querySelector(`[data-size ="${self.dataSizeButtons[i]}"]`).classList.toggle('is-inactive')
            }

            document.querySelector('.photo') ? (
                document.querySelector('.js-header-button-order').classList.toggle('is-inactive')
            ) : (
                console.log('null')
            )
        }

        const cleanStack = async () => {
            await toggleSizes()
            this.dataSizeButtons = [] // Очищаем массив с атрибутами выбранных кнопок для последующего реюза
            this.sizeNumbers = 0
        }

        cleanStack().then(() => {
        })

    }
}