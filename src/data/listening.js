const makeQuestions = (prefix, labels, answers, options = ['A', 'B', 'C'], sourceNumbers = []) => (
  labels.map((label, index) => ({
    id: `${prefix}-${index + 1}`,
    number: index + 1,
    sourceNumber: sourceNumbers[index] ?? index + 1,
    label,
    options,
    answer: answers[index],
  }))
)

const makeImageQuestions = (prefix, labels, answers, sourceNumbers = []) => (
  makeQuestions(prefix, labels, answers, ['A', 'B', 'C'], sourceNumbers).map(question => ({
    ...question,
    imageSrc: `/images/listening/questions/${question.id}.jpg`,
    audioSrc: `/audio/listening/questions/${question.id}.mp3`,
  }))
)

const makeTextQuestions = (prefix, labels, answers, optionRows, sourceNumbers = []) => (
  makeQuestions(prefix, labels, answers, ['A', 'B', 'C'], sourceNumbers).map((question, index) => ({
    ...question,
    optionText: Object.fromEntries(question.options.map((option, optionIndex) => [option, optionRows[index][optionIndex]])),
  }))
)

const makeAudioTextQuestions = (...args) => (
  makeTextQuestions(...args).map(question => ({
    ...question,
    audioSrc: `/audio/listening/questions/${question.id}.mp3`,
  }))
)

export const LISTENING_PASS_SCORE = 70

