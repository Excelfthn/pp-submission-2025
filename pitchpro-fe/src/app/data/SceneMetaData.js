export const sceneMetaData = [
  {
    id: 1,
    label: "click 1",
    type: "click",
    title: "Choose preparation",
    desc: "Arga wants to prepare his AI class presentation. He will make a decision.",
    src: {
      checkpoint: {
        1: "(2)StudyWith(CLICK).mp4",
      },
      cutscene: {
        1: "(1)Pilih belajar(CS).mp4",
      },
    },
  },
  {
    id: 2,
    label: "checkpoint 1",
    type: "checkpoint",
    story_id: 1,
    checkpoint_pack: 1,
    title: "Persuade friend",
    desc: "Agra’s friend, Dimas can help Arga preparing his presentation.",
    x: 2,
    y: 0,
    is_pre_test: false,
    is_post_test: false,
    src: {
      checkpoint: {
        1: "(2.A.1)Persuasive(AUDIO).mp4",
      },
      cutscene: {
        1: "(2.A)Teman(CS).mp4",
      },
    },
  },
  {
    id: 3,
    label: "cutscene 1",
    type: "cutscene",
    src: {
      cutscene: {
        1: "(2.A.1.B)Disagree(CS).mp4",
      },
    },
  },
  {
    id: 4,
    label: "cutscene 2",
    type: "cutscene",
    src: {
      cutscene: {
        1: "(2.B)Sendiri(CS).mp4",
      },
    },
  },
  {
    id: 5,
    label: "cutscene 3",
    type: "cutscene",
    src: {
      cutscene: {
        1: "(2.A.6.1)OpeningExplanation(CS).mp4",
        2: "(2.A.6.1)OpeningExplanation(CS).mp4",
        3: "(2.A.6.3)ClosingExplanation(CS).mp4",
      },
    },
  },
  {
    id: 6,
    label: "cutscene 4",
    type: "cutscene",
    src: {
      cutscene: {
        1: "(2.A.1.A)Agree(CS).mp4",
        2: "(2.A.2)DimasCame(CS).mp4",
      },
    },
  },
  {
    id: 7,
    label: "cutscene 5",
    type: "cutscene",
    src: {
      cutscene: {
        1: "(2.A.3)ReadSlide(CS).mp4",
        2: "(2.A.4)Confused(CS).mp4",
      },
    },
  },
  {
    id: 8,
    label: "material 1",
    type: "material",
    title: "Breathing exercise",
    desc: "Breathing execise for optimize your presentation and releave your anxiety",
    src: {
      material: {
        1: "(2.A.5)BreatheExcercise(CS).mp4",
      },
    },
  },
  {
    id: 9,
    label: "checkpoint 2",
    type: "checkpoint",
    checkpoint_pack: 2,
    story_id: 2,
    title: "Presentation with friend",
    desc: "Arga practices presentation with his friend, Dimas. ",
    is_pre_test: false,
    is_post_test: false,
    src: {
      checkpoint: {
        1: "(2.A.7)1stAnswer(AUDIO)mp4.mp4",
        2: "(2.A.7)2ndAnswer(AUDIO)mp4.mp4",
        3: "(2.A.7)3rdAnswer(AUDIO)mp4.mp4",
        4: "(2.A.7)4thAnswer(AUDIO)mp4.mp4",
        5: "(2.A.7)1stAnswer(AUDIO)mp4.mp4",
      },
      cutscene: {
        1: "(2.A.7.1)30S_Opening(CS).mp4",
        2: "(2.A.7.2)1M_Differences(CS).mp4",
        3: "(2.A.7.3)1M_Ethics(CS).mp4",
        4: "(2.A.7.4)1M_Consequences(CS).mp4",
        5: "(2.A.7.5)30S_Closing(CS).mp4",
      },
    },
  },
  {
    id: 10,
    label: "cutscene 6",
    type: "cutscene",
    src: {
      cutscene: {
        1: "(2.A.8)FinishExcercise(CS).mp4",
      },
    },
  },
  {
    id: 11,
    label: "checkpoint 3",
    type: "checkpoint",
    checkpoint_pack: 3,
    story_id: 7,
    title: "Presentation with lecturer",
    desc: " Arga presents in front of his lecture at his class. Prepare your answer for QnA session.",
    is_pre_test: false,
    is_post_test: false,
    src: {
      checkpoint: {
        1: "(3.1)1stAnswer(AUDIO).mp4",
        2: "(3.3)2ndAnswer(AUDIO).mp4",
      },
      cutscene: {
        1: "(3)1stQnA(CS).mp4",
        2: "(3.2)2ndQnA(CS).mp4",
      },
    },
  },
  {
    id: 12,
    label: "cutscene 7",
    type: "cutscene",
    src: {
      cutscene: {
        1: "(3.4)PresentationFinish(CS).mp4",
      },
    },
  },
];
