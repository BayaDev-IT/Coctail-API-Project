const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/'
const GET_ALL_COCTAILS = baseURL + 'filter.php?c=Cocktail'
const GET_BY_NAME = baseURL + 'search.php?s='
const GET_BY_FILTER = baseURL + 'filter.php?a='
const GET_DETAIL = baseURL + 'lookup.php?i='
const GET_INGREDIENTS_BY_NAME = baseURL + 'search.php?i='
const GET_RANDOM_COCTAIL = baseURL + 'random.php'

const form = document.querySelector('form')
const input = document.querySelector('#inp')
const select = document.querySelector('#select')
const output = document.querySelector('.output')
const btn = document.querySelector('.btn')
const btn_back = document.querySelector('.btn_back')


const getAllCoctails = async () => {
    const req = await fetch(GET_ALL_COCTAILS)
    const res = await req.json()
    renderCoctails(res.drinks);
}

const getCoctailsByName = async () => {
    const req = await fetch(GET_BY_NAME + input.value)
    const res = await req.json()
    renderCoctails(res.drinks)
}

const getFiltered = async () => {
    let req
    if (select.value == 'All') {
        req = await fetch(GET_ALL_COCTAILS)

    } else {
        req = await fetch(GET_BY_FILTER + select.value)
    }

    const res = await req.json()
    renderCoctails(res.drinks)
}

const getDetailCoctail = async (id) => {
    const req = await fetch(GET_DETAIL + id)
    const res = await req.json()
    renderDetails(res.drinks[0])
}

const getRandomCoctail = async () => {
    const req = await fetch(GET_RANDOM_COCTAIL)
    const res = await req.json()
    renderRandomCoctail(res.drinks[0])
}
btn.addEventListener('click', () => getRandomCoctail())

const renderRandomCoctail = (data) => {
    output.innerHTML = ''
    const card = document.createElement('div')
    const title = document.createElement('h1')
    title.textContent = data.strDrink
    const categoryDrink = document.createElement('p')
    categoryDrink.textContent = data.strCategory
    const isAlhocol = document.createElement('p')
    isAlhocol.textContent = data.strAlcoholic
    const glassType = document.createElement('p')
    glassType.textContent = data.strGlass
    const instructions = document.createElement('p')
    instructions.textContent = data.strInstructions
    const image = document.createElement('img')
    image.src = data.strDrinkThumb
    image.alt = 'Drink'
    const ol = document.createElement('ol')
    for(let key in data) {
        if(key.includes('strIngredient') && data[key] !== null) {
            const li = document.createElement('li')
            li.classList.add('list')
            li.textContent = data[key]
            ol.append(li)
        }
    }

    btn_back.addEventListener('click', () => {
        getAllCoctails()
    })
    


    card.append(title, categoryDrink, isAlhocol, glassType, instructions, image, ol)
    output.append(card)
}


const getIngredientsByName = async (name) => {
    const req = await fetch(GET_INGREDIENTS_BY_NAME + name)
    const res = await req.json()
    res.ingredients !== null && renderIngredients(res.ingredients[0])
}



const renderIngredients = (data) => {
    output.innerHTML = ''
    const card = document.createElement('div')
    card.classList.add('ingrCard')
    const ingImg = document.createElement('img')
    ingImg.classList.add('ingrImg')
    const title = document.createElement('h1')
    title.classList.add('ingrTitle')
    const description = document.createElement('p')
    description.classList.add('ingrDescription')
    ingImg.src =`https://www.thecocktaildb.com/images/ingredients/${data.strIngredient}-Small.png`
    title.textContent = data.strIngredient
    description.textContent = `Description: ${data.strDescription ? data.strDescription : 'Without description'}`

//     card.innerHTML = `
//     <div class="artboard">
//     <div class="card">
   
//      <div class="card__side card__side--back">
//       <div class="card__cover">
//        <h4 class="card__heading">
//         <span class="card__heading-span">Skill Set</span>
//        </h4>
//       </div>
//       <div class="card__details">
//        <ul>
//         <li>Advanced JS and CSS</li>
//         <li>JS/CSS Preprocessors</li>
//         <li>JS Frameworks</li>
//         <li>Advanced Animations</li>
//         <li>Deployment Pipelines</li>
//         <li>Large Apps Architectures</li>
//         <li>Naming Conventions</li>
//        </ul>
//       </div>
//      </div>
   
//      <div class="card__side card__side--front">
//       <div class="card__theme">
//        <div class="card__theme-box">
//         <p class="card__subject">Web Developer</p>
//         <p class="card__title">Hello World!</p>
//        </div>
//       </div>
//      </div>
   
//     </div>
//    </div>
//     `



    btn_back.addEventListener('click', () => {
        getAllCoctails()
    })
    
    card.append(ingImg, title, description)
    output.append(card)
}

const renderDetails = (coctail) => {
    output.innerHTML = ''
    // console.log(coctail);
    const card = document.createElement('div')
    card.classList.add('cardDetail')
    const block = document.createElement('div')
    block.classList.add('blockDetail')
    const img = document.createElement('img')
    img.classList.add('imgDetail')
    const title = document.createElement('h2')
    title.classList.add('titleDetail')
    title.textContent = coctail.strDrink
    img.src = coctail.strDrinkThumb
    const typeDrink = document.createElement('p')
    typeDrink.classList.add('typeDrinkDetail')
    typeDrink.textContent = coctail.strAlcoholic
    const categoryDrink = document.createElement('p')
    categoryDrink.classList.add('typeDrinkDetail')
    categoryDrink.textContent = coctail.strCategory
    const glassType = document.createElement('p')
    glassType.classList.add('typeDrinkDetail')
    glassType.textContent = coctail.strGlass
    const instruction = document.createElement('p')
    instruction.classList.add('typeDrinkDetail')
    instruction.textContent = coctail.strInstructions

    const ol = document.createElement('ol')
    ol.classList.add('olDetail')
    for(let key in coctail) {
        if(key.includes('strIngredient') && coctail[key] !== null) {
            const li = document.createElement('li')
            li.classList.add('list')
            li.textContent = coctail[key]
            ol.append(li)
            li.addEventListener('click', () => getIngredientsByName(coctail[key]))
        }
    }

    btn_back.addEventListener('click', () => {
        getAllCoctails()
    })

    output.append(card)
    card.append(img, title, block, ol)
    block.append(typeDrink, categoryDrink, glassType, instruction)
}

const renderCoctails = (data) => {
    output.innerHTML = ''
    data.map(el => {
        const card = document.createElement('div')
        card.classList.add('card')
        const img = document.createElement('img')
        img.classList.add('imgAllCoctail')
        const title = document.createElement('h2')
        title.textContent = el.strDrink
        img.src = el.strDrinkThumb
        title.classList.add('titleAllCoctail')

        card.addEventListener('click', () => getDetailCoctail(el.idDrink))

        btn_back.addEventListener('click', () => {
            getAllCoctails()
        })

        card.append(img, title)
        output.append(card)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
})

input.addEventListener('keydown', (e) => {
    if(input.value.length >= 2) {
        getCoctailsByName()
    } else {
        getAllCoctails()
    }
})


select.addEventListener('change', getFiltered)

getAllCoctails()