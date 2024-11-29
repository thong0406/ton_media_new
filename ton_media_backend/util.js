module.exports = {
  GetRandomInt: (max) => {
    return Math.floor(Math.random() * max);
  } ,
  TitleToKey: (title) => {
    return title.split(" ").join("-") + "-" + Date.now();
  }
}