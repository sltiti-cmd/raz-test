export const placementI = {
  id: 'I',
  name: 'I级别插班测试',
  passScore: 80,
  printPdf: '/raw/placement/I/I级别测试-无答案.pdf',

  tts: {
    passage: false,
    question: false,
    options: false,
  },

  passages: [
    {
      id: 'I1',
      title: 'Monsters Are Not Real',
      type: 'fiction',
      typeLabel: '虚构',
      text: `Mom tells me that monsters are not real.
I'm not sure if she is right or not.
I see long, dark shadows on my walls late at night.
The long, dark shadows seem to dance on my wall.
Mom says the shadows are from the tree outside my window.
She says the light from the moon makes the shadows.
She says the wind blows, which makes the tree's shadows move.
Mom says the moon will be dark in a day or two.
She says I'll see then that monsters are not real.
I hope she is right. I hope it's just the tree, light, and wind.`,
      questions: [
        {
          id: 1,
          question: 'What is the problem in the story?',
          options: [
            { key: 'A', text: 'The child sleeps too much.' },
            { key: 'B', text: "The mom hears noises from the child's room." },
            { key: 'C', text: 'The shadows scare the child.' },
          ],
          answer: 'C',
          skill: '问题解决',
        },
        {
          id: 2,
          question: 'What is causing the child to think about monsters?',
          options: [
            { key: 'A', text: 'the noises outside the door' },
            { key: 'B', text: 'the wind blowing through the trees' },
            { key: 'C', text: 'the shadows on the wall' },
          ],
          answer: 'C',
          skill: '因果关系',
        },
        {
          id: 3,
          question: 'How does the light enter the room?',
          options: [
            { key: 'A', text: 'It shines down the hallway.' },
            { key: 'B', text: 'It comes through the window.' },
            { key: 'C', text: 'It blows in with the wind.' },
          ],
          answer: 'B',
          skill: '推理判断',
        },
        {
          id: 4,
          question: 'Why does the mom tell the child that monsters are not real?',
          options: [
            { key: 'A', text: 'to tell a scary story' },
            { key: 'B', text: 'to help the child sleep' },
            { key: 'C', text: 'to explain why the wind blows' },
          ],
          answer: 'B',
          skill: '人物分析',
        },
        {
          id: 5,
          question: 'The title of the passage is Monsters Are Not Real. Which word means almost the same as real?',
          options: [
            { key: 'A', text: 'dark' },
            { key: 'B', text: 'true' },
            { key: 'C', text: 'scary' },
          ],
          answer: 'B',
          skill: '词汇理解',
        },
      ],
    },

    {
      id: 'I2',
      title: 'We Love Bamboo',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `Bamboo is a great plant.
It grows faster than most other plants.
Trees take many years to grow tall.
Some bamboo can grow tall in three or four months.
One bamboo plant can have many stems.
A few bamboo plants can grow into a whole forest.
We use bamboo to make many different things.
Bamboo can be used to make paper or a floor for a house.
We can even use bamboo to make music.
Giant pandas and other animals eat young bamboo.
We can eat young bamboo, too!`,
      questions: [
        {
          id: 6,
          question: 'Which sentence from the passage tells an opinion about bamboo?',
          options: [
            { key: 'A', text: 'Bamboo is a great plant.' },
            { key: 'B', text: 'Bamboo grows faster than most other plants.' },
            { key: 'C', text: 'Bamboo is used to make many different things.' },
          ],
          answer: 'C',
          skill: '事实判断',
        },
        {
          id: 7,
          question: 'How long does the passage say it takes bamboo to grow tall?',
          options: [
            { key: 'A', text: 'three or four weeks' },
            { key: 'B', text: 'three or four months' },
            { key: 'C', text: 'three or four years' },
          ],
          answer: 'C',
          skill: '主旨与细节',
        },
        {
          id: 8,
          question: 'Which building material is most like bamboo?',
          options: [
            { key: 'A', text: 'wood' },
            { key: 'B', text: 'paint' },
            { key: 'C', text: 'glass' },
          ],
          answer: 'B',
          skill: '推理判断',
        },
        {
          id: 9,
          question: 'What do giant pandas do with young bamboo?',
          options: [
            { key: 'A', text: 'They make music.' },
            { key: 'B', text: 'They wear it.' },
            { key: 'C', text: 'They eat it.' },
          ],
          answer: 'B',
          skill: '主旨与细节',
        },
        {
          id: 10,
          question: 'Which of these is true about bamboo?',
          options: [
            { key: 'A', text: 'It is a tall plant with many stems.' },
            { key: 'B', text: 'It is a small plant with a few stems.' },
            { key: 'C', text: 'It is a large plant that only grows in very small areas.' },
          ],
          answer: 'B',
          skill: '词汇理解',
        },
      ],
    },

    {
      id: 'I3',
      title: 'Dark Night on the Water',
      type: 'fiction',
      typeLabel: '虚构',
      text: `I once lived on a great ship on the ocean.
The ship was bigger than most houses.
Its white sails would shine in the light of the moon at night.
One night I was making a wish on a star.
As I made my wish, something came up out of the water.
A great set of tentacles pulled down on the ship.
I was sure those tentacles would pull us under the water.
As the ship began to go under, those great tentacles let go.
I still don't know what tried to pull us into the ocean.
I wish on every star I see that I never find out.`,
      questions: [
        {
          id: 11,
          question: 'What is the main problem in the passage?',
          options: [
            { key: 'A', text: 'The ship sinks under the water.' },
            { key: 'B', text: 'Tentacles grab the ship.' },
            { key: 'C', text: 'There are stars in the night sky.' },
          ],
          answer: 'A',
          skill: '问题解决',
        },
        {
          id: 12,
          question: 'To what does the author compare the size of the ship?',
          options: [
            { key: 'A', text: 'a monster' },
            { key: 'B', text: 'a house' },
            { key: 'C', text: 'a star' },
          ],
          answer: 'B',
          skill: '比较理解',
        },
        {
          id: 13,
          question: 'Which two events happen at the same time?',
          options: [
            { key: 'A', text: 'wishing on a star and something coming out of the water' },
            { key: 'B', text: 'wishing on a star and tentacles letting go of the ship' },
            { key: 'C', text: 'wishing on a star and the ship sinking' },
          ],
          answer: 'A',
          skill: '顺序理解',
        },
        {
          id: 14,
          question: 'What happened as the ship began to go under?',
          options: [
            { key: 'A', text: 'The tentacles pulled harder.' },
            { key: 'B', text: 'The tentacles let go.' },
            { key: 'C', text: 'The tentacles splashed water.' },
          ],
          answer: 'C',
          skill: '顺序理解',
        },
        {
          id: 15,
          question: 'What does it mean to wish?',
          options: [
            { key: 'A', text: 'to disappear and be gone forever' },
            { key: 'B', text: 'to hope something will happen' },
            { key: 'C', text: 'to get pulled under the water' },
          ],
          answer: 'A',
          skill: '词汇理解',
        },
      ],
    },

    {
      id: 'I4',
      title: 'Giant Squid',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `Giant squid live in the deep parts of the ocean.
They're called giant because they can be as long as a school bus!
Giant squid have the biggest eyes of all animals.
Their big eyes let them see in the dark.
Giant squid also have eight arms called tentacles.
To move, they suck in and push out water from their bodies.
Because giant squid live in deep water, we don't know much about them.
Some people think they are monsters.
They tell stories about giant squid pulling ships under the water.
These stories are not true.
People tell these stories because the giant squid is so big it's scary.`,
      questions: [
        {
          id: 16,
          question: 'How do the eyes of giant squid compare to the eyes of other animals?',
          options: [
            { key: 'A', text: 'Giant squid eyes are bigger than the eyes of all other animals.' },
            { key: 'B', text: 'Giant squid eyes are smaller than the eyes of all other animals.' },
            { key: 'C', text: 'Giant squid eyes are the same color as the eyes of all other animals.' },
          ],
          answer: 'B',
          skill: '比较理解',
        },
        {
          id: 17,
          question: 'Why do giant squid suck in and push out water?',
          options: [
            { key: 'A', text: 'to move' },
            { key: 'B', text: 'to see' },
            { key: 'C', text: 'to make noise' },
          ],
          answer: 'B',
          skill: '因果关系',
        },
        {
          id: 18,
          question: 'Why does the author tell about giant squid that pull ships under the water?',
          options: [
            { key: 'A', text: 'to make readers afraid of giant squid' },
            { key: 'B', text: 'to explain why ships have gone missing' },
            { key: 'C', text: 'to tell readers that the stories are not true' },
          ],
          answer: 'A',
          skill: '作者意图',
        },
        {
          id: 19,
          question: "Why don't people know much about giant squid?",
          options: [
            { key: 'A', text: 'because they are very large animals' },
            { key: 'B', text: 'because they cannot see in the dark' },
            { key: 'C', text: 'because they live in deep water' },
          ],
          answer: 'B',
          skill: '因果关系',
        },
        {
          id: 20,
          question: 'What is the meaning of the word giant?',
          options: [
            { key: 'A', text: 'very big' },
            { key: 'B', text: 'very scary' },
            { key: 'C', text: 'very loud' },
          ],
          answer: 'B',
          skill: '词汇理解',
        },
      ],
    },
  ],
}

export default placementI
