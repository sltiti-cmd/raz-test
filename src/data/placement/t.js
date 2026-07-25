// T级别插班测试 — 4篇文章20题（虚构/非虚构交替，选项 A–D）
// 数据来源：RAZ Benchmark Passage Quick Check（含答案页），答案与能力标签逐题核对
export const placementT = {
  id: 'T',
  name: 'T级别插班测试',
  passScore: 80,
  printPdf: '/raw/T/T级别测试-无答案.pdf',
  tts: {
    passage: false,
    question: false,
    options: false,
  },
  source: {
    testPdf: '/raw/T/T级别测试-无答案.pdf',
    answerPdf: '/raw/T/T级别测试-附答案.pdf',
  },
  passages: [
    {
      id: 'T1',
      title: 'A Night in the Trees',
      type: 'fiction',
      typeLabel: '虚构',
      text: `Hector lagged behind the others on the hike. He felt a little worried and nervous about camping overnight with the youth group from the community center. Sleeping outside sounded uncomfortable. Still, his friend Alexander had insisted the trip would be fun, so here he was.
Alexander ran back down the path to find him. "Wait until you see where we're sleeping!" Alexander said.
Hector was astonished when he saw the tree house. It was a remarkable wooden structure, built between two trees. The main, horizontal platform appeared to be elevated twelve feet above the ground. It had a roof overhead and railings along the sides for safety. Hector thought it looked like a giant popsicle.
On the ground, the group grilled hamburgers and vegetables over a campfire. As darkness fell, Hector climbed the ladder to the tree house. He fell asleep listening to a chorus of crickets. In the morning, a bird sang on a sunlit branch just a few feet from his nose. Hector thought he now felt like that bird, happy enough to start singing.`,
      questions: [
        {
          id: 1,
          question: 'What was the problem in the story?',
          options: [
            { key: 'A', text: 'Hector was too slow to keep up with the other campers.' },
            { key: 'B', text: 'Hector was worried about spending the night camping.' },
            { key: 'C', text: 'Hector was afraid of heights.' },
            { key: 'D', text: 'Hector was worried that the tree house looked unsafe.' },
          ],
          answer: 'B',
          skill: '问题解决',
        },
        {
          id: 2,
          question: 'Who went on the overnight trip?',
          options: [
            { key: 'A', text: 'community members who wanted to build a tree house' },
            { key: 'B', text: 'basketball players from a middle school team' },
            { key: 'C', text: 'young people from a community center group' },
            { key: 'D', text: 'people from a tribe that lived in trees' },
          ],
          answer: 'C',
          skill: '故事要素',
        },
        {
          id: 3,
          question: 'Read the example sentence: The main, horizontal platform appeared to be elevated twelve feet above the ground. Which words help readers understand what elevated means?',
          options: [
            { key: 'A', text: 'above the ground' },
            { key: 'B', text: 'appeared to be' },
            { key: 'C', text: 'horizontal platform' },
            { key: 'D', text: 'twelve feet' },
          ],
          answer: 'A',
          skill: '词汇理解',
        },
        {
          id: 4,
          question: 'What effect did the tree house setting have on the story?',
          options: [
            { key: 'A', text: 'The tree house left the characters uncovered, so they worried about the weather.' },
            { key: 'B', text: 'The tree house made the characters feel too close to nature.' },
            { key: 'C', text: "The characters couldn't cook much food because they worried about burning the trees." },
            { key: 'D', text: 'Once the main character saw the tree house, he had more fun.' },
          ],
          answer: 'D',
          skill: '场景分析',
        },
        {
          id: 5,
          question: 'Why did Hector feel happy at the end of the story?',
          options: [
            { key: 'A', text: 'He had been looking for a bird, and he saw one.' },
            { key: 'B', text: 'He had remembered how to sing a song he had wanted to sing.' },
            { key: 'C', text: 'He had made it through the night and could now leave the tree house.' },
            { key: 'D', text: 'He had enjoyed sleeping in the tree house overnight.' },
          ],
          answer: 'D',
          skill: '推理判断',
        },
      ],
    },
    {
      id: 'T2',
      title: 'Homes High in the Trees',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `In the twenty-first century, urban apartment-dwellers are not the only people who live high up in rooms with views. Members of the Kombai tribe live in hand-built tree houses up to 115 feet above the ground.
The Kombai, who number about four thousand, occupy a remote, swampy forest area on the island of Papua, New Guinea. This area is in the country of Indonesia. They live without modern technology, hunting and gathering food using simple tools such as stone axes.
The Kombai build their homes in trees for several reasons. It helps them avoid flooding, attacks from other tribes, and pests such as insects. Some Kombai houses use a single tree, but most are built between several trees. To add stability, long poles may be added underneath. The Kombai climb ladders to enter and exit their houses.
This remote tribe had no contact with the outside world until 1982. An explorer who visited them that year heard one explanation of the homes that modern city-dwellers can understand. Living high above the ground gives Kombai people nice views above the forest canopy!`,
      questions: [
        {
          id: 6,
          question: 'Which of the following is a reason members of the Kombai tribe live high in trees?',
          options: [
            { key: 'A', text: 'to spy on other tribes' },
            { key: 'B', text: 'to find food' },
            { key: 'C', text: 'to catch insects' },
            { key: 'D', text: 'to avoid attacks' },
          ],
          answer: 'D',
          skill: '主旨与细节',
        },
        {
          id: 7,
          question: 'Why do members of the Kombai add poles to their houses?',
          options: [
            { key: 'A', text: 'to enter and exit' },
            { key: 'B', text: 'to hold them up' },
            { key: 'C', text: 'to decorate them' },
            { key: 'D', text: 'to keep people away' },
          ],
          answer: 'B',
          skill: '因果关系',
        },
        {
          id: 8,
          question: 'What skill do adult members of the tribe teach their children?',
          options: [
            { key: 'A', text: 'how to use computers' },
            { key: 'B', text: 'how to build treehouses' },
            { key: 'C', text: 'how to speak English' },
            { key: 'D', text: 'how to be farmers' },
          ],
          answer: 'B',
          skill: '推理判断',
        },
        {
          id: 9,
          question: 'How are the Kombai similar to urban apartment-dwellers?',
          options: [
            { key: 'A', text: 'They live high up in rooms with views.' },
            { key: 'B', text: 'They live above the forest canopy.' },
            { key: 'C', text: 'They live in remote areas.' },
            { key: 'D', text: 'They live in hand-built homes in trees.' },
          ],
          answer: 'A',
          skill: '比较理解',
        },
        {
          id: 10,
          question: 'Read this sentence: The Kombai occupy a remote, swampy area. Which of the following means the same as occupy?',
          options: [
            { key: 'A', text: 'search for' },
            { key: 'B', text: 'enter and exit' },
            { key: 'C', text: 'often visit' },
            { key: 'D', text: 'live in' },
          ],
          answer: 'D',
          skill: '词汇理解',
        },
      ],
    },
    {
      id: 'T3',
      title: 'The Reading Chair',
      type: 'fiction',
      typeLabel: '虚构',
      text: `Daniella couldn't understand why Dad spent every Saturday cooped up in the garage, building chairs. After all, the machine-made chairs available at the mall were just as large and nice-looking.
Sometimes, Daniella would hover nearby, watching Dad using his saws, sanders, and drills. But the heat in the garage was overpowering. So, after a while, she would go read in the yard.
When he finished, Dad would stand in the driveway with his safety glasses on. He would shout, "Fire away!" Daniella would spray him with water. Then they would share a cold ginger ale.
One day, when Daniella peeked into the garage, the pile of lumber finally looked like a chair. A week later, it was her favorite shade of royal blue. The next Saturday, Dad carried the chair to her reading spot under the magnolia tree. Then Dad lay back in the grass, resting. Daniella sat in her chair.
"Now every time you sit in this chair, you'll remember our weekends together," said Dad.
Daniella realized then how meaningful something could be when it was handmade.`,
      questions: [
        {
          id: 11,
          question: 'What happened after Dad carried the chair outside?',
          options: [
            { key: 'A', text: 'Dad and Daniella sat together in the yard.' },
            { key: 'B', text: 'Daniella sprayed Dad with water.' },
            { key: 'C', text: 'Daniella peeked into the garage.' },
            { key: 'D', text: "Dad painted the chair Daniella's favorite color." },
          ],
          answer: 'A',
          skill: '顺序理解',
        },
        {
          id: 12,
          question: 'Where did Daniella like to read?',
          options: [
            { key: 'A', text: 'at a mall' },
            { key: 'B', text: 'under a tree' },
            { key: 'C', text: 'in a garage' },
            { key: 'D', text: 'in a driveway' },
          ],
          answer: 'B',
          skill: '故事要素',
        },
        {
          id: 13,
          question: 'Read this sentence from the passage: Daniella would hover nearby, watching Dad using his saws, sanders, and drills. Which words in this sentence help define the word hover?',
          options: [
            { key: 'A', text: 'Daniella would' },
            { key: 'B', text: 'nearby, watching' },
            { key: 'C', text: 'Dad using' },
            { key: 'D', text: 'saws, sanders, and drills' },
          ],
          answer: 'B',
          skill: '词汇理解',
        },
        {
          id: 14,
          question: 'How was the chair that Dad made different from the chairs that were available at the mall?',
          options: [
            { key: 'A', text: 'It looked nicer but was too small.' },
            { key: 'B', text: 'It was larger and her favorite shade of green.' },
            { key: 'C', text: 'It had been made with care as a gift.' },
            { key: 'D', text: 'It had been made using woodworking machines.' },
          ],
          answer: 'C',
          skill: '比较理解',
        },
        {
          id: 15,
          question: "How did Daniella's point of view change in the story?",
          options: [
            { key: 'A', text: 'from enjoying woodworking to enjoying painting' },
            { key: 'B', text: 'from thinking that the garage was hot to thinking that it was cool' },
            { key: 'C', text: 'from liking to read in her yard to liking woodworking better' },
            { key: 'D', text: "from not understanding her father's actions to understanding them" },
          ],
          answer: 'D',
          skill: '人物分析',
        },
      ],
    },
    {
      id: 'T4',
      title: 'Making Cars',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `Cars are an important part of life in the United States. Did you know that cars are made up of more than thirty thousand parts? How do all these pieces get put together?
The different parts are made in separate places and shipped to an assembly plant, where people and machines put them together. For example, factories make metal parts for a car's engine, suspension, transmission, and brakes. Then these parts are shipped to the assembly plant where workers bolt the "guts" of the car onto an aluminum frame.
While this is happening, robots take enormous sheets of metal and stamp them into shapes that form the car's body, such as the doors and hood. Robots weld these parts together and coat everything with paint and varnish. Machines lower the body onto and around the "guts." Then, workers install the final pieces, such as the windshield and seats. Finally, the wheels and tires go on, and the car is inspected before it rolls out the factory door.`,
      questions: [
        {
          id: 16,
          question: 'What is the passage mostly about?',
          options: [
            { key: 'A', text: 'the tasks that most robots do' },
            { key: 'B', text: 'the reasons why cars are important' },
            { key: 'C', text: 'the different types of assembly plants' },
            { key: 'D', text: 'the process of making cars' },
          ],
          answer: 'D',
          skill: '主旨与细节',
        },
        {
          id: 17,
          question: "What is a similarity between the car's windshield and seats?",
          options: [
            { key: 'A', text: 'They are bolted to the frame as part of the car\'s "guts".' },
            { key: 'B', text: 'They are on the inside of the car.' },
            { key: 'C', text: 'They are some of the final pieces to be installed.' },
            { key: 'D', text: 'They are made at the assembly plant.' },
          ],
          answer: 'C',
          skill: '比较理解',
        },
        {
          id: 18,
          question: 'Which happens first in the process of making cars?',
          options: [
            { key: 'A', text: 'Robots weld the parts together.' },
            { key: 'B', text: 'Parts are shipped to the factory.' },
            { key: 'C', text: 'The car receives a coat of paint.' },
            { key: 'D', text: 'The car goes through a final inspection.' },
          ],
          answer: 'B',
          skill: '顺序理解',
        },
        {
          id: 19,
          question: 'Robots stamp sheets of metal into shapes to _____.',
          options: [
            { key: 'A', text: 'make the "guts" of the car' },
            { key: 'B', text: "build the car's engine" },
            { key: 'C', text: "make the car's body" },
            { key: 'D', text: "cover the car's wheels" },
          ],
          answer: 'C',
          skill: '主旨与细节',
        },
        {
          id: 20,
          question: 'In the passage, what is a plant?',
          options: [
            { key: 'A', text: 'something that grows in the ground' },
            { key: 'B', text: 'a vehicle that carries people from place to place' },
            { key: 'C', text: 'a place where people work' },
            { key: 'D', text: 'an object that is made from many parts' },
          ],
          answer: 'C',
          skill: '词汇理解',
        },
      ],
    },
  ],
}

export default placementT
