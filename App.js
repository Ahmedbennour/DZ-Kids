import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';

// ======================================================
// DZ KIDS - VERSION 2.0 ULTIMATE (ARABIC & FRANÇAIS)
// ======================================================

const C = {
  green: '#20B77A',
  blue: '#3988E8',
  orange: '#FF9F43',
  pink: '#F27BAA',
  purple: '#9271E8',
  red: '#E5484D',
  dark: '#26334A',
  light: '#F4F7FC',
  white: '#FFFFFF',
};

const characters = [
  {
    id: 'anias',
    ar: 'أنياس',
    fr: 'Anias',
    emoji: '👧',
    color: C.pink,
    arDesc: 'طفلة ذكية ومرحة تحب التعلم والمغامرات.',
    frDesc: 'Une petite fille intelligente qui aime apprendre et explorer.',
  },
  {
    id: 'adam',
    ar: 'آدم',
    fr: 'Adam',
    emoji: '👦',
    color: C.green,
    arDesc: 'ولد شجاع يحب الاكتشاف وحل الألغاز.',
    frDesc: 'Un garçon courageux qui aime découvrir et résoudre des énigmes.',
  },
  {
    id: 'axel',
    ar: 'أكسيل',
    fr: 'Axel',
    emoji: '🧒',
    color: C.blue,
    arDesc: 'ولد مرح يحب اللعب والتحديات.',
    frDesc: 'Un garçon joyeux qui aime les jeux et les défis.',
  },
  {
    id: 'sharifa',
    ar: 'الأم شريفة',
    fr: 'Maman Charifa',
    emoji: '👩',
    color: C.purple,
    arDesc: 'أم حنونة ترافق الأطفال وتشجعهم على التعلم.',
    frDesc: 'Une maman douce qui accompagne et encourage les enfants.',
  },
];

const adventures = [
  {
    id: 'casbah',
    emoji: '🏘️',
    ar: 'القصبة العريقة',
    fr: 'La Casbah historique',
    arDesc: 'اكتشفوا أزقة القصبة الجميلة في الجزائر العاصمة.',
    frDesc: 'Découvrez les belles ruelles de la Casbah d’Alger.',
    arSpeech: 'هيا يا أطفالي، اكتشفوا تاريخنا الجميل في القصبة! ❤️',
    frSpeech: 'Venez mes enfants, découvrons notre histoire à la Casbah ! ❤️',
    heroes: ['adam', 'anias'],
    color: C.blue,
  },
  {
    id: 'sahara',
    emoji: '🏜️',
    ar: 'الصحراء الجزائرية',
    fr: 'Le Sahara algérien',
    arDesc: 'رحلة ممتعة لاكتشاف جمال الواحات والرمال الذهبية.',
    frDesc: 'Une belle aventure pour découvrir les oasis et le sable doré.',
    arSpeech: 'صحراؤنا واسعة وجميلة! لا تنسوا القبعات يا أبطال ☀️',
    frSpeech: 'Notre Sahara est magnifique ! N’oubliez pas vos chapeaux ☀️',
    heroes: ['axel', 'adam'],
    color: C.orange,
  },
  {
    id: 'sea',
    emoji: '🌊',
    ar: 'البحر الأبيض المتوسط',
    fr: 'La Méditerranée',
    arDesc: 'اكتشفوا شواطئ الجزائر الساحرة من شرقها إلى غربها.',
    frDesc: 'Découvrez les charmantes plages d’Algérie.',
    arSpeech: 'ما أجمل شواطئنا! هيا نلعب ونرحت معاً 🌊',
    frSpeech: 'Que nos plages sont belles ! Allons nous amuser 🌊',
    heroes: ['anias', 'axel', 'sharifa'],
    color: C.green,
  },
];

const games = {
  letters: {
    ar: 'لعبة الحروف',
    fr: 'Jeu des lettres',
    emoji: '🔤',
    color: C.pink,
  },
  numbers: {
    ar: 'لعبة الأرقام',
    fr: 'Jeu des nombres',
    emoji: '🔢',
    color: C.blue,
  },
  colors: {
    ar: 'الألوان والأشكال',
    fr: 'Couleurs et Formes',
    emoji: '🎨',
    color: C.orange,
  },
  brain: {
    ar: 'لعبة الذكاء',
    fr: 'Jeu de logique',
    emoji: '🧠',
    color: C.purple,
  },
};

const levels = [
  { id: 'easy', ar: 'سهل', fr: 'Facile', emoji: '🌱', color: C.green },
  { id: 'medium', ar: 'متوسط', fr: 'Moyen', emoji: '🌟', color: C.orange },
  { id: 'hard', ar: 'صعب', fr: 'Difficile', emoji: '🔥', color: C.pink },
];

const q = (ar, fr, optionsAr, optionsFr, answer) => ({
  ar,
  fr,
  optionsAr,
  optionsFr: optionsFr || optionsAr,
  answer,
});

