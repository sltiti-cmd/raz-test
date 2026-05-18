export const levelO = {
  id: "O",
  name: "O级别",
  passScore: 80,
  printPdf: "/raw/O/O级别-测试.pdf",
  passages: [
    {
      id: "O1",
      title: "New Ways to Surf",
      type: "nonfiction",
      typeLabel: "非虚构",
      text: `Surfing is a sport that takes balance and energy. The basic idea of surfing is to stand on a board and ride waves. People have been surfing for hundreds of years.
People have also found other ways to ride boards over water. Kiteboarding and stand-up paddleboarding are two newer sports that offer a twist on surfing.
Kiteboarding is like flying a kite while surfing. You stand on a board. The wind hits your kite. It pulls you along. You use the cords of the kite to control your direction. You must also respond to the wind and the waves.
In stand-up paddleboarding, you use a board, but no kite. You also use a paddle for balance and to move around. It's difficult to stand tall and paddle. But, just as in surfing and kiteboarding, you can get better if you practice at riding the waves!`,
      questions: [
        {
          id: 1,
          question: "What does the word respond mean in these sentences?",
          questionZh: "respond 在句子中是什么意思？",
          options: [
            { key: "A", text: "to return" },
            { key: "B", text: "to react" },
            { key: "C", text: "to write back" },
            { key: "D", text: "to call again" }
          ],
          answer: "B",
          skill: "词汇理解"
        },
        {
          id: 2,
          question: "What is the main idea of the passage?",
          questionZh: "这篇文章的主旨是什么？",
          options: [
            { key: "A", text: "Kiteboarding and stand-up paddleboarding are fun activities to do in the water." },
            { key: "B", text: "Kiteboarding and stand-up paddleboarding are hard to learn how to do." },
            { key: "C", text: "Kiteboarding and stand-up paddleboarding are water sports similar to surfing." },
            { key: "D", text: "Kiteboarding is almost the same as paddleboarding." }
          ],
          answer: "C",
          skill: "主旨理解"
        },
        {
          id: 3,
          question: "What is one way that surfing is different from both kiteboarding and stand-up paddleboarding?",
          questionZh: "surfing 和另外两种运动有什么不同？",
          options: [
            { key: "A", text: "A person can surf over large ocean waves but must wait for calm water for the other sports." },
            { key: "B", text: "A person controls his or her direction while surfing but has no control in the other sports." },
            { key: "C", text: "A person uses one piece of equipment for surfing but more than one for the other sports." },
            { key: "D", text: "There are no differences between surfing and the other sports." }
          ],
          answer: "C",
          skill: "比较理解"
        },
        {
          id: 4,
          question: "What does the author mean by saying that kiteboarding and stand-up paddleboarding \"offer a twist on surfing\"?",
          questionZh: "offer a twist on surfing 是什么意思？",
          options: [
            { key: "A", text: "The other sports each have at least one thing that makes them a little different from surfing." },
            { key: "B", text: "The other sports both involve more twists and turns than surfing does." },
            { key: "C", text: "The other sports are both more interesting than surfing." },
            { key: "D", text: "The other sports use boards that are more twisted than surfboards." }
          ],
          answer: "A",
          skill: "推理判断"
        },
        {
          id: 5,
          question: "Surfing is the _____ sport mentioned in the passage.",
          questionZh: "在文章提到的运动中，surfing 是怎样的运动？",
          options: [
            { key: "A", text: "fastest" },
            { key: "B", text: "slowest" },
            { key: "C", text: "newest" },
            { key: "D", text: "oldest" }
          ],
          answer: "D",
          skill: "比较理解"
        }
      ]
    },
    {
      id: "O2",
      title: "Take a Break",
      type: "fiction",
      typeLabel: "虚构",
      text: `Heart pounding and sweat dripping down her face, Carmen dribbled the basketball toward the hoop. She could hear her team running up behind her as she stopped, took the shot—and missed. Carmen groaned.
Coach blew her whistle. "It's okay, Carmen. It's only practice," she said. "Let's take a break, everyone. Get some water."
The others headed for the benches, but Carmen stayed on the court. She took a few more practice shots, missing each one.
"Carmen," Coach called. "Did you hear me? It's break time!"
Carmen wiped the sweat from her forehead. "I don't need a break, Coach. I need to practice."
"Everyone needs a break, Carmen," Coach said. "Even the best athletes need to rest. It gives your body a chance to recover. If you don't rest, you'll burn out—or worse, you'll hurt yourself."
"I hadn't thought about that," Carmen said. "Okay. I'll get some water."`,
      questions: [
        {
          id: 6,
          question: "How does Carmen feel at the beginning of the story?",
          questionZh: "故事开头 Carmen 感觉怎样？",
          options: [
            { key: "A", text: "proud" },
            { key: "B", text: "thirsty" },
            { key: "C", text: "bothered" },
            { key: "D", text: "thoughtful" }
          ],
          answer: "C",
          skill: "人物分析"
        },
        {
          id: 7,
          question: "What does Coach do?",
          questionZh: "Coach 做了什么？",
          options: [
            { key: "A", text: "She runs up behind the team." },
            { key: "B", text: "She drinks water on the bench." },
            { key: "C", text: "She calls for everyone to take a break." },
            { key: "D", text: "She wipes the sweat from her forehead." }
          ],
          answer: "C",
          skill: "主旨与细节"
        },
        {
          id: 8,
          question: "What is Carmen's problem?",
          questionZh: "Carmen 的问题是什么？",
          options: [
            { key: "A", text: "Carmen hurts herself." },
            { key: "B", text: "Carmen misses each shot." },
            { key: "C", text: "Carmen's heart is pounding." },
            { key: "D", text: "Carmen doesn't listen to her Coach." }
          ],
          answer: "B",
          skill: "问题分析"
        },
        {
          id: 9,
          question: "Which of the following phrases means the same as recover?",
          questionZh: "recover 的意思接近哪个短语？",
          options: [
            { key: "A", text: "burn out" },
            { key: "B", text: "feel better" },
            { key: "C", text: "carry over" },
            { key: "D", text: "stopped short" }
          ],
          answer: "B",
          skill: "词汇理解"
        },
        {
          id: 10,
          question: "What is the author's point of view?",
          questionZh: "作者的观点是什么？",
          options: [
            { key: "A", text: "It is good to take a break." },
            { key: "B", text: "It is healthy to drink water." },
            { key: "C", text: "It is not important to practice." },
            { key: "D", text: "It is hard to be the best athlete." }
          ],
          answer: "A",
          skill: "作者观点"
        }
      ]
    },
    {
      id: "O3",
      title: "Lost at the Beach",
      type: "fiction",
      typeLabel: "虚构",
      text: `Angela stopped looking at the ocean to admire her bracelet. Her grandmother had given it to her, and it was very special. Then Angela slipped off her shoes to enjoy a barefoot walk along the beach.
A woman in a boat passed by. She waved, and Angela waved back. Then she stared down at her arm in shock. Granny's bracelet was gone!
Angela returned to her family and told them about her bracelet disaster. They burst into action.
Grandpa used his metal detector. He couldn't find the bracelet.
Angela's brother Johnny followed his sister's footprints along the beach. He too hoped to discover her bracelet, but he never saw it.
Mom carefully sifted the sand where Angela had been sitting. She searched and searched. She couldn't find the bracelet, either.
It was time to go home. Angela blinked back tears. She picked up her shoe. Out fell the bracelet!`,
      questions: [
        {
          id: 11,
          question: "Which of the following best explains the title \"Lost at the Beach\"?",
          questionZh: "标题 Lost at the Beach 最好的解释是什么？",
          options: [
            { key: "A", text: "Angela got lost with her grandmother at the beach." },
            { key: "B", text: "Angela got lost by herself at the beach." },
            { key: "C", text: "Angela got lost with her family at the beach." },
            { key: "D", text: "Angela lost her bracelet at the beach." }
          ],
          answer: "D",
          skill: "主旨理解"
        },
        {
          id: 12,
          question: "Who gave Angela her bracelet?",
          questionZh: "谁给了 Angela 手链？",
          options: [
            { key: "A", text: "her brother" },
            { key: "B", text: "her mother" },
            { key: "C", text: "her grandfather" },
            { key: "D", text: "her grandmother" }
          ],
          answer: "D",
          skill: "故事要素"
        },
        {
          id: 13,
          question: "Which words from the passage help readers understand what a beach is?",
          questionZh: "哪些词帮助理解 beach 的意思？",
          options: [
            { key: "A", text: "bracelet and metal" },
            { key: "B", text: "waved and smiled" },
            { key: "C", text: "ocean and sand" },
            { key: "D", text: "shoes and walk" }
          ],
          answer: "C",
          skill: "词汇理解"
        },
        {
          id: 14,
          question: "What did Grandpa do to try to solve the problem in the story?",
          questionZh: "Grandpa 做了什么来解决问题？",
          options: [
            { key: "A", text: "He used his metal detector." },
            { key: "B", text: "He put on his glasses." },
            { key: "C", text: "He looked all over the house." },
            { key: "D", text: "He asked everyone he saw." }
          ],
          answer: "A",
          skill: "问题解决"
        },
        {
          id: 15,
          question: "When did the problem in the story probably happen?",
          questionZh: "故事中的问题最可能是什么时候发生的？",
          options: [
            { key: "A", text: "when Angela waved to the woman in the boat" },
            { key: "B", text: "when Angela took off her shoes" },
            { key: "C", text: "when Angela burst into action with her family" },
            { key: "D", text: "when Angela began to walk down the beach" }
          ],
          answer: "B",
          skill: "推理判断"
        }
      ]
    },
    {
      id: "O4",
      title: "MyPlate",
      type: "nonfiction",
      typeLabel: "非虚构",
      text: `When you plan a meal, there are many tasty foods from which to choose. How can you choose wisely? Eating only tasty doughnuts, for example, would cause health problems. To help people balance the foods they eat, experts created a chart called MyPlate.
MyPlate looks like a plate divided into colored sections. People can tell how much of their daily diet should come from each food group by comparing the sections. The one for vegetables is the largest. A healthy diet has more vegetables than proteins, fruits, or grains. There is also a circle near the plate that looks like a cup. This shows how much milk and other dairy food to eat daily.
MyPlate is easy to understand because it shows portions on a plate just like a plate you might use to eat. It helps people eat healthy meals each day.`,
      questions: [
        {
          id: 16,
          question: "Which detail best supports the idea that MyPlate helps people eat healthy meals?",
          questionZh: "哪个细节最能支持 MyPlate 帮助人们健康饮食？",
          options: [
            { key: "A", text: "Eating only tasty doughnuts would cause health problems." },
            { key: "B", text: "Children created the chart known as MyPlate." },
            { key: "C", text: "The different parts of MyPlate show how much of a diet should come from each food group." },
            { key: "D", text: "MyPlate shows many different food groups." }
          ],
          answer: "C",
          skill: "细节支持"
        },
        {
          id: 17,
          question: "Which of the following words means the same as sections?",
          questionZh: "sections 的意思接近哪个词？",
          options: [
            { key: "A", text: "fruits" },
            { key: "B", text: "parts" },
            { key: "C", text: "circles" },
            { key: "D", text: "plates" }
          ],
          answer: "B",
          skill: "词汇理解"
        },
        {
          id: 18,
          question: "Why is the MyPlate chart easy to understand?",
          questionZh: "为什么 MyPlate 图表容易理解？",
          options: [
            { key: "A", text: "It shows that all foods that taste good are also healthy." },
            { key: "B", text: "It tells you to eat only one type of food." },
            { key: "C", text: "It looks like something you might use for eating." },
            { key: "D", text: "It has long explanations of all the food types." }
          ],
          answer: "C",
          skill: "因果理解"
        },
        {
          id: 19,
          question: "What does the circle that looks like a cup show?",
          questionZh: "像杯子的圆圈表示什么？",
          options: [
            { key: "A", text: "how much of a daily diet should come from the dairy group" },
            { key: "B", text: "how much of a daily diet should come from the vegetable group" },
            { key: "C", text: "how much of a daily diet should come from the protein group" },
            { key: "D", text: "how much of a daily diet should come from the grain group" }
          ],
          answer: "A",
          skill: "主旨与细节"
        },
        {
          id: 20,
          question: "Which of the following is not one of the food groups?",
          questionZh: "下面哪一个不是食物类别？",
          options: [
            { key: "A", text: "vegetables" },
            { key: "B", text: "proteins" },
            { key: "C", text: "grains" },
            { key: "D", text: "apples" }
          ],
          answer: "D",
          skill: "分类理解"
        }
      ]
    }
  ]
}

export default levelO
