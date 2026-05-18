export const placementF = {
  id: 'F',
  name: 'F级别插班测试',
  passScore: 80,
  printPdf: '/raw/placement/F/F级别升级测试-无答案(1).pdf',

  tts: {
    passage: false,
    question: true,
    options: false,
  },

  passages: [
    {
      id: 'F1',
      title: 'Jake Sees a Tunnel',
      type: 'fiction',
      typeLabel: '虚构',
      text: `Jake is at the park on a hot day.
He sees a tunnel that is dark and cool.
He goes inside the dark and cool tunnel.
Jake steps in the water running through the tunnel.
The water running through the tunnel makes his feet feel cool.
Jake steps out of the tunnel.
He sees water from the tunnel has made a small pond.
Jake asks his mom to come to the small pond.
He asks if he can play in the pond.
She says yes, and Jake runs into the water.`,
      questions: [
        {
          id: 1,
          question: 'Why does Jake go inside the tunnel?',
          questionZh: 'Jake 为什么走进 tunnel？',
          ttsText: 'Why does Jake go inside the tunnel?',
          options: [
            { key: 'A', text: 'He wants to play in the pond.' },
            { key: 'B', text: 'It is cool inside the tunnel.' },
            { key: 'C', text: 'His mom is inside the tunnel.' },
          ],
          answer: 'B',
          skill: '因果关系',
        },
        {
          id: 2,
          question: 'Where does the tunnel go?',
          questionZh: 'tunnel 通向哪里？',
          ttsText: 'Where does the tunnel go?',
          options: [
            { key: 'A', text: 'over the water' },
            { key: 'B', text: 'into the pond' },
            { key: 'C', text: 'to the park' },
          ],
          answer: 'A',
          skill: '主旨与细节',
        },
        {
          id: 3,
          question: 'Why is the tunnel cool and dark?',
          questionZh: 'tunnel 为什么又凉又暗？',
          ttsText: 'Why is the tunnel cool and dark?',
          options: [
            { key: 'A', text: 'It is in the park.' },
            { key: 'B', text: 'It is in the shade.' },
            { key: 'C', text: 'It is a big tunnel.' },
          ],
          answer: 'B',
          skill: '推理判断',
        },
        {
          id: 4,
          question: 'Which of the following happens first in the story?',
          questionZh: '故事中最先发生了什么？',
          ttsText: 'Which of the following happens first in the story?',
          options: [
            { key: 'A', text: 'Jake walks inside a tunnel.' },
            { key: 'B', text: 'Jake sees a small pond.' },
            { key: 'C', text: 'Jake asks his mom a question.' },
          ],
          answer: 'A',
          skill: '顺序理解',
        },
        {
          id: 5,
          question: 'Which word means the same as running in this sentence?',
          questionZh: 'running 在这句话里是什么意思？',
          ttsText: 'Which word means the same as running in this sentence?',
          options: [
            { key: 'A', text: 'practicing' },
            { key: 'B', text: 'covering' },
            { key: 'C', text: 'flowing' },
          ],
          answer: 'C',
          skill: '词汇理解',
        },
      ],
    },

    {
      id: 'F2',
      title: 'Workers Make a Tunnel',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `Workers help to make many things. These workers are making a tunnel.
First, the workers look at the rock they need to dig through.
They will dig through the rock to make the tunnel.
Next, the workers find the tools they need.
Some tools will help them to dig through the rock.
Some tools will help them to carry rock away from the tunnel.
Last, the workers dig and dig.
They dig a long tunnel through the rock.
They do a good job making the tunnel.`,
      questions: [
        {
          id: 6,
          question: 'Why do workers carry the rocks away from the tunnel?',
          questionZh: '工人为什么要把 rocks 从 tunnel 里运走？',
          ttsText: 'Why do workers carry the rocks away from the tunnel?',
          options: [
            { key: 'A', text: 'to keep the rocks in a safe place' },
            { key: 'B', text: 'to make the tunnel longer' },
            { key: 'C', text: 'to get the rocks out of the way' },
          ],
          answer: 'B',
          skill: '推理判断',
        },
        {
          id: 7,
          question: 'What do the workers do first when they make a tunnel?',
          questionZh: '工人建 tunnel 时最先做什么？',
          ttsText: 'What do the workers do first when they make a tunnel?',
          options: [
            { key: 'A', text: 'They look at the rock.' },
            { key: 'B', text: 'They gather the tools they need.' },
            { key: 'C', text: 'They dig through the rock.' },
          ],
          answer: 'A',
          skill: '顺序理解',
        },
        {
          id: 8,
          question: 'Using the information in the passage, where are the workers most likely making the tunnel?',
          questionZh: '根据文章信息，工人最可能在哪里建 tunnel？',
          ttsText: 'Using the information in the passage, where are the workers most likely making the tunnel?',
          options: [
            { key: 'A', text: 'in a river' },
            { key: 'B', text: 'under the ground' },
            { key: 'C', text: 'on a city street' },
          ],
          answer: 'B',
          skill: '推理判断',
        },
        {
          id: 9,
          question: 'Which sentence tells an opinion the author shares?',
          questionZh: '哪句话表达了作者的观点？',
          ttsText: 'Which sentence tells an opinion the author shares?',
          options: [
            { key: 'A', text: 'Long tunnels are hard to dig.' },
            { key: 'B', text: 'The tools workers need are hard to find.' },
            { key: 'C', text: 'The workers do a good job.' },
          ],
          answer: 'A',
          skill: '事实判断',
        },
        {
          id: 10,
          question: 'Which word means the same as make?',
          questionZh: 'make 的意思和哪个词相近？',
          ttsText: 'Which word means the same as make?',
          options: [
            { key: 'A', text: 'build' },
            { key: 'B', text: 'crush' },
            { key: 'C', text: 'enter' },
          ],
          answer: 'C',
          skill: '词汇理解',
        },
      ],
    },

    {
      id: 'F3',
      title: 'Energy Helps My Body Move',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `I have lots of energy in my body.
Energy helps my body to move.
What can I do to use my body's energy?
I can ride my bike around the neighborhood.
I can ride my bike to use my body's energy.
I can move my arms and legs to dance.
I can dance to use my body's energy.
I can run around my house.
I can run to use my body's energy.
Now, I'm hungry.
I need to eat so that my body has more energy.`,
      questions: [
        {
          id: 11,
          question: "What is one thing the girl does to use her body's energy?",
          questionZh: '女孩做了什么来使用身体的 energy？',
          ttsText: "What is one thing the girl does to use her body's energy?",
          options: [
            { key: 'A', text: 'eat' },
            { key: 'B', text: 'rest' },
            { key: 'C', text: 'dance' },
          ],
          answer: 'B',
          skill: '主旨与细节',
        },
        {
          id: 12,
          question: 'Which sentence is a fact?',
          questionZh: '哪句话是事实？',
          ttsText: 'Which sentence is a fact?',
          options: [
            { key: 'A', text: 'It is a lot of fun to dance.' },
            { key: 'B', text: 'People use energy to move.' },
            { key: 'C', text: 'Riding your bike is better than walking.' },
          ],
          answer: 'A',
          skill: '事实判断',
        },
        {
          id: 13,
          question: 'What gives your body energy?',
          questionZh: '什么给身体提供 energy？',
          ttsText: 'What gives your body energy?',
          options: [
            { key: 'A', text: 'food' },
            { key: 'B', text: 'bikes' },
            { key: 'C', text: 'friends' },
          ],
          answer: 'B',
          skill: '推理判断',
        },
        {
          id: 14,
          question: "What is an effect of using your body's energy?",
          questionZh: '使用身体 energy 会带来什么结果？',
          ttsText: "What is an effect of using your body's energy?",
          options: [
            { key: 'A', text: 'You ride your bike.' },
            { key: 'B', text: 'You have lots of energy.' },
            { key: 'C', text: 'You get hungry.' },
          ],
          answer: 'A',
          skill: '因果关系',
        },
        {
          id: 15,
          question: 'Which are both ways to move?',
          questionZh: '哪一组都是移动的方式？',
          ttsText: 'Which are both ways to move?',
          options: [
            { key: 'A', text: 'look and listen' },
            { key: 'B', text: 'walk and run' },
            { key: 'C', text: 'think and wonder' },
          ],
          answer: 'C',
          skill: '词汇理解',
        },
      ],
    },

    {
      id: 'F4',
      title: 'Colors',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `When people paint, they use different colors.
There are three colors to start.
The three colors are red, yellow, and blue.
Add red, yellow, and blue together to make other colors.
Add red to yellow to make orange.
Add blue to yellow to make green.
Add red to blue to make purple.
Add black to make colors dark.
Add white to make colors light.
Add red, yellow, blue, green, orange, and purple together.
What do you get?
All the colors together make brown!`,
      questions: [
        {
          id: 16,
          question: '_____ is the name of a color.',
          questionZh: '哪个是颜色的名称？',
          ttsText: 'Which is the name of a color?',
          options: [
            { key: 'A', text: 'Yellow' },
            { key: 'B', text: 'Light' },
            { key: 'C', text: 'Paint' },
          ],
          answer: 'C',
          skill: '分类理解',
        },
        {
          id: 17,
          question: 'How do you make the color purple?',
          questionZh: '怎样调出 purple？',
          ttsText: 'How do you make the color purple?',
          options: [
            { key: 'A', text: 'add yellow to red' },
            { key: 'B', text: 'add blue to yellow' },
            { key: 'C', text: 'add blue to red' },
          ],
          answer: 'A',
          skill: '因果关系',
        },
        {
          id: 18,
          question: 'What must you add to red paint to make it darker?',
          questionZh: '要让红色颜料变深，需要加什么？',
          ttsText: 'What must you add to red paint to make it darker?',
          options: [
            { key: 'A', text: 'warm water' },
            { key: 'B', text: 'white paint' },
            { key: 'C', text: 'black paint' },
          ],
          answer: 'B',
          skill: '主旨与细节',
        },
        {
          id: 19,
          question: 'If you add all the colors together, what color will you get?',
          questionZh: '如果把所有颜色加在一起，会得到什么颜色？',
          ttsText: 'If you add all the colors together, what color will you get?',
          options: [
            { key: 'A', text: 'black' },
            { key: 'B', text: 'brown' },
            { key: 'C', text: 'blue' },
          ],
          answer: 'C',
          skill: '因果关系',
        },
        {
          id: 20,
          question: 'What words mean the opposite of add?',
          questionZh: 'add 的反义表达是什么？',
          ttsText: 'What words mean the opposite of add?',
          options: [
            { key: 'A', text: 'do again' },
            { key: 'B', text: 'mix together' },
            { key: 'C', text: 'take away' },
          ],
          answer: 'A',
          skill: '词汇理解',
        },
      ],
    },
  ],
}

export default placementF
