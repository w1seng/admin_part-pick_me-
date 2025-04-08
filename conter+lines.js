const puppeteer = require('puppeteer');
const fs = require('fs');

const heroNameMap = {
    "Anti-Mage": "Anti Mage",
    "Meepo": "Meepo",
    "Huskar": "Huskar",
    "Phantom-Assassin": "Phantom Assassin",
    "Axe": "Axe",
    "Lone-Druid": "Lone Druid",
    "Slardar": "Slardar",
    "Troll-Warlord": "Troll Warlord",
    "Kez": "Kez",
    "Terrorblade": "Terrorblade",
    "Marci": "Marci",
    "Earthshaker": "Earthshaker",
    "Monkey-King": "Monkey King",
    "Shadow-Fiend": "Shadow Fiend",
    "Beastmaster": "Beastmaster",
    "Templar-Assassin": "Templar Assassin",
    "Hoodwink": "Hoodwink",
    "Enchantress": "Enchantress",
    "Ursa": "Ursa",
    "Magnus": "Magnus",
    "Enigma": "Enigma",
    "Puck": "Puck",
    "Sven": "Sven",
    "Luna": "Luna",
    "Riki": "Riki",
    "Broodmother": "Broodmother",
    "Legion-Commander": "Legion Commander",
    "Disruptor": "Disruptor",
    "Batrider": "Batrider",
    "Pangolier": "Pangolier",
    "Bloodseeker": "Bloodseeker",
    "Io": "Io",
    "Jakiro": "Jakiro",
    "Windranger": "Windranger",
    "Phoenix": "Phoenix",
    "Crystal-Maiden": "Crystal Maiden",
    "Mirana": "Mirana",
    "Lion": "Lion",
    "Omniknight": "Omniknight",
    "Timbersaw": "Timbersaw",
    "Tiny": "Tiny",
    "Nyx-Assassin": "Nyx Assassin",
    "Shadow-Shaman": "Shadow Shaman",
    "Spirit-Breaker": "Spirit Breaker",
    "Elder-Titan": "Elder Titan",
    "Snapfire": "Snapfire",
    "Drow-Ranger": "Drow Ranger",
    "Witch-Doctor": "Witch Doctor",
    "Night-Stalker": "Night Stalker",
    "Kunkka": "Kunkka",
    "Slark": "Slark",
    "Lycan": "Lycan",
    "Dragon-Knight": "Dragon Knight",
    "Treant-Protector": "Treant Protector",
    "Tusk": "Tusk",
    "Sniper": "Sniper",
    "Naga-Siren": "Naga Siren",
    "Techies": "Techies",
    "Dazzle": "Dazzle",
    "Dark-Willow": "Dark Willow",
    "Centaur-Warrunner": "Centaur Warrunner",
    "Ember-Spirit": "Ember Spirit",
    "Chen": "Chen",
    "Weaver": "Weaver",
    "Viper": "Viper",
    "Gyrocopter": "Gyrocopter",
    "Bane": "Bane",
    "Grimstroke": "Grimstroke",
    "Rubick": "Rubick",
    "Natures-Prophet": "Nature's Prophet",
    "Ringmaster": "Ringmaster",
    "Clinkz": "Clinkz",
    "Faceless-Void": "Faceless Void",
    "Dark-Seer": "Dark Seer",
    "Earth-Spirit": "Earth Spirit",
    "Venomancer": "Venomancer",
    "Invoker": "Invoker",
    "Arc-Warden": "Arc Warden",
    "Dawnbreaker": "Dawnbreaker",
    "Muerta": "Muerta",
    "Alchemist": "Alchemist",
    "Skywrath-Mage": "Skywrath Mage",
    "Silencer": "Silencer",
    "Vengeful-Spirit": "Vengeful Spirit",
    "Bounty-Hunter": "Bounty Hunter",
    "Warlock": "Warlock",
    "Spectre": "Spectre",
    "Bristleback": "Bristleback",
    "Sand-King": "Sand King",
    "Doom": "Doom",
    "Keeper-Of-The-Light": "Keeper of the Light",
    "Shadow-Demon": "Shadow Demon",
    "Leshrac": "Leshrac",
    "Brewmaster": "Brewmaster",
    "Pudge": "Pudge",
    "Primal-Beast": "Primal Beast",
    "Lina": "Lina",
    "Necrophos": "Necrophos",
    "Void-Spirit": "Void Spirit",
    "Lich": "Lich",
    "Lifestealer": "Lifestealer",
    "Visage": "Visage",
    "Queen-Of-Pain": "Queen of Pain",
    "Undying": "Undying",
    "Outworld-Destroyer": "Outworld Destroyer",
    "Death-Prophet": "Death Prophet",
    "Underlord": "Underlord",
    "Tidehunter": "Tidehunter",
    "Pugna": "Pugna",
    "Winter-Wyvern": "Winter Wyvern",
    "Chaos-Knight": "Chaos Knight",
    "Zeus": "Zeus",
    "Morphling": "Morphling",
    "Clockwerk": "Clockwerk",
    "Juggernaut": "Juggernaut",
    "Mars": "Mars",
    "Ogre-Magi": "Ogre Magi",
    "Oracle": "Oracle",
    "Wraith-King": "Wraith King",
    "Razor": "Razor",
    "Ancient-Apparition": "Ancient Apparition",
    "Tinker": "Tinker",
    "Abaddon": "Abaddon",
    "Phantom-Lancer": "Phantom Lancer",
    "Storm-Spirit": "Storm Spirit",
    "Medusa": "Medusa"
};

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const heroNames = fs.readFileSync('heroNames.txt', 'utf8')
        .split('\n')
        .filter(name => name.trim() !== '')
        .slice(0, 126)
        .map(name => heroNameMap[name.trim()] || name.trim());

    const results = {};
    let num = 1;

    for (let heroName of heroNames) {
        const mappedHeroName = Object.keys(heroNameMap).find(key => heroNameMap[key] === heroName) || heroName.replace(/ /g, '-');
        results[heroName] = {};

        // Get counters data
        const countersUrl = `https://uk.dotabuff.com/heroes/${mappedHeroName}/counters`;
        await page.goto(countersUrl, { waitUntil: 'domcontentloaded' });
        const heroCountersData = await page.evaluate((nameMap) => {
            let popularityT = document.querySelector('dd:nth-of-type(1)')?.innerText.trim();
            const popularity = parseFloat(popularityT?.slice(0, -2)) || null;

            let winRate = document.querySelector('span.lost')?.innerText.trim() ||
                          document.querySelector('span.won')?.innerText.trim();

            const rows = Array.from(document.querySelectorAll('table tbody tr'));
            const counters = rows.map(row => {
                const counterHero = row.querySelector('td.cell-xlarge a')?.getAttribute('href')?.split('/').pop();
                const heroWinRate = row.querySelector('td:nth-child(4)')?.innerText.trim();
                return { 
                    counterHero: nameMap[counterHero] || counterHero?.replace(/-/g, ' '), 
                    heroWinRate 
                };
            }).slice(14);

            return { popularity, winRate, counters };
        }, heroNameMap); // Pass heroNameMap as argument

        results[heroName].popularity = heroCountersData.popularity;
        results[heroName].winRate = heroCountersData.winRate;
        results[heroName].counters = heroCountersData.counters.reduce((acc, counter) => {
            acc[counter.counterHero] = counter.heroWinRate;
            return acc;
        }, {});

        // Get lines data
        const heroUrl = `https://uk.dotabuff.com/heroes/${mappedHeroName}`;
        await page.goto(heroUrl, { waitUntil: 'domcontentloaded' });
        const heroLinesData = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('table tbody tr'));
            const lines = {};
        
            const titleDiv = document.querySelector('.header-content-title');
            let roles = [];
    
            if (titleDiv) {
                const h1Element = titleDiv.querySelector('h1');
                if (h1Element) {
                    roles = "1"
                }
            }
        
            rows.forEach(row => {
                let line = row.querySelector('td')?.innerText.trim();
                if (line === "Легка лінія") {
                    line = "safe line";
                } else if (line === "Центральна лінія") {
                    line = "midlane";
                } else if (line === "Тяжка лінія") {
                    line = "hard line";
                } else {
                    return;
                }
                let presence = row.querySelector('td[data-value]')?.getAttribute('data-value');
                let winrate = row.querySelector('td:nth-child(3)')?.getAttribute('data-value');
                if (line && presence && winrate) {
                    presence = (Math.round(parseFloat(presence) * 100) / 100).toFixed(2) + '%';
                    winrate = (Math.round(parseFloat(winrate) * 100) / 100).toFixed(2) + '%';
                    lines[line] = { presence, winrate };
                }
            });

            return { roles, lines };
        });
        
        results[heroName].lines = heroLinesData.lines;
        console.log(`Processed ${num}: ${heroName}`);
        num++;
    }

    fs.writeFileSync('heroData(c+l).json', JSON.stringify(results, null, 2), 'utf8');
    console.log('Data saved to heroData.json');

    await browser.close();
})();