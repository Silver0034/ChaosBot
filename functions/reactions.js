module.exports = {
  execute (msg) {
    switch (true) {
      case (msg.content.toLowerCase().indexOf('angel') >= 0):
        msg.react('😇')
        return true
      case (msg.content.toLowerCase().indexOf('hell') >= 0):
      case (msg.content.toLowerCase().indexOf('demon') >= 0):
        msg.react('👹')
        return true
      case (msg.content.toLowerCase().indexOf('69') >= 0):
      case (msg.content.toLowerCase().indexOf('sixtynine') >= 0):
      case (msg.content.toLowerCase().indexOf('sixty-nine') >= 0):
        msg.react('🇳')
        msg.react('🇮')
        msg.react('🇨')
        msg.react('🇪')
        return true
      case (msg.content.toLowerCase().indexOf('sick') >= 0):
      case (msg.content.toLowerCase().indexOf('unwell') >= 0):
      case (msg.content.toLowerCase().indexOf(' ill') >= 0):
        msg.react('🤒')
        return true
      case (msg.content.toLowerCase().indexOf('cold') >= 0):
        msg.react('🥶')
        return true
      case (msg.content.toLowerCase().indexOf('gross') >= 0):
      case (msg.content.toLowerCase().indexOf('disgust') >= 0):
        msg.react('🤢')
        return true
      case (msg.content.toLowerCase().indexOf('vomit') >= 0):
      case (msg.content.toLowerCase().indexOf('throwup') >= 0):
      case (msg.content.toLowerCase().indexOf('throw up') >= 0):
      case (msg.content.toLowerCase().indexOf('throw-up') >= 0):
        msg.react('🤮')
        return true
      case (msg.content.toLowerCase().indexOf('420') >= 0):
      case (msg.content.toLowerCase().indexOf('four twenty') >= 0):
      case (msg.content.toLowerCase().indexOf('four-twenty') >= 0):
      case (msg.content.toLowerCase().indexOf('four hundred and twenty') >= 0):
        msg.react('🔥')
        return true
      case (msg.content.toLowerCase().indexOf('clown') >= 0):
        msg.react('🤡')
        return true
      case (msg.content.toLowerCase().indexOf('robot') >= 0):
        msg.react('🤖')
        return true
      case (msg.content.toLowerCase().indexOf('cowboy') >= 0):
      case (msg.content.toLowerCase().indexOf('yeehaw') >= 0):
      case (msg.content.toLowerCase().indexOf('yee-haw') >= 0):
      case (msg.content.toLowerCase().indexOf('yeha') >= 0):
      case (msg.content.toLowerCase().indexOf('yee haw') >= 0):
        msg.react('🤠')
        return true
      case (msg.content.toLowerCase().indexOf('disguise') >= 0):
        msg.react('🥸')
        return true
      case (msg.content.toLowerCase().indexOf('ghost') >= 0):
      case (msg.content.toLowerCase().indexOf('spooky') >= 0):
      case (msg.content.toLowerCase().indexOf('spoopy') >= 0):
        msg.react('👻')
        return true
      case (msg.content.toLowerCase().indexOf('dino') >= 0):
        msg.react('🦕')
        return true
      case (msg.content.toLowerCase().indexOf('tyrannosaurus') >= 0):
      case (msg.content.toLowerCase().indexOf('rex') >= 0):
        msg.react('🦖')
        return true
      case (msg.content.toLowerCase().indexOf('space') >= 0):
      case (msg.content.toLowerCase().indexOf('alien') >= 0):
      case (msg.content.toLowerCase().indexOf('star') >= 0):
      case (msg.content.toLowerCase().indexOf('bowie') >= 0):
        msg.react('👽')
        return true
      case (msg.content.toLowerCase() === 'poo'):
      case (msg.content.toLowerCase().indexOf('poop') >= 0):
        msg.react('💩')
        return true
      case (msg.content.toLowerCase().indexOf('corona') >= 0):
        msg.react('🦠')
        msg.react('🧼')
        msg.react('😷')
        return true
      case (msg.content.toLowerCase().indexOf('soap') >= 0):
        msg.react('🧼')
        return true
      case (msg.content.toLowerCase().indexOf('dislike') >= 0):
        msg.react('👎')
        return true
      case (msg.content.toLowerCase().indexOf('like') >= 0):
        msg.react('👍')
        return true
      case (msg.content.toLowerCase() === 'ok'):
        msg.react('👌')
        return true
      case (msg.content.toLowerCase().indexOf('this close') >= 0):
        msg.react('🤏')
        return true
      case (msg.content.toLowerCase().indexOf('spock') >= 0):
      case (msg.content.toLowerCase().indexOf('vulcan') >= 0):
      case (msg.content.toLowerCase().indexOf('live long and prosper') >= 0):
        msg.react('🖖')
        return true
      case (msg.content.toLowerCase().indexOf('incognito') >= 0):
        msg.react('🕵️‍♂️')
        return true
      case (msg.content.toLowerCase().indexOf('santa') >= 0):
      case (msg.content.toLowerCase().indexOf('christmas') >= 0):
        msg.react('🎅')
        return true
      case (msg.content.toLowerCase().indexOf('ninja') >= 0):
        msg.react('🥷')
        return true
      case (msg.content.toLowerCase().indexOf('cook') >= 0):
        msg.react('👨‍🍳')
        return true
      case (msg.content.toLowerCase().indexOf('doctor') >= 0):
      case (msg.content.toLowerCase().indexOf('nurse') >= 0):
        msg.react('👩‍⚕️')
        return true
      case (msg.content.toLowerCase().indexOf('mermaid') >= 0):
        msg.react('🧜‍♀️')
        return true
      case (msg.content.toLowerCase().indexOf('party') >= 0):
        msg.react('👯')
        return true
      case (msg.content.toLowerCase().indexOf('underwear') >= 0):
        msg.react('🩲')
        return true
      case (msg.content.toLowerCase().indexOf('glove') >= 0):
        msg.react('🧤')
        return true
      case (msg.content.toLowerCase().indexOf('ring') >= 0):
        msg.react('💍')
        return true
      case (msg.content.toLowerCase().indexOf('monkey') >= 0):
        msg.react('🐵')
        return true
      case (msg.content.toLowerCase().indexOf('gorilla') >= 0):
        msg.react('🦍')
        return true
      case (msg.content.toLowerCase().indexOf('moon') >= 0):
        msg.react('🌜')
        return true
      case (msg.content.toLowerCase().indexOf('earth') >= 0):
        msg.react('🌎')
        return true
      case (msg.content.toLowerCase().indexOf('planet') >= 0):
        msg.react('🪐')
        return true
      case (msg.content.toLowerCase().indexOf('otter') >= 0):
        msg.react('🦦')
        return true
      case (msg.content.toLowerCase().indexOf('snowman') >= 0):
      case (msg.content.toLowerCase().indexOf('snowboy') >= 0):
        msg.react('☃️')
        return true
      case (msg.content.toLowerCase().indexOf('avocado') >= 0):
      case (msg.content.toLowerCase().indexOf('free shavocado') >= 0):
        msg.react('🥑')
        return true
      case (msg.content.toLowerCase().indexOf('eggplant') >= 0):
      case (msg.content.toLowerCase().indexOf('dick') >= 0):
        msg.react('🍆')
        return true
      case (msg.content.toLowerCase().indexOf('peach') >= 0):
      case (msg.content.toLowerCase().indexOf('bottom') >= 0):
      case (msg.content.toLowerCase().indexOf('booty') >= 0):
        msg.react('🍑')
        return true
      case (msg.content.toLowerCase().indexOf('cookie') >= 0):
        msg.react('🍪')
        return true
      case (msg.content.toLowerCase().indexOf('fishing') >= 0):
      case (msg.content.toLowerCase().indexOf('fish') >= 0):
        msg.react('🎣')
        return true
      case (msg.content.toLowerCase().indexOf('award') >= 0):
      case (msg.content.toLowerCase().indexOf('medal') >= 0):
      case (msg.content.toLowerCase().indexOf('first place') >= 0):
      case (msg.content.toLowerCase().indexOf('last place') >= 0):
        msg.react('🏆')
        return true
      case (msg.content.toLowerCase().indexOf('delivery truck') >= 0):
        msg.react('🚚')
        return true
      case (msg.content.toLowerCase().indexOf('pickup truck') >= 0):
        msg.react('🛻')
        return true
      case (msg.content.toLowerCase().indexOf('fire truck') >= 0):
      case (msg.content.toLowerCase().indexOf('firetruck') >= 0):
      case (msg.content.toLowerCase().indexOf('fire engine') >= 0):
      case (msg.content.toLowerCase().indexOf('fire-engine') >= 0):
        msg.react('🚒')
        return true
      case (msg.content.toLowerCase().indexOf('police car') >= 0):
        msg.react('🚓')
        return true
      case (msg.content.toLowerCase().indexOf('race car') >= 0):
      case (msg.content.toLowerCase().indexOf('racecar') >= 0):
      case (msg.content.toLowerCase().indexOf('racing car') >= 0):
        msg.react('🏎️')
        return true
      case (msg.content.toLowerCase().indexOf('flying saucer') >= 0):
      case (msg.content.toLowerCase().indexOf('ufo') >= 0):
        msg.react('🛸')
        return true
      case (msg.content.toLowerCase().indexOf('satellite') >= 0):
        msg.react('🛰️')
        return true
      case (msg.content.toLowerCase().indexOf('rocket') >= 0):
      case (msg.content.toLowerCase().indexOf('spaceship') >= 0):
      case (msg.content.toLowerCase().indexOf('space ship') >= 0):
      case (msg.content.toLowerCase().indexOf('falcon nine') >= 0):
        msg.react('🚀')
        return true
      case (msg.content.toLowerCase().indexOf('helicopter') >= 0):
        msg.react('🚁')
        return true
      case (msg.content.toLowerCase().indexOf('volcano') >= 0):
      case (msg.content.toLowerCase().indexOf('erupt') >= 0):
      case (msg.content.toLowerCase().indexOf('burst') >= 0):
        msg.react('🌋')
        return true
      case (msg.content.toLowerCase().indexOf('trackball') >= 0):
        msg.react('🖲️')
        return true
      case (msg.content.toLowerCase().indexOf('joystick') >= 0):
        msg.react('🕹️')
        return true
      case (msg.content.toLowerCase().indexOf('money') >= 0):
      case (msg.content.toLowerCase().indexOf('dollar') >= 0):
      case (msg.content.toLowerCase().indexOf('cash') >= 0):
        msg.react('💵')
        return true
      case (msg.content.toLowerCase().indexOf('shower') >= 0):
        msg.react('🚿')
        return true
      case (msg.content.toLowerCase().indexOf('100%') >= 0):
        msg.react('💯')
        return true
      case (msg.content.toLowerCase().indexOf('10 o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('ten o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('10 am') >= 0):
      case (msg.content.toLowerCase().indexOf('10am') >= 0):
      case (msg.content.toLowerCase().indexOf('10 pm') >= 0):
      case (msg.content.toLowerCase().indexOf('10pm') >= 0):
        msg.react('🕙')
        return true
      case (msg.content.toLowerCase().indexOf('11 o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('eleven o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('11 am') >= 0):
      case (msg.content.toLowerCase().indexOf('11am') >= 0):
      case (msg.content.toLowerCase().indexOf('11 pm') >= 0):
      case (msg.content.toLowerCase().indexOf('11pm') >= 0):
        msg.react('🕚')
        return true
      case (msg.content.toLowerCase().indexOf('12 o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('twelve o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('12 am') >= 0):
      case (msg.content.toLowerCase().indexOf('12am') >= 0):
      case (msg.content.toLowerCase().indexOf('12 pm') >= 0):
      case (msg.content.toLowerCase().indexOf('12pm') >= 0):
        msg.react('🕛')
        return true
      case (msg.content.toLowerCase().indexOf('1 o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('one o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('1 am') >= 0):
      case (msg.content.toLowerCase().indexOf('1am') >= 0):
      case (msg.content.toLowerCase().indexOf('1 pm') >= 0):
      case (msg.content.toLowerCase().indexOf('1pm') >= 0):
        msg.react('🕐')
        return true
      case (msg.content.toLowerCase().indexOf('2 o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('two o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('2 am') >= 0):
      case (msg.content.toLowerCase().indexOf('2am') >= 0):
      case (msg.content.toLowerCase().indexOf('2 pm') >= 0):
      case (msg.content.toLowerCase().indexOf('2pm') >= 0):
        msg.react('🕑')
        return true
      case (msg.content.toLowerCase().indexOf('3 o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('three o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('3 am') >= 0):
      case (msg.content.toLowerCase().indexOf('3am') >= 0):
      case (msg.content.toLowerCase().indexOf('3 pm') >= 0):
      case (msg.content.toLowerCase().indexOf('3pm') >= 0):
        msg.react('🕒')
        return true
      case (msg.content.toLowerCase().indexOf('4 o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('four o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('4 am') >= 0):
      case (msg.content.toLowerCase().indexOf('4am') >= 0):
      case (msg.content.toLowerCase().indexOf('4 pm') >= 0):
      case (msg.content.toLowerCase().indexOf('4pm') >= 0):
        msg.react('🕓')
        return true
      case (msg.content.toLowerCase().indexOf('5 o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('five o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('5 am') >= 0):
      case (msg.content.toLowerCase().indexOf('5am') >= 0):
      case (msg.content.toLowerCase().indexOf('5 pm') >= 0):
      case (msg.content.toLowerCase().indexOf('5pm') >= 0):
        msg.react('🕔')
        return true
      case (msg.content.toLowerCase().indexOf('6 o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('six o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('6 am') >= 0):
      case (msg.content.toLowerCase().indexOf('6am') >= 0):
      case (msg.content.toLowerCase().indexOf('6 pm') >= 0):
      case (msg.content.toLowerCase().indexOf('6pm') >= 0):
        msg.react('🕕')
        return true
      case (msg.content.toLowerCase().indexOf('7 o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('seven o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('7 am') >= 0):
      case (msg.content.toLowerCase().indexOf('7am') >= 0):
      case (msg.content.toLowerCase().indexOf('7 pm') >= 0):
      case (msg.content.toLowerCase().indexOf('7pm') >= 0):
        msg.react('🕖')
        return true
      case (msg.content.toLowerCase().indexOf('8 o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('eight o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('8 am') >= 0):
      case (msg.content.toLowerCase().indexOf('8am') >= 0):
      case (msg.content.toLowerCase().indexOf('8 pm') >= 0):
      case (msg.content.toLowerCase().indexOf('8pm') >= 0):
        msg.react('🕗')
        return true
      case (msg.content.toLowerCase().indexOf('9 o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('nine o\'clock') >= 0):
      case (msg.content.toLowerCase().indexOf('9 am') >= 0):
      case (msg.content.toLowerCase().indexOf('9am') >= 0):
      case (msg.content.toLowerCase().indexOf('9 pm') >= 0):
      case (msg.content.toLowerCase().indexOf('9pm') >= 0):
        msg.react('🕘')
        return true
      default:
        return false
    }
  }
}
