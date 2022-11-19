let items = document.querySelector('#items')

/** Possible pb: tester le responsive du carousel => les images ne vont peut etre pas 
 * se readapter par rapport a la taille de l'ecran : test a faire
 */

    /**
     * @class Carousel prend 2 params:
     * 
     * @param {HTMLElement} parent qui contient les items 
     * 
     * @param {object} options object contenant plusieurs options de personnalisation du carousel
     * (2 options par defaut)
     * @param {object} options.slidesToScroll nb d'elem a scroller 
     * @param {object} options.slidesVisible nb d'elem visible
     */

class Carousel {


    constructor(parent, options = {}) {
        this.parent = parent
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options)

        /** capture des elements du carousel avant toute manipulation */
        let childrens = Array.from(parent.children)

        /** index de l'element visible le plus a gauche du carousel */
        this.currentItem = 0

        

        /** 
         * création du block fixe(root) 
         * et du block mobile du carousel(container) 
         * le container va deplacer les items par rapport a root
         * 
        */

        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('container')
        
        this.root.appendChild(this.container)
        this.parent.appendChild(this.root)
        

        /** 
         * on stock chq element du carousel dans une div .item
         * la div .item va permettre de formatter les elements du carousel uniformement
         * puis on place tous les items dans le container 
         */
        
        this.item = childrens.map(child => {
            
            let item = this.createDivWithClass('item')
            item.appendChild(child)
            this.container.appendChild(item)

            return item
        })

        this.setStyle()
        this.createNav()
        

    }

    /**
     * @method setStyle assigne le css pour les elements du carousel + dimension du carousel 
     * 
     */

    setStyle(){
        
        /** style pour les carousel et enfants */
        this.root.style.position = 'relative'
        this.root.style.overflow = 'hidden'

        this.container.style.display ='flex'
        this.container.style.justifyContent = 'start'
        this.container.style.transition = '1000ms'

        /** assigne la taille du carousel par rapport a l'option slideVisible */
        this.root.style.width= this.item[0].clientWidth * this.options.slidesVisible+'px'
        
    }

    /**
     * @method createNav création des boutons de navigation 
     */

    createNav(){
        let nextBtn = this.createDivWithClass('next btn')
        let prevBtn = this.createDivWithClass('prev btn')

        nextBtn.innerText = '>'
        prevBtn.innerText = '<'
        

        this.root.appendChild(nextBtn)
        this.root.appendChild(prevBtn)

        /** style des btn nav */
        
        

        nextBtn.addEventListener('click', this.next.bind(this) )
        prevBtn.addEventListener('click', this.prev.bind(this))
    }

    next(){
        this.goToItem(this.currentItem + this.options.slidesToScroll)
    }

    prev(){
        this.goToItem(this.currentItem - this.options.slidesToScroll)
    }

    /**
     * @method goToItem deplace le carousel vers l'element cible
     * @param {number} index de l'element cible  
     */

    goToItem(index){
        
        let translateX = -1*(this.item[0].clientWidth*(this.currentItem + this.options.slidesToScroll))+ 'px'
        console.log(translateX , index)
        this.container.style.transform = 'translate3d('+ translateX +', 0, 0)'
        this.currentItem = index
    }



    /**
     * @method createDivWithClass crée une div dans le document avec une class
     * @param {string} className nom de la class pour la div crée 
     * @returns {HTMLElement}retourne la div crée 
     *  
     */

    createDivWithClass(className){

        let div = document.createElement('div')
        div.setAttribute('class', className)

        return div 
    }
}

document.addEventListener('DOMContentLoaded', function(){
/* 
Event listener pour attendre le chargement du DOM avant le lancement du carousel
car script asynchrone
*/


new Carousel(items, {

    slidesToScroll: 1,
    slidesVisible: 2

})

})

