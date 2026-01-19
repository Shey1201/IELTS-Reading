import { Exam, Part, QuestionType } from './types';

export const SAMPLE_EXAM: Exam = {
  id: 'ielts-practice-full-01',
  title: 'IELTS Academic Reading Practice Test 1',
  tags: ['Full Test', 'Academic', 'High Frequency'],
  parts: [
    {
      id: 'part-1',
      title: 'Passage 1',
      category: 'Part 1',
      passageTitle: 'Ahead of its time',
      frequency: 'Normal',
      month: 'Jan',
      passageContent: `
        <p class="mb-4"><em>A chance discovery in New Zealand has challenged the country’s recorded history.</em></p>
        
        <p class="mb-4">One October afternoon, a young New Zealander, Sam Tobin, called his dogs and went for a walk down to the nearby Ruamahanga River. Having been very high for days, the river had at last fallen, and Tobin was eager to see what changes the floods had brought. The family farm borders the river, and a four-metre-high flood bank testifies to its natural tendency to flood.</p>

        <p class="mb-4">Tobin stepped out onto a broad shoulder of river sand, where he noticed what he initially took to be a whitish rock, lit by the sun. Then, getting closer, he realised it was a bone. Such a thing was not uncommon in these parts - he had often come home with fragments, or even whole skeletons, of cows and sheep. But as he scraped aside a stone he realised that it was a human bone, something quite new in his experience. As he picked it up, he saw it was a skull, discoloured with age.</p>

        <p class="mb-4">Tobin replaced the skull and hurried home to tell his mother what the river had delivered to their doorstep. It would prove to be a spectacular find, setting in motion an investigation by some of the country’s most respected specialists, and ultimately challenging our most firmly held assertions about the human settlement of New Zealand.</p>

        <p class="mb-4">The police were immediately called, but despite a thorough search they could find nothing that might shed light on the identity of the Ruamahanga skull, or the circumstances of its sudden appearance. The skull was then taken north to be examined by forensic pathologist Dr Fetvis at Auckland Hospital. Despite being hampered by its damaged and incomplete condition - the jawbone and lower left portion of the cranium were missing - Dr Fetvis determined that the skull was that of a female. He’d then consulted with a colleague, Dr Koelmeyer, who believed that the deterioration of the bone placed the time of dead ‘before living memory’ and, most significantly as it would turn out, the skull appeared to be European in origin.</p>

        <p class="mb-4">Wellington-based forensic anthropologist Dr Watt also examined the skull, and suggested it belonged to a 40–45-year-old. He believed that it could be the remains of an old farm burial, but was not certain, and proposed the use of radiocarbon dating to make sure it wasn’t a recent death. As a result, the Institute of Geological and Nuclear Sciences (GNS) in Lower Hutt was contacted, and provided with a sample of bone that had originated in the top of the skull. In a little over three weeks, the seemingly astonishing results from the GNS laboratory came back. Cutting through the bewildering complexity of the scientific analysis was a single line reading: conventional radiocarbon age approximately 296 years. This was staggering, for the skull was about 200 years older than Dr Koelmeyer had believed.</p>

        <p class="mb-4">Of course, a skull of this age wasn’t particularly unusual in New Zealand. The Maori people have been living in the country for at least 800 years and scientists frequently come across human remains of considerable age. The fascinating question, however, was how a skull of this race, let alone this gender, had reached these remote islands in the South Pacific at such a time, long before the arrival of the explorer Captain Cook in 1769, and perhaps even before the very first European landfall - the fleeting visit of the Dutch explorer Tasman in 1642 - neither of whom had women among their crews.</p>

        <p class="mb-4">The first known European women in the Pacific came with a doomed colonising venture which sailed from Peru in 1595 under the command of Spanish captain Mendana. However, it is unlikely the Ruamahanga skull originated from this expedition because no evidence of Mendana’s ships has ever been found in New Zealand, while a team of archaeologists working in the Solomon Islands in 1979 did discover the remains of European vessels dating from the 16th century.</p>

        <p class="mb-4">Two centuries were to pass before the first recorded European females arrived in New Zealand, both having escaped from prison in Australia. Kathleen Hagerty and Charlotte Edgar are known to have reached the country in 1806. How then do we account for the Ruamahanga skull, which appears to be about 100 years older than that? It is impossible to say with certainty, but the most likely explanation is that a Spanish or Portuguese trading ship was washed onto these wild shores as a result of a shipwreck and a woman got ashore. Implausible, perhaps, but the Ruamahanga skull, today resting in the Wellington Museum, could be the kind of concrete evidence that demands such a drastic re-evaluation of history.</p>
      `,
      questionGroups: [
        {
          id: 'qg-1',
          instruction: 'Questions 1-4. Do the following statements agree with the information given in Reading Passage 1? In boxes 1–4 on your answer sheet, write TRUE, FALSE, or NOT GIVEN.',
          type: QuestionType.TRUE_FALSE_NOT_GIVEN,
          questions: [
            { id: 'q1', number: 1, text: 'The Ruamahanga River often floods.', answer: 'TRUE', explanation: 'Para 1: "a four-metre-high flood bank testifies to its natural tendency to flood".' },
            { id: 'q2', number: 2, text: 'When Tobin first found the object in the river, he mistook it for something else.', answer: 'TRUE', explanation: 'Para 2: "he noticed what he initially took to be a whitish rock".' },
            { id: 'q3', number: 3, text: 'Tobin could not decide what part of the body the bone came from.', answer: 'FALSE', explanation: 'Para 2: "he realised it was a human bone... he saw it was a skull".' },
            { id: 'q4', number: 4, text: 'Tobin’s mother was surprised that the skull caused debate among specialists.', answer: 'NOT GIVEN', explanation: 'No info on mother\'s reaction.' }
          ]
        },
        {
          id: 'qg-2',
          instruction: 'Questions 5-9. Complete the flow-chart below. Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.',
          type: QuestionType.GAP_FILL,
          layout: 'flowchart',
          questions: [
            { id: 'q5', number: 5, text: 'The ______ were initially involved in trying to explain the presence of the skull.', answer: 'police' },
            { id: 'q6', number: 6, text: 'Dr Koelmeyer suggested it was a ______ skull.', answer: 'European' },
            { id: 'q7', number: 7, text: 'Dr Watt recommended ______ to establish the skull’s age.', answer: 'radiocarbon dating' },
            { id: 'q8', number: 8, text: 'A bone ______ was sent to the GNS.', answer: 'sample' },
            { id: 'q9', number: 9, text: 'The age of the skull was about ______ years.', answer: '296' }
          ]
        },
        {
          id: 'qg-3',
          instruction: 'Questions 10-13. Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.',
          type: QuestionType.GAP_FILL,
          layout: 'notes',
          questions: [
            { id: 'q10', number: 10, text: 'Ruamahanga skull surprising because of its age, ______ and gender.', answer: 'race' },
            { id: 'q11', number: 11, text: 'Evidence of the Mendana expedition found elsewhere by ______.', answer: 'archaeologists' },
            { id: 'q12', number: 12, text: 'Hagerty and Edgar arrived in 1806 from ______ where they had been imprisoned.', answer: 'Australia' },
            { id: 'q13', number: 13, text: 'Ruamahanga skull may have reached New Zealand in 17th century after a ______.', answer: 'shipwreck' }
          ]
        }
      ]
    },
    {
      id: 'part-2',
      title: 'Passage 2',
      category: 'Part 2',
      passageTitle: 'Growing more for less',
      frequency: 'Normal',
      passageContent: `... (content omitted for brevity) ...`,
      questionGroups: [
        // ... (content omitted for brevity)
      ]
    },
    {
      id: 'part-3',
      title: 'Passage 3',
      category: 'Part 3',
      passageTitle: 'Children’s literature studies today',
      frequency: 'Normal',
      passageContent: `... (content omitted for brevity) ...`,
      questionGroups: [
        // ... (content omitted for brevity)
      ]
    }
  ]
};

