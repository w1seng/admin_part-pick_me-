const puppeteer = require('puppeteer');
const fs = require('fs');

const heroNameMap = {
    "anti-mage": "Anti-Mage",
    "meepo": "Meepo",
    "huskar": "Huskar",
    "phantom-assassin": "Phantom Assassin",
    "axe": "Axe",
    "lone-druid": "Lone Druid",
    "slardar": "Slardar",
    "troll-warlord": "Troll Warlord",
    "kez": "Kez",
    "terrorblade": "Terrorblade",
    "marci": "Marci",
    "earthshaker": "Earthshaker",
    "monkey-king": "Monkey King",
    "shadow-fiend": "Shadow Fiend",
    "beastmaster": "Beastmaster",
    "templar-assassin": "Templar Assassin",
    "hoodwink": "Hoodwink",
    "enchantress": "Enchantress",
    "ursa": "Ursa",
    "magnus": "Magnus",
    "enigma": "Enigma",
    "puck": "Puck",
    "sven": "Sven",
    "luna": "Luna",
    "riki": "Riki",
    "broodmother": "Broodmother",
    "legion-commander": "Legion Commander",
    "disruptor": "Disruptor",
    "batrider": "Batrider",
    "pangolier": "Pangolier",
    "bloodseeker": "Bloodseeker",
    "io": "Io",
    "jakiro": "Jakiro",
    "windranger": "Windranger",
    "phoenix": "Phoenix",
    "crystal-maiden": "Crystal Maiden",
    "mirana": "Mirana",
    "lion": "Lion",
    "omniknight": "Omniknight",
    "timbersaw": "Timbersaw",
    "tiny": "Tiny",
    "nyx-assassin": "Nyx Assassin",
    "shadow-shaman": "Shadow Shaman",
    "spirit-breaker": "Spirit Breaker",
    "elder-titan": "Elder Titan",
    "snapfire": "Snapfire",
    "drow-ranger": "Drow Ranger",
    "witch-doctor": "Witch Doctor",
    "night-stalker": "Night Stalker",
    "kunkka": "Kunkka",
    "slark": "Slark",
    "lycan": "Lycan",
    "dragon-knight": "Dragon Knight",
    "treant-protector": "Treant Protector",
    "tusk": "Tusk",
    "sniper": "Sniper",
    "naga-siren": "Naga Siren",
    "techies": "Techies",
    "dazzle": "Dazzle",
    "dark-willow": "Dark Willow",
    "centaur-warrunner": "Centaur Warrunner",
    "ember-spirit": "Ember Spirit",
    "chen": "Chen",
    "weaver": "Weaver",
    "viper": "Viper",
    "gyrocopter": "Gyrocopter",
    "bane": "Bane",
    "grimstroke": "Grimstroke",
    "rubick": "Rubick",
    "natures-prophet": "Nature's Prophet",
    "ringmaster": "Ringmaster",
    "clinkz": "Clinkz",
    "faceless-void": "Faceless Void",
    "dark-seer": "Dark Seer",
    "earth-spirit": "Earth Spirit",
    "venomancer": "Venomancer",
    "invoker": "Invoker",
    "arc-warden": "Arc Warden",
    "dawnbreaker": "Dawnbreaker",
    "muerta": "Muerta",
    "alchemist": "Alchemist",
    "skywrath-mage": "Skywrath Mage",
    "silencer": "Silencer",
    "vengeful-spirit": "Vengeful Spirit",
    "bounty-hunter": "Bounty Hunter",
    "warlock": "Warlock",
    "spectre": "Spectre",
    "bristleback": "Bristleback",
    "sand-king": "Sand King",
    "doom": "Doom",
    "keeper-of-the-light": "Keeper of the Light",
    "shadow-demon": "Shadow Demon",
    "leshrac": "Leshrac",
    "brewmaster": "Brewmaster",
    "pudge": "Pudge",
    "primal-beast": "Primal Beast",
    "lina": "Lina",
    "necrophos": "Necrophos",
    "void-spirit": "Void Spirit",
    "lich": "Lich",
    "lifestealer": "Lifestealer",
    "visage": "Visage",
    "queen-of-pain": "Queen of Pain",
    "undying": "Undying",
    "outworld-destroyer": "Outworld Destroyer",
    "death-prophet": "Death Prophet",
    "underlord": "Underlord",
    "tidehunter": "Tidehunter",
    "pugna": "Pugna",
    "winter-wyvern": "Winter Wyvern",
    "chaos-knight": "Chaos Knight",
    "zeus": "Zeus",
    "morphling": "Morphling",
    "clockwerk": "Clockwerk",
    "juggernaut": "Juggernaut",
    "mars": "Mars",
    "ogre-magi": "Ogre Magi",
    "oracle": "Oracle",
    "wraith-king": "Wraith King",
    "razor": "Razor",
    "ancient-apparition": "Ancient Apparition",
    "tinker": "Tinker",
    "abaddon": "Abaddon",
    "phantom-lancer": "Phantom Lancer",
    "storm-spirit": "Storm Spirit",
    "medusa": "Medusa"
};

