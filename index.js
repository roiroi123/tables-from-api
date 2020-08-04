
async function init() {
    try {
        const response = await getApi({url:`https://randomuser.me/api/?results=50`})
        const { results } = response;
        return results
        
        
    } catch (error) {
        alert("error")
    }
}

$("#btn1").one("click",async function(){
    $("#table").html("")

    const results = await init()
  console.log(results);
  const males =[]
  const females =[]
  const canada =[]
  const Finland =[]
  const mapped =results.map((e)=>{
      if (e.gender === "male") {
          males.push(e)
      }
      if (e.location.country === "Canada") {
        canada.push(e)
    }
    
    if (e.location.country === "Finland") {
      Finland.push(e)
    }
    if (e.gender === "female"){
        females.push(e)

      }
  })
  
   drawHeader("male")
   drawHeader("female")
   drawTdGender(males.length,females.length)
  
  
})
$("#btn2").one("click",async function(){
    $("#table").html("")
    const results = await init()
  console.log(results);
  const allCountries = results.map(e=>{
      return e.location.country
    })
    console.log(allCountries);
    
    const uniqueCountry = allCountries.reduce((unique,item)=>{
       return unique.includes(item) ? unique :[...unique,item]
    },[])

   
uniqueCountry.forEach(element => {
    drawHeader(element)
    drawTdCountry(getOccurrence(allCountries,element),"")
    console.log(getOccurrence(allCountries,element)); 
    
});
   
   
  
})


function drawHeader(th1name) {
    const th1 = $(`<th scope="row">${th1name}</th>`)
    
    $("#table").append(th1)
}
function drawTdGender(td1,td2){
    const tbody = $(`<tbody id="tbody"></tbody>`)

        const tr = $(`<tr></tr>`)
        const tdM = $(`<td>${td1} users</td>`)
        const tdF = $(`<td>${td2} users</td>`)
        tr.append(tdM,tdF)
       tbody.append(tr)
       $("#table").append(tbody)
    ;
    
}
function drawTdCountry(td){
    const tbody = $(`<tbody id="tbody"></tbody>`)

        const tr = $(`<tr></tr>`)
        const tdC = $(`<td>${td} users</td>`)
        
        tr.append(tdC)
       tbody.append(tr)
       $("#table").append(tbody)
    ;
    
}
function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}