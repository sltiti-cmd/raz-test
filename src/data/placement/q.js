export const placementQ = {
  id: "Q",
  name: "Q级别插班测试",
  passScore: 80,
  printPdf: "/raw/placement/Q/Q级别测试-无答案.pdf",

  tts: {
    passage: false,
    question: false,
    options: false,
  },

  passages: [
    {
      id: "Q1",
      title: "The Mystery of the Sphinx",
      type: "nonfiction",
      typeLabel: "非虚构",
      text: `The Great Sphinx is an intriguing icon of Ancient Egypt.
This giant statue has the body of a lion and the head of a man.
It stands in the desert near pyramids that are also huge.
Most scientists believe the Great Sphinx is about four thousand years old.
This is the same age as the pyramids.
But the Sphinx has no writing indicating who built it or when.
Could the Sphinx be older?

Over the ages, the stone body of the Sphinx has worn away.
Its beard is gone, and its nose is missing.
Some scientists believe that water was the cause of the erosion.
Their theory is that people built the Sphinx during an earlier time when Egypt was much wetter.
They think the Sphinx was built thousands of years before the pyramids were built.
But many skeptics do not agree with this theory.
The true age of the Great Sphinx of Egypt is still a mystery.`,
      questions: [
        {
          id: 1,
          question: "What is the main idea of the passage?",
          options: [
            { key: "A", text: "Explorers still do not know where to find the long-lost Great Sphinx of Egypt." },
            { key: "B", text: "Experts disagree about what the damage to the Great Sphinx of Egypt tells us about its age." },
            { key: "C", text: "Egyptians cannot explain why the pyramids are more famous than the nearby Great Sphinx." },
            { key: "D", text: "Scientists argue about what Egypt's Great Sphinx meant to the people who built it." },
          ],
          answer: "B",
          skill: "主旨与细节",
        },
        {
          id: 2,
          question: "Read the example sentence: Some scientists believe that water was the cause of the erosion. The word erosion means the _____.",
          options: [
            { key: "A", text: "wearing away of stone" },
            { key: "B", text: "drying up of deserts" },
            { key: "C", text: "building of structures" },
            { key: "D", text: "flooding of valleys" },
          ],
          answer: "A",
          skill: "词汇理解",
        },
        {
          id: 3,
          question: "What was the author's purpose for writing the passage?",
          options: [
            { key: "A", text: "to convince readers to agree with an opinion" },
            { key: "B", text: "to entertain readers with an ancient folktale" },
            { key: "C", text: "to inform readers about different sides of an argument" },
            { key: "D", text: "to retell a story from history using descriptive language" },
          ],
          answer: "C",
          skill: "作者意图",
        },
        {
          id: 4,
          question: "The Great Sphinx has a body shaped like a _____.",
          options: [
            { key: "A", text: "man" },
            { key: "B", text: "lion" },
            { key: "C", text: "pyramid" },
            { key: "D", text: "cone" },
          ],
          answer: "B",
          skill: "主旨与细节",
        },
        {
          id: 5,
          question: "Why do you think most scientists believe the Great Sphinx is the same age as the pyramids?",
          options: [
            { key: "A", text: "They have the names of some pyramid builders who were alive when the Sphinx was built." },
            { key: "B", text: "They think that all of the buildings were made for people to stay dry during a wet period." },
            { key: "C", text: "They think that people living around the same time in history probably built all the big structures." },
            { key: "D", text: "They have read carvings on the Sphinx that describe the pyramids being built." },
          ],
          answer: "C",
          skill: "推理判断",
        },
      ],
    },

    {
      id: "Q2",
      title: "The Ranch Helpers",
      type: "fiction",
      typeLabel: "虚构",
      text: `Grace stopped talking in the middle of a sentence.
She squinted nervously down at the grass.
"Oh, okay," she said.
"It's only a fly. I was afraid it was a bee."

"You hate bees, don't you?" Bill asked.

"I was stung once," said Grace.
"They're the scariest insects ever."

Bill laughed.
"Well, on our ranch, we rent bees to pollinate our trees."

"You pay to borrow bees?" Grace asked with surprise.

"Yes," said Bill.
"We need them so we can grow almonds.
Come by some time.
You can see them working."

That weekend, Grace visited the ranch.
She admired the machines Bill's family used to grow and gather almonds.

"People have invented amazing machines," Bill agreed.
"But without the bees, we'd still have no almonds.
You'll have to come again next summer to see our abundant harvest!"

Just then, a bee landed on a flower near Grace.
"I guess I shouldn't hate bees," she said.
"They're useful for some things!"`,
      questions: [
        {
          id: 6,
          question: "What caused Grace to change her mind about bees?",
          options: [
            { key: "A", text: "She was bitten by a fly and realized that flies were just as scary as bees." },
            { key: "B", text: "She was stung by a bee and learned that they were dangerous." },
            { key: "C", text: "She visited a ranch and saw bees doing an important job." },
            { key: "D", text: "She started working with bees and realized they were safe." },
          ],
          answer: "C",
          skill: "因果关系",
        },
        {
          id: 7,
          question: `Read the example sentence: "Well, on our ranch, we rent bees to pollinate our trees," said Bill. Which of the following sentences gives the best clue to the meaning of the word rent?`,
          options: [
            { key: "A", text: `"You hate bees, don't you?" Bill asked.` },
            { key: "B", text: `"You pay to borrow bees?" Grace asked.` },
            { key: "C", text: `"I was afraid it was a bee," said Grace.` },
            { key: "D", text: `"People have invented amazing machines," Bill agreed.` },
          ],
          answer: "B",
          skill: "词汇理解",
        },
        {
          id: 8,
          question: "What kind of trees did Bill's family grow at its ranch?",
          options: [
            { key: "A", text: "almond trees" },
            { key: "B", text: "walnut trees" },
            { key: "C", text: "cherry trees" },
            { key: "D", text: "apple trees" },
          ],
          answer: "A",
          skill: "故事要素",
        },
        {
          id: 9,
          question: "Why did Bill's family need more bees?",
          options: [
            { key: "A", text: "They needed a lot of bees at once to pollinate their trees." },
            { key: "B", text: "They got rid of all of the bees before Grace visited." },
            { key: "C", text: "They could not afford to use the machines that normally pollinate trees." },
            { key: "D", text: "They couldn't afford to buy the bees." },
          ],
          answer: "A",
          skill: "推理判断",
        },
        {
          id: 10,
          question: "What was the resolution in the story?",
          options: [
            { key: "A", text: `Grace said, "I was stung once."` },
            { key: "B", text: `Grace said, "It's only a fly. I was afraid it was a bee."` },
            { key: "C", text: `Grace said, "I guess I shouldn't hate bees."` },
            { key: "D", text: `Grace asked, "You pay to borrow bees?"` },
          ],
          answer: "C",
          skill: "情节分析",
        },
      ],
    },

    {
      id: "Q3",
      title: "Seeing the Sphinx",
      type: "fiction",
      typeLabel: "虚构",
      text: `I could tell the family was lost before they even stepped inside our bakery.
You did not see many tourists in this part of Cairo, Egypt.

"Can I help you find your way?" I offered.

The woman asked how to get to the Great Sphinx.
"Is it as inspiring as they say?" she asked.

"I've never seen it," I said.
Their mouths fell open in disbelief.
I was usually busy at school or the bakery, and I had simply never bothered to visit the Sphinx.

My father looked at me and said, "It's your heritage.
Today we will close early and visit the Sphinx."

That afternoon, we closed the bakery and drove out of Cairo.
We turned a corner and there it was—the lion-bodied king towering over the sand.
I stood there in awe, thinking about how centuries ago, my ancestors built this astonishing statue.
I had never been so proud to be Egyptian.`,
      questions: [
        {
          id: 11,
          question: "Read the example sentence: Centuries ago, my ancestors built this astonishing statue. What does the word ancestors mean?",
          options: [
            { key: "A", text: "models who posed for sculptors" },
            { key: "B", text: "kings who ruled long ago" },
            { key: "C", text: "artists who carved stone" },
            { key: "D", text: "relatives who lived earlier" },
          ],
          answer: "D",
          skill: "词汇理解",
        },
        {
          id: 12,
          question: "What is the point of view in the story?",
          options: [
            { key: "A", text: "first-person point of view" },
            { key: "B", text: "second-person point of view" },
            { key: "C", text: "third-person point of view by a narrator involved in the story" },
            { key: "D", text: "third-person point of view by a narrator not involved in the story" },
          ],
          answer: "A",
          skill: "叙述视角",
        },
        {
          id: 13,
          question: "What is the resolution in the story?",
          options: [
            { key: "A", text: "A family of tourists gets lost while visiting Cairo, Egypt." },
            { key: "B", text: "The main character shocks a whole family by saying he has never seen the Great Sphinx." },
            { key: "C", text: "The main character realizes how to help a family of tourists find the Great Sphinx." },
            { key: "D", text: "The main character stands in awe as he sees the Great Sphinx for the first time." },
          ],
          answer: "D",
          skill: "情节分析",
        },
        {
          id: 14,
          question: "Why is the setting important to this story?",
          options: [
            { key: "A", text: "The main character travels back in time to an important time in his country's history." },
            { key: "B", text: "The main character learns to take pride in a structure found near his home." },
            { key: "C", text: "The main character finds an amazing new place after getting lost." },
            { key: "D", text: "The main character works at a bakery and wants to become a baker." },
          ],
          answer: "B",
          skill: "场景分析",
        },
        {
          id: 15,
          question: "Why had the narrator never seen the Great Sphinx before?",
          options: [
            { key: "A", text: "He was afraid." },
            { key: "B", text: "He was not old enough." },
            { key: "C", text: "He was usually too busy." },
            { key: "D", text: "He did not know where the Great Sphinx was." },
          ],
          answer: "C",
          skill: "因果关系",
        },
      ],
    },

    {
      id: "Q4",
      title: "The Great Bee Mystery",
      type: "nonfiction",
      typeLabel: "非虚构",
      text: `A mystery has been bothering beekeepers and other people all over the world: bees are vanishing!

All at once, the population of a hive will drop.
The bees will almost completely disappear.
Beekeepers don't find dead bees.
Instead, they find only the queen and a few worker bees in a hive.
The other adult bees are gone.

Beekeepers have noticed this problem recently, but scientists think it has been around for years.
People have many ideas about the causes.
Some blame poisons used by farmers to kill weeds.
Others blame tiny bee attackers called mites.
Still others blame beekeepers who move their bees around too often.
Scientists still don't know for sure what causes the disappearances.

People need bees to grow many crops.
So, scientists are working hard to solve the mystery.
They hope to find answers soon.
They hope to find ways to help these insects.
After all, bees help us grow foods we eat each day.`,
      questions: [
        {
          id: 16,
          question: "What is the main idea of the passage?",
          options: [
            { key: "A", text: "Beekeepers are moving bees around too often." },
            { key: "B", text: "Scientists are studying bees to learn what they like to eat." },
            { key: "C", text: "Bees are disappearing for unexplained reasons." },
            { key: "D", text: "Mites may be causing the deaths of many bees." },
          ],
          answer: "C",
          skill: "主旨与细节",
        },
        {
          id: 17,
          question: "Why are scientists working hard to solve the mystery?",
          options: [
            { key: "A", text: "Farmers need to find better ways to kill weeds." },
            { key: "B", text: "People want to better understand how bees move from place to place." },
            { key: "C", text: "People need bees in order to grow many of their crops." },
            { key: "D", text: "Beekeepers need to find out what makes bees happy." },
          ],
          answer: "C",
          skill: "因果关系",
        },
        {
          id: 18,
          question: "What have beekeepers been finding inside hives that is causing them to be concerned?",
          options: [
            { key: "A", text: "a queen bee and a few worker bees" },
            { key: "B", text: "lots of dead bees" },
            { key: "C", text: "adult bees but no young bees" },
            { key: "D", text: "young bees but no baby bees" },
          ],
          answer: "A",
          skill: "因果关系",
        },
        {
          id: 19,
          question: "What does vanishing mean?",
          options: [
            { key: "A", text: "blaming" },
            { key: "B", text: "bothering" },
            { key: "C", text: "disappearing" },
            { key: "D", text: "poisoning" },
          ],
          answer: "C",
          skill: "词汇理解",
        },
        {
          id: 20,
          question: "According to the passage, what is the author's opinion about the bee mystery?",
          options: [
            { key: "A", text: "Scientists are not working hard enough to solve the mystery of bee disappearances." },
            { key: "B", text: "Beekeepers are the ones to blame for the worldwide disappearance of bees." },
            { key: "C", text: "The disappearance of bees will help people because stings will soon become rare." },
            { key: "D", text: "People should keep studying why bees disappear because bees are important to people." },
          ],
          answer: "D",
          skill: "作者观点",
        },
      ],
    },
  ],
}

export default placementQ
