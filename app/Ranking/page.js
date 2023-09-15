import Image from 'next/image'
import MyNav from '@/components/Navbar'

const getComments= async () => {

  try {
    const res = await fetch(`https://feup-reve.vercel.app/api/Topics`, {
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
export default async function Home() {
  const { comments } = await getComments();
  // Assuming you have an array of comments


// Create an object to store teacher ratings and counts
const teacherRatings = {};

// Iterate through the comments to calculate the ratings and counts
const codigoToNameMap =[]
comments.forEach((comment) => {
  const { codigo, rating, comentario ,name} = comment;
  codigoToNameMap[codigo]=name


  // Check if the teacher's codigo is already in the teacherRatings object
  if (!teacherRatings[codigo]) {
    teacherRatings[codigo] = { totalRating: 0, count: 0 };
  }

  // Add the rating to the teacher's totalRating and increment the count
  teacherRatings[codigo].totalRating += rating;
  teacherRatings[codigo].count += 1;
});

// Calculate the average rating for each teacher
const teacherAverages = {};

for (const codigo in teacherRatings) {
  const { totalRating, count } = teacherRatings[codigo];
  const averageRating = totalRating / count;
  teacherAverages[codigo] = averageRating;
}

// Now, teacherAverages object contains the average rating for each teacher
console.log("teacher average",teacherAverages);
// Calculate the average rating for each teacher (as shown in the previous code)

// Create an array of teacher objects with codigo and averageRating
const teacherArray = [];

for (const codigo in teacherAverages) {
  teacherArray.push({ codigo, averageRating: teacherAverages[codigo] });
}

// Sort the teachers by averageRating in descending order
teacherArray.sort((a, b) => b.averageRating - a.averageRating);

// Now, teacherArray contains teachers sorted by average rating in descending order
console.log("teacher array",teacherArray);

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
      <h1 className=' mt-5 mx-auto'>Ranking</h1>
      </div>
      <div className='container d-flex '>

      </div>
      <div className=' mt-5 ms-3container '>
      {teacherArray.map((teacherInfo, index) => (
  <div key={index} className="mb-2">
    <div className="container">
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h1># {index+1}</h1>
          <h2 className="card-title">{codigoToNameMap[teacherInfo.codigo]}</h2>
          <h5 className="card-title">{teacherInfo.codigo}</h5>
          <p className="card-text">Rating: {teacherInfo.averageRating}</p>
          <a href={`https://sigarra.up.pt/feup/pt/func_geral.formview?p_codigo=${teacherInfo.codigo}`} target="_blank" rel="noopener noreferrer">
            Visit Profile
          </a>
        </div>
      </div>
    </div>
    <br />
  </div>
))}

      </div>
      
   
    
    

   </div>
  )
}
