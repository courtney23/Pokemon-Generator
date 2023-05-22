import Layout from '../../components/layout';
import Head from 'next/head';
import Image from 'next/image'

 
const imageLoader = ({ src, width, quality }) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${src}.png`;
};

export default function Test({ pokemon }) {
  //need to replace this with string of numbers of pokemon
  const sprintNames = [ "1", "2", "3"];
  //need string of names of pokemon

  let count = Object.keys(pokemon["results"]).length;
  const allPokemon = pokemon["results"];
  let pokemonNames = new Array();
  let pokemonNamesFinal = new Array();

  //makes array of names
  for(let i=0; i<count; i++){
    let name = (pokemon["results"][i]["name"]);

    pokemonNames[i] = name;
  }

  pokemonNames.sort();
  let beginning = 0;
//   let beginningChar = pokemonNames[0].at(0);
  let beginningChar = '';

  let namesNumber = 0;

  //get one name per letter and put in new array
  for(let j=0; j<count; j++){

    let currChar = pokemonNames[j].at(0);

    if(currChar != beginningChar){
        let gap = j - beginning;
        // let randomNum = (Math.random() * gap ) + beginning; 
        pokemonNamesFinal[namesNumber] = pokemonNames[j]; 


        beginningChar = currChar;
        beginning = j;
        namesNumber++;
    }
    
  }

  
  return (
    // <Layout home>
    <div>
    <Head>
        <title>Sprint Generator</title>
      </Head>
      
      <h1 className="title">Pokemon Sprint Name Generator</h1>

      <div className="nameList">
        <ul>
        {sprintNames.map((name) => (
            <p key={name}>
              <Image
              loader={imageLoader} 
              src={name}

              width={75}
              height ={75}
              
              //TODO alt name should be pokemon name
              alt ={name} />
              {name}</p>
              ))}
          
          </ul>
          <ul>
          {pokemonNamesFinal.map( (value) => (
            <p key ={value}>{value}</p>
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
   
    // By returning { props: { pokemon } }, the component
    // will receive `pokemon` as a prop at build time
    return {
      props: {
        pokemon,
      },
    };
  }