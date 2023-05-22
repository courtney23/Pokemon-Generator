import Layout from '../../components/layout';
import Head from 'next/head';
import Image from 'next/image'

// export const getStaticProps = async () => {
//   const res = await fetch('https://api.github.com/repos/vercel/next.js');
//   const repo = await res.json();
//   return { props: { repo } };
// };
 
 
const imageLoader = ({ src, width, quality }) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${src}.png`;
};

export default function Home() {
  //need to replace this with string of numbers of pokemon
  const sprintNames = [ "7", "7", "5"];
  //need string of names of pokemon
  
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
      </div>
      </div>
    // </Layout>
  );
}
