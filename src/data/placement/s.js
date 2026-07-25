// S级别插班测试 — 4篇文章20题（虚构/非虚构交替，选项 A–D）
// 数据来源：RAZ Benchmark Passage Quick Check（含答案页），答案与能力标签逐题核对
export const placementS = {
  id: 'S',
  name: 'S级别插班测试',
  passScore: 80,
  printPdf: '/raw/S/S级别测试-无答案.pdf',
  tts: {
    passage: false,
    question: false,
    options: false,
  },
  source: {
    testPdf: '/raw/S/S级别测试-无答案.pdf',
    answerPdf: '/raw/S/S级别测试-附答案.pdf',
  },
  passages: [
    {
      id: 'S1',
      title: 'The Field Day Flash Mob',
      type: 'fiction',
      typeLabel: '虚构',
      text: `Jessie urged Mr. Johnson to include dancing in P.E. class. "Dancing is great exercise," she said.
"Great idea," he said. "But I'm required to teach only sports approved by the school, so I'll need to discuss your request with the principal."
Later, Mr. Johnson found Jessie. "Guess what? You persuaded us. We're adding dancing at Field Day. Until then, we'll practice in P.E. for a surprise event!" He told Jessie and the others more details, and they started practicing that day.
Eventually, Field Day arrived, and it started much as it did every spring with students participating in games while parents mingled in the crowd.
Then music suddenly blasted from the outdoor speakers. The students all stopped the different things they were doing and began dancing. It was the Woodside Elementary Flash Mob!
They danced for three minutes, until the music stopped. Then they resumed their games as though the dancing had never happened. The parents were thrilled, and the kids were exhausted. Dancing was great exercise, after all.`,
      questions: [
        {
          id: 1,
          question: 'Why did the principal likely decide to allow dancing along with other sports?',
          options: [
            { key: 'A', text: "The students' parents asked for dancing at Field Day." },
            { key: 'B', text: 'The principal was a dancer and wanted to see more dancing.' },
            { key: 'C', text: 'The principal agreed that dancing was good exercise.' },
            { key: 'D', text: 'The school system forced the principal to change the rules.' },
          ],
          answer: 'C',
          skill: '推理判断',
        },
        {
          id: 2,
          question: 'Which of the following words best describes Mr. Johnson in the story?',
          options: [
            { key: 'A', text: 'excited' },
            { key: 'B', text: 'unhappy' },
            { key: 'C', text: 'alone' },
            { key: 'D', text: 'sleepy' },
          ],
          answer: 'A',
          skill: '人物分析',
        },
        {
          id: 3,
          question: 'Read the example sentence: Then they resumed their games as though the dancing had never happened. What does the word resumed mean?',
          options: [
            { key: 'A', text: 'restarted' },
            { key: 'B', text: 'reviewed' },
            { key: 'C', text: 'recreated' },
            { key: 'D', text: 'recovered' },
          ],
          answer: 'A',
          skill: '词汇理解',
        },
        {
          id: 4,
          question: 'For how long did the students dance during the flash mob?',
          options: [
            { key: 'A', text: 'ten seconds' },
            { key: 'B', text: 'three minutes' },
            { key: 'C', text: 'one hour' },
            { key: 'D', text: 'two days' },
          ],
          answer: 'B',
          skill: '故事要素',
        },
        {
          id: 5,
          question: 'During which part of the story did the dancing happen?',
          options: [
            { key: 'A', text: 'the introduction' },
            { key: 'B', text: 'the rising action' },
            { key: 'C', text: 'the climax' },
            { key: 'D', text: 'the falling action' },
          ],
          answer: 'C',
          skill: '情节分析',
        },
      ],
    },
    {
      id: 'S2',
      title: 'Flash Mobs!',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `A flash is a quick burst. A mob is a crowd of people. A flash mob, then, is a group of people who perform together only briefly. Since people started using the term around 2003, the flash mob has become a fun fad all over the world.
The organizer of a flash mob will usually use the Internet to spread the word about where and when to meet and what participants will do. Then the group arrives at the same public place at a certain time. At a signal, the performance suddenly begins. The flash mob might dance or freeze in place or sing a song together. Surprise is important to the success of a flash mob; these performances are most striking when they are least expected. However, spectators are usually welcome to join in the activity, and many do.
When the performance ends, participants return to life as it was before, as if the flash mob event never happened.`,
      questions: [
        {
          id: 6,
          question: "What was the author's main purpose for writing the passage?",
          options: [
            { key: 'A', text: 'to organize a set of flash mobs' },
            { key: 'B', text: 'to persuade readers that flash mobs are good' },
            { key: 'C', text: 'to entertain readers with stories about flash mobs' },
            { key: 'D', text: 'to provide information about flash mobs' },
          ],
          answer: 'D',
          skill: '作者意图',
        },
        {
          id: 7,
          question: 'How do people usually set up flash mobs?',
          options: [
            { key: 'A', text: 'by attending performances and asking performers to join them' },
            { key: 'B', text: 'by calling all the people they know and inviting them to meet' },
            { key: 'C', text: 'by going to a place and handing out fliers to a crowd' },
            { key: 'D', text: 'by sending out information on the Internet' },
          ],
          answer: 'D',
          skill: '因果关系',
        },
        {
          id: 8,
          question: 'Read the example sentence: Surprise is important to the success of a flash mob; these performances are most striking when they are least expected. Which of the following sentences uses the word striking in the same way?',
          options: [
            { key: 'A', text: 'I lit the match by pulling it across the striking surface.' },
            { key: 'B', text: 'The sunset was striking because of its many colors.' },
            { key: 'C', text: 'He started striking the old rug with a broom to shake dirt loose.' },
            { key: 'D', text: 'Striking out in baseball means swinging and missing three times.' },
          ],
          answer: 'B',
          skill: '词汇理解',
        },
        {
          id: 9,
          question: 'What happens after a flash mob performance ends?',
          options: [
            { key: 'A', text: 'participants enjoy dinner together to talk about how it went' },
            { key: 'B', text: 'participants take pictures of each other to remember the moment' },
            { key: 'C', text: 'participants take a bow and wait for the spectators to clap' },
            { key: 'D', text: 'participants return to life as if the flash mob never happened' },
          ],
          answer: 'D',
          skill: '顺序理解',
        },
        {
          id: 10,
          question: 'Why do flash mobs work best with songs and dances that most people already know?',
          options: [
            { key: 'A', text: 'Audiences will be bored unless the flash mob performs songs and dances they know.' },
            { key: 'B', text: 'Performers may not be able to practice together before an event.' },
            { key: 'C', text: "Flash mobs require people from the audience to join in, even if they haven't prepared." },
            { key: 'D', text: 'Organizers can only use songs and dances that appear on the Internet.' },
          ],
          answer: 'B',
          skill: '推理判断',
        },
      ],
    },
    {
      id: 'S3',
      title: 'The Hidden House',
      type: 'fiction',
      typeLabel: '虚构',
      text: `Stephanie stood on the dirt road, holding the directions her friend June had given her. On both sides of the road was dense forest, and there wasn't a single house in sight. Sunshine poured through leaves and tangled branches, creating a mosaic of shadows and light on the ground.
"Am I lost?" Stephanie wondered. "I thought June told me to look her up if I ever hiked out this way, but I don't see her house!"
"That's because I didn't say 'Look me up,'" came a voice from above, "I just said 'Look up!'"
Stephanie looked up. To her astonishment, she saw June peering down from a window in a huge tree house high in a sycamore tree. The walls were rough shingles painted in emerald, turquoise, and tan to match the limbs and foliage. Wooden stairs wound their way up the tree's trunk.
"What a stupendous house!" Stephanie said, chuckling.
"Come on up!" called June.`,
      questions: [
        {
          id: 11,
          question: 'What problem did Stephanie have?',
          options: [
            { key: 'A', text: 'She could not see through the forest.' },
            { key: 'B', text: 'She did not like high places.' },
            { key: 'C', text: 'She could not read the directions.' },
            { key: 'D', text: "She could not find her friend's house." },
          ],
          answer: 'D',
          skill: '问题解决',
        },
        {
          id: 12,
          question: 'What important instruction did Stephanie miss?',
          options: [
            { key: 'A', text: 'Look up.' },
            { key: 'B', text: 'Climb the stairs.' },
            { key: 'C', text: 'Find the sycamore tree.' },
            { key: 'D', text: 'Stop and think.' },
          ],
          answer: 'A',
          skill: '故事要素',
        },
        {
          id: 13,
          question: 'Which word best describes June?',
          options: [
            { key: 'A', text: 'serious' },
            { key: 'B', text: 'quiet' },
            { key: 'C', text: 'playful' },
            { key: 'D', text: 'responsible' },
          ],
          answer: 'C',
          skill: '人物分析',
        },
        {
          id: 14,
          question: 'From what point of view is the story told?',
          options: [
            { key: 'A', text: 'first person' },
            { key: 'B', text: 'second person' },
            { key: 'C', text: 'third person' },
            { key: 'D', text: 'second person and third person' },
          ],
          answer: 'C',
          skill: '故事要素',
        },
        {
          id: 15,
          question: 'What does the word astonishment mean as used in the passage?',
          options: [
            { key: 'A', text: 'pleasure' },
            { key: 'B', text: 'surprise' },
            { key: 'C', text: 'view' },
            { key: 'D', text: 'liking' },
          ],
          answer: 'B',
          skill: '词汇理解',
        },
      ],
    },
    {
      id: 'S4',
      title: 'Unusual Homes',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `Some people are not satisfied to live in traditional houses or apartments, but choose instead to create homes of their own design. These homes show a sense of imagination.
A house in Mexico blends architecture with art. It's built to look like a giant nautilus seashell. The rooms are curved to match the shape of the shell. The walls of one room are sandy, and there are blue tiles on the floor and a window in the ceiling to give a feeling of being underwater.
A house in Pennsylvania is shaped like an enormous shoe. There are five floors and three bedrooms inside this shoe! Even the doghouse and mailbox are shaped like shoes.
Reactions from visitors vary a great deal. There are those who appreciate the unusual buildings, while others scratch their heads and wonder what the homeowners were thinking. Regardless of those reactions, unusual homes can be functional, fantastic, and fun.`,
      questions: [
        {
          id: 16,
          question: 'The main idea of the passage is that _____.',
          options: [
            { key: 'A', text: 'many artists enjoy creating artwork in usual spaces' },
            { key: 'B', text: 'builders can create homes that make it feel like you are underwater when you are inside' },
            { key: 'C', text: 'some homes are designed to look very different from most other homes' },
            { key: 'D', text: 'houses sometimes look like shells or shoes' },
          ],
          answer: 'C',
          skill: '主旨与细节',
        },
        {
          id: 17,
          question: 'Read the example sentence: Some people are not satisfied to live in traditional houses or apartments, so they choose to create homes of their own design. What does the word satisfied mean?',
          options: [
            { key: 'A', text: 'helped by a process' },
            { key: 'B', text: 'created to be a certain way' },
            { key: 'C', text: 'made happy or pleased' },
            { key: 'D', text: 'asked to put an end to' },
          ],
          answer: 'C',
          skill: '词汇理解',
        },
        {
          id: 18,
          question: 'What is one difference between unusual homes and most other homes?',
          options: [
            { key: 'A', text: 'Unusual homes have very few rooms, while most other homes have many rooms.' },
            { key: 'B', text: 'Unusual homes have many different shapes, while most other homes have similar shapes.' },
            { key: 'C', text: 'Unusual homes have art inside them, while most other homes do not have art.' },
            { key: 'D', text: 'Unusual homes have colorful walls, while most other homes have white walls.' },
          ],
          answer: 'B',
          skill: '比较理解',
        },
        {
          id: 19,
          question: "What is the author's point of view on the topic of this passage?",
          options: [
            { key: 'A', text: 'Unusual homes are fantastic houses for everyone.' },
            { key: 'B', text: 'Unusual homes are uncomfortable.' },
            { key: 'C', text: 'Unusual homes often take up too much space.' },
            { key: 'D', text: 'Unusual homes can be perfect homes for some people.' },
          ],
          answer: 'D',
          skill: '作者观点',
        },
        {
          id: 20,
          question: 'Which of the following is not an example of an unusual structure from the passage?',
          options: [
            { key: 'A', text: 'a room that is curved like a shell' },
            { key: 'B', text: 'a room that has a window in the ceiling' },
            { key: 'C', text: 'a doghouse that looks like a shoe' },
            { key: 'D', text: 'a mailbox that looks like a letter' },
          ],
          answer: 'D',
          skill: '主旨与细节',
        },
      ],
    },
  ],
}

export default placementS
