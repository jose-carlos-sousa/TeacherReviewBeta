
import Image from 'next/image'
import MyNav from '@/components/Navbar'
import { redirect } from 'next/navigation'
export default async function Home() {
  async function handleSubmit(e){
    "use server";
  
    const myInput=e.get("in")
    redirect("/UniComments/"+myInput)

  

  }
  
  
 
  


  return (
   <div>
    <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
    crossorigin="anonymous"
  />
  <MyNav/>
      <div className='container d-flex'>
      <h1 className='mx-auto'>Comments</h1>
      </div>
      <div className=' mt-5 container d-flex '>
        <div className='mx-auto'>
           <form  action={handleSubmit} className="d-flex" role="search"> 
          <input className="form-control me-2" type="search" placeholder="inserir código " aria-label="Search" name="in" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        </div>

      </div>
     
      
   
    
    

   </div>
  )
}
