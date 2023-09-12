
import Image from 'next/image'
import MyNav from '@/components/Navbar'

const getComments= async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};
export default async function Home({params}) {
  
    const { comments } = await getComments();
    console.log(comments)

    const myInput=params.Slug
    const matchingComments = comments.filter(comment => parseInt(comment.codigo) === parseInt(myInput));

    console.log(" matching comments",matchingComments)
    

  
  
  
  
 
  


  return (
   <div>
    <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
    crossorigin="anonymous"
  />
  <MyNav/>
  {matchingComments.map((comment ,index) => (
   <div key={index} className=" ms-5 me-5 border rounded p-3 mb-4">
   <h4 className="mb-3">Rating: {comment.rating}</h4>
   <p className="mb-0">Comment: {comment.comentario}</p>
 </div>
))}
      
      
   
    
    

   </div>
  )
}
