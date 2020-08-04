async function init() {
  try {
    const response = await getApi({
      url: `https://randomuser.me/api/?results=50`,
    });
    const { results } = response;
    return results;
  } catch (error) {
    alert("error");
  }
}

$("#btn1").on("click", async function () {
  $("#table").html("");
  const results = await init();
  const males = [];
  const females = [];
  const genders = results.reduce((obj, current) => {
    const { gender } = current;
    if (gender === "male") {
      males.push(gender);
    } else {
      females.push(gender);
    }
  }, {});
  drawHeader("male");
  drawHeader("female");
  drawTdGender(males.length, females.length);
});
$("#btn2").on("click", async function () {
  $("#table").html("");
  const results = await init();
  const countries = results.reduce((obj, current) => {
    const { country } = current.location;
    const count = obj[country] || 0;
    return { ...obj, [country]: count + 1 };
  }, {});
  const countryKeyVal = Object.entries(countries);
  drawheaderCountry();
  countryKeyVal.forEach((e) => {
    const tbody = $(`<tbody id="tbody"></tbody>`);
    const tdName = $(`<td>${e[0]} </td>`);
    const tdAmount = $(`<td>${e[1]} users</td>`);
    tbody.append(tdName, tdAmount);
    $("#table").append(tbody);
  });
});

function drawheaderCountry() {
  const th1 = $(`<th scope="row">country</th>`);
  const th2 = $(`<th scope="row">amount</th>`);
  $("#table").append(th1, th2);
}
function drawHeader(th1name) {
  const th1 = $(`<th scope="row">${th1name}</th>`);

  $("#table").append(th1);
}
function drawTdGender(td1, td2) {
  const tbody = $(`<tbody id="tbody"></tbody>`);

  const tr = $(`<tr></tr>`);
  const tdM = $(`<td>${td1} users</td>`);
  const tdF = $(`<td>${td2} users</td>`);
  tr.append(tdM, tdF);
  tbody.append(tr);
  $("#table").append(tbody);
}
function drawTdCountry(td) {
  const tbody = $(`<tbody id="tbody"></tbody>`);

  const tr = $(`<tr></tr>`);
  const tdC = $(`<td>${td} users</td>`);

  tr.append(tdC);
  tbody.append(tr);
  $("#table").append(tbody);
}
