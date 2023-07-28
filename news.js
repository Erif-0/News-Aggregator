window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
} 



const API_KEY ="f90f07c65b79496a9ae6b1db14087053";
const url="https://newsapi.org/v2/everything?q=";
const urls="https://newsapi.org/v2/top-headlines?country=us";

window.addEventListener('load', ()=> fetchNew("general"));

const d = new Date();
document.getElementById("demo").innerHTML = d;


async function fetchNew(query){
    const res =await fetch(`${urls}&apiKey=${API_KEY}&category=${query}`);
    const data = await res.json();    
    console.log(data);
    bindData(data.articles);
}




async function fetchNews(query){
    const res =await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();    
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
     const cardsContainer = document.getElementById("cards-container");
     const newsCardTemplate = document.getElementById("template-news-card");

     cardsContainer.innerHTML= ""; 

    articles.forEach((article)=> {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    
    
    newsImg.src= article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US");

    newsSource.innerHTML = `${article.source.name}` ;

    cardClone.firstElementChild.addEventListener("click",() =>{
        window.open(article.url, "_blank");
    });
} 








let curSelectedNav =null;
function onNavItemClick(id){
    fetchNew(id); 
    const navlink = document.getElementById(id);
    curSelectedNav?. classList.remove("active" ) ;
    curSelectedNav = navlink;
    curSelectedNav. classList. add("active" ) ;
}

const searchButton = document.getElementById("search-button");
const searchText= document.getElementById("news-input");
searchButton. addEventListener( "click" ,() =>{
const query = searchText.value;
if (!query) return;
fetchNews ( query) ;

});






fetch(`https://api.openweathermap.org/data/2.5/weather?q=burbank&units=metric&appid=886705b4c1182eb1c69f28eb8c520e20`)
      .then(response => response.json())
      .then(json => {
        const image = document.getElementById("icon").className;
        const temp = document.querySelector('.temp');
        const desc = document.querySelector('.desc');



        switch (json.weather[0].main.className) {
            case 'Clear':
                image.className = "fa-solid fa-moon-stars";
                break;

            case 'Rain':
                image.className = "fa-solid fa-raindrops";
                break;
            
            case 'Snow':
                image.className = "fa-solid fa-snowflake";
                break;

            case 'Clouds':
                image.className = "fa-solid fa-clouds";
                break;

            case 'Haze':
                image.className = "fa-solid fa-sun-haze";
                break;

            default:
                image.className = "fa-solid fa-cloud-bolt-sun";
        }

        temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        desc.innerHTML = `${json.weather[0].description}`;
        

       

    });

   

        
        
        

         

      
