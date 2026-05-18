export const placementP = {
  id: "P",
  name: "P级别插班测试",
  passScore: 80,
  printPdf: "/raw/P/P级别测试-无答案.pdf",

  tts: {
    passage: false,
    question: false,
    options: false,
  },

  sourcePdfs: [
    "/raw/P/building_robots_building_skills_lvl_p_passage.pdf",
    "/raw/P/building_robots_building_skills_lvl_p_quiz.pdf",
    "/raw/P/ready_set_robot_race_lvl_p_passage.pdf",
    "/raw/P/ready_set_robot_race_lvl_p_quiz.pdf",
    "/raw/P/the_gates_of_art_lvl_p_passage.pdf",
    "/raw/P/the_gates_of_art_lvl_p_quiz.pdf",
    "/raw/P/the_rainbow_fence_lvl_p_passage.pdf",
    "/raw/P/the_rainbow_fence_lvl_p_quiz.pdf",
  ],

  passages: [
    {
      id: "P1",
      title: "Building Robots, Building Skills",
      type: "nonfiction",
      typeLabel: "非虚构",
      text: `All over the United States, students take part in robot competitions.
Contests are held from kindergarten through college.
Teams usually build their machines from special kits.
The kits may include pipes, wires, metal pieces, and plastic bricks.
They usually also include tiny computers to help control the robots.

Teams use the computers to tell their robots what to do.
The robots must be able to complete tasks, such as throwing balls into a basket or traveling past obstacles or through a maze.

Teams compete to see which robot can complete its tasks quickly and smoothly.
Robot competitions are exciting events.
However, whether they win or lose, students on robot teams often build more than robots.
They also build skills in math, computers, and working on teams.`,
      questions: [
        {
          id: 1,
          question: "What is the passage mostly about?",
          options: [
            { key: "A", text: "special kits" },
            { key: "B", text: "teamwork" },
            { key: "C", text: "building robots" },
            { key: "D", text: "winning contests" },
          ],
          answer: "C",
          skill: "主旨与细节",
        },
        {
          id: 2,
          question: "What word in paragraph 3 helps the reader know the author's point of view about robot competitions?",
          options: [
            { key: "A", text: "complete" },
            { key: "B", text: "quickly" },
            { key: "C", text: "exciting" },
            { key: "D", text: "smoothly" },
          ],
          answer: "C",
          skill: "作者观点",
        },
        {
          id: 3,
          question: "Why does each kit include a tiny computer?",
          options: [
            { key: "A", text: "Kids use the computer to get the instructions on how to build the robot." },
            { key: "B", text: "The computers will be able to tell the robots what to do." },
            { key: "C", text: "Kids enjoy playing robotic video games on the computer." },
            { key: "D", text: "The computers keep track of the pipes, wires, and pieces in the kit." },
          ],
          answer: "B",
          skill: "因果关系",
        },
        {
          id: 4,
          question: "What do all of the tasks in this competition have in common?",
          options: [
            { key: "A", text: "They use a basket." },
            { key: "B", text: "They are done by robots." },
            { key: "C", text: "They are created by college students." },
            { key: "D", text: "They are in a maze." },
          ],
          answer: "B",
          skill: "比较理解",
        },
        {
          id: 5,
          question: "What is a competition?",
          options: [
            { key: "A", text: "a contest" },
            { key: "B", text: "a robot" },
            { key: "C", text: "a task" },
            { key: "D", text: "a team" },
          ],
          answer: "A",
          skill: "词汇理解",
        },
      ],
    },

    {
      id: "P2",
      title: "Ready, Set, Robot Race",
      type: "fiction",
      typeLabel: "虚构",
      text: `Oscar checked the robot.
Was it ready to race?
He tested the robot's "brain," a tiny computer that received signals from his remote control.
Oscar had programmed the computer brain with code that told it what to do.
"Hannah," he said, "we're ready!"

"Did you test the sensors?" Hannah called out.
The sensors allowed the robot to detect motion, light, and colors.

"Yes!" said Jackson, who had been in charge of building the robot.
He was the third member of the Forest Park Robot Team.
It was their first year at the state competition.

In the race, the robot would follow a path around three corners and up a ramp.
Other tasks included tossing small balls into a basket.
During the competition, Hannah would run the remote control.

Oscar looked around at the other teams.
He was happy that his team's robot was ready.
"Let's race!" he said.`,
      questions: [
        {
          id: 6,
          question: "The characters in the story were _____.",
          options: [
            { key: "A", text: "getting better at working together" },
            { key: "B", text: "getting to a robot competition on time" },
            { key: "C", text: "fixing their robot during a race" },
            { key: "D", text: "making sure their robot was ready" },
          ],
          answer: "D",
          skill: "故事要素",
        },
        {
          id: 7,
          question: "What are sensors?",
          options: [
            { key: "A", text: "devices that allow people to control robots remotely" },
            { key: "B", text: "devices that toss balls into baskets" },
            { key: "C", text: "devices that help robots notice different things" },
            { key: "D", text: "devices that help people build robots" },
          ],
          answer: "C",
          skill: "词汇理解",
        },
        {
          id: 8,
          question: `Why is the "brain" of the robot important?`,
          options: [
            { key: "A", text: "because it receives the signals from the remote control" },
            { key: "B", text: "because it shares a brain with Oscar, Hannah, and Jackson" },
            { key: "C", text: "because it holds the wheels that can move the robot up a ramp" },
            { key: "D", text: "because it attaches the arm that grabs different objects" },
          ],
          answer: "A",
          skill: "因果关系",
        },
        {
          id: 9,
          question: "Why did Oscar look around at the other teams?",
          options: [
            { key: "A", text: "He wanted to see if anybody had a robot part that he was missing." },
            { key: "B", text: "He wanted to see if the other robots looked as ready as his team's robot was." },
            { key: "C", text: "He wanted to see if there was a team that he could switch to for the next race." },
            { key: "D", text: "He wanted to see if anybody had noticed him cheating with his team's robot." },
          ],
          answer: "B",
          skill: "推理判断",
        },
        {
          id: 10,
          question: "Which of the following did the teammates not do before they were ready to race?",
          options: [
            { key: "A", text: "They followed the path of the race to make sure their robot could handle it." },
            { key: "B", text: "They checked the computer on the robot to make sure it was programmed correctly." },
            { key: "C", text: "They tested parts of the robot to make sure they worked." },
            { key: "D", text: "They talked to one another to make sure they all knew the robot was ready." },
          ],
          answer: "A",
          skill: "顺序理解",
        },
      ],
    },

    {
      id: "P3",
      title: "The Gates of Art",
      type: "nonfiction",
      typeLabel: "非虚构",
      text: `On a cold February day in 2005, an amazing art installation opened in New York City.
The Gates were 7,500 sheets of bright orange cloth hung from tall plastic frames.
They stood twelve feet apart along twenty-three miles of paths through New York's famous Central Park.
Each gate looked like a sixteen-foot-tall doorway with a blaze of flame-colored cloth hanging inside.

The sight of so much color in winter drew thousands of people into the park.
Some called the artwork ugly.
Others said it made them happy.
One thing is certain: if you had a chance to see it, you would not forget it easily.

After sixteen days, teams of workers began removing The Gates.
The installation had only been in place for a short time.
But it had created lasting images in many people's minds.`,
      questions: [
        {
          id: 11,
          question: "What is the passage mostly about?",
          options: [
            { key: "A", text: "things to do in New York City" },
            { key: "B", text: "how to build doorways in parks" },
            { key: "C", text: "a work of art" },
            { key: "D", text: "a cold time of the year" },
          ],
          answer: "C",
          skill: "主旨与细节",
        },
        {
          id: 12,
          question: "What was the effect of The Gates on people who visited Central Park?",
          options: [
            { key: "A", text: "It only created unhappy feelings for people." },
            { key: "B", text: "It made most people stay in the park longer." },
            { key: "C", text: "It created a lasting memory for people." },
            { key: "D", text: "It had no effect on people." },
          ],
          answer: "C",
          skill: "因果关系",
        },
        {
          id: 13,
          question: "The author compared The Gates to _____.",
          options: [
            { key: "A", text: "fertile soil" },
            { key: "B", text: "clear water" },
            { key: "C", text: "blazing flames" },
            { key: "D", text: "fresh air" },
          ],
          answer: "C",
          skill: "比较理解",
        },
        {
          id: 14,
          question: "Why did the artists choose to put The Gates up in the winter?",
          options: [
            { key: "A", text: "The bright color is more surprising in the winter." },
            { key: "B", text: "Winter was the only time of year that art could be in the park." },
            { key: "C", text: "The color orange is seen more often in the winter." },
            { key: "D", text: "Winter is the time of year when people create new types of art." },
          ],
          answer: "A",
          skill: "推理判断",
        },
        {
          id: 15,
          question: "What is an installation?",
          options: [
            { key: "A", text: "a type of park" },
            { key: "B", text: "a time of the year" },
            { key: "C", text: "a type of doorway" },
            { key: "D", text: "a large work of art" },
          ],
          answer: "D",
          skill: "词汇理解",
        },
      ],
    },

    {
      id: "P4",
      title: "The Rainbow Fence",
      type: "fiction",
      typeLabel: "虚构",
      text: `Juanita stared at the picture of the extraordinary cloth fence.
Her teacher, Mr. Lopez, said the fence had stretched across nearly twenty-five miles of California.

"This is a type of temporary art that artists build outside," said Mr. Lopez.
"The artists who made it left it standing for only a short time.
Today, we will start creating art like this in front of our school."

Later, Juanita enjoyed helping to plan and construct the class's own low fence.
It was made of wood and spanned twenty-five yards of field near the school's entrance.
The class painted the fence to look like a rainbow.

A reporter from the town's TV station talked to students about the rainbow fence.
Later, Juanita watched herself on the news show.

"Our fence is cheery," Juanita heard herself say.
"It will only be here for a week, but we hope it brings people joy."`,
      questions: [
        {
          id: 16,
          question: "Why do you think artists created a cloth fence across nearly twenty-five miles?",
          options: [
            { key: "A", text: "They wanted to impress people with a large work of art." },
            { key: "B", text: "They wanted to keep out animals and had heard animals are scared of cloth." },
            { key: "C", text: "They wanted to use up all the extra cloth they had." },
            { key: "D", text: "They wanted to create a rainbow that lasted forever." },
          ],
          answer: "A",
          skill: "推理判断",
        },
        {
          id: 17,
          question: "If something is temporary, it _____.",
          options: [
            { key: "A", text: "looks beautiful" },
            { key: "B", text: "needs attention" },
            { key: "C", text: "takes a lot of planning" },
            { key: "D", text: "lasts only a short time" },
          ],
          answer: "D",
          skill: "词汇理解",
        },
        {
          id: 18,
          question: "What was the same about the fence in California and the fence made by the class?",
          options: [
            { key: "A", text: "They were both made by professional artists." },
            { key: "B", text: "They were both art." },
            { key: "C", text: "They were the same length." },
            { key: "D", text: "They were made of the same material." },
          ],
          answer: "B",
          skill: "比较理解",
        },
        {
          id: 19,
          question: "Where did the students make their fence?",
          options: [
            { key: "A", text: "in front of the school" },
            { key: "B", text: "in California" },
            { key: "C", text: "across the school's entrance" },
            { key: "D", text: "inside the classroom" },
          ],
          answer: "A",
          skill: "故事要素",
        },
        {
          id: 20,
          question: "Why did the author include the quote from Juanita at the end of the story?",
          options: [
            { key: "A", text: "to tell readers more about what makes Juanita happy" },
            { key: "B", text: "to share Juanita's goal for building the rainbow fence" },
            { key: "C", text: "to explain why the class called it a rainbow fence" },
            { key: "D", text: "to make readers think about building their own fence" },
          ],
          answer: "B",
          skill: "作者意图",
        },
      ],
    },
  ],
}

export default placementP