export const listeningTests = [
  {
    id: 'a-c',
    levelRange: 'A–C',
    exam: 'A-C 级听力',
    examEnglish: 'FOUNDATION LISTENING',
    description: '图片选择 · 每题独立音频',
    questionCount: 10,
    passScore: LISTENING_PASS_SCORE,
    sections: [
      {
        id: 'ac-test1-part3',
        title: '第一组 · 图片选择',
        instruction: '听录音，根据图片选项选择 A、B 或 C。',
        audioSrc: '/audio/listening/official/ac-test1-part3.mp3',
        pageImages: ['/images/listening/official/ac-test1-part3.jpg'],
        questions: makeImageQuestions(
          'ac-t1',
          ['Where are the onions?', 'What’s Tom doing?', 'Which is Tony’s mum?', 'What does Anna like doing on the beach?', 'Where’s the goat?'],
          ['A', 'C', 'B', 'C', 'C'],
        ),
      },
      {
        id: 'ac-test2-part3',
        title: '第二组 · 图片选择',
        instruction: '听录音，根据图片选项选择 A、B 或 C。',
        audioSrc: '/audio/listening/official/ac-test2-part3.mp3',
        pageImages: ['/images/listening/official/ac-test2-part3.jpg'],
        questions: makeImageQuestions(
          'ac-t2',
          ['Where’s Mrs White’s phone?', 'What are Pat and her dad getting for lunch?', 'Which is Alex’s toy?', 'What does Grandma like in May’s picture?', 'What’s behind the door?'],
          ['A', 'C', 'A', 'B', 'A'],
        ),
      },
    ],
  },
  {
    id: 'd-f',
    levelRange: 'D–F',
    exam: 'D-F 级听力',
    examEnglish: 'PROGRESS LISTENING',
    description: '情境图片 · 每题独立音频',
    questionCount: 10,
    passScore: LISTENING_PASS_SCORE,
    sections: [
      {
        id: 'df-test1-part4',
        title: '第一组 · 情境选择',
        instruction: '听录音，根据图片选项选择 A、B 或 C。',
        audioSrc: '/audio/listening/official/df-test1-part4.mp3',
        pageImages: ['/images/listening/official/df-test1-part4-a.jpg', '/images/listening/official/df-test1-part4-b.jpg'],
        questions: makeImageQuestions(
          'df-t1',
          ['Where’s the new birdcage?', 'How did Peter go to work today?', 'Which is Tom’s favourite sport?', 'What did May buy in the shop today?', 'Where’s Sally’s grandma?'],
          ['A', 'B', 'A', 'C', 'B'],
        ),
      },
      {
        id: 'df-test2-part4',
        title: '第二组 · 情境选择',
        instruction: '听录音，根据图片选项选择 A、B 或 C。',
        audioSrc: '/audio/listening/official/df-test2-part4.mp3',
        pageImages: ['/images/listening/official/df-test2-part4-a.jpg', '/images/listening/official/df-test2-part4-b.jpg'],
        questions: makeImageQuestions(
          'df-t2',
          ['What did Jane buy yesterday?', 'What was Jack’s dream about?', 'Where’s Peter’s mouse?', 'Which person is Kim?', 'What did Mr Rice find in his car?'],
          ['C', 'A', 'B', 'B', 'A'],
        ),
      },
    ],
  },
  {
    id: 'g-j',
    levelRange: 'G–J',
    exam: 'G-J 级听力',
    examEnglish: 'CORE LISTENING',
    description: '图片选择 · 每题独立音频',
    questionCount: 10,
    passScore: LISTENING_PASS_SCORE,
    sections: [
      {
        id: 'gj-test2-part4',
        title: '第一组 · 图片选择',
        instruction: '每题听一段对话，根据图片选择 A、B 或 C。',
        audioSrc: '/audio/listening/official/gj-test2-part4.mp3',
        pageImages: ['/images/listening/official/gj-test2-part4-a.jpg', '/images/listening/official/gj-test2-part4-b.jpg'],
        questions: makeImageQuestions(
          'gj-p4b',
          ['Why does the family want to go to London?', 'What will Jack and his mother buy?', 'What must Jack find out about on the computer?', 'What can Jack’s best friend do well on his computer?', 'What’s wrong with the computer now?'],
          ['A', 'A', 'C', 'B', 'B'],
        ),
      },
      {
        id: 'gj-test1-part4',
        title: '第二组 · 图片选择',
        instruction: '听录音，根据图片选项选择 A、B 或 C。',
        audioSrc: '/audio/listening/official/gj-test1-part4.mp3',
        pageImages: ['/images/listening/official/gj-test1-part4-a.jpg', '/images/listening/official/gj-test1-part4-b.jpg'],
        questions: makeImageQuestions(
          'gj-p4',
          ['What did Richard buy at the shop?', 'What homework has Richard got tonight?', 'Which of these is clean?', 'How is Richard going to get to the football game?', 'What job does Richard want to do?'],
          ['C', 'C', 'B', 'A', 'B'],
        ),
      },
    ],
  },
  {
    id: 'k-n',
    levelRange: 'K–N',
    exam: 'K-N 级听力',
    examEnglish: 'CONTEXT LISTENING',
    description: '完整对话与独立短对话',
    questionCount: 10,
    passScore: LISTENING_PASS_SCORE,
    sections: [
      {
        id: 'kn-test1-part3',
        title: '第一组 · 完整对话',
        instruction: '听 Ned 与 Aisha 的一段完整对话，在同一页完成第 11–15 题。',
        grouped: true,
        audioSrc: '/audio/listening/questions/kn-p3-group.mp3',
        pageImages: ['/images/listening/official/kn-test1-part3.jpg'],
        questions: makeTextQuestions(
          'kn-p3',
          ['When did they meet each other for the first time?', 'How did Ned feel before he started the new school?', 'Ned and Aisha agree that…', 'Which lesson doesn’t Aisha like much?', 'What do they both say about homework at the new school?'],
          ['B', 'B', 'A', 'C', 'A'],
          [
            ['on the way to school', 'in a lesson', 'in the lunch break'],
            ['scared', 'excited', 'lucky'],
            ['the teachers are very kind.', 'their classmates are all very nice.', 'the school building is very attractive.'],
            ['geography', 'maths', 'history'],
            ['They got less in their old schools.', 'It takes a long time to do.', 'Some of it is quite easy.'],
          ],
          [11, 12, 13, 14, 15],
        ),
      },
      {
        id: 'kn-test1-part4',
        title: '第二组 · 短对话',
        instruction: '每题是一段独立短对话，选择 A、B 或 C。',
        audioSrc: '/audio/listening/official/kn-test1-part4.mp3',
        pageImages: ['/images/listening/official/kn-test1-part4.jpg'],
        questions: makeAudioTextQuestions(
          'kn-p4',
          ['How did the boy get the book?', 'What type of lesson did she have?', 'Where will the boy stay on holiday?', 'What does the teacher want his class to do now?', 'What are the friends going to do together on Saturday?'],
          ['B', 'A', 'C', 'C', 'C'],
          [
            ['He borrowed it from a family member.', 'He won it in a sports event.', 'He bought it in a shop.'],
            ['a guitar lesson', 'a tennis lesson', 'a dance lesson'],
            ['in a house', 'in a hotel', 'in a tent'],
            ['start some maths problems', 'talk about their new textbook', 'check an exercise in pairs'],
            ['have a cycle ride', 'cook some special food', 'go for a walk'],
          ],
          [16, 17, 18, 19, 20],
        ),
      },
    ],
  },
  {
    id: 'o-t',
    levelRange: 'O–T',
    exam: 'O-T 级听力',
    examEnglish: 'ADVANCED LISTENING',
    description: '独立短对话与完整访谈',
    questionCount: 10,
    passScore: LISTENING_PASS_SCORE,
    sections: [
      {
        id: 'ot-test1-part2',
        title: '第一组 · 短对话',
        instruction: '每题是一段独立短对话，选择 A、B 或 C。',
        audioSrc: '/audio/listening/official/ot-test1-part2-q08-12.mp3',
        pageImages: ['/images/listening/official/ot-test1-part2-a.jpg', '/images/listening/official/ot-test1-part2-b.jpg'],
        questions: makeAudioTextQuestions(
          'ot-p2',
          ['The woman suggests that the man should…', 'What does the man say about his Welsh language course?', 'What did the woman like about her weekend?', 'They both think the restaurant would be better if…', 'How is the man’s appearance different from before?'],
          ['C', 'A', 'C', 'A', 'B'],
          [
            ['try looking online.', 'go to a different shop.', 'get advice from an expert.'],
            ['The teacher speaks too fast.', 'The lessons are too long.', 'The grammar is too difficult.'],
            ['visiting a new place in the city', 'seeing her children enjoying themselves', 'having a chance to relax'],
            ['the food was fresher.', 'the service was faster.', 'the prices were cheaper.'],
            ['He has grown a beard.', 'He has started wearing glasses.', 'He has changed his style of clothes.'],
          ],
          [8, 9, 10, 11, 12],
        ),
      },
      {
        id: 'ot-test1-part4',
        title: '第二组 · 完整访谈',
        instruction: '听一段完整访谈，在同一页完成 5 道题。',
        grouped: true,
        audioSrc: '/audio/listening/questions/ot-p4-group.mp3',
        pageImages: ['/images/listening/official/ot-test1-part4.jpg'],
        questions: makeTextQuestions(
          'ot-p4',
          ['Why did Mickey decide to become a hairdresser?', 'On a typical day at work, Mickey says that he…', 'The part of the job which Mickey likes most is…', 'What part of his job does Mickey dislike?', 'How does Mickey feel after cutting a customer’s hair?'],
          ['A', 'C', 'B', 'A', 'C'],
          [
            ['He was offered a job by a friend.', 'He wanted to do what his family did.', 'He hoped to meet some famous people.'],
            ["doesn't take enough time for breaks.", 'works longer hours than he would like to.', 'tries to do a range of jobs.'],
            ['creating new haircuts.', "hearing about customers' lives.", 'using his imagination.'],
            ['having to do boring courses', 'sharing ideas with colleagues', 'dealing with difficult customers'],
            ['worried that the customer may be annoyed.', "proud of what he's achieved.", 'keen to continue learning.'],
          ],
          [20, 21, 22, 23, 24],
        ),
      },
    ],
  },
]

export const listeningTestsById = Object.fromEntries(listeningTests.map(test => [test.id, test]))
