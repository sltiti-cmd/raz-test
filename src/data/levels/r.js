// R级别升级测试 — 4篇文章20题（虚构/非虚构交替，选项 A–D）
// 数据来源：RAZ Benchmark Passage Quick Check（含答案页），答案与能力标签逐题核对
export const levelR = {
  id: 'R',
  name: 'R级别',
  passScore: 80,
  printPdf: '/raw/R/R级别测试-无答案.pdf',
  source: {
    testPdf: '/raw/R/R级别测试-无答案.pdf',
    answerPdf: '/raw/R/R级别测试-附答案.pdf',
  },
  passages: [
    {
      id: 'R1',
      title: 'Running with Jennifer',
      type: 'fiction',
      typeLabel: '虚构',
      text: `Tara sat at her front window. She gazed out at the school track across the street and thought of her friend Jennifer. She thought of all the long runs they had taken together. Jennifer lived far away now. Without her friend, Tara felt nothing but boredom when she ran.
The girls still talked by phone from time to time, but it was not the same as when they had run together. Back then, they would chat about everything. Spending time together had made the running fun. Their friendship had been closer then, too.
Tara watched her sister cross their front yard, talking on her cell phone. Then, Tara had an idea.
The next day, Tara and Jennifer had a running date. They talked and laughed as they ran along. They weren't exactly side by side. Jennifer was in another state, but thanks to their cell phones, their running was going strong again. So was their friendship.`,
      questions: [
        {
          id: 1,
          question: "What was Tara's biggest problem?",
          options: [
            { key: 'A', text: "She did not make it onto the school's track team." },
            { key: 'B', text: 'She missed spending time with a friend.' },
            { key: 'C', text: 'She needed a cell phone and did not have one.' },
            { key: 'D', text: 'She did not get along with her sister.' },
          ],
          answer: 'B',
          skill: '问题解决',
        },
        {
          id: 2,
          question: 'Read the example sentence: Tara gazed at the school track near her home. What does the word gazed mean?',
          options: [
            { key: 'A', text: 'aimed' },
            { key: 'B', text: 'looked' },
            { key: 'C', text: 'smiled' },
            { key: 'D', text: 'ran' },
          ],
          answer: 'B',
          skill: '词汇理解',
        },
        {
          id: 3,
          question: "Where was Tara's sister?",
          options: [
            { key: 'A', text: 'on a running track at their school' },
            { key: 'B', text: 'in a state far from their home' },
            { key: 'C', text: 'away at a school' },
            { key: 'D', text: 'in the front yard of their house' },
          ],
          answer: 'D',
          skill: '故事要素',
        },
        {
          id: 4,
          question: 'How did Tara get an idea by watching her sister?',
          options: [
            { key: 'A', text: 'It showed her that she would not be bored if she joined the school track team.' },
            { key: 'B', text: 'It reminded her that she had not called her friend recently.' },
            { key: 'C', text: 'It made her realize that she could use a cell phone while running.' },
            { key: 'D', text: 'It gave her an example of how to hold a cell phone more comfortably.' },
          ],
          answer: 'C',
          skill: '推理判断',
        },
        {
          id: 5,
          question: "Which of the following best describes how Tara's feelings changed in the story?",
          options: [
            { key: 'A', text: 'from unhappy to happy' },
            { key: 'B', text: 'from nervous to calm' },
            { key: 'C', text: 'from angry to peaceful' },
            { key: 'D', text: 'from excited to bored' },
          ],
          answer: 'A',
          skill: '人物分析',
        },
      ],
    },
    {
      id: 'R2',
      title: 'Billy Mills, Olympic Star',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `People still marvel at a 10,000-meter race that took place during the 1964 Summer Olympic Games. Nobody predicted runner Billy Mills would be the winner. But he was confident. Viewers of the event experienced a thrilling underdog win.
Native American Billy Mills began running while in school. He was an All-American runner at the University of Kansas in 1958 and 1959. Later, he continued to run while he was in the armed forces.
Few people knew who Mills was when he entered the Olympic Games. He ran against world-record-holder Ron Clarke, who was Australian. Near the end of the race, Mills ran along the outside of the track. He was almost lost in a mob of runners. He increased his speed to push past the others. Then, the unthinkable happened. He won! The crowd went wild. Some people say it was the biggest upset in the history of the Olympic Games.`,
      questions: [
        {
          id: 6,
          question: 'Why were people surprised that runner Billy Mills won the 10,000-meter race?',
          options: [
            { key: 'A', text: "They didn't think Mills was as fast as he said he was." },
            { key: 'B', text: "They didn't think Mills was as fast as the better-known runners in the race." },
            { key: 'C', text: "They thought that Mills would injure himself because he hadn't run since college." },
            { key: 'D', text: 'They thought that Mills had started the race too quickly and would tire near the end.' },
          ],
          answer: 'B',
          skill: '推理判断',
        },
        {
          id: 7,
          question: 'Which of the following describes the world-record-holder Ron Clarke?',
          options: [
            { key: 'A', text: 'All-American' },
            { key: 'B', text: 'Native American' },
            { key: 'C', text: 'Australian' },
            { key: 'D', text: 'Kansan' },
          ],
          answer: 'C',
          skill: '主旨与细节',
        },
        {
          id: 8,
          question: 'Read the example sentence: Some people say it was the biggest upset in the history of the Olympic Games. Which sentence uses the same meaning for the word upset as the example sentence?',
          options: [
            { key: 'A', text: 'I was upset that I would not get to watch the game.' },
            { key: 'B', text: 'After eating the greasy food, I had a bit of stomach upset.' },
            { key: 'C', text: 'When he pulled the cloth from the table, it upset everything that was on top of it.' },
            { key: 'D', text: 'In an amazing upset, the tiny country defeated its powerful attackers.' },
          ],
          answer: 'D',
          skill: '词汇理解',
        },
        {
          id: 9,
          question: 'Which of the following events happened first?',
          options: [
            { key: 'A', text: 'Billy Mills entered the Olympic Games.' },
            { key: 'B', text: 'Billy Mills won the 10,000-meter race at the Summer Olympics.' },
            { key: 'C', text: 'Billy Mills ran at the University of Kansas.' },
            { key: 'D', text: 'Billy Mills increased his speed to pass other runners.' },
          ],
          answer: 'C',
          skill: '顺序理解',
        },
        {
          id: 10,
          question: 'The crowd went wild. For what reason does the author include this sentence?',
          options: [
            { key: 'A', text: 'It lets readers know that 10,000 meters is a long race, so the crowd gets tired.' },
            { key: 'B', text: 'It helps readers better understand what is expected of them if they are ever in a crowd.' },
            { key: 'C', text: 'It lets readers know the type of people who attend the Olympic Games.' },
            { key: 'D', text: 'It helps readers better understand the excitement of Billy Mills winning the race.' },
          ],
          answer: 'D',
          skill: '作者意图',
        },
      ],
    },
    {
      id: 'R3',
      title: 'The Rhino Road Stop',
      type: 'fiction',
      typeLabel: '虚构',
      text: `A police officer waved us over to the side of the road in Assam, India. Was Grandfather driving too fast? He was eager to show me the farm where our family has grown tea for generations. It was my first visit to my parents' home country.
"I must ask for your patience while we close the road," the police officer said. "It borders a national park where rhinos live. A baby rhino has fallen into a trench not far from here, and the mother is in the woods, as angry as a hurricane."
When the rescue crew arrived, we helped unload their gear. In the distance, we heard the mother's angry snorts. The veterinarians said that the calf was about two months old, and they carefully lifted her out of the trench. As we watched her trot into the woods toward her mother, I felt proud to have played a small part in her rescue.`,
      questions: [
        {
          id: 11,
          question: 'What happened first in the story?',
          options: [
            { key: 'A', text: 'the rescue crew arrived' },
            { key: 'B', text: 'the narrator felt proud' },
            { key: 'C', text: 'the veterinarians said the calf was two months old' },
            { key: 'D', text: 'Grandfather pulled over to the side of the road' },
          ],
          answer: 'D',
          skill: '顺序理解',
        },
        {
          id: 12,
          question: 'Where was Grandfather taking the narrator?',
          options: [
            { key: 'A', text: 'to a national park' },
            { key: 'B', text: 'to a tea farm' },
            { key: 'C', text: 'to the woods' },
            { key: 'D', text: 'to India' },
          ],
          answer: 'B',
          skill: '故事要素',
        },
        {
          id: 13,
          question: 'The rhino mother was angry because she did not like _____.',
          options: [
            { key: 'A', text: 'the police officer waving' },
            { key: 'B', text: "the sound of Grandfather's car" },
            { key: 'C', text: 'being separated from her baby' },
            { key: 'D', text: 'living in the national park' },
          ],
          answer: 'C',
          skill: '推理判断',
        },
        {
          id: 14,
          question: "The narrator played a part in the rhino's rescue by helping _____.",
          options: [
            { key: 'A', text: 'lift up the rhino' },
            { key: 'B', text: 'wave cars to the side of the road' },
            { key: 'C', text: 'calm the angry rhino mother' },
            { key: 'D', text: "unload the rescue crew's gear" },
          ],
          answer: 'D',
          skill: '因果关系',
        },
        {
          id: 15,
          question: 'What does the word trench mean?',
          options: [
            { key: 'A', text: 'a wild storm' },
            { key: 'B', text: 'a narrow platform' },
            { key: 'C', text: 'a long ditch' },
            { key: 'D', text: 'a small bush' },
          ],
          answer: 'C',
          skill: '词汇理解',
        },
      ],
    },
    {
      id: 'R4',
      title: 'Rhino Rescue',
      type: 'nonfiction',
      typeLabel: '非虚构',
      text: `A crowd of people had gathered in a forest in India. They were watching a large rhino that was stuck in a mud pit. The rhino repeatedly tried to escape. She could not free her back legs. She was weak. She was getting tired. Then doctors from a nearby rescue center arrived. They gave the rhino medicine. Other rescue workers dug a pathway out of the pit. Thanks to these efforts, the rhino pulled herself from the mud. She walked back into the forest.
About two thousand rhinos live in the part of India where the rescue center is located. Workers at the center help rhinos and other animals when they become trapped or hurt. Some animals live at the center for years. Others are given aid and released quickly.
The goal of the center is to help animals roam wild and free. Working toward this goal, workers do remarkable things for rhinos and other animals each and every day.`,
      questions: [
        {
          id: 16,
          question: 'Where did the rhino in the passage become trapped?',
          options: [
            { key: 'A', text: 'in a zoo' },
            { key: 'B', text: 'in a rescue center' },
            { key: 'C', text: "in a hunter's trap" },
            { key: 'D', text: 'in a mud pit' },
          ],
          answer: 'D',
          skill: '主旨与细节',
        },
        {
          id: 17,
          question: 'How did workers help the rhino in the passage?',
          options: [
            { key: 'A', text: 'They took her to a rescue center to heal.' },
            { key: 'B', text: 'They gathered a crowd to push her free.' },
            { key: 'C', text: 'They cleared a path for her to follow.' },
            { key: 'D', text: 'They protected the forests where she lived.' },
          ],
          answer: 'C',
          skill: '问题解决',
        },
        {
          id: 18,
          question: 'Read the example sentence: Workers do remarkable things for rhinos and other animals each and every day. If something is remarkable, it is _____.',
          options: [
            { key: 'A', text: 'funny' },
            { key: 'B', text: 'wild' },
            { key: 'C', text: 'amazing' },
            { key: 'D', text: 'useless' },
          ],
          answer: 'C',
          skill: '词汇理解',
        },
        {
          id: 19,
          question: 'The author of this passage wrote that some animals live at the rescue center for years. Why do you think this happens?',
          options: [
            { key: 'A', text: 'These animals take longer to tame than other animals do.' },
            { key: 'B', text: 'These animals are trained to perform tricks in zoos while others are released.' },
            { key: 'C', text: 'These animals need more time to become healthy than other animals do.' },
            { key: 'D', text: 'These animals become pets of the center workers while others do not.' },
          ],
          answer: 'C',
          skill: '推理判断',
        },
        {
          id: 20,
          question: 'Which of the following is the best summary of the passage?',
          options: [
            { key: 'A', text: 'There are about two thousand rhinos in an area of India that has an important rescue center.' },
            { key: 'B', text: 'Workers at a rescue center in India help rhinos and other animals stay healthy and wild.' },
            { key: 'C', text: 'As a crowd of people watched, a rescue team helped free a trapped rhino.' },
            { key: 'D', text: 'Rhinos are incredible wild animals that face many dangers and often need people’s help.' },
          ],
          answer: 'B',
          skill: '主旨与细节',
        },
      ],
    },
  ],
}

export default levelR
