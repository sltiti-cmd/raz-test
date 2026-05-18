export const levelK = {
  id: "K",
  name: "K级别",
  passScore: 80,
  printPdf: "/raw/K/K级别-测试.pdf",
  passages: [
    {
      id: "K1",
      title: "The Treasure Map",
      type: "fiction",
      typeLabel: "虚构",
      text: `Jayda and Sara sat on their porch.
"I wish we had a treasure map," Jayda said.
Sara nodded. "We can probably make one," she said.
"Yes," said Jayda, "but we don't have any treasure hidden."
"I have an idea," Sara said. "I'll hide some treasure, and you make the map. I'll use coins as treasure."
Sara went to hide the coins while Jayda gathered art supplies.
Then, when Jayda sat down to create the map, she realized there was a problem.
"Sara," called Jayda.
"How can I make this map? You're the one who knows where the treasure is!"`,
      questions: [
        {
          id: 1,
          question: "What did Jayda do first?",
          questionZh: "Jayda 首先做了什么？",
          options: [
            { key: "A", text: "She made a map." },
            { key: "B", text: "She hid treasure." },
            { key: "C", text: "She gathered art supplies." },
            { key: "D", text: "She found the treasure." }
          ],
          answer: "C",
          skill: "顺序理解"
        },
        {
          id: 2,
          question: "How did the girls solve the problem of not having any treasure hidden?",
          questionZh: "女孩们如何解决没有宝藏可藏的问题？",
          options: [
            { key: "A", text: "Jayda buys some treasure." },
            { key: "B", text: "Sara hides some coins." },
            { key: "C", text: "Sara follows a real treasure map." },
            { key: "D", text: "Jayda hid art supplies." }
          ],
          answer: "B",
          skill: "问题解决"
        },
        {
          id: 3,
          question: "Which word has almost the same meaning as realized in the story?",
          questionZh: "realized 在故事中意思接近哪个词？",
          options: [
            { key: "A", text: "forgot" },
            { key: "B", text: "wished" },
            { key: "C", text: "noticed" },
            { key: "D", text: "read" }
          ],
          answer: "C",
          skill: "词汇理解"
        },
        {
          id: 4,
          question: "Where did most of the story take place?",
          questionZh: "故事主要发生在哪里？",
          options: [
            { key: "A", text: "on a porch" },
            { key: "B", text: "on an island" },
            { key: "C", text: "on top of a map" },
            { key: "D", text: "at an art supply store" }
          ],
          answer: "A",
          skill: "场景理解"
        },
        {
          id: 5,
          question: "Why was Jayda not able to draw the treasure map?",
          questionZh: "Jayda 为什么不能画藏宝图？",
          options: [
            { key: "A", text: "She had lost the treasure." },
            { key: "B", text: "She did not know where the treasure was hidden." },
            { key: "C", text: "She was not able to draw well." },
            { key: "D", text: "She did not want to find the treasure." }
          ],
          answer: "B",
          skill: "问题解决"
        }
      ]
    },
    {
      id: "K2",
      title: "Map Tools",
      type: "nonfiction",
      typeLabel: "非虚构",
      text: `Maps help us find places when we travel. They show us how many miles one place is from another place. They show how land areas look from above.
Markings on a map stand for real things in the world. Many maps have a tool called a key. The key tells us what the markings mean. For example, blue lines might show rivers.
Most maps have a tool called a compass rose. This tool shows a map's directions: north, east, south, and west.
Reading a map may seem difficult. But a map's tools make it easier to use.`,
      questions: [
        {
          id: 6,
          question: "What is the passage mostly about?",
          questionZh: "这篇文章主要讲什么？",
          options: [
            { key: "A", text: "what blue lines on a map show" },
            { key: "B", text: "how difficult it is to read a map" },
            { key: "C", text: "tools that people can use to make maps" },
            { key: "D", text: "tools on maps and how they help people" }
          ],
          answer: "C",
          skill: "主旨理解"
        },
        {
          id: 7,
          question: "According to the passage, a map's key is _____.",
          questionZh: "根据文章，地图上的 key 是什么？",
          options: [
            { key: "A", text: "a piece of metal that will open treasure chests found on maps" },
            { key: "B", text: "a tool on a map that shows where different directions are" },
            { key: "C", text: "a tool on a map that shows what different markings mean" },
            { key: "D", text: "a piece of metal that can fit into a lock used to protect a map" }
          ],
          answer: "B",
          skill: "词汇理解"
        },
        {
          id: 8,
          question: "According to the passage, what is one thing a compass rose shows?",
          questionZh: "compass rose 能显示什么？",
          options: [
            { key: "A", text: "how far apart things are" },
            { key: "B", text: "how to find south on a map" },
            { key: "C", text: "where to find the nearest flower shop" },
            { key: "D", text: "where rivers are on a map" }
          ],
          answer: "C",
          skill: "信息提取"
        },
        {
          id: 9,
          question: "What is the author's purpose for writing the passage?",
          questionZh: "作者写这篇文章的目的是什么？",
          options: [
            { key: "A", text: "to persuade you to go on a trip so you can use a map" },
            { key: "B", text: "to tell how maps and map tools can help you" },
            { key: "C", text: "to entertain you with a story of how a family used a map as a tool" },
            { key: "D", text: "to describe a place that you will find if you use a map" }
          ],
          answer: "A",
          skill: "作者意图"
        },
        {
          id: 10,
          question: "Which of the following would you find a symbol for on a compass rose?",
          questionZh: "compass rose 上会出现哪个符号？",
          options: [
            { key: "A", text: "city" },
            { key: "B", text: "forest" },
            { key: "C", text: "north" },
            { key: "D", text: "water" }
          ],
          answer: "B",
          skill: "符号理解"
        }
      ]
    },
    {
      id: "K3",
      title: "The Great Zoo Escape",
      type: "fiction",
      typeLabel: "虚构",
      text: `"I promised we would escape," the old ostrich told her flock.
A younger ostrich said, "Yahoo, no more zoo!"
Each creature looked happy. The animals had run away on tiptoe past the zoo patrol.
"We're free!" two donkeys shouted.
"But I'm hungry," one of the amphibians said. "Who will feed us?"
The animals looked at each other.
"I'm tired," said the mare, "and I miss my bed."
Nobody knew what to say.
Then the gorilla made a speech. "This was fun," he said. "Now, shall we tiptoe back inside?"
The animals cheered and shouted, "Let's go home!"`,
      questions: [
        {
          id: 11,
          question: "Where did the animals escape from?",
          questionZh: "动物们从哪里逃出来？",
          options: [
            { key: "A", text: "a jungle" },
            { key: "B", text: "a zoo" },
            { key: "C", text: "a circus" },
            { key: "D", text: "a forest" }
          ],
          answer: "D",
          skill: "情节理解"
        },
        {
          id: 12,
          question: "How did the feelings of the animals change during the story?",
          questionZh: "故事中动物们的心情如何变化？",
          options: [
            { key: "A", text: "from calm to nervous to calm again" },
            { key: "B", text: "from bored to excited to bored again" },
            { key: "C", text: "from angry to joyful to angry again" },
            { key: "D", text: "from happy to sad to happy again" }
          ],
          answer: "C",
          skill: "情绪变化"
        },
        {
          id: 13,
          question: "What does tiptoe mean?",
          questionZh: "tiptoe 是什么意思？",
          options: [
            { key: "A", text: "walk quietly" },
            { key: "B", text: "dance happily" },
            { key: "C", text: "race quickly" },
            { key: "D", text: "stomp loudly" }
          ],
          answer: "B",
          skill: "词汇理解"
        },
        {
          id: 14,
          question: "Which of the animals solved the problem at the end of the story?",
          questionZh: "最后哪个动物解决了问题？",
          options: [
            { key: "A", text: "the old ostrich" },
            { key: "B", text: "one of the amphibians" },
            { key: "C", text: "the gorilla" },
            { key: "D", text: "one of the donkeys" }
          ],
          answer: "B",
          skill: "问题解决"
        },
        {
          id: 15,
          question: "Why did the rest of the animals not know what to say?",
          questionZh: "其他动物为什么不知道该说什么？",
          options: [
            { key: "A", text: "They realized they were not so happy outside the zoo." },
            { key: "B", text: "They were shocked that the amphibian and mare had been so rude." },
            { key: "C", text: "They did not understand what the amphibian and mare had said." },
            { key: "D", text: "They did not agree with the amphibian and mare." }
          ],
          answer: "C",
          skill: "推理判断"
        }
      ]
    },
    {
      id: "K4",
      title: "The Bronx Zoo Cares",
      type: "nonfiction",
      typeLabel: "非虚构",
      text: `The Bronx Zoo is enormous. It has 650 different kinds of animals. It has a total of 4,000 animals.
On a tour, you can see the animal homes. They are like the places where the animals live in the wild. For example, the gorillas in the zoo live in a forest with streams and trees.
Tigers have special homes, too. Tigers like warm rocks and cool water, and they have these at the zoo. The zoo controls the temperatures.
The homes are all hard to build and cost money. They show that the Bronx Zoo cares about its animals.`,
      questions: [
        {
          id: 16,
          question: "Which detail best supports the idea that the Bronx Zoo cares about its animals?",
          questionZh: "哪个细节最能支持 Bronx Zoo 关心动物这个观点？",
          options: [
            { key: "A", text: "The zoo is large enough to hold 650 different kinds of animals and a total of 4,000 animals." },
            { key: "B", text: "The zoo makes sure the homes of the animals are like their homes in the wild." },
            { key: "C", text: "On a tour of the zoo, you can see the homes of the animals." },
            { key: "D", text: "In their homes in the wild, tigers like to have warm rocks and cool water." }
          ],
          answer: "B",
          skill: "细节支持"
        },
        {
          id: 17,
          question: "Which words help readers understand what enormous means?",
          questionZh: "哪些词帮助读者理解 enormous 的意思？",
          options: [
            { key: "A", text: "650 different" },
            { key: "B", text: "Bronx Zoo" },
            { key: "C", text: "kinds of animals" },
            { key: "D", text: "different kinds" }
          ],
          answer: "D",
          skill: "词汇理解"
        },
        {
          id: 18,
          question: "Where do the gorillas in the zoo live?",
          questionZh: "动物园里的大猩猩住在哪里？",
          options: [
            { key: "A", text: "in a cage" },
            { key: "B", text: "in a cave" },
            { key: "C", text: "in a forest" },
            { key: "D", text: "in a building" }
          ],
          answer: "A",
          skill: "场景理解"
        },
        {
          id: 19,
          question: "What is the same about the homes of the gorillas and the homes of the tigers?",
          questionZh: "大猩猩和老虎的家有什么相同点？",
          options: [
            { key: "A", text: "They are cold." },
            { key: "B", text: "They cost little money to build." },
            { key: "C", text: "They are hard to build." },
            { key: "D", text: "They are hard to find." }
          ],
          answer: "C",
          skill: "比较理解"
        },
        {
          id: 20,
          question: "What was the author's purpose for writing this passage?",
          questionZh: "作者写这篇文章的目的是什么？",
          options: [
            { key: "A", text: "to persuade you to build a zoo" },
            { key: "B", text: "to entertain you with stories of zoo animals" },
            { key: "C", text: "to give you information about a zoo" },
            { key: "D", text: "to teach you how animals build their homes" }
          ],
          answer: "A",
          skill: "作者意图"
        }
      ]
    }
  ]
}

export default levelK