const questions = {
  letters: {
    easy: [
      q('ما هو الحرف الذي تبدأ به كلمة أسد؟', 'Quelle lettre commence le mot أسد ?', ['أ', 'ب', 'ت'], null, 0),
      q('ما هو الحرف الذي تبدأ به كلمة باب؟', 'Quelle lettre commence le mot باب ?', ['م', 'ب', 'س'], null, 1),
      q('ما هو الحرف الذي تبدأ به كلمة تفاح؟', 'Quelle lettre commence le mot تفاح ?', ['ج', 'ت', 'ر'], null, 1),
      q('ما هو الحرف الذي تبدأ به كلمة جمل؟', 'Quelle lettre commence le mot جمل ?', ['ج', 'د', 'ه'], null, 0),
    ],
    medium: [
      q('ما هو الحرف الأخير في كلمة قمر؟', 'Quelle est la dernière lettre du mot قمر ?', ['ر', 'م', 'ق'], null, 0),
      q('ما هو الحرف الأخير في كلمة كتاب؟', 'Quelle est la dernière lettre du mot كتاب ?', ['ك', 'ت', 'ب'], null, 2),
      q('أي كلمة تبدأ بحرف الشين (ش)؟', 'Quel mot commence par la lettre ش ?', ['قمر', 'شمس', 'نجمة'], ['قمر (lune)', 'شمس (soleil)', 'نجمة (étoile)'], 1),
      q('كم عدد حروف كلمة سمك؟', 'Combien de lettres dans سمك ?', ['2', '3', '4'], null, 1),
    ],
    hard: [
      q('أكمل الكلمة: مدر_ة', 'Complète le mot : مدر_ة', ['س', 'ص', 'ش'], null, 0),
      q('ما الحرف الناقص في كلمة ح_صان؟', 'Quelle lettre manque dans ح_صان ?', ['ط', 'ق', 'ص'], null, 2),
      q('كم عدد حروف كلمة مدرسة؟', 'Combien de lettres dans مدرسة ?', ['4', '5', '6'], null, 1),
      q('أي كلمة تنتهي بحرف الباء (ب)؟', 'Quel mot se termine par ب ?', ['قمر', 'شمس', 'كتاب'], null, 2),
    ],
  },

  numbers: {
    easy: [
      q('كم يساوي 2 + 2 ؟', 'Combien font 2 + 2 ?', ['3', '4', '5'], null, 1),
      q('كم يساوي 5 + 3 ؟', 'Combien font 5 + 3 ?', ['9', '7', '8'], null, 2),
      q('كم يساوي 10 - 4 ؟', 'Combien font 10 - 4 ?', ['6', '5', '7'], null, 0),
      q('كم يساوي 1 + 6 ؟', 'Combien font 1 + 6 ?', ['7', '8', '6'], null, 0),
    ],
    medium: [
      q('كم يساوي 7 + 8 ؟', 'Combien font 7 + 8 ?', ['14', '15', '16'], null, 1),
      q('كم يساوي 15 - 7 ؟', 'Combien font 15 - 7 ?', ['9', '8', '7'], null, 1),
      q('كم يساوي 3 × 4 ؟', 'Combien font 3 × 4 ?', ['12', '10', '14'], null, 0),
      q('كم يساوي 6 + 9 ؟', 'Combien font 6 + 9 ?', ['16', '14', '15'], null, 2),
    ],
    hard: [
      q('كم يساوي 6 × 7 ؟', 'Combien font 6 × 7 ?', ['42', '36', '48'], null, 0),
      q('كم يساوي 45 - 18 ؟', 'Combien font 45 - 18 ?', ['26', '27', '28'], null, 1),
      q('كم يساوي 8 × 5 ؟', 'Combien font 8 × 5 ?', ['35', '45', '40'], null, 2),
      q('كم يساوي 12 + 19 ؟', 'Combien font 12 + 19 ?', ['31', '29', '33'], null, 0),
    ],
  },

  colors: {
    easy: [
      q('ما لون السماء في النهار الصافي؟', 'De quelle couleur est le ciel ?', ['أزرق 🔵', 'أحمر 🔴', 'أخضر 🟢'], ['Bleu 🔵', 'Rouge 🔴', 'Vert 🟢'], 0),
      q('ما لون التفاحة الناضجة غالباً؟', 'Quelle est la couleur d’une pomme mûre ?', ['أصفر 🟡', 'أحمر 🔴', 'أسود ⚫'], ['Jaune 🟡', 'Rouge 🔴', 'Noir ⚫'], 1),
      q('ما هو شكل الشمس؟', 'Quelle est la forme du soleil ?', ['مربع ⬛', 'دائرة 🔴', 'مثلث 🔺'], ['Carré ⬛', 'Cercle 🔴', 'Triangle 🔺'], 1),
    ],
    medium: [
      q('ما لون العشب والأشجار؟', 'Quelle est la couleur de l’herbe ?', ['أخضر 🟢', 'أزرق 🔵', 'أصفر 🟡'], ['Vert 🟢', 'Bleu 🔵', 'Jaune 🟡'], 0),
      q('كم ضلعاً للمثلث؟', 'Combien de côtés a un triangle ?', ['3', '4', '5'], null, 0),
      q('أي لون نتحصل عليه عند خلط الأزرق والأصفر؟', 'Quelle couleur obtient-on en mélangeant bleu et jaune ?', ['أخضر 🟢', 'برتقالي 🟠', 'بنفسجي 🟣'], ['Vert 🟢', 'Orange 🟠', 'Violet 🟣'], 0),
    ],
    hard: [
      q('ما هو الشكل الذي له 4 أضلع متساوية؟', 'Quelle forme a 4 côtés égaux ?', ['المستطيل', 'المربع', 'الدائرة'], ['Le rectangle', 'Le carré', 'Le cercle'], 1),
      q('أي لون يعتبر من الألوان الأساسية؟', 'Lequel est une couleur primaire ?', ['أخضر', 'أحمر', 'برتقالي'], ['Vert', 'Rouge', 'Orange'], 1),
      q('كم عدد زوايا المستطيل؟', 'Combien d’angles a unrectangle ?', ['3', '4', '5'], null, 1),
    ],
  },

  brain: {
    easy: [
      q('ما الحيوان الذي يقول مياو؟', 'Quel animal fait Miaou ?', ['🐶 الكلب', '🐱 القط', '🐮 البقرة'], ['🐶 Chien', '🐱 Chat', '🐮 Vache'], 1),
      q('ما لون الموز؟', 'Quelle est la couleur de la banane ?', ['🔴 أحمر', '🟡 أصفر', '🔵 أزرق'], ['🔴 Rouge', '🟡 Jaune', '🔵 Bleu'], 1),
      q('كم عدد أيام الأسبوع؟', 'Combien de jours dans une semaine ?', ['5', '6', '7'], null, 2),
      q('ما الحيوان الذي يقول هاو هاو؟', 'Quel animal fait Ouaf ouaf ?', ['🐶 الكلب', '🐱 القط', '🐑 الخروف'], ['🐶 Chien', '🐱 Chat', '🐑 Mouton'], 0),
    ],
    medium: [
      q('كم عدد أرجل القطة؟', 'Combien de pattes a un chat ?', ['2', '4', '6'], null, 1),
      q('في أي فصل تتساقط أوراق الشجر؟', 'Dans quelle saison les feuilles tombent-elles ?', ['الربيع', 'الخريف', 'الصيف'], ['Le printemps', 'L’automne', 'L’été'], 1),
      q('أي حيوان يعطينا الحليب؟', 'Quel animal nous donne du lait ?', ['🐔 الدجاجة', '🐟 السمكة', '🐮 البقرة'], ['🐔 Poule', '🐟 Poisson', '🐮 Vache'], 2),
    ],
    hard: [
      q('ما هي عاصمة الجزائر؟', 'Quelle est la capitale de l’Algérie ?', ['الجزائر العاصمة', 'وهران', 'قسنطينة'], ['Alger', 'Oran', 'Constantine'], 0),
      q('كم عدد ألوان قوس قزح؟', 'Combien de couleurs a l’arc-en-ciel ?', ['5', '7', '9'], null, 1),
      q('على أي كوكب نعيش؟', 'Sur quelle planète vivons-nous ?', ['المريخ', 'الأرض', 'القمر'], ['Mars', 'La Terre', 'La Lune'], 1),
    ],
  },
};

