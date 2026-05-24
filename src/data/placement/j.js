export const placementJ = {
  id: 'J',
  name: 'J级别插班测试',
  passScore: 80,
  printPdf: '/raw/placement/J/J级别测试-无答案.pdf',

  tts: {
    passage: false,
    question: false,
    options: false,
  },

  passages: [
    {
      id: 'J1',
      title: 'I Want a Leopard',
      type: 'fiction',
      typeLabel: '虚构',
      text: `I want to own a leopard, but my mom says I can't.
A leopard would be the best pet in the world.
She says my leopard would grow really big.
I tell her I could ride it to school every day.
She thinks it would destroy all of my things.
I think she is scared it would tear up her chairs.
No one would be mean to a boy who has a leopard.
Mom says a leopard would snack on me in my sleep.
I don't think I want to own a leopard.`,
      questions: [
        {
          id: 1,
          question: 'Who is the narrator in the story?',
          options: [
            { key: 'A', text: 'the mom' },
            { key: 'B', text: 'the leopard' },
            { key: 'C', text: 'the boy' },
          ],
          answer: 'C',
          skill: '故事要素',
        },
        {
          id: 2,
          question: 'How does the mom compare to the boy in the story?',
          options: [
            { key: 'A', text: 'The mom wants a leopard and the boy does not.' },
            { key: 'B', text: 'The boy wants a leopard and the mom does not.' },
            { key: 'C', text: 'They both want a leopard as a pet.' },
          ],
          answer: 'B',
          skill: '比较理解',
        },
        {
          id: 3,
          question: 'Which of the following best describes the boy at the end of the story?',
          options: [
            { key: 'A', text: 'The boy is mean to other students.' },
            { key: 'B', text: 'The boy gets a new pet.' },
            { key: 'C', text: 'The boy changes his mind.' },
          ],
          answer: 'C',
          skill: '推理判断',
        },
        {
          id: 4,
          question: 'What is the problem in the story?',
          options: [
            { key: 'A', text: "the mom says the boy can't own a leopard" },
            { key: 'B', text: 'the leopard grows really big' },
            { key: 'C', text: 'the boy rides on the leopard and falls off' },
          ],
          answer: 'A',
          skill: '问题解决',
        },
        {
          id: 5,
          question: "The boy's mom thinks the leopard would tear up the chairs. Which words mean the same as tear up?",
          options: [
            { key: 'A', text: 'sit in' },
            { key: 'B', text: 'break apart' },
            { key: 'C', text: 'move around' },
          ],
          answer: 'B',
          skill: '词汇理解',
        },
      ],
    },

    {
      id: 'J2',
      title: 'The Laughing Lady',
      type: 'fiction',
      typeLabel: '虚构',
      text: `There once was a lady who never stopped laughing.
Someone looking at a book would make her chuckle.
She would see the farmer in his field and giggle.
Even when someone cried, she would keep laughing.
When something was really funny, she laughed more and more.
People started to become angry with the lady.
They thought she was laughing at them.
One day, they asked her why she laughed all the time.
The lady said that laughing was the way she showed love.
Because she loved everyone so much, she couldn't stop laughing.
The people felt better and they all laughed together.`,
      questions: [
        {
          id: 6,
          question: 'Why did people get angry with the lady?',
          options: [
            { key: 'A', text: 'because the laughing lady did not help them' },
            { key: 'B', text: 'because they thought the lady was laughing at them' },
            { key: 'C', text: 'because they wanted to laugh with the lady' },
          ],
          answer: 'B',
          skill: '因果关系',
        },
        {
          id: 7,
          question: 'What is the main problem in the story?',
          options: [
            { key: 'A', text: 'The lady was sad all the time.' },
            { key: 'B', text: 'The lady was mean to people.' },
            { key: 'C', text: 'The lady laughed at everything.' },
          ],
          answer: 'C',
          skill: '问题解决',
        },
        {
          id: 8,
          question: 'What did the lady do when she saw someone cry?',
          options: [
            { key: 'A', text: 'She started crying.' },
            { key: 'B', text: 'She laughed.' },
            { key: 'C', text: 'She got angry.' },
          ],
          answer: 'B',
          skill: '故事要素',
        },
        {
          id: 9,
          question: 'At the end of the story, what did the people learn about the lady?',
          options: [
            { key: 'A', text: 'why she laughed' },
            { key: 'B', text: 'who she loved the most' },
            { key: 'C', text: 'what she liked to talk about' },
          ],
          answer: 'A',
          skill: '主旨与细节',
        },
        {
          id: 10,
          question: 'The lady would chuckle and giggle. What do these words mean?',
          options: [
            { key: 'A', text: 'laugh' },
            { key: 'B', text: 'cry' },
            { key: 'C', text: 'love' },
          ],
          answer: 'A',
          skill: '词汇理解',
        },
      ],
    },

    {
      id: 'J3',
      title: 'Fossils',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `Fossils are very special kinds of rocks.
They can teach us about the things that lived long ago.
Fossils can teach us that some dinosaurs ate meat and others ate plants.
Fossils can tell us how insects moved around.
We can learn what life in the ocean was like from fossils.
Some fossils can show us where different kinds of plants lived.
We can build a dinosaur skeleton out of fossils.
Certain fossils can even help us learn about our past.
There are many different kinds of fossils.
Every one has something to teach us.`,
      questions: [
        {
          id: 11,
          question: 'A fossil is made of _____.',
          options: [
            { key: 'A', text: 'metal' },
            { key: 'B', text: 'glass' },
            { key: 'C', text: 'rock' },
          ],
          answer: 'C',
          skill: '主旨与细节',
        },
        {
          id: 12,
          question: 'Why are fossils special?',
          options: [
            { key: 'A', text: 'They teach what happened long ago.' },
            { key: 'B', text: 'They explain what happens every day.' },
            { key: 'C', text: 'They are all different.' },
          ],
          answer: 'A',
          skill: '因果关系',
        },
        {
          id: 13,
          question: 'What have we learned from fossils?',
          options: [
            { key: 'A', text: 'where different kinds of plants lived' },
            { key: 'B', text: 'the names of places in the past' },
            { key: 'C', text: 'which rocks are more important' },
          ],
          answer: 'A',
          skill: '主旨与细节',
        },
        {
          id: 14,
          question: 'From fossils, we know that some dinosaurs _____.',
          options: [
            { key: 'A', text: 'moved around and others stood still' },
            { key: 'B', text: "had skeletons and others didn't" },
            { key: 'C', text: 'ate meat and others ate plants' },
          ],
          answer: 'C',
          skill: '比较理解',
        },
        {
          id: 15,
          question: 'Read this sentence from the passage: Certain fossils can even help us learn about our past. What does certain mean?',
          options: [
            { key: 'A', text: 'some' },
            { key: 'B', text: 'new' },
            { key: 'C', text: 'large' },
          ],
          answer: 'A',
          skill: '词汇理解',
        },
      ],
    },

    {
      id: 'J4',
      title: 'Leopards',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `Leopards are big cats that like to climb and hide.
They can be as big as a person, but they run much faster.
Leopards are great at climbing trees.
They carry big animals up into the trees to eat them.
They also carry their kittens up into the trees to protect them.
Leopards are great at hiding, too.
Some have yellow fur with dark spots.
Others have dark brown or black fur.
Their fur can be so dark that you can't see their spots.
The special colors help them hide high in the trees.`,
      questions: [
        {
          id: 16,
          question: 'Why do leopards climb trees?',
          options: [
            { key: 'A', text: 'to stay healthy' },
            { key: 'B', text: 'to play games' },
            { key: 'C', text: 'to eat food' },
          ],
          answer: 'C',
          skill: '因果关系',
        },
        {
          id: 17,
          question: 'Leopards have _____.',
          options: [
            { key: 'A', text: 'no spots' },
            { key: 'B', text: 'stripes' },
            { key: 'C', text: 'dark spots' },
          ],
          answer: 'C',
          skill: '主旨与细节',
        },
        {
          id: 18,
          question: 'How are all leopards alike?',
          options: [
            { key: 'A', text: 'They have brown fur with spots.' },
            { key: 'B', text: 'They are great at hiding.' },
            { key: 'C', text: 'They are as fast as a person.' },
          ],
          answer: 'B',
          skill: '比较理解',
        },
        {
          id: 19,
          question: 'What helps a leopard hide?',
          options: [
            { key: 'A', text: 'its special colors' },
            { key: 'B', text: 'its kittens' },
            { key: 'C', text: 'its fast speed' },
          ],
          answer: 'A',
          skill: '因果关系',
        },
        {
          id: 20,
          question: 'Read this sentence from the passage: They carry their kittens up into the trees to protect them. What does protect mean?',
          options: [
            { key: 'A', text: 'feed' },
            { key: 'B', text: 'keep safe' },
            { key: 'C', text: 'visit high places' },
          ],
          answer: 'B',
          skill: '词汇理解',
        },
      ],
    },
  ],
}

export default placementJ