export const JANUARY_PARTS: Part[] = [
  {
    id: 'jan-part-paternity',
    title: 'Passage 2',
    category: 'Part 2',
    passageTitle: 'Paternity Leave',
    frequency: 'High',
    month: 'Jan',
    passageContent: `
      <h2 class="text-2xl font-bold mb-2">Paternity Leave</h2>
      <p class="italic mb-4">Men have long been discouraged from playing an equal role at home. That is at last starting to change.</p>
      <p class="mb-4"><strong>A</strong> At a course for fathers-to-be in New York, participants are introduced to baby maintenance for beginners...</p>
      <p class="mb-4"><strong>B</strong> In general, legal and financial support for new parents is better than it has ever been...</p>
      <p class="mb-4"><strong>C</strong> Now a different view is slowly emerging, as growing evidence suggests that children benefit...</p>
      <p class="mb-4"><strong>D</strong> This may appear paradoxical, as most countries have found that when they offer decent maternity leave...</p>
      <p class="mb-4"><strong>E</strong> Rather than simply cutting maternity leave in response to such findings...</p>
      <p class="mb-4"><strong>F</strong> To overcome these obstacles, some countries are giving fathers a firm nudge...</p>
    `,
    questionGroups: [
      {
        id: 'qg-jan-pat-1',
        instruction: 'Questions 14–19. Reading Passage 2 has six sections, A–F. Choose the correct heading for each section.',
        type: QuestionType.MATCHING_HEADINGS,
        questions: [
          { id: 'q14', number: 14, text: 'Section A', answer: 'ii', explanation: 'An illustration of a trend in one country' },
          { id: 'q15', number: 15, text: 'Section B', answer: 'vi', explanation: 'The contrast in attitudes towards leave for mothers and fathers' },
          { id: 'q16', number: 16, text: 'Section C', answer: 'iv', explanation: 'Pressure for change from an unlikely source' },
          { id: 'q17', number: 17, text: 'Section D', answer: 'viii', explanation: 'The implications of maternity leave' },
          { id: 'q18', number: 18, text: 'Section E', answer: 'iii', explanation: 'An explanation for the limited success of government initiatives' },
          { id: 'q19', number: 19, text: 'Section F', answer: 'vii', explanation: 'A range of measures to encourage more equal responsibility' }
        ]
      },
      // ... other Q groups
    ]
  },
  {
    id: 'jan-part-tea',
    title: 'Passage 1',
    category: 'Part 1',
    passageTitle: 'A Brief History of Tea',
    frequency: 'Second',
    month: 'Jan',
    passageContent: `
      <style>
        .paragraph-label { font-weight: bold; color: #3b82f6; margin-right: 8px; float: left; }
        p { margin-bottom: 1rem; line-height: 1.8; }
      </style>
      <p><span class="paragraph-label">A</span> The story of tea began in ancient China over 5,000 years ago. According to legend, the Emperor Shen Nung was a skilled ruler, creative scientist and patron of the arts. His far-sighted edicts required, among other things, that all drinking water be boiled as a hygienic precaution. One summer day, while visiting a distant region of his realm, he and the court stopped to rest. In accordance with his ruling, the servants began to boil water for the court to drink. Dried leaves from a nearby bush fell into the boiling water, and as the leaves infused the water turned brown. As a scientist, the Emperor was intrigued by the new liquid, drank some, and found it very refreshing. And so, according to legend, tea was created.</p>
      
      <p><span class="paragraph-label">B</span> Tea consumption spread throughout Chinese culture, reaching into every aspect of society. The first definitive book was written on tea – a book clearly reflecting Zen Buddhist philosophy – 1,200 years ago. The first tea seeds were brought to Japan by a returning Buddhist priest, who had seen the value of tea in enhancing meditation in China. As a result, he is known as the “Father of Tea” in Japan. Because of this early association, tea in Japan has always been linked with Zen Buddhism. Tea received the Japanese Emperor’s support almost instantly and spread rapidly from the royal court and monasteries to other sections of society.</p>
      
      <p><span class="paragraph-label">C</span> Tea was elevated to an art form in the Japanese tea ceremony, in which supreme importance is given to making tea in the most perfect, most polite, most graceful, most charming manner possible. Such a purity of expression prompted the creation of a particular form of architecture for tea houses, duplicating the simplicity of a forest cottage. The cultural/artistic hostesses of Japan, the geishas, began to specialise in the presentation of the tea ceremony. However, as more and more people became involved in the excitement surrounding tea, the purity of the original concept was lost, and for a period the tea ceremony became corrupted, boisterous and highly embellished. Efforts were then made to return to the earlier simplicity, with the result that, in the 15th and 16th centuries, tea was viewed as the ultimate gift. Even warlords paused for tea before battles.</p>
      
      <p><span class="paragraph-label">D</span> While tea was at this high level of development in parts of Asia, information concerning the then-unknown beverage began to filter back to Europe. Earlier traders had mentioned it, but were unclear as to whether tea should be eaten or drunk. The first European to personally encounter tea and write about it was Portuguese – Portugal, with her technologically advanced navy, had been successful in gaining the first right of trade with China.</p>
      
      <p><span class="paragraph-label">E</span> Tea finally arrived in Europe in the 16th century, brought to Holland by the country’s navy, and became very fashionable in the Dutch capital, The Hague. This was due in part to tea being very expensive (over $100 per pound), which immediately made it the domain of the wealthy. Slowly, as the amount of tea imported increased, the price fell, and by 1675 it was available in common food shops throughout Holland.</p>
      
      <p><span class="paragraph-label">F</span> As the consumption of tea increased dramatically in Dutch society, doctors and university authorities in Holland argued as to its benefits or drawbacks. The public largely ignored the scholarly debate and continued to enjoy their new beverage, though the controversy lasted from 1635 to roughly 1657. Throughout this period, France and Holland led Europe in the use of tea.</p>
      
      <p><span class="paragraph-label">G</span> As the craze for all things oriental swept through Europe, tea became part of everyday life. Adding milk to the drink was first mentioned in 1680. Around that time, Dutch inns provided the first restaurant service of tea. Innkeepers would furnish guests with a portable tea set complete with a heating unit. The Dutchman would then prepare tea for himself and his friends outside in the inn garden. Tea remained popular in France for only about fifty years, being replaced by a preference for wine, chocolate and exotic coffees. Tea was introduced into England in 1660 by King Charles II and his Portuguese queen, who were both confirmed tea drinkers. Tea mania swept across England as it had earlier spread throughout France and Holland. By 1708, tea importation had risen to thirteen times the 1699 level. Tea was drunk by all levels of society.</p>
      
      <p><span class="paragraph-label">H</span> Russian interest in tea began as early as 1618, when the Chinese embassy in Moscow presented several chests of tea to the Emperor, Czar Alexis. Later in the century, a trade treaty between Russia and China allowed caravans to cross back and forth freely between the two countries. Still, the journey was not easy. The average caravan consisted of 200 to 300 camels, and the 18,000-kilometre trip took over 16 months to complete. Eventually, however, tea became – as it still is – one of the most popular drinks in the country.</p>
    `,
    questionGroups: [
      {
        id: 'qg-tea-1',
        instruction: 'Questions 1–8. Reading Passage 1 has eight paragraphs, A–H. Choose the correct heading for each paragraph from the list of headings below.',
        type: QuestionType.MATCHING_HEADINGS,
        questions: [
          { id: 'q1-tea', number: 1, text: 'Paragraph A', answer: 'viii', explanation: 'Paragraph A describes the accidental discovery of tea by Emperor Shen Nung. Matches "viii A chance discovery".' },
          { id: 'q2-tea', number: 2, text: 'Paragraph B', answer: 'iv', explanation: 'Paragraph B mentions the first book on tea reflected Zen Buddhist philosophy and its link to Zen Buddhism in Japan. Matches "iv A connection between tea and religion".' },
          { id: 'q3-tea', number: 3, text: 'Paragraph C', answer: 'ix', explanation: 'Paragraph C describes the Japanese tea ceremony as an art form with supreme importance on the manner of making tea. Matches "ix Tea-making as a ritual".' },
          { id: 'q4-tea', number: 4, text: 'Paragraph D', answer: 'vi', explanation: 'Paragraph D discusses information filtering back to Europe and the first European (Portuguese) encounter. Matches "vi News of tea reaches another continent".' },
          { id: 'q5-tea', number: 5, text: 'Paragraph E', answer: 'v', explanation: 'Paragraph E mentions tea was very expensive and the domain of the wealthy. Matches "v A luxury item".' },
          { id: 'q6-tea', number: 6, text: 'Paragraph F', answer: 'vii', explanation: 'Paragraph F discusses the arguments between doctors and universities about benefits or drawbacks. Matches "vii Is tea a good or a bad thing?".' },
          { id: 'q7-tea', number: 7, text: 'Paragraph G', answer: 'iii', explanation: 'Paragraph G mentions tea becoming popular then replaced by wine/chocolate in France, then popular in England. Matches "iii In – and sometimes out – of fashion".' },
          { id: 'q8-tea', number: 8, text: 'Paragraph H', answer: 'x', explanation: 'Paragraph H describes the difficult journey of caravans between Russia and China. Matches "x Difficulties in importing tea".' }
        ]
      },
      {
        id: 'qg-tea-2',
        instruction: 'Questions 9–13. Match each statement with the correct country, A–G.',
        type: QuestionType.MATCHING_INFO,
        questions: [
          { id: 'q9-tea', number: 9, text: 'Claims that tea might be harmful failed to affect its popularity.', answer: 'D', explanation: 'Para F discusses the debate in Holland (D) where the public ignored arguments.' },
          { id: 'q10-tea', number: 10, text: 'Tea lost favour to other drinks.', answer: 'E', explanation: 'Para G mentions tea remained popular in France (E) for only 50 years, replaced by wine etc.' },
          { id: 'q11-tea', number: 11, text: 'Special buildings were constructed in which to drink tea.', answer: 'B', explanation: 'Para C mentions creation of architecture for tea houses in Japan (B).' },
          { id: 'q12-tea', number: 12, text: 'Animals were involved in importing tea.', answer: 'G', explanation: 'Para H mentions caravans of 200-300 camels in Russia (G).' },
          { id: 'q13-tea', number: 13, text: 'A ruler’s specialist knowledge led to an interest in tea.', answer: 'A', explanation: 'Para A describes Emperor Shen Nung (China A) as a creative scientist intrigued by the liquid.' }
        ]
      }
    ]
  }
];