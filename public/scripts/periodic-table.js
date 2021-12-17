
window.addEventListener('load', async function () {

    let els = document.getElementsByClassName("element")
    let data = await fetch('/chemistry/periodictable/data').then(r => r.json()).then(r => r)

    // #f73636 #f77d36 #f7ca36 #f1f736 #bdf736 #40f736 #36f7ba #36f7f1 #36b0f7 #a3a3a3

    let colors = {
        nonmetal: `#36f7f1`, alkali: `#f73636`, alkali_earth: `#f7ca36`, transition_metal: `#f77d36`, post_transition_metal: `#40f736`,
        metalloid: `#36f7ba`, noble_gas: `#36b0f7`, lanthanide: `#bdf736`, actinide: `#f1f736`, unknown: `#a3a3a3`
    }

    for (i = 0; i < els.length; i++) {

        els[i].setAttribute('data-popup-target', "#popup")
        
        // table properties
        let elementValues = data[data.order[i]]

        let div = document.createElement('div')
        let atomNum = document.createElement('div')
        let elemSymbol = document.createElement('div')
        let elemName = document.createElement('div')
        let atomMass = document.createElement('div')

        atomNum.textContent = i+1
        atomNum.className = `atomic-number`
        atomNum.style.cssText = `font-size: 12px; text-align:left; padding-left:3px`

        elemSymbol.textContent = elementValues.symbol
        elemSymbol.className = `element-symbol`
        elemSymbol.style.cssText = `font-size: 28px;`

        elemName.textContent = elementValues.name
        elemName.className = `element-name`
        elemName.style.cssText = `font-size: 11px;`

        atomMass.textContent = Number(elementValues.atomic_mass.toFixed(2))
        atomMass.className = `element-mass`
        atomMass.style.cssText = `font-size: 9px;`

        div.appendChild(atomNum)
        div.appendChild(elemSymbol)
        div.appendChild(elemName)
        div.appendChild(atomMass)


        div.className = `content`
        div.style.cssText = `width: inherit; height: inherit;`
        els[i].appendChild(div)

        // noble gas
        if (/^element element-(2|1[08]|36|54|86)$/g.test(els[i].className)) {
            els[i].style.cssText = `border: 1.5px solid ${colors.noble_gas} !important; box-shadow: 0 0 2px #9ecaed; color: ${colors.noble_gas};`
            els[i].classList.add('noble-gas')

        }
        // other non metals
        if (/^element element-([6-9]|1[5-7]?|3[45]|53)$/g.test(els[i].className)) {
            els[i].style.cssText = `border: 1.5px solid ${colors.nonmetal} !important; box-shadow: 0 0 2px #9ecaed; color: ${colors.nonmetal};`
            els[i].classList.add('non-metal')
        }
        // metaloids
        if (/^element element-(5|14|3[23]|5[12]|85)$/g.test(els[i].className)) {
            els[i].style.cssText = `border: 1.5px solid ${colors.metalloid} !important; box-shadow: 0 0 2px #9ecaed; color: ${colors.metalloid};`
            els[i].classList.add('metaloids')

        }
        // post transition metals
        if (/^element element-(13|31|49|50|8[1-4]|114)$/g.test(els[i].className)) {
            els[i].style.cssText = `border: 1.5px solid ${colors.post_transition_metal} !important; box-shadow: 0 0 2px #9ecaed; color: ${colors.post_transition_metal};`
            els[i].classList.add('post-transition-metal')

        }
        // transition metals
        if (/^element element-(2[1-9]|3[09]|4[0-8]|7[2-9]|80|10[4-8]|112)$/g.test(els[i].className)) {
            els[i].style.cssText = `border: 1.5px solid ${colors.transition_metal} !important; box-shadow: 0 0 2px #9ecaed; color: ${colors.transition_metal};`
            els[i].classList.add('transition-metal')

        }
        // alkaline earth metals
        if (/^element element-(4|12|20|38|56|88)$/g.test(els[i].className)) {
            els[i].style.cssText = `border: 1.5px solid ${colors.alkali_earth} !important; box-shadow: 0 0 2px #9ecaed; color: ${colors.alkali_earth};`
            els[i].classList.add('alkali-earth-metal')

        }
        // alkaline metals
        if (/^element element-(3|1[19]|37|55|87)$/g.test(els[i].className)) {
            els[i].style.cssText = `border: 1.5px solid ${colors.alkali} !important; box-shadow: 0 0 2px #9ecaed; color: ${colors.alkali};`
            els[i].classList.add('alkali-metal')

        }
        // unknown
        if (/^element element-(109|11[0135-8])$/g.test(els[i].className)) {
            els[i].style.cssText = `border: 1.5px solid ${colors.unknown} !important; box-shadow: 0 0 2px #9ecaed; color: ${colors.unknown};`
            els[i].classList.add('unknown')

        }
        // lanthanides
        if (/^element element-(5[7-9]|6[0-9]|7[01])$|^element lanthanoids$/g.test(els[i].className)) {
            els[i].style.cssText = `border: 1.5px solid ${colors.lanthanide} !important; box-shadow: 0 0 2px #9ecaed; color: ${colors.lanthanide};`
            els[i].classList.add('lanthanides')

        }
        // actinides
        if (/^element element-(89|9[0-9]|10[0-3])$|^element actinides$/g.test(els[i].className)) {
            els[i].style.cssText = `border: 1.5px solid ${colors.actinide} !important; box-shadow: 0 0 2px #9ecaed; color: ${colors.actinide};`
            els[i].classList.add('actinides')

        }

    }

    const openPopupButtons = document.querySelectorAll('[data-popup-target]')
    const closePopupButtons = document.querySelectorAll('[data-close-button]')
    const overlay = document.getElementById('overlay')

    openPopupButtons.forEach(e => {
        e.addEventListener('click', () => {
            const popup = document.querySelector(e.dataset.popupTarget)
            popup.style.color = e.style.color
            let elementNumber = e.childNodes[0].childNodes[0].textContent
            let elementValues = data[data.order[elementNumber-1]]
            document.getElementById('popup-title').textContent = elementValues.name

            document.getElementById('el-symbol').textContent = elementValues.symbol || `unknown`
            document.getElementById('el-mass').textContent = elementValues.atomic_mass || `unknown`
            document.getElementById('el-melt').textContent = elementValues.melt || `unknown`
            document.getElementById('el-category').textContent = elementValues.category.charAt(0).toUpperCase() + elementValues.category.slice(1) || `unknown`
            document.getElementById('el-config').textContent = elementValues.electron_configuration || `unknown`
            document.getElementById('el-discovered').textContent = elementValues.discovered_by || `unknown`

            if(!popup) return;
            popup.classList.add('active')
            overlay.classList.add('active')
        })
    })

    closePopupButtons.forEach(e => {
        e.addEventListener('click', () => {
            const popup = e.closest('.element-popup')
            if(!popup) return;
            popup.classList.remove('active')
            overlay.classList.remove('active')
        })
    })

    overlay.addEventListener('click', () => {
        document.querySelectorAll('.element-popup.active').forEach(popup => {
            if(!popup) return;
            popup.classList.remove('active')
            overlay.classList.remove('active')
        })
    })

    document.getElementById('selector-container').childNodes.forEach(e => {
        if(e.nodeName.toLowerCase() == `div`) {
            if(e.id == `nonmetal-select`) {
                e.style.color = colors.nonmetal
                // to do
                // e.addEventListener('click', () => {
                //     let elems = document.getElementsByClassName('non-metal')
                //     for(i=0;i<els.length;i++){
                //         els[i].style.cssText = `display:hidden;`
                //     }
                // })
            }
            if(e.id == `alkali-select`) {
                e.style.color = colors.alkali
            }
            if(e.id == `alkali-earth-select`) {
                e.style.color = colors.alkali_earth
            }
            if(e.id == `transition-metal-select`) {
                e.style.color = colors.transition_metal
            }
            if(e.id == `post-transition-metal-select`) {
                e.style.color = colors.post_transition_metal
            }
            if(e.id == `metalloid-select`) {
                e.style.color = colors.metalloid
            }
            if(e.id == `noble-select`) {
                e.style.color = colors.noble_gas
            }
            if(e.id == `lanthanide-select`) {
                e.style.color = colors.lanthanide
            }
            if(e.id == `actinide-select`) {
                e.style.color = colors.actinide
            }
            if(e.id == `unknown-select`) {
                e.style.color = colors.unknown
            }
        }
    })
})