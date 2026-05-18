export const levelC = {
  id: "C",
  name: "C级别",
  passScore: 80,
  printPdf: "/raw/C/c passage quiz(2).pdf",

  tts: {
    passage: false,
    question: true,
    options: false,
  },

  passages: [
    {
      id: "C1",
      title: "The Moon Can Look Different",
      type: "nonfiction",
      typeLabel: "非虚构",
      text: `The moon can look different.
It can look orange, white, and red.
I see an orange moon at nighttime.
What is under the orange moon?
These trees are under it.
These leaves are under it.
These yummy apples are under it.
This brown fox is under it.
This white owl is under it.
I like to see the orange moon.`,
      questions: [
        {
          id: 1,
          question: "What is under the orange moon?",
          questionZh: "橙色月亮下面有什么？",
          ttsText: "What is under the orange moon?",
          options: [
            { key: "A", text: "a white owl" },
            { key: "B", text: "a yellow sun" },
            { key: "C", text: "a pink flower" },
          ],
          answer: "A",
          skill: "主旨与细节",
        },
        {
          id: 2,
          question: "In what way are the tree and the owl the same?",
          questionZh: "树和猫头鹰有什么相同点？",
          ttsText: "In what way are the tree and the owl the same?",
          options: [
            { key: "A", text: "They are both brown." },
            { key: "B", text: "They are both under the moon." },
            { key: "C", text: "They are the same size." },
          ],
          answer: "B",
          skill: "比较理解",
        },
        {
          id: 3,
          question: "Why can the moon look different?",
          questionZh: "为什么月亮看起来会不同？",
          ttsText: "Why can the moon look different?",
          options: [
            { key: "A", text: "The moon can be all shapes." },
            { key: "B", text: "The moon can be different colors." },
            { key: "C", text: "The moon can change to a star." },
          ],
          answer: "B",
          skill: "因果关系",
        },
        {
          id: 4,
          question: "What word in the passage is used to tell how something tastes?",
          questionZh: "文章中哪个词是用来描述味道的？",
          ttsText: "What word in the passage is used to tell how something tastes?",
          options: [
            { key: "A", text: "under" },
            { key: "B", text: "orange" },
            { key: "C", text: "yummy" },
          ],
          answer: "C",
          skill: "分类理解",
        },
        {
          id: 5,
          question: "What does the word under mean?",
          questionZh: "under 是什么意思？",
          ttsText: "What does the word under mean?",
          options: [
            { key: "A", text: "above" },
            { key: "B", text: "below" },
            { key: "C", text: "beside" },
          ],
          answer: "B",
          skill: "词汇理解",
        },
      ],
    },

    {
      id: "C2",
      title: "What Will You Have At a Party?",
      type: "nonfiction",
      typeLabel: "非虚构",
      text: `What will you have at a party?
Is it a birthday party?
It is a birthday party.
You will have a balloon.
You will have a birthday card.
You will sing a song.
You will eat at the party.
You will play at the party.
You will feel happy.
You will like a birthday party.`,
      questions: [
        {
          id: 6,
          question: "Which word best describes a party?",
          questionZh: "哪个词最能描述 party？",
          ttsText: "Which word best describes a party?",
          options: [
            { key: "A", text: "hard" },
            { key: "B", text: "fast" },
            { key: "C", text: "fun" },
          ],
          answer: "C",
          skill: "词汇理解",
        },
        {
          id: 7,
          question: "What will you do at the party?",
          questionZh: "你会在 party 上做什么？",
          ttsText: "What will you do at the party?",
          options: [
            { key: "A", text: "buy a balloon" },
            { key: "B", text: "sing a song" },
            { key: "C", text: "send a card" },
          ],
          answer: "B",
          skill: "主旨与细节",
        },
        {
          id: 8,
          question: "Which sentence tells an opinion?",
          questionZh: "哪句话表达的是观点？",
          ttsText: "Which sentence tells an opinion?",
          options: [
            { key: "A", text: "This passage is about a birthday party." },
            { key: "B", text: "People sing, eat, and play at the party." },
            { key: "C", text: "This is the best birthday party." },
          ],
          answer: "C",
          skill: "事实判断",
        },
        {
          id: 9,
          question: "How does the author think you will feel at the birthday party?",
          questionZh: "作者认为你在生日派对上会感觉怎样？",
          ttsText: "How does the author think you will feel at the birthday party?",
          options: [
            { key: "A", text: "tired" },
            { key: "B", text: "shy" },
            { key: "C", text: "happy" },
          ],
          answer: "C",
          skill: "主旨与细节",
        },
        {
          id: 10,
          question: "Likely, what sentence will you write on the card?",
          questionZh: "你最可能在卡片上写哪句话？",
          ttsText: "Likely, what sentence will you write on the card?",
          options: [
            { key: "A", text: "Happy Birthday!" },
            { key: "B", text: "Do you like cake?" },
            { key: "C", text: "I like to sing a song." },
          ],
          answer: "A",
          skill: "推理判断",
        },
      ],
    },

    {
      id: "C3",
      title: "It Is a Birthday Party",
      type: "fiction",
      typeLabel: "虚构",
      text: `I open the door.
The children sing "Happy Birthday."
It is a birthday party.
They have a balloon for me.
They have a card for me.
I open the card.
They have a box for me.
I open the box.
I like what is in the box.
It is a toy train.
It is a happy birthday party!`,
      questions: [
        {
          id: 11,
          question: "What is the story mostly about?",
          questionZh: "这个故事主要讲什么？",
          ttsText: "What is the story mostly about?",
          options: [
            { key: "A", text: "a balloon" },
            { key: "B", text: "a new toy train" },
            { key: "C", text: "a birthday party" },
          ],
          answer: "C",
          skill: "主旨与细节",
        },
        {
          id: 12,
          question: "What does the child open first?",
          questionZh: "孩子最先打开了什么？",
          ttsText: "What does the child open first?",
          options: [
            { key: "A", text: "the door" },
            { key: "B", text: "the card" },
            { key: "C", text: "the box" },
          ],
          answer: "A",
          skill: "顺序理解",
        },
        {
          id: 13,
          question: "How does the girl feel about her birthday party?",
          questionZh: "女孩对她的生日派对感觉怎样？",
          ttsText: "How does the girl feel about her birthday party?",
          options: [
            { key: "A", text: "shy" },
            { key: "B", text: "happy" },
            { key: "C", text: "mad" },
          ],
          answer: "B",
          skill: "人物分析",
        },
        {
          id: 14,
          question: "What was in the box?",
          questionZh: "盒子里有什么？",
          ttsText: "What was in the box?",
          options: [
            { key: "A", text: "something to eat" },
            { key: "B", text: "something to read" },
            { key: "C", text: "something to play with" },
          ],
          answer: "C",
          skill: "分类理解",
        },
        {
          id: 15,
          question: "A birthday is the day someone was _____.",
          questionZh: "birthday 指的是某人哪一天？",
          ttsText: "A birthday is the day someone was.",
          options: [
            { key: "A", text: "called" },
            { key: "B", text: "found" },
            { key: "C", text: "born" },
          ],
          answer: "C",
          skill: "词汇理解",
        },
      ],
    },

    {
      id: "C4",
      title: "Monkeys Have Many Feelings",
      type: "nonfiction",
      typeLabel: "非虚构",
      text: `Monkeys are busy animals.
They have many feelings.
They can feel angry sometimes.
Sometimes they can feel happy, too.
They can feel sad sometimes.
Sometimes they can feel scared.
They can be kind sometimes.
Sometimes they play and sleep, too.
Monkeys can be like you and me.
How do you feel?`,
      questions: [
        {
          id: 16,
          question: "What is the main idea of the passage?",
          questionZh: "这篇文章的主要意思是什么？",
          ttsText: "What is the main idea of the passage?",
          options: [
            { key: "A", text: "Monkeys have feelings." },
            { key: "B", text: "Monkeys can feel sad." },
            { key: "C", text: "Monkeys like to play." },
          ],
          answer: "A",
          skill: "主旨与细节",
        },
        {
          id: 17,
          question: "Which word names a feeling?",
          questionZh: "哪个词表示一种感觉？",
          ttsText: "Which word names a feeling?",
          options: [
            { key: "A", text: "play" },
            { key: "B", text: "sleep" },
            { key: "C", text: "angry" },
          ],
          answer: "C",
          skill: "分类理解",
        },
        {
          id: 18,
          question: "What does the word many mean?",
          questionZh: "many 是什么意思？",
          ttsText: "What does the word many mean?",
          options: [
            { key: "A", text: "none" },
            { key: "B", text: "only one" },
            { key: "C", text: "more than one" },
          ],
          answer: "C",
          skill: "词汇理解",
        },
        {
          id: 19,
          question: "How are monkeys like you and me?",
          questionZh: "猴子和我们有什么相似之处？",
          ttsText: "How are monkeys like you and me?",
          options: [
            { key: "A", text: "They always play." },
            { key: "B", text: "They always have feelings." },
            { key: "C", text: "They always feel sad." },
          ],
          answer: "B",
          skill: "比较理解",
        },
        {
          id: 20,
          question: "In this sentence, busy means that monkeys _____.",
          questionZh: "busy 在这里表示猴子怎么样？",
          ttsText: "In this sentence, busy means that monkeys.",
          options: [
            { key: "A", text: "do a lot of things" },
            { key: "B", text: "make people feel happy" },
            { key: "C", text: "sleep most of the day" },
          ],
          answer: "A",
          skill: "词汇理解",
        },
      ],
    },
  ],
}

export default levelC
