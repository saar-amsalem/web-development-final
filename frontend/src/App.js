import logo from './logo.svg';
import './App.css';
import data from './data';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <a href='/'>amazona</a>
       <main>
         <h1>
           { //map to get all photo from products
             data.products.map(product => (<div>    
               <img src={product.image} alt={product.name}/>
               <p>
                 {product.name}
               </p>
<p>{product.price}
</p>
             </div>))
           }
         </h1>
       </main>
      </header>
    </div>
  );
}

export default App;
