module.exports = {
  execute (msg) {
    // delete mentions (id numbers were setting off emoji)
    const string = msg.content.replace(/<@!.{18}>/g, '').toLowerCase()
    switch (true) {
      case (string.indexOf('angel') >= 0):
        msg.react('😇')
        return true
      case (string.indexOf(' hell ') >= 0):
      case (string.indexOf('demon') >= 0):
        msg.react('👹')
        return true
      case (string.indexOf('69') >= 0):
      case (string.indexOf('sixtynine') >= 0):
      case (string.indexOf('sixty-nine') >= 0):
        msg.react('🇳')
        msg.react('🇮')
        msg.react('🇨')
        msg.react('🇪')
        return true
      case (string.indexOf('sick') >= 0):
      case (string.indexOf('unwell') >= 0):
      case (string.indexOf(' ill ') >= 0):
        msg.react('🤒')
        return true
      case (string.indexOf('cold') >= 0):
        msg.react('🥶')
        return true
      case (string.indexOf('gross') >= 0):
      case (string.indexOf('disgust') >= 0):
        msg.react('🤢')
        return true
      case (string.indexOf('vomit') >= 0):
      case (string.indexOf('throwup') >= 0):
      case (string.indexOf('throw up') >= 0):
      case (string.indexOf('throw-up') >= 0):
        msg.react('🤮')
        return true
      case (string.indexOf('420') >= 0):
      case (string.indexOf('four twenty') >= 0):
      case (string.indexOf('four-twenty') >= 0):
      case (string.indexOf('four hundred and twenty') >= 0):
        msg.react('🔥')
        return true
      case (string.indexOf('clown') >= 0):
        msg.react('🤡')
        return true
      case (string.indexOf('robot') >= 0):
        msg.react('🤖')
        return true
      case (string.indexOf('cowboy') >= 0):
      case (string.indexOf('yeehaw') >= 0):
      case (string.indexOf('yee-haw') >= 0):
      case (string.indexOf('yeha') >= 0):
      case (string.indexOf('yee haw') >= 0):
        msg.react('🤠')
        return true
      case (string.indexOf('disguise') >= 0):
        msg.react('🥸')
        return true
      case (string.indexOf('ghost') >= 0):
      case (string.indexOf('spooky') >= 0):
      case (string.indexOf('spoopy') >= 0):
        msg.react('👻')
        return true
      case (string.indexOf('dino') >= 0):
        msg.react('🦕')
        return true
      case (string.indexOf('tyrannosaurus') >= 0):
      case (string.indexOf('rex') >= 0):
        msg.react('🦖')
        return true
      case (string.indexOf('alien') >= 0):
      case (string.indexOf('david bowie') >= 0):
        msg.react('👽')
        return true
      case (string === 'poo'):
      case (string.indexOf('poop') >= 0):
        msg.react('💩')
        return true
      case (string.indexOf('corona') >= 0):
      case (string.indexOf('covid') >= 0):
        msg.react('🦠')
        msg.react('🧼')
        msg.react('😷')
        return true
      case (string.indexOf('soap') >= 0):
        msg.react('🧼')
        return true
      case (string === 'ok'):
        msg.react('👌')
        return true
      case (string.indexOf('this close') >= 0):
        msg.react('🤏')
        return true
      case (string.indexOf('spock') >= 0):
      case (string.indexOf('vulcan') >= 0):
      case (string.indexOf('live long and prosper') >= 0):
        msg.react('🖖')
        return true
      case (string.indexOf('incognito') >= 0):
        msg.react('🕵️‍♂️')
        return true
      case (string.indexOf('santa') >= 0):
      case (string.indexOf('christmas') >= 0):
        msg.react('🎅')
        return true
      case (string.indexOf('ninja') >= 0):
        msg.react('🥷')
        return true
      case (string.indexOf('cook') >= 0):
        msg.react('👨‍🍳')
        return true
      case (string.indexOf('doctor') >= 0):
      case (string.indexOf('nurse') >= 0):
        msg.react('👩‍⚕️')
        return true
      case (string.indexOf('mermaid') >= 0):
        msg.react('🧜‍♀️')
        return true
      case (string.indexOf('party') >= 0):
        msg.react('👯')
        return true
      case (string.indexOf('underwear') >= 0):
        msg.react('🩲')
        return true
      case (string.indexOf('glove') >= 0):
        msg.react('🧤')
        return true
      case (string.indexOf('monkey') >= 0):
        msg.react('🐵')
        return true
      case (string.indexOf('gorilla') >= 0):
        msg.react('🦍')
        return true
      case (string.indexOf('moon') >= 0):
        msg.react('🌜')
        return true
      case (string.indexOf('earth') >= 0):
        msg.react('🌎')
        return true
      case (string.indexOf('planet') >= 0):
        msg.react('🪐')
        return true
      case (string.indexOf('otter') >= 0):
        msg.react('🦦')
        return true
      case (string.indexOf('snowman') >= 0):
      case (string.indexOf('snowboy') >= 0):
        msg.react('☃️')
        return true
      case (string.indexOf('avocado') >= 0):
      case (string.indexOf('free shavocado') >= 0):
        msg.react('🥑')
        return true
      case (string.indexOf('eggplant') >= 0):
      case (string.indexOf('peepee') >= 0):
        msg.react('🍆')
        return true
      case (string.indexOf('peach') >= 0):
      case (string.indexOf('bottom') >= 0):
      case (string.indexOf('booty') >= 0):
        msg.react('🍑')
        return true
      case (string.indexOf('cookie') >= 0):
        msg.react('🍪')
        return true
      case (string.indexOf('fishing') >= 0):
      case (string.indexOf('fish') >= 0):
        msg.react('🎣')
        return true
      case (string.indexOf('award') >= 0):
      case (string.indexOf('medal') >= 0):
      case (string.indexOf('first place') >= 0):
      case (string.indexOf('last place') >= 0):
        msg.react('🏆')
        return true
      case (string.indexOf('delivery truck') >= 0):
        msg.react('🚚')
        return true
      case (string.indexOf('pickup truck') >= 0):
        msg.react('🛻')
        return true
      case (string.indexOf('fire truck') >= 0):
      case (string.indexOf('firetruck') >= 0):
      case (string.indexOf('fire engine') >= 0):
      case (string.indexOf('fire-engine') >= 0):
        msg.react('🚒')
        return true
      case (string.indexOf('police car') >= 0):
        msg.react('🚓')
        return true
      case (string.indexOf('race car') >= 0):
      case (string.indexOf('racecar') >= 0):
      case (string.indexOf('racing car') >= 0):
        msg.react('🏎️')
        return true
      case (string.indexOf('flying saucer') >= 0):
      case (string.indexOf('ufo') >= 0):
        msg.react('🛸')
        return true
      case (string.indexOf('satellite') >= 0):
        msg.react('🛰️')
        return true
      case (string.indexOf('rocket') >= 0):
      case (string.indexOf('spaceship') >= 0):
      case (string.indexOf('space ship') >= 0):
      case (string.indexOf('falcon nine') >= 0):
        msg.react('🚀')
        return true
      case (string.indexOf('helicopter') >= 0):
        msg.react('🚁')
        return true
      case (string.indexOf('volcano') >= 0):
      case (string.indexOf('erupt') >= 0):
      case (string.indexOf('burst') >= 0):
        msg.react('🌋')
        return true
      case (string.indexOf('trackball') >= 0):
        msg.react('🖲️')
        return true
      case (string.indexOf('joystick') >= 0):
        msg.react('🕹️')
        return true
      case (string.indexOf('money') >= 0):
      case (string.indexOf('dollar') >= 0):
      case (string.indexOf('cash') >= 0):
        msg.react('💵')
        return true
      case (string.indexOf('shower') >= 0):
        msg.react('🚿')
        return true
      case (string.indexOf('100%') >= 0):
        msg.react('💯')
        return true
      case (string.indexOf('10 o\'clock') >= 0):
      case (string.indexOf('ten o\'clock') >= 0):
      case (string.indexOf('10 am') >= 0):
      case (string.indexOf('10am') >= 0):
      case (string.indexOf('10 pm') >= 0):
      case (string.indexOf('10pm') >= 0):
        msg.react('🕙')
        return true
      case (string.indexOf('11 o\'clock') >= 0):
      case (string.indexOf('eleven o\'clock') >= 0):
      case (string.indexOf('11 am') >= 0):
      case (string.indexOf('11am') >= 0):
      case (string.indexOf('11 pm') >= 0):
      case (string.indexOf('11pm') >= 0):
        msg.react('🕚')
        return true
      case (string.indexOf('12 o\'clock') >= 0):
      case (string.indexOf('twelve o\'clock') >= 0):
      case (string.indexOf('12 am') >= 0):
      case (string.indexOf('12am') >= 0):
      case (string.indexOf('12 pm') >= 0):
      case (string.indexOf('12pm') >= 0):
        msg.react('🕛')
        return true
      case (string.indexOf('1 o\'clock') >= 0):
      case (string.indexOf('one o\'clock') >= 0):
      case (string.indexOf('1 am') >= 0):
      case (string.indexOf('1am') >= 0):
      case (string.indexOf('1 pm') >= 0):
      case (string.indexOf('1pm') >= 0):
        msg.react('🕐')
        return true
      case (string.indexOf('2 o\'clock') >= 0):
      case (string.indexOf('two o\'clock') >= 0):
      case (string.indexOf('2 am') >= 0):
      case (string.indexOf('2am') >= 0):
      case (string.indexOf('2 pm') >= 0):
      case (string.indexOf('2pm') >= 0):
        msg.react('🕑')
        return true
      case (string.indexOf('3 o\'clock') >= 0):
      case (string.indexOf('three o\'clock') >= 0):
      case (string.indexOf('3 am') >= 0):
      case (string.indexOf('3am') >= 0):
      case (string.indexOf('3 pm') >= 0):
      case (string.indexOf('3pm') >= 0):
        msg.react('🕒')
        return true
      case (string.indexOf('4 o\'clock') >= 0):
      case (string.indexOf('four o\'clock') >= 0):
      case (string.indexOf('4 am') >= 0):
      case (string.indexOf('4am') >= 0):
      case (string.indexOf('4 pm') >= 0):
      case (string.indexOf('4pm') >= 0):
        msg.react('🕓')
        return true
      case (string.indexOf('5 o\'clock') >= 0):
      case (string.indexOf('five o\'clock') >= 0):
      case (string.indexOf('5 am') >= 0):
      case (string.indexOf('5am') >= 0):
      case (string.indexOf('5 pm') >= 0):
      case (string.indexOf('5pm') >= 0):
        msg.react('🕔')
        return true
      case (string.indexOf('6 o\'clock') >= 0):
      case (string.indexOf('six o\'clock') >= 0):
      case (string.indexOf('6 am') >= 0):
      case (string.indexOf('6am') >= 0):
      case (string.indexOf('6 pm') >= 0):
      case (string.indexOf('6pm') >= 0):
        msg.react('🕕')
        return true
      case (string.indexOf('7 o\'clock') >= 0):
      case (string.indexOf('seven o\'clock') >= 0):
      case (string.indexOf('7 am') >= 0):
      case (string.indexOf('7am') >= 0):
      case (string.indexOf('7 pm') >= 0):
      case (string.indexOf('7pm') >= 0):
        msg.react('🕖')
        return true
      case (string.indexOf('8 o\'clock') >= 0):
      case (string.indexOf('eight o\'clock') >= 0):
      case (string.indexOf('8 am') >= 0):
      case (string.indexOf('8am') >= 0):
      case (string.indexOf('8 pm') >= 0):
      case (string.indexOf('8pm') >= 0):
        msg.react('🕗')
        return true
      case (string.indexOf('9 o\'clock') >= 0):
      case (string.indexOf('nine o\'clock') >= 0):
      case (string.indexOf('9 am') >= 0):
      case (string.indexOf('9am') >= 0):
      case (string.indexOf('9 pm') >= 0):
      case (string.indexOf('9pm') >= 0):
        msg.react('🕘')
        return true
      default:
        return false
    }
  }
}
