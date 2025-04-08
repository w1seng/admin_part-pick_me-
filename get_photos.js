const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const heroNamesFile = 'heroNames.txt';
const saveFolder = './Hero_photos';

function loadHeroNames() {
  const heroNames = fs.readFileSync(heroNamesFile, 'utf-8').split('\n');
  return heroNames.map(name => name.trim()).filter(name => name.length > 0);
}


async function downloadImage(heroName) {
  const url = `https://www.dotabuff.com/heroes/${heroName}/counters`;  
  

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let imgUrl = $('img').attr('src');

    imgUrl = `https://www.dotabuff.com${imgUrl}`;


    const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });

    const imgPath = path.join(saveFolder, `${heroName}.png`);
        // Зберігаємо зображення в файл
    fs.writeFileSync(imgPath, imgResponse.data);
    
  
}

// Завантаження зображень для всіх героїв
async function downloadAllHeroImages() {
  const heroNames = loadHeroNames();
  for (const heroName of heroNames) {
    await downloadImage(heroName);
  }
}

// Запуск процесу завантаження
downloadAllHeroImages().then(() => {
  console.log('Завершено завантаження всіх зображень.');
});
