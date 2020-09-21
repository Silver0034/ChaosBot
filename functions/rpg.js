// RPG functions (d&d generators / dice rollers)
'use strict'

const abilityScore = {
  str: 0,
  dex: 0,
  con: 0,
  int: 0,
  wis: 0,
  cha: 0
}

const alignments = [
  'good',
  'neutral',
  'evil'
]

function removeArrayByValue (arr, value) {
  // remove item with "value" from Array
  arr.splice(arr.indexOf(value), 1)
}

function setAbilityScore (key, npc, abilityRolls, abilityScoreKeys) {
  const raceBonus = module.exports.races[npc.race].abilityScoreBonus[key]
  // add race bonus to priority abilityRolls
  if (raceBonus) {
    npc.abilityScore[key] += raceBonus
  }
  // add roll value to priority abilities
  npc.abilityScore[key] = abilityRolls[0]
  // remove the used roll
  abilityRolls.shift()
  // remove key from abilityScoreKeys
  removeArrayByValue(abilityScoreKeys, key)
}
function generateAbilityScore () {
  let initialRoll
  const results = []
  for (let i = 0; i < 6; i += 1) {
    initialRoll = module.exports.rollDice(4, 6)
    results[i] = 0

    for (let n = 0; n < (initialRoll.length - 1); n += 1) {
      results[i] += initialRoll[n]
    }
  }

  return results.sort((a, b) => b - a)
}

function selectRandomArrayElement (targetArray) {
  const keys = Object.keys(targetArray)
  const key = Math.floor(Math.random() * keys.length)
  return keys[key]
}

