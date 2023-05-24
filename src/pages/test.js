import Layout from '../../components/layout';
import Head from 'next/head';
import Image from 'next/image'

 
const imageLoader = ({ src, width, quality }) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${src}.png`;
};

export default function Test({ pokemonList, indexList }) {

  
  return (
    // <Layout home>
    <div>
    <Head>
        <title>Sprint Generator</title>
      </Head>
      
      <h1 className="title">Pokemon Sprint Name Generator</h1>

      <div className="nameList">
        <ul>
        {pokemonList.map((name, index) => (
            <p key={name}>
              <Image
              loader={imageLoader} 
              src={indexList[index]}

              width={50}
              height ={50}
              
              //TODO alt name should be pokemon name
              alt ={name} />
              {name}</p>
              ))}

          </ul>

      </div>
      </div>
    // </Layout>
  );
}

export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0', {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    });
    const pokemon = await res.json();
   
    let count = Object.keys(pokemon["results"]).length;
    const allPokemon = pokemon["results"];
    let pokemonNames = new Array();
    let pokemonList = new Array();
    let randomNums = new Array();
    let indexList = new Array();
    let urlList = new Array();

    //makes array of names
    for(let i=0; i<count; i++){
      let name = (pokemon["results"][i]["name"]);
  
      pokemonNames[i] = name;
    }
  
    pokemonNames.sort();
    for(let j=0; j<26; j++){
        randomNums[j] = (Math.random()); 

    }
    let beginning = 0;
    let beginningChar = pokemonNames[0].at(0);
  
      let namesNumber = 0;
      let nameIndex = new Array();
  
      for(let j=0; j<count; j++){
    
        let currChar = pokemonNames[j].at(0);
    
        if(currChar != beginningChar){
  
            let randomNum = (randomNums[namesNumber] * (j-beginning)) + beginning; 
            nameIndex[namesNumber] = Math.floor(randomNum).toString();
  
            pokemonList[namesNumber] = pokemonNames[nameIndex[namesNumber]]; 

            beginningChar = currChar;
            beginning = j;
            namesNumber++;
        }
  
        //for final letter
        if(j == count - 1){
          let randomNum = (randomNums[namesNumber] * (j-beginning)) + beginning;
          nameIndex[namesNumber] = Math.floor(randomNum).toString();
          pokemonList[namesNumber] = pokemonNames[nameIndex[namesNumber]];
        }
        
      }

      //make list of url numbers
      for(let i = 0; i<26; i++){
        let index = pokemon["results"].findIndex(poke=> poke.name==pokemonList[i]);
        urlList[i] = pokemon["results"][index]["url"];
        let url = urlList[i].toString();
        url = url.replace("https://pokeapi.co/api/v2/pokemon/", "");
        url = url.replace("/", "");
        indexList[i] = url;
      }
  
    // By returning { props: { pokemon } }, the component
    // will receive `pokemon` as a prop at build time
    return {
      props: {
        pokemonList,
        indexList
      },
    };
  }