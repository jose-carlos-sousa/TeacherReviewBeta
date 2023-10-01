import Image from 'next/image';
import MyNav from '@/components/Navbar';
import { redirect } from 'next/navigation'
import debounce from 'lodash/debounce';
import { revalidatePath } from 'next/cache';
import MyButton from '@/components/MyButton';
import Head from "next/head"

const cheerio = require('cheerio');



export default function Home() {


    async function handleSubmit(e){
      "use server";
     

        var code=e.get("codigo")
        const num=e.get("num")
        const comment=e.get("comment") 
        //Store comment in DB
        code=code.trim()
        if (!/^\d{6}$/.test(code)) {
          console.log("ERROR IN CODE")
         
          redirect('/ERROR');
       
          
         
        }
        
        // Check if num is a number between 0 and 10
        else if (isNaN(num) || num < 0 || num > 10 || num - parseInt(num) !== 0) {
          console.log("ERROR IN NUM")
          redirect('/ERROR');
   
      }
      
        
        // Check if comment is a string
        else if (typeof comment !== 'string') {
          console.log("ERROR IN COMMENT")
          redirect('/ERROR')
        
        }
        else{
          var Tname=""
          var ok=false
          const res1 = await fetch(`https://sigarra.up.pt/feup/pt/func_geral.formview?p_codigo=${code}`, {
          cache: "no-store",
        });
      
        if (!res1.ok) {
          console.log("ERROR IN FIRST FETCH");
          console.error(`HTTP Error: ${res1.status} ${res1.statusText}`);
          redirect('/ERROR');
          return;
        }else{ 
          const buffer = await res1.arrayBuffer();
          const decoder = new TextDecoder('iso-8859-1');
          const htmlBody = decoder.decode(buffer);
   
          
        
          
  
          // Load the HTML content into cheerio
          const $ = cheerio.load(htmlBody);
          
          // Use cheerio selectors to find and extract the name
          const nameElement = $('title');
          
         
          const name = nameElement.text().trim();

        
          console.log('Name:', name);
          Tname=name
          if (Tname!=="FEUP - Registo não encontrado"){
            ok=true
          }
      
       
        }
        if(ok){
          
          let fname =Tname.replace("FEUP - ", "");
          console.log(fname)
          fname=removeSpecialChar(fname)
          console.log(fname)

          console.log("t name is", Tname)
          const res = await fetch("https://prof-review-api.vercel.app/api/Topics", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ codigo: code, rating: num, comentario: comment , name: fname}), // Match property names here
          });
          
    
          if (res.ok) {
            console.log("here")
           
          } else {
            throw new Error("Failed to create acomment");
          }
          redirect('/Submited')
  
  
        }else{
          redirect("/ERROR")
        }
         
          
          
         
          
  
        

      }
      
      
     
     
      
    }
 
  return (
    <div>
    
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
        crossOrigin="anonymous"
      />

      <MyNav />
      <div className="container d-flex flex-column align-items-center">
      
        <h1 className="mt-5 display-2">Avalia o teu Professor</h1>
        <h3 className="mt-3">Dá a tua opinião para os responsabilizar</h3>
        <p className="mt-3">
          Para não existir confusão, cada professor é identificado pelo código
          ex: 672712
        </p>
      </div>
      <div className=" mt-5 container d-flex flex-column align-items-center">
       
      <form action={handleSubmit} >
        <div className=" mt-5 mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Código do Professor no Sigarra
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="codigo"
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Avaliação (número inteiro de 0 a 10)
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="num"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleTextarea" className="form-label">
            O teu comentário
          </label>
          <textarea
            maxLength="200"
            className="form-control"
            id="exampleTextarea"
            rows="3"
            placeholder="Write your comment here..."
            name="comment"
         ></textarea>
        </div>
        <MyButton/>
      </form>
      </div>


    </div>
  );
}
