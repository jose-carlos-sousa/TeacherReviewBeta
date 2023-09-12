import Image from 'next/image'
import MyNav from '@/components/Navbar'
export default function Home() {
  return (
   <div>
    <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
    crossorigin="anonymous"
  />
  <MyNav/>
   
    <div className=' mt-5 d-flex'> <h1 className="mt-5 display-1 mx-auto">ERROR</h1></div>
    <div className=' mt-3 d-flex'> <h3 className=" mx-auto">Wrong input </h3></div>
    
   </div>
  )
}
