export const placementE = {
  id: 'E',
  name: 'E级别插班测试',
  passScore: 80,
  printPdf: '/raw/E/e级别测试-测试.pdf',

  tts: {
    passage: false,
    question: true,
    options: false,
  },

  passages: [
    {
      id: 'E1',
      title: 'I Need Shoes to Play Soccer',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `I need special shoes to play soccer.
I need special shoes that help me to run and stop fast.
Do I need slippers?
Slippers do not help me to run and stop fast.
Slippers will fall off when I run.
I need shoes that will not fall off when I run.
Do I need sneakers?
Sneakers are better shoes than slippers to play soccer.
They will not fall off when I run.
Sneakers will help me to run and stop fast.
I will wear sneakers to play soccer.`,
      questions: [
        {
          id: 1,
          question: 'What will happen if the boy wears slippers?',
          questionZh: '如果男孩穿 slippers，会发生什么？',
          ttsText: 'What will happen if the boy wears slippers?',
          options: [
            { key: 'A', text: 'They will help him play better.' },
            { key: 'B', text: 'They will fall off when he runs.' },
            { key: 'C', text: 'They will hurt his feet.' },
          ],
          answer: 'B',
          skill: '因果关系',
        },
        {
          id: 2,
          question: 'The boy probably wants to _____.',
          questionZh: '男孩可能想要做什么？',
          ttsText: 'The boy probably wants to.',
          options: [
            { key: 'A', text: 'be good at soccer' },
            { key: 'B', text: 'wear his blue socks' },
            { key: 'C', text: 'buy new shoes' },
          ],
          answer: 'A',
          skill: '推理判断',
        },
        {
          id: 3,
          question: 'Why does the boy decide to wear sneakers?',
          questionZh: '男孩为什么决定穿 sneakers？',
          ttsText: 'Why does the boy decide to wear sneakers?',
          options: [
            { key: 'A', text: 'His sneakers are clean.' },
            { key: 'B', text: 'His sneakers fit him the best.' },
            { key: 'C', text: 'His sneakers help him run and stop fast.' },
          ],
          answer: 'C',
          skill: '因果关系',
        },
        {
          id: 4,
          question: 'Which of the following best describes soccer?',
          questionZh: '下面哪个最能描述 soccer？',
          ttsText: 'Which of the following best describes soccer?',
          options: [
            { key: 'A', text: 'a shoe' },
            { key: 'B', text: 'a game' },
            { key: 'C', text: 'a place' },
          ],
          answer: 'B',
          skill: '分类理解',
        },
        {
          id: 5,
          question: 'What does special mean?',
          questionZh: 'special 是什么意思？',
          ttsText: 'What does special mean?',
          options: [
            { key: 'A', text: 'like all others' },
            { key: 'B', text: 'new and clean' },
            { key: 'C', text: 'made for a certain thing' },
          ],
          answer: 'C',
          skill: '词汇理解',
        },
      ],
    },
    {
      id: 'E2',
      title: 'Jen and Ben Learn About Farms',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `Jen and Ben want to learn about farms.
They go to farms that grow many different plants.
They learn about how corn grows.
They learn about how wheat grows.
They learn about how cotton grows, too.
They learn about how berries grow.
They learn about how apples grow.
They learn about how pumpkins grow, too.
They learn about how many plants grow from seeds.
They learn about how many plants make seeds.
Jen and Ben learn how many plants grow on farms.`,
      questions: [
        {
          id: 6,
          question: 'Why do Ben and Jen visit the farm?',
          questionZh: 'Ben 和 Jen 为什么去农场？',
          ttsText: 'Why do Ben and Jen visit the farm?',
          options: [
            { key: 'A', text: 'They want to eat.' },
            { key: 'B', text: 'They want to learn.' },
            { key: 'C', text: 'They want to work.' },
          ],
          answer: 'B',
          skill: '主旨与细节',
        },
        {
          id: 7,
          question: 'Which of the following are not found on the farm in the story?',
          questionZh: '故事中的农场没有出现哪一组？',
          ttsText: 'Which of the following are not found on the farm in the story?',
          options: [
            { key: 'A', text: 'corn and wheat' },
            { key: 'B', text: 'pumpkins and apples' },
            { key: 'C', text: 'lemons and oranges' },
          ],
          answer: 'A',
          skill: '主旨与细节',
        },
        {
          id: 8,
          question: 'How are corn and pumpkins the same?',
          questionZh: 'corn 和 pumpkins 有什么相同点？',
          ttsText: 'How are corn and pumpkins the same?',
          options: [
            { key: 'A', text: "They are both Jen and Ben's favorite foods." },
            { key: 'B', text: 'They both grow on farms.' },
            { key: 'C', text: 'They are both the tallest plants.' },
          ],
          answer: 'C',
          skill: '比较理解',
        },
        {
          id: 9,
          question: 'Which is true about seeds?',
          questionZh: '关于 seeds，哪句话是正确的？',
          ttsText: 'Which is true about seeds?',
          options: [
            { key: 'A', text: 'Plants grow from seeds.' },
            { key: 'B', text: 'Seeds are only on farms.' },
            { key: 'C', text: 'Seeds make berries taste better.' },
          ],
          answer: 'B',
          skill: '事实判断',
        },
        {
          id: 10,
          question: 'What is a farm?',
          questionZh: 'farm 是什么地方？',
          ttsText: 'What is a farm?',
          options: [
            { key: 'A', text: 'a place to grow plants and raise animals' },
            { key: 'B', text: 'a place you go to learn how to read' },
            { key: 'C', text: 'a place where people cook dinner' },
          ],
          answer: 'C',
          skill: '词汇理解',
        },
      ],
    },
    {
      id: 'E3',
      title: 'Shoes in Different Seasons',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `Different shoes are the best for different seasons.
Boots are the best shoes in the winter.
Boots are the best when it is cold.
Flip flops are the best shoes in the summer.
Flip flops are the best when it is hot.
Sneakers are the best shoes in the spring and fall.
Sneakers are the best when on a walk.
What shoes are the best when in the house?
Slippers are the best when in the house.
Slippers are the best in all seasons!`,
      questions: [
        {
          id: 11,
          question: 'Which shoes are best to wear in the summer?',
          questionZh: '夏天最适合穿哪种鞋？',
          ttsText: 'Which shoes are best to wear in the summer?',
          options: [
            { key: 'A', text: 'no shoes' },
            { key: 'B', text: 'flip flops' },
            { key: 'C', text: 'boots' },
          ],
          answer: 'B',
          skill: '主旨与细节',
        },
        {
          id: 12,
          question: 'What kind of shoes does the passage say are best to wear when it is cold?',
          questionZh: '文章说天气冷时最适合穿什么鞋？',
          ttsText: 'What kind of shoes does the passage say are best to wear when it is cold?',
          options: [
            { key: 'A', text: 'sneakers' },
            { key: 'B', text: 'flip flops' },
            { key: 'C', text: 'boots' },
          ],
          answer: 'C',
          skill: '主旨与细节',
        },
        {
          id: 13,
          question: 'How are boots and flip flops most alike?',
          questionZh: 'boots 和 flip flops 最相同的地方是什么？',
          ttsText: 'How are boots and flip flops most alike?',
          options: [
            { key: 'A', text: 'You wear them in the summer.' },
            { key: 'B', text: 'You wear them in the winter.' },
            { key: 'C', text: 'You wear them on your feet.' },
          ],
          answer: 'B',
          skill: '比较理解',
        },
        {
          id: 14,
          question: 'Which word makes this sentence an opinion?',
          questionZh: '哪个词让这句话变成了观点？',
          ttsText: 'Which word makes this sentence an opinion?',
          options: [
            { key: 'A', text: 'boots' },
            { key: 'B', text: 'best' },
            { key: 'C', text: 'cold' },
          ],
          answer: 'A',
          skill: '事实判断',
        },
        {
          id: 15,
          question: 'Which of the following are all seasons?',
          questionZh: '下面哪一组都是季节？',
          ttsText: 'Which of the following are all seasons?',
          options: [
            { key: 'A', text: 'spring, cold, fall' },
            { key: 'B', text: 'winter, spring, fall' },
            { key: 'C', text: 'winter, summer, hot' },
          ],
          answer: 'A',
          skill: '词汇理解',
        },
      ],
    },
    {
      id: 'E4',
      title: 'Where Birds Make Nests',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `Different birds need different nests.
Birds make their nests in many different places.
The places birds make nests are where they like best.
Some birds make nests in trees in forests.
Some birds make nests on the ground in fields.
Some birds make nests near mud at ponds.
Some birds make nests on mountains.
Some birds make nests near oceans.
Some birds make nests on farms.
Different birds need different nests.
Different birds make nests in the places they like best.`,
      questions: [
        {
          id: 16,
          question: 'What is the main idea of the passage?',
          questionZh: '这篇文章的主要意思是什么？',
          ttsText: 'What is the main idea of the passage?',
          options: [
            { key: 'A', text: 'All bird nests are the same.' },
            { key: 'B', text: 'Birds make nests in different places.' },
            { key: 'C', text: 'Some birds live in trees in forests.' },
          ],
          answer: 'B',
          skill: '主旨与细节',
        },
        {
          id: 17,
          question: 'Why did the author write the passage?',
          questionZh: '作者为什么写这篇文章？',
          ttsText: 'Why did the author write the passage?',
          options: [
            { key: 'A', text: 'to share information about nests' },
            { key: 'B', text: 'to pick the best place for a nest' },
            { key: 'C', text: 'to tell a story about a bird that lays an egg' },
          ],
          answer: 'C',
          skill: '作者意图',
        },
        {
          id: 18,
          question: 'Where would you not find a bird nest?',
          questionZh: '你在哪里不会找到鸟巢？',
          ttsText: 'Where would you not find a bird nest?',
          options: [
            { key: 'A', text: 'in the sky' },
            { key: 'B', text: 'on the ground' },
            { key: 'C', text: 'near the water' },
          ],
          answer: 'C',
          skill: '分类理解',
        },
        {
          id: 19,
          question: 'Why do birds need nests?',
          questionZh: '鸟为什么需要巢？',
          ttsText: 'Why do birds need nests?',
          options: [
            { key: 'A', text: 'to fly up high' },
            { key: 'B', text: 'to lay eggs' },
            { key: 'C', text: 'to find food' },
          ],
          answer: 'B',
          skill: '推理判断',
        },
        {
          id: 20,
          question: 'What does the word different mean?',
          questionZh: 'different 是什么意思？',
          ttsText: 'What does the word different mean?',
          options: [
            { key: 'A', text: 'the same' },
            { key: 'B', text: 'not the same' },
            { key: 'C', text: 'better' },
          ],
          answer: 'B',
          skill: '词汇理解',
        },
      ],
    },
  ],
}

export default placementE