module.exports = {
  classes: {
    barbarian: {
      url: 'https://www.dndbeyond.com/classes/barbarian',
      abilityPriority: [
        'str',
        'con'
      ],
      weapons: [
        [
          ['greataxe'],
          ['martial melee weapons']],
        [
          [
            'handaxe',
            'handaxe'
          ],
          ['simple melee weapons']
        ]
      ],
      hitDie: [1, 12],
      hpMod: 'con',
      initialHP: 12
    },
    test: {
      url: 'https://www.dndbeyond.com/classes/barbarian',
      abilityPriority: [
        'str',
        'con'
      ],
      weapons: [
        [
          ['greataxe'],
          ['martial melee weapons']],
        [
          [
            'handaxe',
            'handaxe'
          ],
          ['simple melee weapons']
        ]
      ],
      hitDie: [1, 12],
      hpMod: 'con',
      initialHP: 12
    }
  },
  backgrounds: {
    acolyte: {
      description: 'You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine. You are not necessarily a cleric—performing sacred rites is not the same thing as channeling divine power.',
      proficiencies: [
        'insight',
        'religion'
      ],
      languages: [],
      equipment: [
        'a holy symbol',
        [
          'a prayer book',
          'a prayer wheel'
        ],
        '5 sticks of incense',
        'vestments',
        'set of common clothes'
      ],
      traits: [
        'I idolize a particular hero of my faith, and constantly refer to that person’s deeds and example.',
        'I can find common ground between the fiercest enemies, empathizing with them and always working toward peace.',
        'I see omens in every event and action. The gods try to speak to us, we just need to listen.',
        'Nothing can shake my optimistic attitude.',
        'I quote (or misquote) sacred texts and proverbs in almost every situation.',
        'I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods.',
        'I’ve enjoyed fine food, drink, and high society among my temple’s elite. Rough living grates on me.',
        'I’ve spent so long in the temple that I have little practical experience dealing with people in the outside world.'
      ],
      ideals: {
        lawful: [
          'Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld.',
          'Power. I hope to one day rise to the top of my faith’s religious hierarchy.',
          'Faith. I trust that my deity will guide my actions. I have faith that if I work hard, things will go well.'
        ],
        good: [
          'Charity. I always try to help those in need, no matter what the personal cost.'
        ],
        chaotic: [
          'Change. We must help bring about the changes the gods are constantly working in the world.'
        ],
        neutral: [
          'Aspiration. I seek to prove myself worthy of my god’s favor by matching my actions against his or her teachings.'
        ]
      },
      bond: [
        'I would die to recover an ancient relic of my faith that was lost long ago.',
        'I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.',
        'I owe my life to the priest who took me in when my parents died.',
        'Everything I do is for the common people.',
        'I will do anything to protect the temple where I served.',
        'I seek to preserve a sacred text that my enemies consider heretical and seek to destroy.'
      ],
      flaw: [
        'I judge others harshly, and myself even more severely.',
        'I put too much trust in those who wield power within my temple’s hierarchy.',
        'My piety sometimes leads me to blindly trust those that profess faith in my god.',
        'I am inflexible in my thinking.',
        'I am suspicious of strangers and expect the worst of them.',
        'Once I pick a goal, I become obsessed with it to the detriment of everything else in my life.'
      ],
      money: 15
    }
  },
  proficiencies: {
    darkvision: {
      description: 'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.'
    },
    'dwarven combat training': {
      description: 'You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.'
    },
    'dwarven resilience': {
      description: 'You have advantage on saving throws against poison, and you have resistance against poison damage'
    },
    stonecunning: {
      description: 'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.'
    },
    'tool proficiency': {
      description: 'You gain proficiency with the artisan’s tools of your choice: smith’s tools, brewer’s supplies, or mason’s tools.'
    }

  },
  races: {
    dwarf: {
      url: 'https://www.dndbeyond.com/races/dwarf',
      abilityScoreBonus: {
        con: 2
      },
      ageChild: 50,
      ageAdult: 350,
      alignment: {
        lawful: 70,
        chaotic: 15,
        neutral: 15
      },
      size: 'medium',
      heightMin: 4,
      heightMax: 5,
      speed: 25,
      proficiencies: [
        'darkvision',
        'dwarven resilience',
        'dwarven combat training',
        'tool proficiency',
        'stonecunning'
      ],
      languages: [
        'common',
        'dwarvish'
      ],
      subRaces: [
        'hill',
        'mountain',
        'duergar'
      ],
      namesMale: [
        'Adrik',
        'Alberich',
        'Baern',
        'Barendd',
        'Brottor',
        'Bruenor',
        'Dain',
        'Darrak',
        'Delg',
        'Eberk',
        'Einkil',
        'Fargrim',
        'Flint',
        'Gardain',
        'Harbek',
        'Kildrak',
        'Morgran',
        'Orsik',
        'Oskar',
        'Rangrim',
        'Rurik',
        'Taklinn',
        'Thoradin',
        'Thorin',
        'Tordek',
        'Traubon',
        'Travok',
        'Ulfgar',
        'Veit',
        'Vondal'
      ],
      namesFemale: [
        'Amber',
        'Artin',
        'Audhild',
        'Bardryn',
        'Dagnal',
        'Diesa',
        'Eldeth',
        'Falkrunn',
        'Finellen',
        'Gunnloda',
        'Gurdis',
        'Helja',
        'Hlin',
        'Kathra',
        'Kristryd',
        'Ilde',
        'Liftrasa',
        'Mardred',
        'Riswynn',
        'Sannl',
        'Torbera',
        'Torgga',
        'Vistra'
      ],
      namesLast: [
        'Balderk',
        'Battlehammer',
        'Brawnanvil',
        'Dankil',
        'Fireforge',
        'Frostbeard',
        'Gorunn',
        'Holderhek',
        'Ironfist',
        'Loderr',
        'Lutgehr',
        'Rumnaheim',
        'Strakeln',
        'Torunn',
        'Ungart'
      ]
    }
  },
  spells: {
    darkvision: {
      url: 'https://www.dndbeyond.com/spells/darkvision',
      level: 2,
      castingTime: '1 action',
      range: 'touch',
      components: [
        'V',
        'S',
        'M'
      ],
      duration: '8 hours',
      school: ['Transmutation'],
      classes: ['druid', 'ranger', 'sorcerer', 'wizard', 'artificer'],
      description: 'You touch a willing creature to grant it the ability to see in the dark. For the duration, that creature has darkvision out to a range of 60 feet',
      attack: [],
      effect: ['buff']
    }
  },
  weapons: {
    'simple melee weapons': {
      club: {
        cost: '1 sp',
        damage: '1d4 bludgeoning',
        weight: 2,
        properties: 'light'
      },
      dagger: {
        cost: '2 gp',
        damage: '1d4 piercing',
        weight: 1,
        properties: 'finesse, light, thrown (range 20/60)'
      },
      greatclub: {
        cost: '2 sp',
        damage: '1d8 bludgeoning',
        weight: 10,
        properties: 'two-handed'
      },
      handaxe: {
        cost: '5 gp',
        damage: '1d6 slashing',
        weight: 2,
        properties: 'light, thrown (range 20/60)'
      },
      javelin: {
        cost: '5 sp',
        damage: '1d6 piercing',
        weight: 2,
        properties: 'thrown'
      },
      'light hammer': {
        cost: '2 gp',
        damage: '1d4 bludgeoning',
        weight: 2,
        properties: 'light, thrown (range 20/60)'
      },
      mace: {
        cost: '5 gp',
        damage: '1d6 bludgeoning',
        weight: 4,
        properties: null
      },
      quarterstaff: {
        cost: '2 sp',
        damage: '1d6 bludgeoning',
        weight: 4,
        properties: 'versatile (1d8)'
      },
      sickle: {
        cost: '1 gp',
        damage: '1d6 slashing',
        weight: 3,
        properties: 'light'
      },
      spear: {
        cost: '1 gp',
        damage: '1d6 bludgeoning',
        weight: 3,
        properties: 'thrown (range 20/60), versatile (1d8)'
      }
    },
    'simple ranged weapons': {
      'crossbow, light': {
        cost: '25 gp',
        damage: '1d8 piercing',
        weight: 5,
        properties: 'ammunition (range 80/320), loading, two-handed'
      },
      dart: {
        cost: '5 cp',
        damage: '1d4 piercing',
        weight: 0.25,
        properties: 'finesse, thrown(range 20/60)'
      },
      shortbow: {
        cost: '25 cp',
        damage: '1d6 piercing',
        weight: 2,
        properties: 'ammunition (range 80/320), two-handed'
      },
      sling: {
        cost: '1 sp',
        damage: '1d4 bludgeoning',
        weight: null,
        properties: 'ammunition (range 30/120)'
      }
    },
    'martial melee weapons': {
      battleaxe: {
        cost: '10 gp',
        damage: '1d8 slashing',
        weight: 4,
        properties: 'versatile (1d10)'
      },
      flail: {
        cost: '10 gp',
        damage: '1d8 bludgeoning',
        weight: 2,
        properties: null
      },
      glaive: {
        cost: '20 gp',
        damage: '1d10 slashing',
        weight: 6,
        properties: 'heavy, reach, two-handed'
      },
      greataxe: {
        cost: '30 gp',
        damage: '1d12 slashing',
        weight: 7,
        properties: 'heavy, two-handed'
      },
      greatsword: {
        cost: '50 gp',
        damage: '2d6 slashing',
        weight: 6,
        properties: 'heavy, two-handed'
      },
      halberd: {
        cost: '20 gp',
        damage: '1d10 slashing',
        weight: 6,
        properties: 'heavy, reach, two-handed'
      },
      lance: {
        cost: '10gp',
        damage: '1d12 piercing',
        weight: 6,
        properties: 'reach, special'
      },
      longsword: {
        cost: '15 gp',
        damage: '1d8 slashing',
        weight: 3,
        properties: 'versatile (1d10)'
      },
      maul: {
        cost: '10 gp',
        damage: '2d6 bludgeoning',
        weight: 10,
        properties: 'heavy, two-handed'
      },
      morningstar: {
        cost: '15 gp',
        damage: '1d8 piercing',
        weight: 4,
        properties: null
      },
      pike: {
        cost: '5 gp',
        damage: '1d10 piercing',
        weight: 18,
        properties: 'heavy, reach, two-handed'
      },
      rapier: {
        cost: '25 gp',
        damage: '1d8 piercing',
        weight: 2,
        properties: 'finesse'
      },
      scimitar: {
        cost: '25gp',
        damage: '1d8 piercing',
        weight: 3,
        properties: 'finesse, light'
      },
      shortsword: {
        cost: '10 gp',
        damage: '1d6 piercing',
        weight: 2,
        properties: 'finesse, light'
      },
      trident: {
        cost: '5 gp',
        damage: '1d6 piercing',
        weight: 4,
        properties: 'thrown (range 20/60), versatile (1d8)'
      },
      'war pick': {
        cost: '5 gp',
        damage: '1d8piercing',
        weight: 2,
        properties: null
      },
      warhammer: {
        cost: '15 gp',
        damage: '1d8 bludgeoning',
        weight: 2,
        properties: 'versatile (1d10)'
      },
      whip: {
        cost: '2 gp',
        damage: '`d4 slashing`',
        weight: 3,
        properties: 'finesse, reach'
      }
    }
  },
  rollDice: (count, size) => {
    let i; const RESULTS = []
    for (i = 0; i < count; i += 1) {
      // for each roll
      RESULTS[i] = Math.floor(Math.random() * size) + 1
    }
    return RESULTS.sort((a, b) => b - a)
  },
  calculateAbilityScoreModifier: (score, showSign = true) => {
    const modifier = Math.floor((score - 10) / 2)
    if (showSign === true) {
      const sign = (modifier >= 0) ? '+' : ''
      return sign + modifier
    }
    return modifier
  },
  generateNPC: (props) => {
    props.race = (props.race) ? props.race : selectRandomArrayElement(
      module.exports.races
    )
    props.class = (props.class) ? props.class : selectRandomArrayElement(
      module.exports.classes
    )
    props.level = (props.level) ? props.level : (Math.floor(Math.random() * 4) + 1)

    let n
    let abilityScoreKeys = []
    const npc = {}
    const abilityRolls = generateAbilityScore()

    // create race object
    npc.race = props.race
    npc.raceObject = module.exports.races[props.race]

    // create class branch
    npc.class = props.class
    npc.classObject = module.exports.classes[props.class]

    // set level
    npc.level = props.level

    // create abilityScore branch
    npc.abilityScore = abilityScore

    // generate alignment
    // setup alignment odds
    let alignmentTotal = 0
    const alignmentKeys = Object.keys(npc.raceObject.alignment)
    for (const key in alignmentKeys) {
      const value = npc.raceObject.alignment[alignmentKeys[key]]
      // add current total to object so I can figure out alignment based on odds
      npc.raceObject.alignment[alignmentKeys[key]] += alignmentTotal
      // add to total
      alignmentTotal += value
    }

    // generate number 1 - total
    const odds = Math.floor(Math.random() * alignmentTotal) + 1

    // get alignment based on odds
    for (const key in alignmentKeys) {
      const value = npc.raceObject.alignment[alignmentKeys[key]]
      const prevVal = (npc.raceObject.alignment[alignmentKeys[key - 1]]) ? npc.raceObject.alignment[alignmentKeys[key - 1]] : 0
      if (odds > prevVal && odds <= value) {
        npc.alignment = alignmentKeys[key]
        break
      }
    }

    // get second half of alignment
    const alignmentEnding = alignments[selectRandomArrayElement(alignments)]
    if (npc.alignment !== alignmentEnding) {
      npc.alignment += ' ' + alignmentEnding
    }

    // get default ability abilityScoreKeys
    abilityScoreKeys = Object.keys(abilityScore)
    npc.classObject.abilityPriority.forEach(function (key) {
      setAbilityScore(key, npc, abilityRolls, abilityScoreKeys)
    })

    while (abilityScoreKeys.length > 0) {
      // get random number from keys
      n = Math.floor(Math.random() * abilityScoreKeys.length) + 1
      // set ability scores
      setAbilityScore(abilityScoreKeys[n - 1], npc, abilityRolls, abilityScoreKeys)
    }

    // generate health points
    const hpMod = module.exports.calculateAbilityScoreModifier(
      npc.abilityScore[npc.classObject.hpMod], false
    )
    for (let i = 0; i < props.level; i++) {
      if (i === 0) {
        // set initial health
        npc.hp = npc.classObject.initialHP + hpMod
      } else {
        // add to health
        npc.hp += module.exports.rollDice(
          npc.classObject.hitDie[0],
          npc.classObject.hitDie[0]
        )[0] + hpMod
      }
    }

    // generate background
    const backgroundKeys = Object.keys(module.exports.backgrounds)
    const background = backgroundKeys[
      Math.floor(Math.random() * backgroundKeys.length)
    ]
    npc.backgroundObject = module.exports.backgrounds[
      background
    ]
    npc.background = background

    // generate a gender
    const genderOdds = module.exports.rollDice(1, 100)
    if (genderOdds <= 45) {
      // set gender
      npc.gender = 'female'
      // set name
      npc.name = npc.raceObject.namesFemale[
        selectRandomArrayElement(npc.raceObject.namesFemale)
      ]
    } else if (genderOdds <= 90) {
      // set gender
      npc.gender = 'male'
      // set male
      npc.name = npc.raceObject.namesMale[
        selectRandomArrayElement(npc.raceObject.namesMale)
      ]
    } else if (genderOdds <= 98) {
      // set gender
      npc.gender = 'non-binary'
      // set name
      const names = npc.raceObject.namesFemale
      names.concat(npc.raceObject.namesMale)
      npc.name = names[
        selectRandomArrayElement(names)
      ]
    } else {
      // set gender
      npc.gender = 'gender neutral'
      // set name
      const names = npc.raceObject.namesFemale
      names.concat(npc.raceObject.namesMale)
      npc.name = names[
        Math.floor(Math.random() * names.length)
      ]
    }
    // last name
    npc.name += ' ' + npc.raceObject.namesLast[
      selectRandomArrayElement(npc.raceObject.namesLast)
    ]

    npc.weapons = {}
    // for each weapon slot
    npc.classObject.weapons.forEach(options => {
      // if there are multiple options, select random option
      const choice = options[selectRandomArrayElement(options)]
      // for each weapon in selected option, get weapon
      choice.forEach(key => {
        if (module.exports.weapons[key]) {
          // choose random weapon in weapon section
          const keys = Object.keys(module.exports.weapons[key])
          const i = Math.floor(Math.random() * keys.length)
          npc.weapons[keys[i]] = module.exports.weapons[key][keys[i]]
        } else {
          // it is a specific weapon
          const weapons = {}
          for (const index in module.exports.weapons) {
            for (const weapon in module.exports.weapons[index]) {
              weapons[weapon] = module.exports.weapons[index][weapon]
            }
          }
          if (weapons[key]) {
            npc.weapons[key] = weapons[key]
          }
        }
      })
    })

    // get the first ability score from class
    // add highest roll

    return npc
  }
}
