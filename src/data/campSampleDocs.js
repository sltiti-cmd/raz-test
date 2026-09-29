const sample = (level, title) => ({
  level: level.toUpperCase(),
  title,
  preview: `/images/camps/sample-pages/${level}.jpg`,
  pdf: `/samples/raz/${level}.pdf`,
})

// Show only the first and last available RAZ level of each camp.
export const campSampleDocs = {
  aa: [sample('aa', 'Summer')],
  a: [sample('a', 'Halloween Houses'), sample('c', 'Building a Road')],
  d: [sample('d', 'Animal Tongues'), sample('f', 'Firefighters')],
  g: [sample('g', "A President's Day"), sample('j', 'Want to Be a Beaver')],
  k: [sample('k', 'Extreme Animals'), sample('n', 'A Landforms Adventure')],
  o: [sample('o', 'Mysterious Mars'), sample('q', 'Salmon A Link in the Food Chain')],
}