function Avatar({ character, size = 75 }) {
  return (
    <View style={[
      styles.avatar,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: character.color + '22',
        borderColor: character.color,
      },
    ]}>
      <Text style={{ fontSize: size * 0.58 }}>
        {character.emoji}
      </Text>
    </View>
  );
}

function MainButton({ title, color, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color || C.green }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function Header({ isAr, onHome, onToggle }) {
  return (
    <View style={[
      styles.header,
      { flexDirection: isAr ? 'row-reverse' : 'row' },
    ]}>
      <TouchableOpacity onPress={onHome}>
        <Text style={styles.logo}>DZ Kids 🌟</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.languageButton}
        onPress={onToggle}
      >
        <Text style={styles.languageText}>
          {isAr ? 'FR 🇫🇷' : 'عربي 🇩🇿'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function Option({ text, state, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  const shift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state === 'correct') {
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.06, duration: 130, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      ]).start();
    }

    if (state === 'wrong') {
      Animated.sequence([
        Animated.timing(shift, { toValue: 8, duration: 50, useNativeDriver: true }),
        Animated.timing(shift, { toValue: -8, duration: 50, useNativeDriver: true }),
        Animated.timing(shift, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }, [state]);

  const stateStyle =
    state === 'correct' ? styles.correctOption :
    state === 'wrong' ? styles.wrongOption :
    state === 'dim' ? styles.dimOption : null;

  return (
    <Animated.View style={{ transform: [{ scale }, { translateX: shift }] }}>
      <TouchableOpacity
        style={[styles.option, stateStyle]}
        onPress={onPress}
        activeOpacity={0.8}
        disabled={state !== 'idle'}
      >
        <Text style={styles.optionText}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function App() {
  const [language, setLanguage] = useState('ar');
  const [page, setPage] = useState('home');

  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedAdventure, setSelectedAdventure] = useState(null);

  const [stars, setStars] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [game, setGame] = useState('letters');
  const [level, setLevel] = useState('easy');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const scrollRef = useRef(null);
  const answerLock = useRef(false);

  const isAr = language === 'ar';
  const t = (ar, fr) => isAr ? ar : fr;

  const rowDir = isAr ? 'row-reverse' : 'row';
  const textDir = { writingDirection: isAr ? 'rtl' : 'ltr' };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: false });
    }
  }, [page, questionIndex, selectedAdventure]);

  const words = {
    home: t('الرئيسية', 'Accueil'),
    characters: t('شخصياتنا', 'Personnages'),
    games: t('الألعاب التعليمية', 'Jeux éducatifs'),
    adventures: t('مغامرات الجزائر', 'Aventures en Algérie'),
    stars: t('نجومي', 'Mes étoiles'),
    childProfile: t('ملف الطفل', 'Profil de l’enfant'),
    parentsArea: t('فضاء الولي', 'Espace Parents'),
    welcome: t('مرحباً بكم في عالم DZ Kids!', 'Bienvenue dans le monde DZ Kids !'),
    subtitle: t('نتعلم ونلعب ونكتشف معاً', 'Apprenons et découvrons ensemble'),
    mother: t('أنا الأم شريفة، سأرافقكم في رحلتكم التعليمية!', 'Je suis Maman Charifa, je vous accompagne dans votre aventure !'),
    choose: t('اختر شخصيتك المفضلة', 'Choisis ton personnage préféré'),
    back: t('العودة للرئيسية', 'Retour à l’accueil'),
    backAdventures: t('العودة للمغامرات', 'Retour aux aventures'),
    next: t('السؤال التالي', 'Question suivante'),
    seeResult: t('عرض النتيجة', 'Voir le résultat'),
    finish: t('انتهت اللعبة! أحسنت!', 'Jeu terminé ! Bravo !'),
    playAgain: t('العب من جديد', 'Rejouer'),
    otherLevel: t('اختر مستوى آخر', 'Choisir un autre niveau'),
    earned: t('عدد النجوم التي جمعتها', 'Étoiles gagnées'),
    chooseLevel: t('اختر المستوى', 'Choisis le niveau'),
    question: t('السؤال', 'Question'),
    correctCount: t('الإجابات الصحيحة', 'Bonnes réponses'),
    heroesTitle: t('أبطال المغامرة', 'Les héros de l’aventure'),
    parentTitle: t('لوحة تحكم الولي', 'Tableau de bord parents'),
    parentDesc: t('متابعة تقدم طفلك التعليمي والإحصائيات.', 'Suivi des progrès de votre enfant et statistiques.'),
  };

  const currentQuestions = questions[game][level];
  const currentQuestion = currentQuestions[questionIndex];
  const total = currentQuestions.length;
  const isLastQuestion = questionIndex === total - 1;

  const gameInfo = games[game];
  const levelInfo = levels.find(item => item.id === level);

  const characterById = id => characters.find(character => character.id === id);

  function goHome() {
    setPage('home');
    setSelectedCharacter(null);
    setSelectedAdventure(null);
  }

  function openLevels(type) {
    setGame(type);
    setPage('levels');
  }

  function startGame(levelId) {
    setLevel(levelId);
    setQuestionIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedOption(null);
    answerLock.current = false;
    setPage('game');
  }

  function answerQuestion(index) {
    if (answerLock.current || answered) return;

    answerLock.current = true;
    setAnswered(true);
    setSelectedOption(index);

    if (index === currentQuestion.answer) {
      setScore(previous => previous + 1);
      setStars(previous => previous + 1);
    }
  }

  function nextQuestion() {
    if (!answered) return;

    if (!isLastQuestion) {
      answerLock.current = false;
      setQuestionIndex(previous => previous + 1);
      setAnswered(false);
      setSelectedOption(null);
    } else {
      setGamesPlayed(prev => prev + 1);
      setPage('gameFinished');
    }
  }

  function optionState(index) {
    if (!answered) return 'idle';
    if (index === currentQuestion.answer) return 'correct';
    if (index === selectedOption) return 'wrong';
    return 'dim';
  }

  function openCharacter(character) {
    setSelectedCharacter(character);
    setPage('character');
  }

  const wasCorrect = answered && selectedOption === currentQuestion.answer;

  const feedbackText = wasCorrect
    ? t('أحسنت! إجابة صحيحة ⭐', 'Bravo ! Bonne réponse ⭐')
    : t('لا بأس، حاول في السؤال التالي! 💪', 'Ce n’est pas grave, essaie la prochaine ! 💪');

  const finishText =
    score === total
      ? t('أنتم أبطال حقيقيون! نتيجة كاملة! 🏆', 'Vous êtes de vrais champions ! Score parfait ! 🏆')
      : score >= Math.ceil(total / 2)
      ? t('أحسنتم! استمروا في التعلم ❤️', 'Bravo ! Continuez à apprendre ❤️')
      : t('لا بأس، المحاولة القادمة أفضل! 💪', 'Pas de souci, la prochaine fois sera meilleure ! 💪');

  const BackButton = () => (
    <MainButton title={'⬅ ' + words.back} color={C.dark} onPress={goHome} />
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={C.green} barStyle="light-content" />

      <Header
        isAr={isAr}
        onHome={goHome}
        onToggle={() => setLanguage(isAr ? 'fr' : 'ar')}
      />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {page === 'home' && (
          <View>
            <View style={styles.hero}>
              <Avatar character={characters[3]} size={120} />
              <Text style={styles.heroTitle}>{words.welcome}</Text>
              <Text style={styles.heroSubtitle}>{words.subtitle}</Text>
              <Text style={[styles.motherText, textDir]}>{words.mother}</Text>
            </View>

            <View style={styles.starBox}>
              <Text style={styles.starText}>⭐ {stars} {words.stars}</Text>
            </View>

            <View style={[styles.quickNavRow, { flexDirection: rowDir }]}>
              <TouchableOpacity
                style={[styles.quickNavBtn, { backgroundColor: C.pink + '22', borderColor: C.pink }]}
                onPress={() => setPage('profile')}
              >
                <Text style={{ fontSize: 24 }}>👦👧</Text>
                <Text style={styles.quickNavText}>{words.childProfile}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.quickNavBtn, { backgroundColor: C.purple + '22', borderColor: C.purple }]}
                onPress={() => setPage('parents')}
              >
                <Text style={{ fontSize: 24 }}>👩‍👦</Text>
                <Text style={styles.quickNavText}>{words.parentsArea}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>{words.choose}</Text>

            {characters.map(character => (
              <TouchableOpacity
                key={character.id}
                style={[
                  styles.characterCard,
                  { flexDirection: rowDir },
                  isAr
                    ? { borderRightWidth: 6, borderRightColor: character.color }
                    : { borderLeftWidth: 6, borderLeftColor: character.color },
                ]}
                onPress={() => openCharacter(character)}
                activeOpacity={0.85}
              >
                <Avatar character={character} size={70} />
                <Text style={[styles.characterName, textDir, { textAlign: isAr ? 'right' : 'left' }]}>
                  {isAr ? character.ar : character.fr}
                </Text>
                <Text style={styles.arrow}>{isAr ? '←' : '→'}</Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.sectionTitle}>{words.games}</Text>

            {Object.keys(games).map(key => (
              <MainButton
                key={key}
                title={games[key].emoji + '  ' + t(games[key].ar, games[key].fr)}
                color={games[key].color}
                onPress={() => openLevels(key)}
              />
            ))}

            <Text style={styles.sectionTitle}>{words.adventures}</Text>

            <MainButton
              title={'🇩🇿  ' + words.adventures}
              color={C.orange}
              onPress={() => {
                setSelectedAdventure(null);
                setPage('adventures');
              }}
            />

            <MainButton
              title={'⭐  ' + words.stars}
              color={C.green}
              onPress={() => setPage('stars')}
            />
          </View>
        )}

        {page === 'profile' && (
          <View style={styles.profile}>
            <Text style={styles.bigEmoji}>👦👧</Text>
            <Text style={styles.profileName}>{words.childProfile}</Text>
            <View style={styles.profileStatsBox}>
              <Text style={styles.statText}>⭐ {stars} {words.stars}</Text>
              <Text style={styles.statText}>🎮 {gamesPlayed} {t('ألعاب مكتملة', 'Jeux terminés')}</Text>
              <Text style={styles.statText}>🏅 {t('مستوى بطل الصغار', 'Niveau Champion')}</Text>
            </View>
            <Text style={[styles.description, textDir]}>
              {t('استمر في اللعب وجمع النجوم لتصبح أذكى بطل في الجزائر! 🇩🇿', 'Continue de jouer pour devenir le meilleur champion ! 🇩🇿')}
            </Text>
            <BackButton />
          </View>
        )}

        {page === 'parents' && (
          <View style={styles.profile}>
            <Text style={styles.bigEmoji}>🛡️</Text>
            <Text style={styles.profileName}>{words.parentTitle}</Text>
            <Text style={[styles.description, textDir]}>{words.parentDesc}</Text>
            
            <View style={styles.parentCard}>
              <Text style={[styles.parentCardTitle, textDir]}>📊 {t('إحصائيات النشاط', 'Statistiques d’activité')}</Text>
              <Text style={[styles.parentCardText, textDir]}>• {words.stars}: {stars}</Text>
              <Text style={[styles.parentCardText, textDir]}>• {t('الاختبارات المجتازة', 'Quiz passés')}: {gamesPlayed}</Text>
            </View>

            <View style={[styles.mascotRow, { flexDirection: rowDir }]}>
              <Avatar character={characters[3]} size={65} />
              <View style={styles.bubble}>
                <Text style={[styles.bubbleText, textDir]}>
                  {t(
                    'نصيحة الأم شريفة: اجعل وقت اللعب مقسماً بانتظام لضمان تفوق طفلك.',
                    'Conseil de Maman Charifa : Équilibrez le temps de jeu et d’étude.'
                  )}
                </Text>
              </View>
            </View>

            <BackButton />
          </View>
        )}

        {page === 'character' && selectedCharacter && (
          <View style={styles.profile}>
            <Avatar character={selectedCharacter} size={180} />
            <Text style={styles.profileName}>{isAr ? selectedCharacter.ar : selectedCharacter.fr}</Text>
            <Text style={[styles.description, textDir]}>
              {isAr ? selectedCharacter.arDesc : selectedCharacter.frDesc}
            </Text>
            {selectedCharacter.id === 'sharifa' && (
              <Text style={[styles.motherText, textDir]}>{words.mother}</Text>
            )}
            <Text style={styles.encouragement}>
              {t('هيا بنا نتعلم ونستمتع معاً! 🌟', 'Apprenons et amusons-nous ensemble ! 🌟')}
            </Text>
            <BackButton />
          </View>
        )}

        {page === 'levels' && (
          <View style={styles.gameBox}>
            <Text style={styles.sectionTitle}>
              {gameInfo.emoji} {t(gameInfo.ar, gameInfo.fr)}
            </Text>

            <View style={[styles.mascotRow, { flexDirection: rowDir }]}>
              <Avatar character={characters[3]} size={75} />
              <View style={styles.bubble}>
                <Text style={[styles.bubbleText, textDir]}>{words.chooseLevel}</Text>
              </View>
            </View>

            {levels.map(item => (
              <MainButton
                key={item.id}
                title={item.emoji + '  ' + t(item.ar, item.fr)}
                color={item.color}
                onPress={() => startGame(item.id)}
              />
            ))}

            <BackButton />
          </View>
        )}

        {page === 'game' && (
          <View style={styles.gameBox}>
            <Text style={styles.sectionTitle}>
              {gameInfo.emoji} {t(gameInfo.ar, gameInfo.fr)}
            </Text>

            <View style={[styles.levelBadge, { backgroundColor: levelInfo.color }]}>
              <Text style={styles.levelBadgeText}>
                {levelInfo.emoji} {t(levelInfo.ar, levelInfo.fr)}
              </Text>
            </View>

            <Text style={styles.progress}>
              {words.question} {questionIndex + 1} / {total}
            </Text>

            <View style={styles.progressTrack}>
              <View style={[
                styles.progressFill,
                { width: ((questionIndex + (answered ? 1 : 0)) / total) * 100 + '%' },
              ]} />
            </View>

            <Text style={[styles.question, textDir]}>
              {isAr ? currentQuestion.ar : currentQuestion.fr}
            </Text>

            {(isAr ? currentQuestion.optionsAr : currentQuestion.optionsFr).map((option, index) => (
              <Option
                key={index}
                text={option}
                state={optionState(index)}
                onPress={() => answerQuestion(index)}
              />
            ))}

            {answered && (
              <View style={[styles.mascotRow, { flexDirection: rowDir }]}>
                <Avatar character={characters[3]} size={65} />
                <View style={[styles.bubble, { backgroundColor: wasCorrect ? '#D7F6E7' : '#FFE9E9' }]}>
                  <Text style={[styles.bubbleText, textDir]}>{feedbackText}</Text>
                </View>
              </View>
            )}

            {answered && (
              <MainButton
                title={isLastQuestion ? words.seeResult : words.next}
                color={C.green}
                onPress={nextQuestion}
              />
            )}

            <BackButton />
          </View>
        )}

        {page === 'gameFinished' && (
          <View style={styles.profile}>
            <Text style={styles.bigEmoji}>🏆</Text>
            <Text style={styles.profileName}>{words.finish}</Text>
            <Text style={styles.starText}>{words.correctCount}: {score} / {total}</Text>
            <Text style={styles.starText}>⭐ {stars}</Text>

            <View style={[styles.mascotRow, { flexDirection: rowDir }]}>
              <Avatar character={characters[3]} size={75} />
              <View style={styles.bubble}>
                <Text style={[styles.bubbleText, textDir]}>{finishText}</Text>
              </View>
            </View>

            <MainButton title={words.playAgain} color={C.green} onPress={() => startGame(level)} />
            <MainButton title={words.otherLevel} color={C.blue} onPress={() => setPage('levels')} />
            <BackButton />
          </View>
        )}

        {page === 'adventures' && (
          <View>
            <Text style={styles.sectionTitle}>{words.adventures} 🇩🇿</Text>

            {adventures.map(adventure => (
              <TouchableOpacity
                key={adventure.id}
                style={styles.adventureCard}
                activeOpacity={0.85}
                onPress={() => {
                  setSelectedAdventure(adventure);
                  setPage('adventureDetail');
                }}
              >
                <View style={[styles.adventureEmojiBox, { backgroundColor: adventure.color + '25' }]}>
                  <Text style={styles.adventureEmoji}>{adventure.emoji}</Text>
                </View>
                <Text style={styles.adventureTitle}>{isAr ? adventure.ar : adventure.fr}</Text>
                <Text style={[styles.description, textDir]}>{isAr ? adventure.arDesc : adventure.frDesc}</Text>
              </TouchableOpacity>
            ))}

            <BackButton />
          </View>
        )}

        {page === 'adventureDetail' && selectedAdventure && (
          <View style={styles.profile}>
            <View style={[styles.adventureEmojiBox, { backgroundColor: selectedAdventure.color + '25', height: 180 }]}>
              <Text style={{ fontSize: 100 }}>{selectedAdventure.emoji}</Text>
            </View>

            <Text style={styles.profileName}>{isAr ? selectedAdventure.ar : selectedAdventure.fr}</Text>
            <Text style={[styles.description, textDir]}>{isAr ? selectedAdventure.arDesc : selectedAdventure.frDesc}</Text>

            <Text style={styles.sectionTitle}>{words.heroesTitle}</Text>

            <View style={[styles.heroesRow, { flexDirection: rowDir }]}>
              {selectedAdventure.heroes.map(id => {
                const hero = characterById(id);
                return (
                  <View key={id} style={styles.heroItem}>
                    <Avatar character={hero} size={72} />
                    <Text style={styles.heroName}>{isAr ? hero.ar : hero.fr}</Text>
                  </View>
                );
              })}
            </View>

            <View style={[styles.mascotRow, { flexDirection: rowDir }]}>
              <Avatar character={characters[3]} size={70} />
              <View style={styles.bubble}>
                <Text style={[styles.bubbleText, textDir]}>
                  {isAr ? selectedAdventure.arSpeech : selectedAdventure.frSpeech}
                </Text>
              </View>
            </View>

            <MainButton
              title={'⬅ ' + words.backAdventures}
              color={C.orange}
              onPress={() => {
                setSelectedAdventure(null);
                setPage('adventures');
              }}
            />

            <BackButton />
          </View>
        )}

        {page === 'stars' && (
          <View style={styles.profile}>
            <Text style={styles.bigEmoji}>🌟</Text>
            <Text style={styles.profileName}>{words.stars}</Text>
            <Text style={styles.starText}>⭐ {stars}</Text>
            <Text style={[styles.description, textDir]}>{words.earned}</Text>

            <View style={[styles.mascotRow, { flexDirection: rowDir }]}>
              <Avatar character={characters[3]} size={75} />
              <View style={styles.bubble}>
                <Text style={[styles.bubbleText, textDir]}>
                  {t(
                    'الأم شريفة فخورة بكم! استمروا في التعلم يا أبطال ❤️',
                    'Maman Charifa est fière de vous ! Continuez, les champions ! ❤️'
                  )}
                </Text>
              </View>
            </View>

            <BackButton />
          </View>
        )}

        <Text style={styles.footer}>DZ Kids 🇩🇿 ❤️</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.light },
  header: {
    backgroundColor: C.green,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 10 : 50,
    paddingBottom: 14,
    paddingHorizontal: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: { color: C.white, fontSize: 25, fontWeight: 'bold' },
  languageButton: { backgroundColor: C.white, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 20 },
  languageText: { color: C.dark, fontWeight: 'bold', fontSize: 15 },
  content: { padding: 16, paddingBottom: 40 },
  hero: { backgroundColor: '#E2F8EE', padding: 20, borderRadius: 24, alignItems: 'center', marginBottom: 16 },
  heroTitle: { color: C.dark, fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 12, marginBottom: 8 },
  heroSubtitle: { color: C.dark, fontSize: 16, textAlign: 'center' },
  motherText: { color: C.purple, fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 12, lineHeight: 25 },
  avatar: { borderWidth: 3, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  starBox: { backgroundColor: '#FFF2D9', borderRadius: 16, padding: 10, marginBottom: 14, alignItems: 'center' },
  starText: { fontSize: 23, color: '#D68B13', fontWeight: 'bold', textAlign: 'center', marginVertical: 8 },
  quickNavRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  quickNavBtn: { flex: 1, padding: 12, borderRadius: 16, borderWidth: 2, alignItems: 'center', marginHorizontal: 4 },
  quickNavText: { marginTop: 6, fontWeight: 'bold', color: C.dark, fontSize: 14 },
  sectionTitle: { fontSize: 21, fontWeight: 'bold', color: C.dark, marginTop: 18, marginBottom: 12, textAlign: 'center' },
  characterCard: {
    backgroundColor: C.white, padding: 12, borderRadius: 20, marginBottom: 12, alignItems: 'center',
    elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  characterName: { flex: 1, fontSize: 20, fontWeight: 'bold', color: C.dark, marginHorizontal: 14 },
  arrow: { fontSize: 26, color: C.green, marginHorizontal: 6 },
  button: { paddingVertical: 17, paddingHorizontal: 15, borderRadius: 18, alignItems: 'center', marginVertical: 7, minHeight: 56, justifyContent: 'center' },
  buttonText: { color: C.white, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  profile: { backgroundColor: C.white, padding: 20, borderRadius: 24, alignItems: 'center', marginTop: 12 },
  profileName: { fontSize: 26, fontWeight: 'bold', color: C.dark, textAlign: 'center', marginTop: 12 },
  profileStatsBox: { backgroundColor: '#F0F4FC', padding: 16, borderRadius: 16, width: '100%', marginVertical: 14 },
  statText: { fontSize: 18, fontWeight: 'bold', color: C.dark, marginVertical: 4, textAlign: 'center' },
  parentCard: { backgroundColor: '#FFF8E8', padding: 16, borderRadius: 16, width: '100%', marginVertical: 12, borderWidth: 1, borderColor: '#FFD56B' },
  parentCardTitle: { fontSize: 18, fontWeight: 'bold', color: C.dark, marginBottom: 8 },
  parentCardText: { fontSize: 16, color: C.dark, marginVertical: 3 },
  bigEmoji: { fontSize: 80, marginVertical: 12 },
  description: { fontSize: 17, color: C.dark, textAlign: 'center', lineHeight: 26, marginTop: 10 },
  encouragement: { fontSize: 18, color: C.green, fontWeight: 'bold', textAlign: 'center', marginVertical: 18 },
  gameBox: { backgroundColor: C.white, padding: 17, borderRadius: 22 },
  levelBadge: { alignSelf: 'center', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 16 },
  levelBadgeText: { color: C.white, fontWeight: 'bold', fontSize: 15 },
  progress: { color: C.purple, fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 12, marginBottom: 8 },
  progressTrack: { height: 10, backgroundColor: '#E6ECF7', borderRadius: 6, overflow: 'hidden' },
  progressFill: { height: 10, backgroundColor: C.green, borderRadius: 6 },
  question: { color: C.dark, fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, lineHeight: 33 },
  option: {
    backgroundColor: '#EAF1FF', paddingVertical: 18, paddingHorizontal: 14, borderRadius: 16,
    marginVertical: 7, alignItems: 'center', borderWidth: 2, borderColor: 'transparent', minHeight: 60, justifyContent: 'center',
  },
  correctOption: { backgroundColor: '#D7F6E7', borderColor: C.green },
  wrongOption: { backgroundColor: '#FFE0E0', borderColor: C.red },
  dimOption: { opacity: 0.45 },
  optionText: { color: C.dark, fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  mascotRow: { alignItems: 'center', marginVertical: 12, alignSelf: 'stretch' },
  bubble: { flex: 1, backgroundColor: '#F0EAFF', padding: 12, borderRadius: 18, marginHorizontal: 10 },
  bubbleText: { color: C.dark, fontSize: 17, fontWeight: 'bold', lineHeight: 25, textAlign: 'center' },
  adventureCard: {
    backgroundColor: C.white, padding: 12, borderRadius: 20, marginBottom: 14, alignItems: 'center',
    elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  adventureEmojiBox: { width: '100%', height: 150, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  adventureEmoji: { fontSize: 85 },
  adventureTitle: { fontSize: 22, color: C.dark, fontWeight: 'bold', marginTop: 10 },
  heroesRow: { justifyContent: 'center', flexWrap: 'wrap' },
  heroItem: { alignItems: 'center', marginHorizontal: 8, marginVertical: 6 },
  heroName: { marginTop: 6, fontSize: 15, fontWeight: 'bold', color: C.dark },
  footer: { color: C.green, textAlign: 'center', fontWeight: 'bold', fontSize: 17, marginTop: 30 },
});
