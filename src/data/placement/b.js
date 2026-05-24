// AUTO-GENERATED — edit manually or regenerate with: npm run import:placement
// Status: imported (2026-05-16T04:46:32.343Z)
// Total passages: 4 | Total questions: 20


export const placementB = {
  id: 'B',
  name: 'B级别插班测试',
  passScore: 80,
  printPdf: '/raw/B/B级别测试-无答案.pdf',

  tts: {
    passage: false,
    question: true,
    options: false,
  },

  passages: [
    {
      id: "B1",
      title: "Big and Little",
      type: "nonfiction",
      typeLabel: "非虚构",
      text: "Things are big and little.\nThat pig is big.\nThat pig is little.\nThat plant is big.\nThat plant is little.\nThat slide is big.\nThat slide is little.\nMany things are big and little.",
      questions: [
        {
          id: 1,
          question: "What is the main idea of this passage?",
          options: [
            { key: 'A', text: "Things are big and little." },
            { key: 'B', text: "The big and little pigs are sleeping." },
          ],
          answer: "B",
          skill: "主旨与细节",
        },
        {
          id: 2,
          question: "Which names something else that is big?",
          options: [
            { key: 'A', text: "a mouse" },
            { key: 'B', text: "a house" },
          ],
          answer: "A",
          skill: "推理判断",
        },
        {
          id: 3,
          question: "Which is true about plants?",
          questionZh: "请根据文章内容作答。", // TODO: verify — auto-generated
          options: [
          { key: 'A', text: "Plants can only be big." },
          { key: 'B', text: "Plants can be big and little." }
          ],
          answer: "B",
          skill: "主旨与细节",
        },
        {
          id: 4,
          question: "Which means the opposite of little?",
          questionZh: "请根据文章内容作答。", // TODO: verify — auto-generated
          options: [
          { key: 'A', text: "big" },
          { key: 'B', text: "many" }
          ],
          answer: "A",
          skill: "词汇理解",
        },
        {
          id: 5,
          question: "Which word means the same as little?",
          questionZh: "这个词是什么意思？", // TODO: verify — auto-generated
          options: [
          { key: 'A', text: "large" },
          { key: 'B', text: "small" }
          ],
          answer: "B",
          skill: "词汇理解",
        }
      ],
    },
    {
      id: "P2",
      title: "Near  the  Pond",
      type: "nonfiction",
      typeLabel: "非虚构",
      text: "A bug is near the pond.\nA snake is near the pond.\nA bird is near the pond.\nA duck is near the pond.\nA goat is near the pond.\nA sheep is near the pond.\nA lion is near the pond.\nThe pond has water.",
      questions: [
        {
          id: 6,
          question: "Where can you find a pond?",
          questionZh: "...在哪里？", // TODO: verify — auto-generated
          options: [
          { key: 'A', text: "outside" },
          { key: 'B', text: "inside" }
          ],
          answer: "A",
          skill: "推理判断",
        },
        {
          id: 7,
          question: "Why does the lion most likely go to the pond?",
          questionZh: "为什么...？", // TODO: verify — auto-generated
          options: [
          { key: 'A', text: "The lion wants a drink." },
          { key: 'B', text: "The lion wants to sleep." }
          ],
          answer: "B",
          skill: "因果关系",
        },
        {
          id: 8,
          question: "What is this passage mostly about?",
          questionZh: "请根据文章内容作答。", // TODO: verify — auto-generated
          options: [
          { key: 'A', text: "The pond has a lot of water." },
          { key: 'B', text: "Many animals are near the pond." }
          ],
          answer: "B",
          skill: "主旨与细节",
        },
        {
          id: 9,
          question: "These words from the passage belong to which group: bug, duck, sheep?",
          questionZh: "请根据文章内容作答。", // TODO: verify — auto-generated
          options: [
          { key: 'A', text: "animals" },
          { key: 'B', text: "clothes" }
          ],
          answer: "A",
          skill: "分类理解",
        },
        {
          id: 10,
          question: "Something that is near is",
          questionZh: "请根据文章内容作答。", // TODO: verify — auto-generated
          options: [
          { key: 'A', text: "far away" },
          { key: 'B', text: "close by" }
          ],
          answer: "B",
          skill: "词汇理解",
        }
      ],
    },
    {
      id: "P3",
      title: "Ted  Sees  a  Pond",
      type: "fiction",
      typeLabel: "虚构",
      text: "We go on a walk.\nTed sees some ducks.\nTed sees some plants.\nTed sees some bugs.\nTed sees some fish.\nTed sees a turtle.\nTed sees some water.\nTed sees a pond.\nWe go on a walk home.",
      questions: [
        {
          id: 11,
          question: "Which of these is a detail in the story?",
          questionZh: "请根据文章内容作答。", // TODO: verify — auto-generated
          options: [
          { key: 'A', text: "Ted sees a turtle." },
          { key: 'B', text: "Ted hears a bird." }
          ],
          answer: "A",
          skill: "主旨与细节",
        },
        {
          id: 12,
          question: "What do the boy and dog do?",
          questionZh: "请根据文章内容作答。", // TODO: verify — auto-generated
          options: [
          { key: 'A', text: "go on a walk" },
          { key: 'B', text: "play with the ducks" }
          ],
          answer: "A",
          skill: "故事要素",
        },
        {
          id: 13,
          question: "Where is the last place Ted goes?",
          questionZh: "...在哪里？", // TODO: verify — auto-generated
          options: [
          { key: 'A', text: "to the pond" },
          { key: 'B', text: "to his home" }
          ],
          answer: "B",
          skill: "顺序理解",
        },
        {
          id: 14,
          question: "Ted sees ducks, fish, and bugs. In which group do these belong?",
          questionZh: "请根据文章内容作答。", // TODO: verify — auto-generated
          options: [
          { key: 'A', text: "animals" },
          { key: 'B', text: "plants" }
          ],
          answer: "A",
          skill: "分类理解",
        },
        {
          id: 15,
          question: "Which word in the passage best describes a pond?",
          questionZh: "哪个最准确？", // TODO: verify — auto-generated
          options: [
          { key: 'A', text: "water" },
          { key: 'B', text: "walk" }
          ],
          answer: "B",
          skill: "词汇理解",
        }
      ],
    },
    {
      id: "P4",
      title: "We  Read  About  Animals",
      type: "fiction",
      typeLabel: "虚构",
      text: "We read about a rabbit.\nWe read about a turtle.\nWe read about a puppy.\nWe read about a fish.\nWe read about a sheep.\nWe read about a horse.\nWe read about a pig.\nI like all these animals.",
      questions: [
        {
          id: 16,
          question: "What do the characters do in the story?",
          questionZh: "请根据文章内容作答。", // TODO: verify — auto-generated
          options: [
          { key: 'A', text: "They read a book." },
          { key: 'B', text: "They go to the zoo." }
          ],
          answer: "B",
          skill: "故事要素",
        },
        {
          id: 17,
          question: "Which sentence tells a fact about the story?",
          questionZh: "请根据文章内容作答。", // TODO: verify — auto-generated
          options: [
          { key: 'A', text: "A puppy is an animal." },
          { key: 'B', text: "A puppy is the best animal." }
          ],
          answer: "A",
          skill: "事实判断",
        },
        {
          id: 18,
          question: "Which is not an animal?",
          questionZh: "请根据文章内容作答。", // TODO: verify — auto-generated
          options: [
          { key: 'A', text: "a bus" },
          { key: 'B', text: "a cow" }
          ],
          answer: "B",
          skill: "分类理解",
        },
        {
          id: 19,
          question: "How does the girl feel about the animals she reads about?",
          questionZh: "...是怎样的？", // TODO: verify — auto-generated
          options: [
          { key: 'A', text: "She likes the animals." },
          { key: 'B', text: "She does not like the animals." }
          ],
          answer: "A",
          skill: "人物分析",
        },
        {
          id: 20,
          question: "What does it mean to read?",
          questionZh: "\"it\" 是什么意思？", // TODO: verify — auto-generated
          options: [
          { key: 'A', text: "to count to the number ten" },
          { key: 'B', text: "to say written words out loud" }
          ],
          answer: "B",
          skill: "词汇理解",
        }
      ],
    }
  ],
}
export default placementB
