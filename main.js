const url = fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Dnipro,ua&appid=5477d9fdf2ec1fdf99c925f193f88c19"
);

url
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    document.querySelector(".wheather-app__temp").textContent = Math.round(
      data.main.temp - 273
    );
    document.querySelector(".wheather-app__condition").textContent =
      data.weather[0]["description"];
    document.querySelector(
      ".wheather-app__img"
    ).innerHTML = ` <img src="https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png"> `;
  })
  .catch((error) => {
    console.error("Произошла ошибка:", error);
  });
