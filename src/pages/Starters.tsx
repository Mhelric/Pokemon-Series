import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PokemonSprite from '../components/ui/PokemonSprite';
import TypeBadge from '../components/ui/TypeBadge';
import PokeballButton from '../components/ui/PokeballButton';
import DialogueBox from '../components/ui/DialogueBox';
import { useSound } from '../hooks/useSound';

interface StarterData {
  gen: number;
  region: string;
  trio: Array<{
    name: string;
    dexNumber: number;
    type: string;
    finalEvo: {
      name: string;
      dexNumber: number;
      types: string[];
    };
    description: string;
  }>;
}

const STARTER_GENERATIONS: StarterData[] = [
  {
    gen: 1,
    region: "Kanto",
    trio: [
      {
        name: "Bulbasaur",
        dexNumber: 1,
        type: "Grass",
        finalEvo: { name: "Venusaur", dexNumber: 3, types: ["Grass", "Poison"] },
        description: "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon."
      },
      {
        name: "Charmander",
        dexNumber: 4,
        type: "Fire",
        finalEvo: { name: "Charizard", dexNumber: 6, types: ["Fire", "Flying"] },
        description: "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail."
      },
      {
        name: "Squirtle",
        dexNumber: 7,
        type: "Water",
        finalEvo: { name: "Blastoise", dexNumber: 9, types: ["Water"] },
        description: "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth."
      }
    ]
  },
  {
    gen: 2,
    region: "Johto",
    trio: [
      {
        name: "Chikorita",
        dexNumber: 152,
        type: "Grass",
        finalEvo: { name: "Meganium", dexNumber: 154, types: ["Grass"] },
        description: "A sweet aroma gently wafts from the leaf on its head. It is docile and loves to soak up the sun's rays."
      },
      {
        name: "Cyndaquil",
        dexNumber: 155,
        type: "Fire",
        finalEvo: { name: "Typhlosion", dexNumber: 157, types: ["Fire"] },
        description: "It is timid, and always curls itself up into a ball. If attacked, it flares up its back for protection."
      },
      {
        name: "Totodile",
        dexNumber: 158,
        type: "Water",
        finalEvo: { name: "Feraligatr", dexNumber: 160, types: ["Water"] },
        description: "Its well-developed jaws are powerful and capable of crushing anything. Even its trainer must be careful."
      }
    ]
  },
  {
    gen: 3,
    region: "Hoenn",
    trio: [
      {
        name: "Treecko",
        dexNumber: 252,
        type: "Grass",
        finalEvo: { name: "Sceptile", dexNumber: 254, types: ["Grass"] },
        description: "It quickly scales vertical walls and uses its thick tail to slam opponents with tremendous force."
      },
      {
        name: "Torchic",
        dexNumber: 255,
        type: "Fire",
        finalEvo: { name: "Blaziken", dexNumber: 257, types: ["Fire", "Fighting"] },
        description: "A fire burns inside its belly. It feels warm to hug, launching fireballs exceeding 1,800 degrees."
      },
      {
        name: "Mudkip",
        dexNumber: 258,
        type: "Water",
        finalEvo: { name: "Swampert", dexNumber: 260, types: ["Water", "Ground"] },
        description: "The large fin on its head acts as radar to detect movements in water and air without using its eyes."
      }
    ]
  },
  {
    gen: 4,
    region: "Sinnoh",
    trio: [
      {
        name: "Turtwig",
        dexNumber: 387,
        type: "Grass",
        finalEvo: { name: "Torterra", dexNumber: 389, types: ["Grass", "Ground"] },
        description: "Made from soil, the shell on its back hardens when it drinks water. It lives along quiet riverbeds."
      },
      {
        name: "Chimchar",
        dexNumber: 390,
        type: "Fire",
        finalEvo: { name: "Infernape", dexNumber: 392, types: ["Fire", "Fighting"] },
        description: "It agilely scales sheer cliffs to live atop craggy mountains. Its fiery tail burns even while asleep."
      },
      {
        name: "Piplup",
        dexNumber: 393,
        type: "Water",
        finalEvo: { name: "Empoleon", dexNumber: 395, types: ["Water", "Steel"] },
        description: "Because it is very proud, it hates accepting food from people. Its thick down protects it from frosty chill."
      }
    ]
  },
  {
    gen: 5,
    region: "Unova",
    trio: [
      {
        name: "Snivy",
        dexNumber: 495,
        type: "Grass",
        finalEvo: { name: "Serperior", dexNumber: 497, types: ["Grass"] },
        description: "It is very intelligent and calm. Being exposed to sunlight makes its movements swifter."
      },
      {
        name: "Tepig",
        dexNumber: 498,
        type: "Fire",
        finalEvo: { name: "Emboar", dexNumber: 500, types: ["Fire", "Fighting"] },
        description: "It can deftly dodge its foe's attacks while shooting fireballs from its nose. It roasts berries to eat."
      },
      {
        name: "Oshawott",
        dexNumber: 501,
        type: "Water",
        finalEvo: { name: "Samurott", dexNumber: 503, types: ["Water"] },
        description: "It fights using the scalchop on its stomach. In response to an attack, it retaliates immediately by slashing."
      }
    ]
  },
  {
    gen: 6,
    region: "Kalos",
    trio: [
      {
        name: "Chespin",
        dexNumber: 650,
        type: "Grass",
        finalEvo: { name: "Chesnaught", dexNumber: 652, types: ["Grass", "Fighting"] },
        description: "The quills on its head are usually soft. When it flexes them, the points become sharp enough to pierce rock."
      },
      {
        name: "Fennekin",
        dexNumber: 653,
        type: "Fire",
        finalEvo: { name: "Delphox", dexNumber: 655, types: ["Fire", "Psychic"] },
        description: "Eating a twig fills it with energy, and its roomy ears give vent to air heated to over 390 degrees."
      },
      {
        name: "Froakie",
        dexNumber: 656,
        type: "Water",
        finalEvo: { name: "Greninja", dexNumber: 658, types: ["Water", "Dark"] },
        description: "It secretes flexible bubbles from its chest and back. The bubbles reduce the damage it would otherwise take."
      }
    ]
  },
  {
    gen: 7,
    region: "Alola",
    trio: [
      {
        name: "Rowlet",
        dexNumber: 722,
        type: "Grass",
        finalEvo: { name: "Decidueye", dexNumber: 724, types: ["Grass", "Ghost"] },
        description: "This wary Pokémon uses photosynthesis to store energy during the day, while becoming active at night."
      },
      {
        name: "Litten",
        dexNumber: 725,
        type: "Fire",
        finalEvo: { name: "Incineroar", dexNumber: 727, types: ["Fire", "Dark"] },
        description: "While grooming itself, it builds up fur inside its stomach. It sets the fur alight and spews fiery fireballs."
      },
      {
        name: "Popplio",
        dexNumber: 728,
        type: "Water",
        finalEvo: { name: "Primarina", dexNumber: 730, types: ["Water", "Fairy"] },
        description: "This Pokémon snorts water balloons from its nose. It practices acrobatic tricks with them diligently."
      }
    ]
  },
  {
    gen: 8,
    region: "Galar",
    trio: [
      {
        name: "Grookey",
        dexNumber: 810,
        type: "Grass",
        finalEvo: { name: "Rillaboom", dexNumber: 812, types: ["Grass"] },
        description: "When it taps out rhythms with its special stick, sound waves stimulate revitalizing energy in nearby plants."
      },
      {
        name: "Scorbunny",
        dexNumber: 813,
        type: "Fire",
        finalEvo: { name: "Cinderace", dexNumber: 815, types: ["Fire"] },
        description: "A warm-up of running around gets fire energy coursing through this Pokémon's body, letting it run at top speed."
      },
      {
        name: "Sobble",
        dexNumber: 816,
        type: "Water",
        finalEvo: { name: "Inteleon", dexNumber: 818, types: ["Water"] },
        description: "When scared, this Pokémon cries. Its tears pack the chemical punch of 100 onions, forcing attackers to weep."
      }
    ]
  },
  {
    gen: 9,
    region: "Paldea",
    trio: [
      {
        name: "Sprigatito",
        dexNumber: 906,
        type: "Grass",
        finalEvo: { name: "Meowscarada", dexNumber: 908, types: ["Grass", "Dark"] },
        description: "Its fluffy fur is similar in composition to plants. When Sprigatito rubs its paws, a sweet aroma mesmerizes foes."
      },
      {
        name: "Fuecoco",
        dexNumber: 909,
        type: "Fire",
        finalEvo: { name: "Skeledirge", dexNumber: 911, types: ["Fire", "Ghost"] },
        description: "It lies on warm rocks and uses the heat absorbed by its square scales to create internal fire energy."
      },
      {
        name: "Quaxly",
        dexNumber: 912,
        type: "Water",
        finalEvo: { name: "Quaquaval", dexNumber: 914, types: ["Water", "Fighting"] },
        description: "This serious-minded Pokémon will follow its Trainer's instructions neatly. It hates getting its coif dirty."
      }
    ]
  }
];

