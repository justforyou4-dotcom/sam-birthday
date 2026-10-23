/* ==========================================================================
   CONTENT — this is the only file you need to edit.
   ========================================================================== */
window.GIFT = {

  /* 1) RECIPIENT'S NAME — used wherever you see {name} in the messages. */
  name: "Sam",

  /* 2) BIRTHDAY AGE — used wherever you see {age}. Keep "+1" or write e.g. "23". */
  age: "+1",

  /* 3) MUSIC — put your song at assets/music/song.mp3 (or change the path).
        It only starts after he taps the "Open your gift" button. */
  music: { src: "assets/music/song.mp3", volume: 0.6 },

  /* 4) IMAGES — drop your photos into assets/images/ using these exact names
        (or change the paths). Until a photo exists, a soft placeholder shows.
        ratio = the placeholder shape only; real photos always show uncropped. */
  images: {
    boy:     { src: "assets/images/01-boy.jpg",                   alt: "Him",                        ratio: "1/1", shape: "round" },
    couple:  { src: "assets/images/02-couple.jpg",                alt: "The two of us together",     ratio: "1/1" },
    collage: { src: "assets/images/03-thinking-collage.jpg",      alt: "Thinking about each other",  ratio: "1/1" },
    look:    { src: "assets/images/04-looking-at-each-other.jpg", alt: "Looking at each other",      ratio: "1374/1145" }
  },

  /* 5) MESSAGES — each scene is a list of lines that appear one after another.
        - plain text            -> a normal line
        - {t:"text", style:"big|soft|gold|frag|hint|body", wait:1500}
            style = look of the line, wait = pause (ms) before it appears
        - {image:"couple"}      -> shows one of the images above
        - {button:"label"}      -> the open button (opening scene only)
        Use \n for a line break. {name} and {age} are filled in automatically. */
  scenes: [

    /* SCENE 1 — THE MYSTERY OPENING */
    { id: "gate", type: "gate", lines: [
      { t: "Hey birthday boy… 🎂", style: "big", wait: 900 },
      { t: "Before you scroll…\nI made something for you.", wait: 2200 },
      { t: "You might think this is just a birthday message…", style: "soft", wait: 2800 },
      { t: "But I promise… there’s a little more to it.", style: "gold", wait: 3000 },
      { button: "Open your gift →", wait: 1800 },
      { t: "Best experienced with sound on 🎵", style: "hint", wait: 600 }
    ]},

    /* SCENE 2 — THE FIRST TWIST */
    { id: "twist", type: "text", lines: [
      { t: "Happy {age}. ❤️", style: "big", wait: 600 },
      { image: "boy", wait: 1200 },
      { t: "Another year.\nAnother chapter.", wait: 1800 },
      { t: "And somehow, I get to be part of some of your memories.", wait: 2200 },
      { t: "But let me show you something…", style: "soft", wait: 2600 }
    ]},

    /* SCENE 3 — THINKING ABOUT EACH OTHER */
    { id: "thinking", type: "photo", lines: [
      { t: "Funny how someone can be somewhere else…", wait: 600 },
      { t: "…and still somehow be on your mind.", wait: 2200 },
      { image: "collage", wait: 1800 },
      { t: "Maybe that’s one of the little things that makes this special.", style: "soft", wait: 2400 }
    ]},

    /* SCENE 4 — THE MEMORY */
    { id: "memory", type: "photo", lines: [
      { t: "Some pictures are just pictures.", wait: 600 },
      { t: "And then there are the ones that somehow hold an entire moment.", wait: 2600 },
      { image: "couple", wait: 1800 },
      { t: "This is one of those.", style: "gold", wait: 2400 }
    ]},

    /* SCENE 5 — THE LITTLE THINGS */
    { id: "little", type: "fragments", lines: [
      { t: "The laughs.", style: "frag", wait: 500 },
      { t: "The random moments.", style: "frag", wait: 1100 },
      { t: "The looks.", style: "frag", wait: 1100 },
      { t: "The conversations.", style: "frag", wait: 1100 },
      { t: "The memories we didn’t know we’d remember.", style: "frag", wait: 1300 },
      { t: "It’s the little things that become the big memories.", style: "big", wait: 2600 }
    ]},

    /* SCENE 6 — THE LOOK (slowest scene, on purpose) */
    { id: "look", type: "look", lines: [
      { t: "And sometimes…", style: "soft", wait: 800 },
      { t: "You don’t need a whole paragraph to explain what a moment means.", wait: 3000 },
      { image: "look", wait: 3200 },
      { t: "One look can say enough.", style: "gold", wait: 4200 }
    ]},

    /* SCENE 7 — THE REAL GIFT */
    { id: "gift", type: "gift", lines: [
      { t: "So… what did I actually get you?", style: "big", wait: 700 },
      { t: "Not a box.", wait: 3000 },
      { t: "Not a ribbon.", wait: 1500 },
      { t: "Not something you can put on a shelf.", wait: 1500 },
      { t: "I made you a little place on the internet…", wait: 3000 },
      { t: "…just for this.", style: "gold big", wait: 2200 },
      { t: "Because some memories deserve somewhere to live.", style: "soft", wait: 2800 }
    ]},

    /* SCENE 8 — THE BIRTHDAY MESSAGE (edit the wording freely) */
    { id: "message", type: "message", card: true, lines: [
      { t: "Happy birthday, {name}.", style: "big", wait: 600 },
      { t: "I hope this new year of your life brings you growth, happiness, good memories and beautiful opportunities.", style: "body", wait: 2200 },
      { t: "I hope you keep becoming the person you’re meant to be.", style: "body", wait: 2800 },
      { t: "And I hope that when you look back at this little website someday, it makes you smile.", style: "body", wait: 2800 },
      { t: "Happy {age}. 🎂❤️", style: "gold big", wait: 2600 },
      { t: "Here’s to another chapter.", style: "soft", wait: 1800 }
    ]},

    /* SCENE 9 — FINAL SIGN-OFF */
    { id: "end", type: "end", lines: [
      { t: "Thank you for being you.", style: "big", wait: 600 },
      { t: "Now go enjoy your birthday. 😂🎂", wait: 2200 },
      { t: "Made Just For You ❤️", style: "hint", wait: 2600 },
      { t: "— Bella", style: "soft", wait: 1400 }   /* FINAL SIGN-OFF: change "Bella" here */
    ]}
  ]
};
