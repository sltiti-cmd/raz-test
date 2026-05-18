export const placementM = {
  id: "M",
  name: "M级别插班测试",
  passScore: 80,
  printPdf: "/raw/placement/M/M级别测试-无答案.pdf",

  tts: {
    passage: false,
    question: false,
    options: false,
  },

  passages: [
    {
      id: "M1",
      title: "Take Me Seriously",
      type: "fiction",
      typeLabel: "虚构",
      text: `As soon as I saw Top Talent on TV, I wanted to try out.
When the show came to Atlanta, I waited in line with my mother and hundreds of other people.
Everyone was nervous except me.
I was going to surprise them all.

Finally, it was my turn.
The stage lights were hot.
The crowd was silent.

"What's your name?" a judge asked me.

"Mia," I said. "But I call myself Miss Mia."
The crowd laughed.
I'm an eight-year-old girl, so they didn't expect me to be good.

The music came on, and I started rhyming.
Then the crowd started clapping along with me.

By the end, each judge was clapping, too.
"I never expected that," said one of them. "You're amazing!"`,
      questions: [
        {
          id: 1,
          question: "Who told the story?",
          options: [
            { key: "A", text: "a performer in a talent show" },
            { key: "B", text: "a judge at a talent show" },
            { key: "C", text: "a parent of a rapper" },
            { key: "D", text: "a person in an audience" },
          ],
          answer: "A",
          skill: "故事要素",
        },
        {
          id: 2,
          question: "Who waited in line with Mia?",
          options: [
            { key: "A", text: "her friend" },
            { key: "B", text: "her mother" },
            { key: "C", text: "a judge" },
            { key: "D", text: "a rap star" },
          ],
          answer: "B",
          skill: "故事要素",
        },
        {
          id: 3,
          question: "Why did Mia think she would surprise everyone?",
          options: [
            { key: "A", text: "She was eight years old and was better at rapping than most people expected." },
            { key: "B", text: "She had the best stage name of anybody in the talent show competition." },
            { key: "C", text: "She had a big group with her that was ready to jump onstage in the middle of her song." },
            { key: "D", text: "She saw that the judges were friends of her mother, but they had not seen her yet." },
          ],
          answer: "A",
          skill: "推理判断",
        },
        {
          id: 4,
          question: "If a person is nervous, that person is _____.",
          options: [
            { key: "A", text: "sad" },
            { key: "B", text: "brave" },
            { key: "C", text: "worried" },
            { key: "D", text: "skillful" },
          ],
          answer: "C",
          skill: "词汇理解",
        },
        {
          id: 5,
          question: "What was the author's purpose for writing the story?",
          options: [
            { key: "A", text: "to entertain you with a story about a kid rapper" },
            { key: "B", text: "to persuade you that talent show judges are unfair" },
            { key: "C", text: "to teach you ways to be unafraid in front of a crowd" },
            { key: "D", text: "to inform you about young rappers" },
          ],
          answer: "A",
          skill: "作者意图",
        },
      ],
    },

    {
      id: "M2",
      title: "Kid Rappers",
      type: "nonfiction",
      typeLabel: "非虚构",
      text: `Kids have been rappers ever since hip-hop music became popular.
Some became stars.
Will Smith and LL Cool J had hits in their teens.
Other kids had success even before their teens.

The rappers Lil' Romeo and Lil' Bow Wow both gained fame before age thirteen.
Both of them kept rapping.
Each of them dropped the "Lil'" from his name when he got too big.

P-Star was only nine when she rapped at clubs in New York.
A movie about her showed on TV.
P-Star also became an actor.

Some kids get their start on talent shows.
CJ Dippa is just one of the kid rappers who have done well on TV.

Hip-hop is here to stay.
As long as there is hip-hop, there will be kid rappers, too.`,
      questions: [
        {
          id: 6,
          question: "What was the author's purpose for writing the passage?",
          options: [
            { key: "A", text: "to entertain you with funny stories about rappers" },
            { key: "B", text: "to persuade you to practice a skill such as rapping" },
            { key: "C", text: "to inform you about popular kid rappers" },
            { key: "D", text: "to teach you how to write a rap song as a kid" },
          ],
          answer: "A",
          skill: "作者意图",
        },
        {
          id: 7,
          question: "Which rappers first became stars in their teens?",
          options: [
            { key: "A", text: "Will Smith and LL Cool J" },
            { key: "B", text: "Lil' Romeo and Lil' Bow Wow" },
            { key: "C", text: "CJ Dippa and P-Star" },
            { key: "D", text: "LL Cool J and CJ Dippa" },
          ],
          answer: "B",
          skill: "主旨与细节",
        },
        {
          id: 8,
          question: "What does the word talent mean?",
          options: [
            { key: "A", text: "natural kindness" },
            { key: "B", text: "natural grace" },
            { key: "C", text: "natural humor" },
            { key: "D", text: "natural skill" },
          ],
          answer: "A",
          skill: "词汇理解",
        },
        {
          id: 9,
          question: `Why did Lil' Romeo and Lil' Bow Wow change their names?`,
          options: [
            { key: "A", text: "They stopped rapping and wanted to use their real names again." },
            { key: "B", text: `They grew older and thought the "Lil'" in their names made them sound childish.` },
            { key: "C", text: "They found out about each other and didn't want people to confuse them." },
            { key: "D", text: "They grew older and wanted new kid rappers to use the names." },
          ],
          answer: "C",
          skill: "推理判断",
        },
        {
          id: 10,
          question: "What is the best summary of the passage?",
          options: [
            { key: "A", text: "Some rappers gained fame on TV talent shows." },
            { key: "B", text: "Some rappers had success in their teens or earlier." },
            { key: "C", text: "Kid rappers are always better than older rappers." },
            { key: "D", text: "Kids who are rappers often become actors." },
          ],
          answer: "A",
          skill: "主旨与细节",
        },
      ],
    },

    {
      id: "M3",
      title: "One Fast Train Ride",
      type: "fiction",
      typeLabel: "虚构",
      text: `It was Wes's first time visiting Grandma in Japan.
He was tired and grumpy.
He had missed the end of the movie that played during the flight.
Now the flight was getting in late.
He and his parents still had to take a train to Grandma's place.

"Don't worry," said Dad. "It's the bullet train. It won't take long."

They caught the train just before it left.
It was so fast!
Even though Wes was tired, he couldn't stop staring out the window.
Each building went by in a flash.
The scenery changed often as the train zoomed over the land.
It was so quiet that it felt like sitting in a theater.

Grandma met the family on the other end.
"How was the ride?" she asked.

"It was better than a movie," laughed Wes.`,
      questions: [
        {
          id: 11,
          question: "Which of the following is not a reason Wes was grumpy?",
          options: [
            { key: "A", text: "His plane was late." },
            { key: "B", text: "He had missed part of a movie." },
            { key: "C", text: "His train was fast." },
            { key: "D", text: "He was tired." },
          ],
          answer: "C",
          skill: "主旨与细节",
        },
        {
          id: 12,
          question: "Which of the following events happened first?",
          options: [
            { key: "A", text: "Wes took a train ride." },
            { key: "B", text: "Wes arrived in Japan." },
            { key: "C", text: "Wes arrived at a train station." },
            { key: "D", text: "Wes took a flight." },
          ],
          answer: "A",
          skill: "顺序理解",
        },
        {
          id: 13,
          question: "What changed about Wes from the beginning to the end of the story?",
          options: [
            { key: "A", text: "He got scared." },
            { key: "B", text: "He got happier." },
            { key: "C", text: "He got bored." },
            { key: "D", text: "He got angrier." },
          ],
          answer: "D",
          skill: "人物分析",
        },
        {
          id: 14,
          question: "Why did Wes say that the train ride was better than a movie?",
          options: [
            { key: "A", text: "The view had been more exciting than a movie." },
            { key: "B", text: "The ride had been longer than a movie." },
            { key: "C", text: "The train had been quieter than a movie theater." },
            { key: "D", text: "The seats had been more comfortable than movie theater seats." },
          ],
          answer: "B",
          skill: "推理判断",
        },
        {
          id: 15,
          question: "Read the example sentence: The scenery changed often as the train zoomed over the land. What does the word scenery mean in this sentence?",
          options: [
            { key: "A", text: "parts of a play" },
            { key: "B", text: "places where events happen" },
            { key: "C", text: "parts of a train" },
            { key: "D", text: "things that are seen in and around a place" },
          ],
          answer: "B",
          skill: "词汇理解",
        },
      ],
    },

    {
      id: "M4",
      title: "Bullet Trains",
      type: "nonfiction",
      typeLabel: "非虚构",
      text: `Imagine speeding through the countryside at more than two hundred miles an hour.
You watch houses, trees, and farms fly by.
The ride is smooth.
You arrive at the next city more quickly than you had thought was possible.

Welcome to the world of bullet trains.
These trains can be very, very fast.
The fastest bullet train goes almost three hundred miles an hour.

People rode the first bullet trains in Japan in the 1960s.
Many countries in Europe began using high-speed trains soon after that.
These countries are small, but they have many big cities that are close together.
Bullet trains let people travel easily from city to city.

Other countries are trying high-speed trains, too.
Look for a bullet train soon in a city near you!`,
      questions: [
        {
          id: 16,
          question: "What is the main idea of the passage?",
          options: [
            { key: "A", text: "Bullet trains move at speeds of up to 300 miles an hour." },
            { key: "B", text: "Bullet trains are useful for traveling between cities quickly." },
            { key: "C", text: "Bullet trains are the best trains in the world." },
            { key: "D", text: "Bullet trains are found in Japan and Europe." },
          ],
          answer: "C",
          skill: "主旨与细节",
        },
        {
          id: 17,
          question: "What happened in the 1960s?",
          options: [
            { key: "A", text: "Many countries built bullet trains." },
            { key: "B", text: "People began using the first bullet trains." },
            { key: "C", text: "Bullet trains traveled between Japan and Europe." },
            { key: "D", text: "Companies moved all of their bullet trains into cities." },
          ],
          answer: "D",
          skill: "顺序理解",
        },
        {
          id: 18,
          question: "Which word means the land and scenery of an area out in the country?",
          options: [
            { key: "A", text: "countries" },
            { key: "B", text: "cities" },
            { key: "C", text: "countryside" },
            { key: "D", text: "farmland" },
          ],
          answer: "B",
          skill: "词汇理解",
        },
        {
          id: 19,
          question: "What is the author's purpose for writing the passage?",
          options: [
            { key: "A", text: "to give readers information about bullet trains" },
            { key: "B", text: "to persuade readers to start riding bullet trains to school" },
            { key: "C", text: "to help readers understand how to catch bullet trains" },
            { key: "D", text: "to entertain readers with stories of bullet trains" },
          ],
          answer: "A",
          skill: "作者意图",
        },
        {
          id: 20,
          question: "What is a likely reason why bullet trains first became popular in small countries with large cities?",
          options: [
            { key: "A", text: "Bullet trains let people travel easily from city to city in small countries." },
            { key: "B", text: "Large countries already have faster trains than bullet trains." },
            { key: "C", text: "People dislike moving quickly in large countries." },
            { key: "D", text: "Bullet trains are harder to build in small countries with small cities." },
          ],
          answer: "D",
          skill: "推理判断",
        },
      ],
    },
  ],
}

export default placementM
