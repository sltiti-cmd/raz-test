export const placementN = {
  id: "N",
  name: "N级别插班测试",
  passScore: 80,
  printPdf: "/raw/placement/N/N级别测试-无答案.pdf",

  tts: {
    passage: false,
    question: false,
    options: false,
  },

  passages: [
    {
      id: "N1",
      title: "Planning a Mural",
      type: "fiction",
      typeLabel: "虚构",
      text: `The students in the art club were making plans.
They wanted to paint a mural on the outside of the town's recycling center.
Their teacher offered to help them write a letter.
The letter would describe the plans for the mural.
It would ask for permission to paint.
The students would ask people in town to sign the letter.
If enough people signed, the students would take it to Town Hall.

The students had begun to argue over ideas for the mural.
They had very different ideas.
Sammy hoped to paint a picture of the town.
Jessie wanted to show a rainy day and a sunny day.
Anita just wanted to paint ponies.
Anita loved ponies!
But Luis's choice was the winner.
Everyone agreed it was the perfect idea.
Their mural at the recycling center would show people recycling!`,
      questions: [
        {
          id: 1,
          question: "What is a mural?",
          options: [
            { key: "A", text: "a plan" },
            { key: "B", text: "a letter" },
            { key: "C", text: "a big painting" },
            { key: "D", text: "a recycling center" },
          ],
          answer: "C",
          skill: "词汇理解",
        },
        {
          id: 2,
          question: "Before the students could write their letter, they needed to _____.",
          options: [
            { key: "A", text: "make a plan for the mural" },
            { key: "B", text: "get permission from people in town" },
            { key: "C", text: "go to Town Hall" },
            { key: "D", text: "begin painting" },
          ],
          answer: "A",
          skill: "顺序理解",
        },
        {
          id: 3,
          question: "How did the students decide what to put in the mural?",
          options: [
            { key: "A", text: "The students drew ideas out of a hat to come up with a winner." },
            { key: "B", text: "The students talked about ideas and agreed on one of them." },
            { key: "C", text: "The students got help from their teacher." },
            { key: "D", text: "The students wrote a letter." },
          ],
          answer: "B",
          skill: "问题解决",
        },
        {
          id: 4,
          question: "Why did the students have to go to Town Hall?",
          options: [
            { key: "A", text: "They had to paint the outside of Town Hall before they painted the recycling center." },
            { key: "B", text: "They needed people at Town Hall to give them permission to paint the mural." },
            { key: "C", text: "They were looking for mural ideas, and there was a nice mural at Town Hall." },
            { key: "D", text: "They wanted somebody from Town Hall to help them write a letter." },
          ],
          answer: "B",
          skill: "推理判断",
        },
        {
          id: 5,
          question: "The mural would show _____.",
          options: [
            { key: "A", text: "a picture of the town" },
            { key: "B", text: "a picture of a rainy day" },
            { key: "C", text: "a picture of ponies" },
            { key: "D", text: "a picture of people recycling" },
          ],
          answer: "D",
          skill: "故事要素",
        },
      ],
    },

    {
      id: "N2",
      title: "The Bigfoot Mural",
      type: "nonfiction",
      typeLabel: "非虚构",
      text: `Duane Flatmo is a mural artist who lives in California.
Duane has covered the walls of many dull buildings with eye-catching paintings.

One of Duane's biggest paintings is on the outside of a hardware store.
The owner of the store has always liked Duane's art.
When he built the store, he left space for a mural on an outside wall.

Duane used the wall to paint a Bigfoot mural.
Bigfoot is a tall, hairy creature.
Many people say he isn't real, though there are many stories about him.
People in the town with the store often claim that Bigfoot lives nearby.

The mural shows Bigfoot helping a building crew.
This makes sense on a store that sells hardware!
Whatever you think about Bigfoot, you will probably enjoy this big art!`,
      questions: [
        {
          id: 6,
          question: "What is the passage mostly about?",
          options: [
            { key: "A", text: "things to buy at a hardware store" },
            { key: "B", text: "an interesting piece of art on a building" },
            { key: "C", text: "people who say Bigfoot is real" },
            { key: "D", text: "how to make big murals" },
          ],
          answer: "C",
          skill: "主旨与细节",
        },
        {
          id: 7,
          question: "Read the example sentences: The mural shows Bigfoot helping a building crew. This makes sense on a store that sells hardware! What does the word hardware mean in this example?",
          options: [
            { key: "A", text: "houses and other buildings" },
            { key: "B", text: "computers and computer programs" },
            { key: "C", text: "building supplies and tools" },
            { key: "D", text: "art and art supplies" },
          ],
          answer: "A",
          skill: "词汇理解",
        },
        {
          id: 8,
          question: "Where did people in the town say that Bigfoot lived?",
          options: [
            { key: "A", text: "near their town" },
            { key: "B", text: "near Montana" },
            { key: "C", text: "in a hardware store" },
            { key: "D", text: "nowhere in the real world" },
          ],
          answer: "B",
          skill: "主旨与细节",
        },
        {
          id: 9,
          question: "What was the author's purpose for writing this passage?",
          options: [
            { key: "A", text: "to entertain readers with legends of Bigfoot" },
            { key: "B", text: "to persuade readers that Bigfoot is real" },
            { key: "C", text: "to explain to readers the tools needed for painting murals" },
            { key: "D", text: "to inform readers about an unusual painting" },
          ],
          answer: "B",
          skill: "作者意图",
        },
        {
          id: 10,
          question: "Why does the mural's size make sense?",
          options: [
            { key: "A", text: "The mural is a large piece of art showing a large creature." },
            { key: "B", text: "The mural is a small painting of Bigfoot so it doesn't scare people away." },
            { key: "C", text: "The mural is medium-sized artwork, which makes sense for a medium-sized town." },
            { key: "D", text: "The mural changes to be the size of the building it is on." },
          ],
          answer: "D",
          skill: "推理判断",
        },
      ],
    },

    {
      id: "N3",
      title: "Backyard Crocodile Relatives",
      type: "fiction",
      typeLabel: "虚构",
      text: `Reed had just learned that crocodiles were relatives of dinosaurs.
He told his dad about it as Dad served pancakes.

"That's great," said Dad.
He grinned.
"Later, let's look for more crocodile relatives in our backyard!"

Reed glanced outside.
Two blackbirds pecked at grain in the bird feeder.
Reed felt uneasy.
"What crocodile relatives would be in our backyard?" he asked.
He began to fear what his dad would say.
What was Dad talking about?

A dove landed on the bird feeder.

"There's another one," said Dad.
"I've now seen three crocodile relatives today."
Dad smiled at his son's blank look.
"The closest living relatives of crocodiles and alligators are birds!" he explained.

"I didn't know that," said Reed.
He felt relief.
"I'm glad they eat grain, not people!"`,
      questions: [
        {
          id: 11,
          question: "Which animals did Reed say were related at the start of the story?",
          options: [
            { key: "A", text: "birds and crocodiles" },
            { key: "B", text: "blackbirds and doves" },
            { key: "C", text: "dinosaurs and crocodiles" },
            { key: "D", text: "crocodiles and alligators" },
          ],
          answer: "B",
          skill: "主旨与细节",
        },
        {
          id: 12,
          question: "Why did Reed feel relief at the end of the story?",
          options: [
            { key: "A", text: "He learned that the animals in the backyard were less scary than he expected." },
            { key: "B", text: "He realized that the birds in the backyard had not eaten his pancakes." },
            { key: "C", text: "He saw a bird at the bird feeder after not seeing any all morning." },
            { key: "D", text: "He found out that dinosaurs were no longer living, so they could not hurt him." },
          ],
          answer: "C",
          skill: "人物分析",
        },
        {
          id: 13,
          question: "Which of the following events happened last in the story?",
          options: [
            { key: "A", text: "Reed began to fear what his father was saying about the backyard animals." },
            { key: "B", text: "Two blackbirds began to peck at grain in the bird feeder." },
            { key: "C", text: "A dove landed on the bird feeder." },
            { key: "D", text: "Dad said that birds and crocodiles are related." },
          ],
          answer: "A",
          skill: "顺序理解",
        },
        {
          id: 14,
          question: "Who told the story?",
          options: [
            { key: "A", text: "a boy named Reed" },
            { key: "B", text: "the father of a boy" },
            { key: "C", text: "a narrator outside the story" },
            { key: "D", text: "the dove on the bird feeder" },
          ],
          answer: "D",
          skill: "故事要素",
        },
        {
          id: 15,
          question: `Read the example sentences: Reed felt uneasy. "What crocodile relatives would be in our backyard?" he asked. What does the word uneasy mean?`,
          options: [
            { key: "A", text: "difficult" },
            { key: "B", text: "sick" },
            { key: "C", text: "worried" },
            { key: "D", text: "excited" },
          ],
          answer: "A",
          skill: "词汇理解",
        },
      ],
    },

    {
      id: "N4",
      title: "Crocodiles: The Cousins of Dinosaurs",
      type: "nonfiction",
      typeLabel: "非虚构",
      text: `Dinosaurs died out about 65 million years ago.
But some animals that were cousins to the dinosaurs are still around today.
These dinosaur cousins are the crocodiles.

In 2009, scientists found the fossils of some very old crocodiles.
These ancient crocodiles lived 100 million years ago.
They were not exactly the same as crocodiles today.
But they were close.

The fossils showed scientists that there were different kinds of ancient crocodiles.
Crocodiles the size of dogs ate plants and grubs.
Others were twenty feet long and had three rows of teeth.
These toothy crocodiles even ate dinosaurs!

Today's crocodiles live in many different parts of the world.
It does not take much effort to picture them among those long-gone dinosaurs.
Unlike dinosaurs, though, these creatures are still around.`,
      questions: [
        {
          id: 16,
          question: "Which detail best supports the idea that crocodiles are cousins of dinosaurs?",
          options: [
            { key: "A", text: "Some crocodiles are alive today." },
            { key: "B", text: "Some crocodiles lived when dinosaurs lived." },
            { key: "C", text: "Some crocodiles had three rows of teeth." },
            { key: "D", text: "Some crocodiles were studied by scientists." },
          ],
          answer: "C",
          skill: "主旨与细节",
        },
        {
          id: 17,
          question: "The word ancient means _____.",
          options: [
            { key: "A", text: "very tough" },
            { key: "B", text: "very old" },
            { key: "C", text: "very angry" },
            { key: "D", text: "very large" },
          ],
          answer: "A",
          skill: "词汇理解",
        },
        {
          id: 18,
          question: "What was the same about the types of ancient crocodiles described in the passage?",
          options: [
            { key: "A", text: "They all had three rows of teeth." },
            { key: "B", text: "They all were the same size." },
            { key: "C", text: "They all were related to today's crocodiles." },
            { key: "D", text: "They all ate dinosaurs." },
          ],
          answer: "D",
          skill: "比较理解",
        },
        {
          id: 19,
          question: "Which of the following is an opinion?",
          options: [
            { key: "A", text: "Some ancient crocodiles became fossils like dinosaurs." },
            { key: "B", text: "Crocodiles have survived longer than dinosaurs." },
            { key: "C", text: "Ancient crocodiles were scarier than dinosaurs." },
            { key: "D", text: "Ancient crocodiles were not exactly the same as today's crocodiles." },
          ],
          answer: "C",
          skill: "事实判断",
        },
        {
          id: 20,
          question: "How old were the crocodile fossils that scientists found?",
          options: [
            { key: "A", text: "20 years old" },
            { key: "B", text: "2,009 years old" },
            { key: "C", text: "65 million years old" },
            { key: "D", text: "100 million years old" },
          ],
          answer: "C",
          skill: "主旨与细节",
        },
      ],
    },
  ],
}

export default placementN
