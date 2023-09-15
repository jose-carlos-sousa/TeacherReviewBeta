export default async function handleSubmit(e){
  "use server";
  function removeAccents(inputString) {
    return inputString
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\x00-\x7F]/g, "");
  }
  
  
 

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

      const htmlBody = await res1.text();

      // Load the HTML content into cheerio
      const $ = cheerio.load(htmlBody);
    
      // Use cheerio selectors to find and extract the name
      const nameElement = $('title');
      const name = nameElement.text().trim();
    
      console.log('Name:', name);
      Tname=name
      if (Tname!=="FEUP - Registo n�o encontrado"){
        ok=true
      }
  
   
    }
    if(ok){
      const fname = removeAccents(Tname.replace("FEUP - ", ""));

      console.log("t name is", Tname)
      const res = await fetch("http://localhost:3000/api/Topics", {
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
