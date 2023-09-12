import Image from 'next/image';
import MyNav from '@/components/Navbar';
import { redirect } from 'next/navigation'



export default function Home() {
    async function handleSubmit(e){
      "use server";
      const code=e.get("codigo")
      const num=e.get("num")
      const comment=e.get("comment") 
      //Store comment in DB
      if (!/^\d{6}$/.test(code)) {
        redirect('/ERROR')
        return;
      }
      
      // Check if num is a number between 0 and 10
      else if(isNaN(num) || num < 0 || num > 10) {
        redirect('/ERROR')
        return;
      }
      
      // Check if comment is a string
      else if (typeof comment !== 'string') {
        redirect('/ERROR')
        return;
      }
      else{
        
          const res = await fetch("http://localhost:3000/api/Topics", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ codigo: code, rating: num, comentario: comment }), // Match property names here
          });
          
    
          if (res.ok) {
            console.log("here")
           
          } else {
            throw new Error("Failed to create acomment");
          }
          redirect('/Submited')

       
        

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
       
      <form action={handleSubmit}>
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
            className="form-control"
            id="exampleTextarea"
            rows="3"
            placeholder="Write your comment here..."
            name="comment"
         ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      </div>


    </div>
  );
}
