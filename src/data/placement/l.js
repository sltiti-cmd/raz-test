export const placementL = {
  id: 'L',
  name: 'L级别插班测试',
  passScore: 80,
  printPdf: '/raw/placement/L/L级别测试-无答案.pdf',

  tts: {
    passage: false,
    question: false,
    options: false,
  },

  passages: [
    {
      id: 'L1',
      title: 'The Scared Bear',
      type: 'fiction',
      typeLabel: '虚构',
      text: `I'm an old bear, and I know how to find food in a campsite.
When I saw the blue box with the white top, I knew it would have some cold goodies in it.
If the car it was in was locked, I could easily reach in one of the open windows to grab some beef jerky.

I lumbered over to the car, almost tasting that chewy jerky already.
Then, the most awful sound came from the tent: "Mom, look at that huge bear!"

I rushed away to get breakfast somewhere safer.
Kids, with their loud voices and creepy, little hands, have scared me ever since I was a cub.`,
      questions: [
        {
          id: 1,
          question: 'Who told the story?',
          options: [
            { key: 'A', text: 'a boy who was in the story' },
            { key: 'B', text: 'a bear who was in the story' },
            { key: 'C', text: 'an adult who was in the story' },
            { key: 'D', text: 'an animal who was not in the story' },
          ],
          answer: 'B',
          skill: '故事要素',
        },
        {
          id: 2,
          question: 'Where did the bear think the beef jerky could be found?',
          options: [
            { key: 'A', text: 'in a tent' },
            { key: 'B', text: 'in a car' },
            { key: 'C', text: 'in a tree' },
            { key: 'D', text: 'in a backpack' },
          ],
          answer: 'B',
          skill: '故事要素',
        },
        {
          id: 3,
          question: 'What does the word lumbered mean in the passage?',
          options: [
            { key: 'A', text: 'took' },
            { key: 'B', text: 'ate' },
            { key: 'C', text: 'listened' },
            { key: 'D', text: 'walked' },
          ],
          answer: 'D',
          skill: '词汇理解',
        },
        {
          id: 4,
          question: 'Which of the following events happened first in the story?',
          options: [
            { key: 'A', text: 'The bear saw the blue box with the white top.' },
            { key: 'B', text: 'The bear imagined it could taste the jerky.' },
            { key: 'C', text: 'The bear heard something from the tent.' },
            { key: 'D', text: 'The bear ran to a safer place.' },
          ],
          answer: 'A',
          skill: '顺序理解',
        },
        {
          id: 5,
          question: 'Why did the bear run away from the campsite?',
          options: [
            { key: 'A', text: "The bear heard a child's voice and was afraid of children." },
            { key: 'B', text: 'The bear heard the awful sound of a car starting and was afraid of cars.' },
            { key: 'C', text: "The bear's mother called for breakfast, and the bear was afraid to miss it." },
            { key: 'D', text: 'The bear made a loud noise getting the jerky and had to run before people noticed.' },
          ],
          answer: 'A',
          skill: '推理判断',
        },
      ],
    },

    {
      id: 'L2',
      title: 'Two American Bears',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `How can you tell a grizzly bear from a black bear?
Although the grizzly bear is in the brown bear family, you cannot tell it from a black bear just by fur color.
Black bears are frequently black, but they can also be brown.
Brown bears are also occasionally black!

One of the surest ways to tell these two bears apart is by the structures of their heads.
A grizzly bear has a short, stubby snout and a broad head.
Its ears are round and small.
A black bear has a much longer, pointed snout and longer ears.

Remember: whether a bear is black or brown, keep your distance!`,
      questions: [
        {
          id: 6,
          question: 'What is the passage mostly about?',
          options: [
            { key: 'A', text: 'the length of the snouts on grizzly bears and black bears' },
            { key: 'B', text: 'the many types of bears that are in the brown bear family' },
            { key: 'C', text: 'how to tell a grizzly bear from a black bear' },
            { key: 'D', text: 'how to stay far away from grizzly bears and black bears' },
          ],
          answer: 'B',
          skill: '主旨与细节',
        },
        {
          id: 7,
          question: 'Which of the following is not a good way to tell a grizzly bear from a black bear?',
          options: [
            { key: 'A', text: 'the shape of its ears' },
            { key: 'B', text: 'the length of its snout' },
            { key: 'C', text: 'the color of its fur' },
            { key: 'D', text: 'the structure of its head' },
          ],
          answer: 'B',
          skill: '比较理解',
        },
        {
          id: 8,
          question: 'Why does the author tell you to keep your distance from bears whether they are black or brown?',
          options: [
            { key: 'A', text: 'Both types of bears smell bad.' },
            { key: 'B', text: 'Both types of bears look too much like each other.' },
            { key: 'C', text: 'Both types of bears can be overly friendly.' },
            { key: 'D', text: 'Both types of bears can be dangerous.' },
          ],
          answer: 'D',
          skill: '推理判断',
        },
        {
          id: 9,
          question: "Read this sentence from the passage: A black bear has a much longer, pointed snout and long ears. A snout is a bear's _____.",
          options: [
            { key: 'A', text: 'nose' },
            { key: 'B', text: 'head' },
            { key: 'C', text: 'foot' },
            { key: 'D', text: 'tail' },
          ],
          answer: 'A',
          skill: '词汇理解',
        },
        {
          id: 10,
          question: 'The brown bear family includes _____.',
          options: [
            { key: 'A', text: 'grizzly bears' },
            { key: 'B', text: 'black bears' },
            { key: 'C', text: 'both grizzly bears and black bears' },
            { key: 'D', text: 'neither grizzly bears nor black bears' },
          ],
          answer: 'A',
          skill: '主旨与细节',
        },
      ],
    },

    {
      id: 'L3',
      title: 'Home for Lunch',
      type: 'fiction',
      typeLabel: '虚构',
      text: `"What's that?" asked Ana.

"Dad said to make lunch while he's working," said Juan.

"Are you calling that lunch?" she asked.
She pointed at something that looked like a pile of mush.

"I'm trying to build a banana house, but the banana slices are too slippery," said Juan.

"I can help," Ana said, pulling a jar from the refrigerator so that it could warm up.

When Dad walked in, he found a surprise.
Ana and Juan had built a house of food.
Banana slabs held up a corn-chip roof.
Peanut butter held everything together like glue.

Ana and Juan knew they would have to eat this mess.
But the look on Dad's face was worth it!`,
      questions: [
        {
          id: 11,
          question: 'What is the story mostly about?',
          options: [
            { key: 'A', text: 'a dad who does not have time to eat lunch' },
            { key: 'B', text: 'a dad who brings lunch home to his children' },
            { key: 'C', text: 'two children who build a house from food' },
            { key: 'D', text: 'two children who go to work with their dad' },
          ],
          answer: 'C',
          skill: '主旨与细节',
        },
        {
          id: 12,
          question: 'In the story, Juan said that the bananas were too slippery. Which word means almost the same as slippery?',
          options: [
            { key: 'A', text: 'simple' },
            { key: 'B', text: 'slimy' },
            { key: 'C', text: 'small' },
            { key: 'D', text: 'solid' },
          ],
          answer: 'C',
          skill: '词汇理解',
        },
        {
          id: 13,
          question: 'What do the children use for the roof of their house of food?',
          options: [
            { key: 'A', text: 'oatmeal jars' },
            { key: 'B', text: 'banana slices' },
            { key: 'C', text: 'corn chips' },
            { key: 'D', text: 'peanut butter cookies' },
          ],
          answer: 'D',
          skill: '故事要素',
        },
        {
          id: 14,
          question: 'Which event happened last?',
          options: [
            { key: 'A', text: 'Ana pulled a jar from the refrigerator.' },
            { key: 'B', text: 'Ana asked Juan what he was doing.' },
            { key: 'C', text: 'Dad walked in.' },
            { key: 'D', text: 'Juan tried to make lunch by himself.' },
          ],
          answer: 'A',
          skill: '顺序理解',
        },
        {
          id: 15,
          question: 'What will likely happen next in the story?',
          options: [
            { key: 'A', text: 'Dad will take a nap after his day at work.' },
            { key: 'B', text: 'Ana and Juan will eat the house of food.' },
            { key: 'C', text: 'Dad will throw the house of food away.' },
            { key: 'D', text: 'Ana and Juan will go to work with Dad.' },
          ],
          answer: 'A',
          skill: '推理判断',
        },
      ],
    },

    {
      id: 'L4',
      title: 'Peanut Butter: An American Favorite',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `People have eaten peanuts for thousands of years.
Peanuts first grew in South America.
People started growing them in the United States around 1818.

Over the years, many people ground peanuts to make them easy to eat.
Dr. John Kellogg made a recipe for peanut butter around 1890.
He wanted people to eat peanut butter instead of meat.

In the 1900s, people built machines to make large amounts of peanut butter.
They also mixed in oil to make peanut butter easier to spread.

Americans love peanut butter.
Some like smooth peanut butter best, and others like chunky best.
Overall, Americans eat more than a million pounds of peanut butter every year!`,
      questions: [
        {
          id: 16,
          question: 'Which of the following details best supports the idea that Americans love peanut butter?',
          options: [
            { key: 'A', text: 'People started growing peanuts in the United States around 1818.' },
            { key: 'B', text: 'People have eaten peanuts for thousands of years.' },
            { key: 'C', text: 'In the 1900s, people built machines to make large amounts of peanut butter.' },
            { key: 'D', text: 'Americans eat more than a million pounds of peanut butter every year.' },
          ],
          answer: 'C',
          skill: '主旨与细节',
        },
        {
          id: 17,
          question: 'What solution did people come up with to make large amounts of peanut butter?',
          options: [
            { key: 'A', text: 'People stopped eating meat.' },
            { key: 'B', text: 'People made chunky peanut butter.' },
            { key: 'C', text: 'People grew more peanuts in South America.' },
            { key: 'D', text: 'People built machines to make the peanut butter.' },
          ],
          answer: 'B',
          skill: '问题解决',
        },
        {
          id: 18,
          question: 'Which event happened first?',
          options: [
            { key: 'A', text: 'People made machines to make peanut butter.' },
            { key: 'B', text: 'Dr. John Kellogg made a recipe for peanut butter.' },
            { key: 'C', text: 'People grew peanuts in the United States.' },
            { key: 'D', text: 'Peanuts grew in South America.' },
          ],
          answer: 'C',
          skill: '顺序理解',
        },
        {
          id: 19,
          question: 'Read the example sentence: Over the years, many people ground peanuts to make them easy to eat. What does the word ground mean in this sentence?',
          options: [
            { key: 'A', text: 'bagged or boxed' },
            { key: 'B', text: 'sold or traded' },
            { key: 'C', text: 'pressed or mashed' },
            { key: 'D', text: 'mixed or sorted' },
          ],
          answer: 'C',
          skill: '词汇理解',
        },
        {
          id: 20,
          question: 'What did people do to make peanut butter easier to spread?',
          options: [
            { key: 'A', text: 'They added oil.' },
            { key: 'B', text: 'They built machines.' },
            { key: 'C', text: 'They ground peanuts.' },
            { key: 'D', text: 'They invented special knives.' },
          ],
          answer: 'B',
          skill: '因果关系',
        },
      ],
    },
  ],
}

export default placementL
