const mongoose = require('mongoose');
const Disease = require('./disease');

mongoose.connect('mongodb+srv://Zohaib0168:zohaibiqbal0168@cluster0.vea6ben.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const diseases = [
  {
    name: "Mastitis",
    symptoms: ["Swollen", "painful udder", "Abnormal milk secretion", "Fever", "Decreased milk production"],
    treatment: "Antibiotics, anti-inflammatory medications, udder hygiene, and supportive care.",
    description: "Inflammation of the mammary gland caused by bacterial infection, leading to economic losses in dairy animals due to reduced milk yield and quality."
  },
  {
    name: "Foot-and-Mouth Disease (FMD)",
    symptoms: ["Fever", "Blister-like sores on mouth, feet, and teats", "Lameness", "Decreased milk production"],
    treatment: "Quarantine, supportive care, and vaccination to control outbreaks.",
    description: "Highly contagious viral disease affecting cloven-hoofed animals, leading to significant economic losses due to trade restrictions."
  },
  {
    name: "Brucellosis",
    symptoms: ["Abortion", "Infertility", "Decreased milk production", "Fever", "Joint pain"],
    treatment: "Antibiotics for infected animals, vaccination of susceptible animals, and culling of infected animals in severe cases.",
    description: "Bacterial disease transmitted through contact with infected tissues or milk, causing reproductive problems and economic losses in cattle, buffaloes, and goats."
  },
  {
    name: "Bovine Respiratory Disease (BRD)",
    symptoms: ["Coughing", "Nasal discharge", "Decreased appetite", "Fever"],
    treatment: "Antibiotics, anti-inflammatory medications, supportive care, and vaccination to prevent recurrence.",
    description: "Respiratory disease caused by multiple pathogens, common in stressed or overcrowded cattle, leading to economic losses in the beef and dairy industry."
  },
  {
    name: "Caprine Arthritis Encephalitis (CAE)",
    symptoms: ["Arthritis", "Pneumonia", "Mastitis", "Neurological signs"],
    treatment: "No cure, management of symptoms, and prevention through testing and culling of infected animals.",
    description: "Viral disease affecting goats, causing various health issues and economic losses due to reduced milk production and reproductive problems."
  },
  {
    name: "Contagious Bovine Pleuropneumonia (CBPP)",
    symptoms: ["Fever", "Coughing", "Difficulty breathing", "Pleurisy"],
    treatment: "Antibiotics, supportive care, and strict quarantine.",
    description: "Highly contagious bacterial respiratory disease affecting cattle, leading to high mortality rates and significant economic losses in affected herds."
  },
  {
    name: "Goat Pox",
    symptoms: ["Fever", "Nasal discharge", "Coughing", "Pox lesions on skin and mucous membranes"],
    treatment: "Supportive care, vaccination to prevent spread.",
    description: "Viral disease affecting goats, causing reduced productivity and mortality due to characteristic pox lesions and associated symptoms."
  },
  {
    name: "Paratuberculosis (Johne's Disease)",
    symptoms: ["Diarrhea", "Weight loss", "Decreased milk production", "Emaciation"],
    treatment: "No cure, management of symptoms, and prevention through testing and culling of infected animals.",
    description: "Chronic bacterial disease affecting ruminants, causing significant economic losses due to reduced productivity and culling of infected animals."
  },
  {
    name: "Trypanosomiasis (Nagana)",
    symptoms: ["Fever", "Anemia", "Weakness", "Weight loss", "Neurological signs"],
    treatment: "Antiprotozoal medications, vector control, and supportive care.",
    description: "Parasitic disease affecting cattle, buffaloes, and goats, causing reduced productivity and mortality in affected animals."
  },
  {
    name: "Enterotoxemia (Overeating Disease)",
    symptoms: ["Sudden death", "Convulsions", "Abdominal pain", "Diarrhea", "Neurological signs"],
    treatment: "Antitoxin administration, antibiotics, and supportive care.",
    description: "Acute bacterial disease affecting ruminants, causing high mortality rates during periods of high carbohydrate intake."
  }
];

Disease.insertMany(diseases)
  .then(() => {
    console.log("Diseases added successfully");
    mongoose.connection.close();
  })
  .catch(err => {
    console.log("Error adding diseases:", err);
  });