const hero_map = {
    "anti-mage": "Anti-Mage",
    "meepo": "Meepo",
    "huskar": "Huskar",
    "phantom assassin": "Phantom Assassin",
    "axe": "Axe",
    "lone druid": "Lone Druid",
    "slardar": "Slardar",
    "troll warlord": "Troll Warlord",
    "kez": "Kez",
    "terrorblade": "Terrorblade",
    "marci": "Marci",
    "earthshaker": "Earthshaker",
    "monkey king": "Monkey King",
    "shadow fiend": "Shadow Fiend",
    "beastmaster": "Beastmaster",
    "templar assassin": "Templar Assassin",
    "hoodwink": "Hoodwink",
    "enchantress": "Enchantress",
    "ursa": "Ursa",
    "magnus": "Magnus",
    "enigma": "Enigma",
    "puck": "Puck",
    "sven": "Sven",
    "luna": "Luna",
    "riki": "Riki",
    "broodmother": "Broodmother",
    "legion commander": "Legion Commander",
    "disruptor": "Disruptor",
    "batrider": "Batrider",
    "pangolier": "Pangolier",
    "bloodseeker": "Bloodseeker",
    "io": "Io",
    "jakiro": "Jakiro",
    "windranger": "Windranger",
    "phoenix": "Phoenix",
    "crystal maiden": "Crystal Maiden",
    "mirana": "Mirana",
    "lion": "Lion",
    "omniknight": "Omniknight",
    "timbersaw": "Timbersaw",
    "tiny": "Tiny",
    "nyx assassin": "Nyx Assassin",
    "shadow shaman": "Shadow Shaman",
    "spirit breaker": "Spirit Breaker",
    "elder titan": "Elder Titan",
    "snapfire": "Snapfire",
    "drow ranger": "Drow Ranger",
    "witch doctor": "Witch Doctor",
    "night stalker": "Night Stalker",
    "kunkka": "Kunkka",
    "slark": "Slark",
    "lycan": "Lycan",
    "dragon knight": "Dragon Knight",
    "treant protector": "Treant Protector",
    "tusk": "Tusk",
    "sniper": "Sniper",
    "naga siren": "Naga Siren",
    "techies": "Techies",
    "dazzle": "Dazzle",
    "dark willow": "Dark Willow",
    "centaur warrunner": "Centaur Warrunner",
    "ember spirit": "Ember Spirit",
    "chen": "Chen",
    "weaver": "Weaver",
    "viper": "Viper",
    "gyrocopter": "Gyrocopter",
    "bane": "Bane",
    "grimstroke": "Grimstroke",
    "rubick": "Rubick",
    "nature's prophet": "Nature's Prophet",
    "ringmaster": "Ringmaster",
    "clinkz": "Clinkz",
    "faceless void": "Faceless Void",
    "dark seer": "Dark Seer",
    "earth spirit": "Earth Spirit",
    "venomancer": "Venomancer",
    "invoker": "Invoker",
    "arc warden": "Arc Warden",
    "dawnbreaker": "Dawnbreaker",
    "muerta": "Muerta",
    "alchemist": "Alchemist",
    "skywrath mage": "Skywrath Mage",
    "silencer": "Silencer",
    "vengeful spirit": "Vengeful Spirit",
    "bounty hunter": "Bounty Hunter",
    "warlock": "Warlock",
    "spectre": "Spectre",
    "bristleback": "Bristleback",
    "sand king": "Sand King",
    "doom": "Doom",
    "keeper of the light": "Keeper of the Light",
    "shadow demon": "Shadow Demon",
    "leshrac": "Leshrac",
    "brewmaster": "Brewmaster",
    "pudge": "Pudge",
    "primal beast": "Primal Beast",
    "lina": "Lina",
    "necrophos": "Necrophos",
    "void spirit": "Void Spirit",
    "lich": "Lich",
    "lifestealer": "Lifestealer",
    "visage": "Visage",
    "queen of pain": "Queen of Pain",
    "undying": "Undying",
    "outworld destroyer": "Outworld Destroyer",
    "death prophet": "Death Prophet",
    "underlord": "Underlord",
    "tidehunter": "Tidehunter",
    "pugna": "Pugna",
    "winter wyvern": "Winter Wyvern",
    "chaos knight": "Chaos Knight",
    "zeus": "Zeus",
    "morphling": "Morphling",
    "clockwerk": "Clockwerk",
    "juggernaut": "Juggernaut",
    "mars": "Mars",
    "ogre magi": "Ogre Magi",
    "oracle": "Oracle",
    "wraith king": "Wraith King",
    "razor": "Razor",
    "ancient apparition": "Ancient Apparition",
    "tinker": "Tinker",
    "abaddon": "Abaddon",
    "phantom lancer": "Phantom Lancer",
    "storm spirit": "Storm Spirit",
    "medusa": "Medusa"
};

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const heroNames = fs.readFileSync('heroNames.txt', 'utf8')
        .split('\n')
        .filter(name => name.trim() !== '')
        .slice(0, 126
        );

    const results = {};
    let num = 1;

    for (let heroName of heroNames) {
        const key_name = heroNameMap[heroName];
        results[key_name] = {};

        // Get counters data
        const countersUrl = `https://uk.dotabuff.com/heroes/${heroName}/counters`;
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

        results[key_name].popularity = heroCountersData.popularity;
        results[key_name].winRate = heroCountersData.winRate;
        results[key_name].counters = heroCountersData.counters.reduce((acc, counter) => {
            acc[counter.counterHero] = counter.heroWinRate;
            return acc;
        }, {});

        // Get lines data
        const heroUrl = `https://uk.dotabuff.com/heroes/${heroName}`;
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
        
        results[key_name].lines = heroLinesData.lines;
        console.log(`Processed ${num}: ${heroName}`);
        num++;
    }

    fs.writeFileSync('heroData(c+l).json', JSON.stringify(results, null, 2), 'utf8');
    console.log('Data saved to heroData.json');

    await browser.close();
})();