export default function Starters() {
  const { play } = useSound();
  const [selectedGenIndex, setSelectedGenIndex] = useState(0);
  const currentGen = STARTER_GENERATIONS[selectedGenIndex];

  // Interactive Poké Ball Choice modal state
  const [chosenStarter, setChosenStarter] = useState<typeof currentGen.trio[0] | null>(null);
  const [confirmedPartner, setConfirmedPartner] = useState<typeof currentGen.trio[0] | null>(null);

  const handleOpenBall = (starter: typeof currentGen.trio[0]) => {
    play('select');
    setChosenStarter(starter);
    setConfirmedPartner(null);
  };

  const handleConfirm = () => {
    play('select');
    setConfirmedPartner(chosenStarter);
  };

  const handleDecline = () => {
    play('back');
    setChosenStarter(null);
  };

  return (
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '24px 16px 48px',
      }}
    >
      {/* Header */}
      <div
        className="pixel-border"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', margin: 0, color: 'var(--color-pokedex-red)' }}>
            PROFESSOR'S LAB: CHOOSE YOUR STARTER
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', margin: '4px 0 0 0', opacity: 0.8 }}>
            Three Poké Balls rest on the research table. Choose your lifelong companion!
          </p>
        </div>

        {/* Generation Select Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {STARTER_GENERATIONS.map((sg, idx) => (
            <button
              key={sg.gen}
              onClick={() => {
                play('blip');
                setSelectedGenIndex(idx);
                setChosenStarter(null);
                setConfirmedPartner(null);
              }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '8px',
                padding: '6px 10px',
                backgroundColor: selectedGenIndex === idx ? 'var(--color-pokedex-red)' : 'var(--color-bg-primary)',
                color: selectedGenIndex === idx ? '#FFF' : 'var(--color-text-dark)',
                border: '2px solid var(--color-border)',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              GEN {sg.gen} ({sg.region})
            </button>
          ))}
        </div>
      </div>

      {/* ================= INTERACTIVE TABLE EXPERIENCE ================= */}
      <div
        className="pixel-border-lg"
        style={{
          backgroundColor: '#A87848', // Warm wooden laboratory table
          padding: '36px 20px',
          borderRadius: '12px',
          marginBottom: '32px',
          position: 'relative',
          boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '10px',
              backgroundColor: 'rgba(0,0,0,0.4)',
              color: '#FFF',
              padding: '6px 14px',
              borderRadius: '20px',
            }}
          >
            {currentGen.region.toUpperCase()} REGIONAL RESEARCH TABLE
          </span>
        </div>

        {/* 3 Poké Balls on the Table */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(16px, 6vw, 60px)', flexWrap: 'wrap' }}>
          {currentGen.trio.map((starter) => (
            <motion.div
              key={starter.dexNumber}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOpenBall(starter)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              {/* Poké Ball Icon */}
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '4px solid #1B1B1B',
                  boxShadow: '4px 6px 0px rgba(0,0,0,0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Red Top Half */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    backgroundColor:
                      starter.type === 'Grass' ? '#7AC74C' : starter.type === 'Fire' ? '#EE8130' : '#6390F0',
                  }}
                />
                {/* Black Middle Band */}
                <div
                  style={{
                    position: 'absolute',
                    top: '44%',
                    left: 0,
                    right: 0,
                    height: '12%',
                    backgroundColor: '#1B1B1B',
                  }}
                />
                {/* Center Button */}
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '3px solid #1B1B1B',
                    zIndex: 2,
                    boxShadow: '0 0 4px rgba(0,0,0,0.3)',
                  }}
                />
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '9px',
                  color: '#FFFFFF',
                  marginTop: '10px',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.6)',
                }}
              >
                BALL #{starter.dexNumber}
              </span>
            </motion.div>
          ))}
        </div>

        {/* POPUP / MODAL: "DO YOU CHOOSE THIS POKÉMON?" */}
        <AnimatePresence>
          {chosenStarter && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                backgroundColor: 'rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
              }}
            >
              <div
                className="pixel-border"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  padding: '24px',
                  borderRadius: '10px',
                  maxWidth: '480px',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <PokemonSprite dexNumber={chosenStarter.dexNumber} name={chosenStarter.name} size={110} />

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', margin: '8px 0 4px 0' }}>
                  {chosenStarter.name}
                </h3>
                <TypeBadge type={chosenStarter.type} size="md" />

                <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', margin: '12px 0 16px 0', lineHeight: 1.4 }}>
                  {chosenStarter.description}
                </p>

                {confirmedPartner ? (
                  <div style={{ backgroundColor: 'rgba(76, 175, 80, 0.15)', padding: '12px', borderRadius: '6px', border: '2px solid #4CAF50', marginBottom: '16px' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', color: '#2E7D32', margin: 0 }}>
                      🎉 Congratulations! You received {chosenStarter.name} as your partner!
                    </p>
                    <div style={{ marginTop: '12px' }}>
                      <PokeballButton label="CLOSE" onClick={handleDecline} variant="secondary" />
                    </div>
                  </div>
                ) : (
                  <>
                    <DialogueBox
                      text={`Do you choose ${chosenStarter.name}, the ${chosenStarter.type}-type Pokémon?`}
                      speed={20}
                      showArrow={false}
                    />

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
                      <PokeballButton label="YES! I CHOOSE YOU!" onClick={handleConfirm} variant="primary" />
                      <PokeballButton label="NO, LET ME THINK..." onClick={handleDecline} variant="danger" />
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ================= FULL EVOLUTION LINE CATALOGUE ================= */}
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', marginBottom: '16px' }}>
        GENERATION {currentGen.gen} ({currentGen.region.toUpperCase()}) STARTER EVOLUTIONS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentGen.trio.map((starter) => (
          <div
            key={starter.dexNumber}
            className="pixel-border"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            {/* Starter form */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <PokemonSprite dexNumber={starter.dexNumber} name={starter.name} size={70} />
              <div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '7px', color: '#888' }}>
                  BASIC STAGE
                </span>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '10px' }}>{starter.name}</div>
                <TypeBadge type={starter.type} size="sm" />
              </div>
            </div>

            {/* Evolution Arrow */}
            <div style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontSize: '10px', color: '#888', margin: '4px 0' }}>
              ▼ LEVEL 32–36 EVOLUTION ▼
            </div>

            {/* Final Evolution Form */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-primary)',
                border: '2px solid var(--color-border)',
                borderRadius: '6px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <PokemonSprite dexNumber={starter.finalEvo.dexNumber} name={starter.finalEvo.name} size={80} />
              <div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '7px', color: 'var(--color-pokedex-red)' }}>
                  FINAL EVOLUTION
                </span>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', margin: '2px 0 4px 0' }}>
                  {starter.finalEvo.name}
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {starter.finalEvo.types.map((t) => (
                    <TypeBadge key={t} type={t} size="sm" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
